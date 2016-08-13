module.exports = {
	/* Reload the watcher if the configuration changes */
	configFiles: {
		files: [ 'Gruntfile.js', 'grunt/*.js' ],
		options: {
			reload: true
		}
	}, 


	styles: {
		files: [
			'../static-src/sass/*.scss', 
			'!../static-src/sass/third-party/uikit/*'
		],
		tasks: ['newer:compass:all']
	}, 
	style_imports: {
		files: [
			'../static-src/sass/modules/**/*.scss',
			'../static-src/sass/partials/**/*.scss',
			'../static-src/sass/third-party/**/*.scss'
		],
		tasks: ['compass:all']
	}, 
	scripts: {
		files: [
			'../static-src/js/**/*.js', 
		],
		tasks: ['newer:jshint:all', 'browserify:all']
	},
	images: {
		files: [
			'../static-src/images/**/*.{png,jpg,jpeg,gif}', 
		],
		tasks: ['imagemin:all']
	}
}