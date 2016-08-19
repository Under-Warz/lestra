var gulp 			  = require('gulp');
var clean       = require('del');
var config 			= require('../config');

gulp.task('clean', function() {
  return clean([
  	config.paths.tmpDir + '/**/*',
  	config.paths.publicDir + '/**/*'
  ]);
});