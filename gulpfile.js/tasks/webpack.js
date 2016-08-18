var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var config = require('../config');
var handleErrors = require('../lib/handleError');
var path = require('path');

// Webpack watch
gulp.task('webpack:dev', function(cb) {
	var webpackConfig = require('../webpack.config.js');
	webpackConfig.watch = true;
	webpackConfig.devtool = "inline-source-map";
	webpackConfig.debug = true;

	var compiler = webpack(webpackConfig);
	var start = true;

	compiler.watch({}, function(err, stats) {
		if (err) throw new gutil.PluginError("webpack:dev", err);

		gutil.log("[webpack:dev]", stats.toString({
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      chunkModules: false,
      modules: false,
      cached: false,
      reasons: false,
      source: false,
      errorDetails: true,
      chunkOrigins: false,
      modulesSort: false,
      chunksSort: false,
      assetsSort: false,
      colors: true
    }));

		// Reload browsersync
		if (start == false) {
			gulp.src(config.paths.jsDir + '/main.js').pipe(browserSync.reload({stream:true}));
		}

		if (start) {
			start = false;

			// Continue gulp tasks
			cb();
		}
	})
});