var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var destFolder = 'dist/';
var mapFolder = '../maps/';

gulp.task("react-compile",function () {
  return gulp.src(['src/react-template/*.jsx','src/app.jsx'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['react','es2015'],
      minified: true,
      comments: false
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write(mapFolder))
    .pipe(gulp.dest(destFolder));
});
gulp.task('copy-framework',function () {
  return gulp.src(['bower_components/**/*.min.js'])
    .pipe(gulp.dest(destFolder));
});

var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
gulp.task('less-compile',function () {
  return gulp.src('src/less/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [path.join(__dirname,'src','less','includes')]
    }))
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write(mapFolder))
    .pipe(gulp.dest(destFolder));
})

gulp.task('plain-js-compile',function () {
  return gulp.src(['node_modules/zepto/dist/zepto.min.js','src/js/*.js'])
  .pipe(concat('data.js'))
  .pipe(gulp.dest(destFolder));
})

gulp.task('compile',['react-compile','copy-framework','plain-js-compile','less-compile']);

//browser-sync
var browserSync = require('browser-sync').create();
gulp.task('watch',function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['src/**/*','*.html'],['reload']);
});
gulp.task('reload',['compile'],function (done) {
  browserSync.reload();
  done();
});

gulp.task('default',['compile','watch']);
