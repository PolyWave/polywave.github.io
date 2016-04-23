(() => {
    'use strict';

    let gulp        = require('gulp'),
        sass        = require('gulp-sass'),
        jshint      = require('gulp-jshint'),
        stylish     = require('jshint-stylish');

    let paths = {
        sass: {
            src  : `./styles/sass/**/*.scss`,
            dest : `./styles/css`
        },
        lint: {
            src : `./gulpfile.js`
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

    /**
     * jshint
     */

    gulp.task('lint', function() {
        return gulp.src(paths.lint.src)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('lint:watch', () => {
        gulp.watch(paths.lint.src, ['lint']);
    });

    gulp.task('check', ['lint']);
    gulp.task('build', ['sass']);
    gulp.task('default', ['check', 'build', 'sass:watch', 'lint:watch']);

}());
