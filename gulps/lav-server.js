'use strict';

module.exports = function(gulp, plugins) {

    gulp.task('lav-server', function() {
        return gulp.src('./release')
        .pipe(plugins.shell(
            'cd ./release/laverna && git clone git@github.com:daed/laverna-server.git && cd ../'
        ));
    });

};
