var _ = require('underscore');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps  	= require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var handleError = require('../lib/handleError');
var browserSync 	= require('browser-sync');
var config = require('../config');

function sassTask(src, production) {
	var settings = config.sass.settings;

  var bundle = function() {
	  return gulp.src(src)
			.pipe(sourcemaps.init())
		  .pipe(sass(settings))
		  .on('error', handleError)
		  .pipe(autoprefixer(config.autoprefixer))
		  .pipe(sourcemaps.write('./'))
		  .pipe(gulp.dest(config.paths.tmpDir + '/css'));
  }

  if (!production) {
  	return bundle()
  		.pipe(browserSync.reload({stream: true}));
  }
  else {
  	return bundle();
  }
};

gulp.task('sass', function() {
	return sassTask(config.sass.src, false);
});

gulp.task('sass:dist', function() {
	return sassTask(config.sass.src, true);
});