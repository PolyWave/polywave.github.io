(() => {
    'use strict';

    let gulp        = require('gulp'),
        sass        = require('gulp-sass'),
        jshint      = require('gulp-jshint'),
        stylish     = require('jshint-stylish'),
        sourcemaps  = require('gulp-sourcemaps'),
        scsslint    = require('gulp-scss-lint');

    let paths = {
        sass: {
            src  : `./styles/sass/**/*.scss`,
            dest : `./styles/css`,
            includePaths: [
                'bower_components/base/src/scss/', //include BASE framework
                'styles/scss'
            ]
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
            .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: paths.sass.includePaths
            }).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.sass.dest));
    });

    gulp.task('sass:lint', () => {
        return gulp.src(paths.sass.src)
            .pipe(scsslint({
                config: '.sass-lint.yml',
                endless: true
            }))
            .pipe(scsslint.failReporter());
    });

    gulp.task('sass:watch', () => {
        gulp.watch(paths.sass.src, ['sass:lint', 'sass']);
    });

    /**
     * jshint
     */

    gulp.task('js:lint', function() {
        return gulp.src(paths.lint.src)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('js:watch', () => {
        gulp.watch(paths.lint.src, ['js:lint']);
    });

    gulp.task('check', ['sass:lint', 'js:lint']);
    gulp.task('build', ['check', 'sass']);
    gulp.task('default', ['build', 'sass:watch', 'js:watch']);

}());
