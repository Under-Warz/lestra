var gulp 			  = require('gulp');
var useref      = require('gulp-useref');
var gulpif      = require('gulp-if');
var gulpUtil    = require('gulp-util');
var uglify      = require('gulp-uglify');
var minifyCss   = require('gulp-minify-css');
var size				= require('gulp-filesize');
var config 			= require('../config');

//___________________________________ functions
//
function userefTask() {
  return gulp.src(config.paths.publicDir + '/*.html')
    .pipe(useref({
      searchPath: [config.paths.tmpDir]
    }))
    .pipe(gulpif('*.js', uglify().on('error', gulpUtil.log)))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest(config.paths.publicDir));
}
 
//___________________________________ tasks
//
gulp.task('useref', ['html'], function() {
  return userefTask();
});