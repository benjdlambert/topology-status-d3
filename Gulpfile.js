const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task(
    'build:vendor',
    () =>
        gulp.src([
            'node_modules/react/dist/*.js',
            'node_modules/react-dom/dist/*.js',
            'node_modules/whatwg-fetch/fetch.js',
            'node_modules/es6-promise/dist/*.js'
        ])
        .pipe(gulp.dest('dist/vendor'))
);

gulp.task(
    'build:server',
     () =>
        gulp.src([
            'src/**',
        ])
        .pipe($.babel())
        .pipe(gulp.dest('dist'))
);

gulp.task(
    'build',
    ['build:vendor', 'build:server']
)