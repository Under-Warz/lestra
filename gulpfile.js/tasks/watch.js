var gulp 				= require('gulp');
var watch				= require('gulp-watch');
var browserSync = require('browser-sync');
var config			= require('../config');
 
//___________________________________ tasks
//
gulp.task('watch', function() {
	// SCSS
	watch(config.paths.sassDir + '/**/*.scss', function() { gulp.start('sass'); });
	
	// Resources
	watch(config.paths.resourcesDir + '/**/*.{twig,svg,png,jpeg,jpg}', function() {
		gulp.src('')
			.pipe(browserSync.reload({stream:true}));
	});

	// PHP
	watch([config.paths.appDir + '/**/*.php', config.paths.configDir + '/**/*.php'], function() {
		gulp.src('')
			.pipe(browserSync.reload({stream:true}));
	});

	// Icons fonts
	watch(config.paths.iconsDir + '/*.svg', function() { gulp.start('iconfont'); });
});