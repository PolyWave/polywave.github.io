(() => {
    'use strict';

    let gulp = require('gulp'),
        sass = require('gulp-sass');

    let paths = {
        sass: {
            src  : `./styles/sass/**/*.scss`,
            dest : `./styles/css`
        }
    };

    /**
     * SASS
     */

    gulp.task('sass', () => {
        return gulp.src(paths.sass.src)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(paths.sass.dest));
    });

    gulp.task('sass:watch', () => {
        gulp.watch(paths.sass.src, ['sass']);
    });

    gulp.task('default', ['sass:watch']);

}());
