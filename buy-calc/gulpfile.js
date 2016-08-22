var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task("react-compile",function () {
  return gulp.src('src/react-template/*.jsx')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(concat('app-template.js'))
    .pipe(sourcemaps.write('../maps/'))
    .pipe(gulp.dest('dist/'));
});
gulp.task('compile',['react-compile']);

//browser-sync
var browserSync = require('browser-sync').create();
gulp.task('watch',function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('src/**/*',['reload']);
});
gulp.task('reload',['compile'],function (done) {
  browserSync.reload();
  done();
});

gulp.task('default',['compile','watch']);
