var gulp         	= require('gulp');
var gulpSequence 	= require('gulp-sequence');
var notify 		 		= require('gulp-notify');

//___________________________________ function
//
function buildDevelopment(cb) {
  gulpSequence(['clean'], ['iconfont', 'sass', 'webpack:dev'], ['watch', 'browserSync'], cb);
};

function buildProduction(cb) {
	
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