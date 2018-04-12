var sass = require('gulp-sass');
var gulp = require('gulp');


gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("public/js"))
});

gulp.task('serve', ['sass'], function () {

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'], ['sass']);
});

gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
});

gulp.task('serve', ['sass'], function () {

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'], ['sass']);
});

gulp.task('default', ['js', 'serve']);