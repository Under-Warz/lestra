var gulp 			  = require('gulp');
var config 			= require('../config');

//___________________________________ functions
//
function htmlTask() {
  return gulp.src(config.paths.srcDir + '/*.html')
    .pipe(gulp.dest(config.paths.publicDir));
}
 
//___________________________________ tasks
//
gulp.task('html', function() {
  return htmlTask();
});