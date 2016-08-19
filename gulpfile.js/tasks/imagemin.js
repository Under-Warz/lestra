var gulp 			  = require('gulp');
var imagemin    = require('gulp-imagemin');
var config 			= require('../config');

//___________________________________ functions
//
function imageminTask() {
  return gulp.src(config.paths.srcDir + '/images/**/*')
  	.pipe(imagemin({
  		progressive: true
  	}))
  	.pipe(gulp.dest(config.paths.publicDir + '/images'));
}
 
//___________________________________ tasks
//
gulp.task('imagemin', function() {
  return imageminTask();
});