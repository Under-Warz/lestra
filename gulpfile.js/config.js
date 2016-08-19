var paths = {
	srcDir: './src/',
	iconsDir: './src/assets/icons/',
	sassDir: './src/assets/sass',
	jsDir: './src/assets/js',
	publicDir: './dist',
	tmpDir: './.tmp/'
};

module.exports = {
	paths: paths,
	sass: {
		settings: {
			includePaths: ['./node_modules']
		},
		src: paths.sassDir + '/**/*.scss',
	},
	autoprefixer: { 
		browsers: [
	    'ie >= 9',
	    'ie_mob >= 9',
	    'ff >= 30',
	    'chrome >= 34',
	    'safari >= 7',
	    'opera >= 23',
	    'ios >= 7',
	    'android >= 4.4',
	    'bb >= 10'
  	]
	},
	browserSync: {
		port: 9000,
		proxy: 'lestra.dev'
	}
};