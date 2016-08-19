var gulp 			  = require('gulp');
var changed			= require('gulp-changed');
var config 			= require('../config');

function copyTask(config) {
  return gulp.src(config.src)
    .pipe(changed(config.dist))
    .pipe(gulp.dest(config.dist));
}

gulp.task('fonts', function() {
	return copyTask({
		src: config.paths.srcDir + '/fonts/**/*',
		dist: config.paths.publicDir + '/fonts'
	});
});

gulp.task('copy', ['fonts']);