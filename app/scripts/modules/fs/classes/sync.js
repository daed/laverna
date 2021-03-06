/**
 * Copyright (C) 2015 Laverna project Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/* global define */
define([
    'underscore',
    'q',
    'marionette',
    'backbone.radio',
    'modules/fs/classes/adapter',
], (_, Q, Marionette, Radio, FS) => {
    'use strict';

    /**
     * File system synchronizer.
     */
    const Controller = Marionette.Object.extend({

        initialize() {

            FS.path = Radio.request('configs', 'get:config', 'module:fs:folder');

            /**
             * @todo Show a message or something.
             * For now disable synchronizing.
             */
            if (!FS.path) {
                return;
            }

            // Create current profile's folder
            FS.path = `${FS.path}/${Radio.request('uri', 'profile') || 'notes-db'}/`;
            FS.checkDirs();

            // Check for changes on file system
            this.checkChanges();

            // Listen to Laverna events
            this.listenTo(Radio.channel('notes'), 
                'sync:model destroy:model restore:model', this.onSave);
            this.listenTo(Radio.channel('notebooks'), 
                'sync:model destroy:model restore:model', this.onSave);
            this.listenTo(Radio.channel('tags'), 
                'sync:model destroy:model restore:model', this.onSave);

            // Listen to FS events
            this.listenTo(Radio.channel('fs'), 'change', this.onFsChange);
        },

        /**
         * Check for changes on start.
         */
        checkChanges() {
            // what is promises even doing?
            const promises = [];
            const self     = this;

            _.each(['notes', 'notebooks', 'tags'], module => {
                return Q.all([
                    Radio.request(module, 'fetch', {encrypt: true}),
                    FS.getList(module),
                ])
                .spread((localData, remoteData) => {
                    return self.syncAll(localData, remoteData, module);
                });
            });

            return _.reduce(promises, Q.when, new Q())
            .then(() => {
                self.startWatch();
            })
            .fail(e => {
                console.error('Error:', e);
            });
        },

        /**
         * Start watching for FS changes.
         */
        startWatch() {
            FS.startWatch();
        },

        /**
         * Synchronize FS and IndexedDB.
         */
        syncAll(localData, remoteData, module) {
            const promises = [];

            const localColData = (localData.fullCollection || localData).toJSON();

            // First, check if there are any changes in IndexedDB
            promises.push.apply(
                promises,
                this.checkLocalChanges(localColData, remoteData, module)
            );

            // Then, check if there are any changes on file system
            promises.push.apply(
                promises,
                this.checkRemoteChanges(localColData, remoteData, module)
            );

            return _.reduce(promises, Q.when, new Q())
            .fail(e => {
                console.error('Error:', e);
            });
        },

        /**
         * Synchronize models from IndexedDB to file system.
         */
        checkLocalChanges(localData, remoteData, module) {
            const promises = [];

            _.each(localData, lModel => {
                const model = _.findWhere(remoteData, {id: lModel.id});
                if (model && model.updated >= lModel.updated) {
                    return;
                }

                promises.push(() => {
                    return FS.writeFile(module, lModel);
                });
            });

            return promises;
        },

        /**
         * Synchronize models from file system to IndexedDB.
         */
        checkRemoteChanges(localData, remoteData, module) {
            const newData = _.filter(remoteData, mod => {
                const rModel = mod;
                const model = _.findWhere(localData, {id: rModel.id});
                rModel.content = rModel.content || '';

                if (model && model.updated >= rModel.updated &&
                   _.isEqual(rModel, model)) {
                    return false;
                }

                return true;
            });

            return Radio.request(module, 'save:all:raw', newData);
        },

        /**
         * Laverna triggered `change` event.
         */
        onSave(model) {
            FS.writeFile(model.storeName, model.attributes)
            .fail(e => {
                console.error('onSave error:', e);
            });
        },

        /**
         * File system triggered `change` event.
         */
        onFsChange(data) {

            return Radio.request(data.storeName, 'get:model', {
                id: data.data.id,
            })
            .then(model => {
                data.data = _.extend({}, model.attributes, data.data);

                // Don't parse content
                if (!data.data.content) {
                    return [data, model];
                }

                // Parse tasks and tags
                return Radio.request('markdown', 'parse', data.data.content)
                .then(env => {
                    data.data = _.extend(
                        data.data,
                        _.pick(env, 'tags', 'tasks', 'taskCompleted', 'taskAll', 'files')
                    );

                    return [data, model];
                });
            })
            .spread((data, model) => {

                // Nothing's changed
                if (_.isEqual(data.data, model.attributes)) {
                    return;
                }

                return Radio.request(data.storeName, 'save:raw', data.data);
            })
            .fail(e => {
                console.error('onFsChange error:', e);
            });
        },

    });

    return Controller;
});
