(() => {
    'use strict';

    let gulp        = require('gulp'),
        jshint      = require('gulp-jshint'),
        stylish     = require('jshint-stylish'),
        scsslint    = require('gulp-scss-lint'),
        htmlhint    = require('gulp-htmlhint');

    let paths = {
        sass: {
            watch: [
                `./_sass/**/*.scss`,
                `!./_sass/base/**/*.scss`,
            ],
        },
        js: {
            src : ['./gulpfile.js', './server.js', './js/**/*.js']
        },
        html: {
            src  : [
                './_includes/**/*.html',
                './_layouts/**/*.html',
                './*.html',
                './*.html',
                './*.html'
            ],
            index: './partials/index.html'
        }
    };

    /**
     * SASS
     */

    gulp.task('sass:lint', () => {
        let task = gulp.src(paths.sass.watch).pipe(scsslint({
            config: '.sass-lint.yml'
        }));

        if (process.env.CI) {
            task = task.pipe(scsslint.failReporter());
        }

        return task;
    });

    gulp.task('sass:watch', () => {
        gulp.watch(paths.sass.watch, ['sass:lint']);
    });

    /**
     * HTML5
     */

    gulp.task('html:lint', () => {
        let task = gulp.src(paths.html.src)
            .pipe(htmlhint('.htmlhintrc'))
            .pipe(htmlhint.reporter());

        if (process.env.CI) {
            task = task.pipe(htmlhint.failReporter({ suppress: true }));
        }

        return task;
    });

    gulp.task('html:watch', () => {
        gulp.watch(paths.html.src, ['html:lint']);
    });

    /**
     * jshint
     */

    gulp.task('js:lint', () => {
        let task = gulp.src(paths.js.src)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));

            if (process.env.CI) {
                task = task.pipe(jshint.reporter('fail'));
            }

        return task;
    });

    gulp.task('js:watch', () => {
        gulp.watch(paths.js.src, ['js:lint']);
    });

    gulp.task('check', ['sass:lint', 'html:lint', 'js:lint']);
    gulp.task(
        'default',
        ['check', 'sass:watch', 'js:watch', 'html:watch']
    );
})();
