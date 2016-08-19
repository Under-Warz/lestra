var gulp 			  = require('gulp');
var uglify			= require('gulp-uglify');
var size				= require('gulp-size');
var config 			= require('../config');
var handleErrors = require('../lib/handleError');

gulp.task('uglify', function() {
  return gulp.src([config.paths.tmpDir + '/js/**/*.js', '!' + config.paths.tmpDir + '/js/main.js', '!' + config.paths.tmpDir + '/js/modernizr.js'])
  	.pipe(uglify())
  	.pipe(size({
  		showFiles: true,
  		gzip: true
  	}))
  	.pipe(gulp.dest(config.paths.publicDir + '/js'))
  	.on('error', handleErrors) 
});