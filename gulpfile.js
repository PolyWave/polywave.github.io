(() => {
    'use strict';

    let gulp        = require('gulp'),
        sass        = require('gulp-sass'),
        jshint      = require('gulp-jshint'),
        stylish     = require('jshint-stylish'),
        sourcemaps  = require('gulp-sourcemaps'),
        scsslint    = require('gulp-scss-lint'),
        htmlhint    = require('gulp-htmlhint');

    let paths = {
        sass: {
            src  : `./styles/sass/style.scss`,
            dest : `./styles/css`,
            includePaths: [
                'bower_components/base/src/scss/', //include BASE framework
                'styles/scss'
            ]
        },
        js: {
            src : `./gulpfile.js`
        },
        html: {
            src : './partials/**/*.html'
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
            }));
    });

    gulp.task('sass:watch', () => {
        gulp.watch(paths.sass.src, ['sass:lint', 'sass']);
    });

    /**
     * HTML5
     */

    gulp.task('html:lint', function() {
        return gulp.src(paths.html.src)
            .pipe(htmlhint())
            .pipe(htmlhint.reporter())
            .pipe(htmlhint.failReporter({ suppress: true }));
    });

    gulp.task('html:watch', () => {
        gulp.watch(paths.html.src, ['html:lint']);
    });

    /**
     * jshint
     */

    gulp.task('js:lint', function() {
        return gulp.src(paths.js.src)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('js:watch', () => {
        gulp.watch(paths.js.src, ['js:lint']);
    });

    gulp.task('check', ['sass:lint', 'html:lint', 'js:lint']);
    gulp.task('build', ['check', 'sass']);
    gulp.task('default', ['build', 'sass:watch', 'js:watch', 'html:watch']);

}());
