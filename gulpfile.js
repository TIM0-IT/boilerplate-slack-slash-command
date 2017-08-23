const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const clean = require('gulp-clean');

// Transpile with babel the es6 to es5 and copy them with the dist folder
gulp.task('es6', () => {
    return gulp.src(["app.js", "routes/*", 'lib/*', 'middleware/*'], {base: "."})
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist'))
});

// Copy all Json file into the dist folder
gulp.task('json', () => {
    return gulp.src(['config/*'], {base: "."})
        .pipe(gulp.dest('dist'))
});

// Clean the dist folder
gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

// Launch the dev mode that reload the server every modification
gulp.task('server', function() {
    nodemon({
        script: 'dist/app.js',
        watch: ["app.js", "routes/*", 'lib/*', 'middleware/*', 'config/*'],
        ext: 'js json',
        tasks: ['build']
    }).on('restart', function() {
        gulp.src('app.js').pipe(notify('Server successfully restarted'));
    })
});

gulp.task('default', ['server']);
gulp.task('build', ['es6', 'json']);
