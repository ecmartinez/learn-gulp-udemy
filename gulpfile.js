var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

//file paths
var SCRIPTS_PATH = 'public/scripts/**/*.js'

// Styles Task
gulp.task('styles', function() {
  console.log('staring styles taks');
});

// Scripts Task
gulp.task('scripts', function() {
  console.log('Starting scripts task');

  return gulp.src(SCRIPTS_PATH)
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
    .pipe(livereload());
});

// Images Task
gulp.task('images', function() {
  console.log('starting images task');
});

// Watch Task
gulp.task('watch', function() {
  console.log('Starting watch task');
  require('./server.js');
  livereload.listen();
  gulp.watch(SCRIPTS_PATH, ['scripts']);
});

// Default Task
gulp.task('default', ['styles', 'scripts', 'images', 'watch'], function() {
    console.log('Starting default task');
});
