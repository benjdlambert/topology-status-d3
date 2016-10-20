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
    'build:client',
    () =>
        gulp.src('src/jsx/network.jsx')
        .pipe($.webpack({
            output: {
                library: ['Index'],
                filename: '[name].js'
            },
            resolve: {
                extensions: ['', '.js', '.jsx']
            },
            externals: {
                react: 'React',
                'react-dom': 'ReactDOM'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx$/,
                        loader: 'babel',
                        query: {
                            plugins: ['transform-object-rest-spread', 'transform-class-properties', 'transform-react-jsx'],
                            presets: ['react', 'es2015']
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                            presets: [
                                'es2015',
                            ]
                        }
                    }
                ]
            }
        })
    )
    .pipe($.rename('pack.js'))
    .pipe(gulp.dest('dist'))
)

gulp.task(
    'build',
    ['build:vendor', 'build:server', 'build:client']
)