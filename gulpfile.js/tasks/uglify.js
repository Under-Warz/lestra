var gulp 			  = require('gulp');
var uglify			= require('gulp-uglify');
var size				= require('gulp-size');
var config 			= require('../config');
var handleErrors = require('../lib/handleError');

gulp.task('uglify:exporter', function() {
  return gulp.src(config.paths.exporterJSDir + '/**/*')
  	.pipe(uglify())
  	.pipe(size({
  		showFiles: true,
  		gzip: true
  	}))
  	.pipe(gulp.dest(config.paths.exporterJSDir))
  	.on('error', handleErrors) 
});