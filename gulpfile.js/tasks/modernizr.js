var gulp 			  = require('gulp');
var modernizr   = require('gulp-modernizr');
var uglify      = require('gulp-uglify');
var config 			= require('../config');

//___________________________________ functions
//
function modernizrTask() {
  return gulp.src([
      config.paths.jsDir + '/**/*.js',
      config.paths.sassDir + '/**/*.{css,scss}'
    ])
    .pipe(modernizr({
      cache: false,
      options: [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
      ]
    }))
    .pipe(gulp.dest(config.paths.tmpDir + '/js'))
}
 
//___________________________________ tasks
//
gulp.task('modernizr', function() {
  return modernizrTask(false);
});