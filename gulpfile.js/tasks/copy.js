var gulp 			  = require('gulp');
var config 			= require('../config');

function copyTask(config) {
  return gulp.src(config.src)
    //.pipe(changed(config.dist))
    .pipe(gulp.dest(config.dist));
}