var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        },
    })
});

gulp.task('sass', function() {
    return gulp.src('public/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('public/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('public/*.html', browserSync.reload);
    gulp.watch('public/pages/**/*.js', browserSync.reload);
    gulp.watch('public/js/**/*.js', browserSync.reload);
});

gulp.task('useref', function() {
    return gulp.src('public/**/*.html')
        .pipe(useref())
        .pipe(gulpIf('**/*.js', uglify()))
        // Minifies only if it's a CSS file
        // .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function() {
    return gulp.src('public/images/**/*')
        .pipe(gulp.dest('dist/images'))
})

gulp.task('fonts', function() {
    return gulp.src('public/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('build', function(callback) {
    runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})