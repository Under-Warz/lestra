var gulp 				= require('gulp');
var iconfont		= require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var config			= require('../config');
var handleErrors = require('../lib/handleError');
var generateIconSass = require('../lib/generateIconSass');
 
//___________________________________ tasks
//
gulp.task('iconfont', function() {
	var fontName = 'icons';
	var runTimestamp = Math.round(Date.now()/1000);

	return gulp.src([config.paths.iconsDir + '/*.svg'])
		.pipe(iconfont({
			svg: true,
			fontName: fontName,
			prependUnicode: false,
			formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
			appendCodepoints: true,
    	normalize: true,
    	fontHeight: 1792,
    	descent: 256,
    	centerHorizontally: false,
    	fixedWidth: false,
			timestamp: runTimestamp
		})).on('glyphs', generateIconSass({
			sassDest: config.paths.sassDir,
			sassOutputName: '_icons.scss',
			template: './gulpfile.js/lib/template.scss',
			fontName: fontName,
			fontPath: '../fonts',
			className: 'icon'
		})).on('error', handleErrors)
		.pipe(gulp.dest(config.paths.tmpDir + '/fonts/'));
});