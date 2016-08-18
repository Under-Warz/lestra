var gulp 			          	= require('gulp');
var browserSync         	= require('browser-sync');
var config 			        	= require('../config');

gulp.task('browserSync', function() {
  return browserSync.init({
    port: config.browserSync.port,
    ui: {
      port: config.browserSync.port + 1
    },
    proxy: config.browserSync.proxy,
    serveStatic: [config.paths.tmpDir]
  });
});