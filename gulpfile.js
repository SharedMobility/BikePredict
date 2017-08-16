let clean = require('gulp-clean-css'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass')
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('./src/css/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(clean({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public'))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src(['public/index.html'])
  .pipe(livereload());
});

gulp.task('build', function() {
  livereload.listen();
  gulp.watch('public/*.html', ['html']);
  gulp.watch('src/css/*.scss', ['sass']);
});

gulp.task('watch', ['build'], function() {
  return nodemon({
    script: 'server.js'
  });
});
