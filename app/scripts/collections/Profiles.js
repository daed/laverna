/**
 * @module collections/Profiles
 */
import Collection from './Collection';
import Profile from '../models/Profile';

/**
 * Profiles collection.
 *
 * @class
 * @extends module:collections/Collection
 * @license MPL-2.0
 */
export default class Profiles extends Collection {

    /**
     * Profile model.
     *
     * @returns {Object}
     */
    get model() {
        return Profile;
    }

    destroyUser(opt) {
        console.log('destroyUser(): calling destroyDb()');
        this.sync('destroyDb', opt, {});
    }

    constructor(models) {
        // Change the profileId to "default"
        super(models, {profileId: 'default'});
    }

}
