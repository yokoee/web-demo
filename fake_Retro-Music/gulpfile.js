const gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin')

gulp.task('default', function() {
    gulp.run('watch');
})
gulp.task('html', () => {
    gulp.src('*.html')
        .pipe(livereload())
})
gulp.task('less', () => {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(livereload())
})
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('*.html', ['html']);
    gulp.watch('less/*.less', ['less']);
})

/* gulp.task('img', function() {
    gulp.src('song/album/*.jpg')
        .pipe(imagemin({ progressive: true, optimizationLevel: 1, }))
        .pipe(gulp.dest('song/album0'))
}) */