var gulp         	= require('gulp');
var gulpSequence 	= require('gulp-sequence');
var notify 		 		= require('gulp-notify');

//___________________________________ function
//
function buildDevelopment(cb) {
  gulpSequence(['clean'], ['iconfont', 'sass', 'webpack:dev', 'modernizr'], ['watch', 'browserSync'], cb);
};

function buildProduction(cb) {
	gulpSequence(['clean'], ['iconfont:dist', 'copy', 'imagemin'], ['sass:dist', 'webpack:dist', 'modernizr'], ['uglify', 'useref'], ['completed'], cb);
};

function notifyEnd() {
	gulp.src('.')
		.pipe(notify('Build completed!'));
}


//___________________________________ tasks
//
gulp.task('default', buildDevelopment);

gulp.task('build', buildProduction);

gulp.task('completed', notifyEnd);