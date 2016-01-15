var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var del = require('del');
var zip = require('gulp-zip');

// Image min plugins
var jpegoptim = require('imagemin-jpegoptim');
var pngquant = require('imagemin-pngquant');
var optipng = require('imagemin-optipng');
var svgo = require('imagemin-svgo');
var size = require('gulp-size');

//file paths
var DIST_PATH = 'public/dist';
var JS_PATH = 'public/js/**/*.js';
var HTML_PATH = 'public/**/*.html';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var SCSS_SRC = 'public/scss/styles.scss';
var IMG_PATH = 'public/images/**/*.{png,jpeg,jpg,gif,svg}';
 

// SCSS--Styles Task
gulp.task('styles', function() {
  console.log('Staring styles taks');
  return gulp.src(SCSS_SRC) 
    .pipe(plumber(function(err){
        console.log('Styles Task Error');
        console.log(err);
        this.emit('end');    
      }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass({
        outputStyle: 'compressed'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(browserSync.reload({
      stream: true
      }))
});

// JS--Scripts Task
gulp.task('scripts', function() {
  console.log('Starting scripts task');

  return gulp.src(JS_PATH)
    .pipe(plumber(function() {
        console.log('Scripts Task Error');
        console.log(err);
        this.emit('end');
      }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
});

// IMG--Images Task
gulp.task('images', function() {
  console.log('Starting images task');

  return gulp.src(IMG_PATH)
    .pipe(size({
      title: 'Uncompressed images'
    }))
    .pipe(pngquant({
      quality: '65-80'
    })())
    .pipe(optipng({
      optimizationLevel: 3
    })())
    .pipe(jpegoptim({
      max: 70
    })())
    .pipe(svgo()())
    .pipe(size({
      title: 'Compressed images'
    }))
    .pipe(gulp.dest(DIST_PATH + '/images'))
});

// Watch Task
gulp.task('watch', ['default', 'browserSync'],  function() {
  console.log('Starting watch task');
  gulp.watch(JS_PATH, ['scripts']);
  gulp.watch(SCSS_PATH, ['styles']);
  gulp.watch(HTML_PATH, browserSync.reload);
  gulp.watch(SCSS_PATH, browserSync.reload);
  gulp.watch(JS_PATH, browserSync.reload);
});

// Default Task
gulp.task('default', ['clean', 'styles', 'scripts', 'images'], function() {
    console.log('Starting default task');
});

// Del
gulp.task('clean', function() {
  return del.sync([
    DIST_PATH
  ]);
});

// Zip -- Export
gulp.task('export', ['default'], function() {
  return gulp.src('public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'));
});

// Browser-sync--Static server
gulp.task('browserSync', function() { 
  browserSync.init({
    server: {
      baseDir: "./public"
    },
  })
});



