'use strict';

module.exports = function(gulp, plugins) {

    gulp.task('lav-server', function() {
        return gulp.src('./release')
        .pipe(plugins.shell(
            'cd ./release/laverna && curl -o laverna-server.tar.gz https://codeload.github.com/daed/laverna-server/tar.gz/server-1.0.0 && gzip -d laverna-server.tar.gz && tar xvf laverna-server.tar && rm -rf laverna-server.tar && mv laverna-server-server-1.0.0 laverna-server && cd ../'
        ));
    });

};
