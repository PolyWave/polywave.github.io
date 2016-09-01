(() => {
    'use strict';

    let gulp        = require('gulp'),
        sass        = require('gulp-sass'),
        jshint      = require('gulp-jshint'),
        stylish     = require('jshint-stylish'),
        sourcemaps  = require('gulp-sourcemaps'),
        scsslint    = require('gulp-scss-lint'),
        htmlhint    = require('gulp-htmlhint'),
        browserSync = require('browser-sync').create();

    let paths = {
        sass: {
            src  : `./styles/sass/style.scss`,
            watch: `./styles/sass/**/*.scss`,
            dest : `./styles/css`,
            includePaths: [
                'bower_components/base/src/scss/', //include BASE framework
                'styles/sass/'
            ]
        },
        js: {
            src : ['./gulpfile.js', './server.js']
        },
        html: {
            src  : [
                './partials/**/*.html',
                './index.html',
                './text.html',
                './contact.html'
            ],
            index: './partials/index.html'
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
            .pipe(gulp.dest(paths.sass.dest))
            .pipe(browserSync.reload({ stream: true }));
    });

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
        gulp.watch(paths.sass.watch, ['sass:lint', 'sass']);
    });

    /**
     * HTML5
     */

    gulp.task('html:lint', () => {
        let task = gulp.src(paths.html.src)
            .pipe(htmlhint())
            .pipe(htmlhint.reporter());

        if (process.env.CI) {
            task = task.pipe(htmlhint.failReporter({ suppress: true }));
        }

        task.pipe(browserSync.reload({ stream: true }));

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

            task.pipe(browserSync.reload({ stream: true }));
        return task;
    });

    gulp.task('js:watch', () => {
        gulp.watch(paths.js.src, ['js:lint']);
    });

    gulp.task('browserSync',() => {
        browserSync.init({
            server: {
                baseDir: './'
            },
            notify: false
        });
    });

    gulp.task('check', ['sass:lint', 'html:lint', 'js:lint']);
    gulp.task('build', ['check', 'sass']);
    gulp.task('build-heroku', ['html:lint', 'js:lint', 'sass']);
    gulp.task(
        'default',
        ['build', 'browserSync', 'sass:watch', 'js:watch', 'html:watch']
    );
})();
