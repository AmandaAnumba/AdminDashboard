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
	fonts: {
		files: [
			'../static-src/sass/third-party/_font-awesome.scss',
			// '../static-src/sass/third-party/_uikit.scss',
		],
		tasks: ['newer:string-replace:fonts', 'compass:all']
	}, 
	icons: {
		files: [
			'../static-src/sass/partials/_icons.scss'
		],
		tasks: ['string-replace:icons', 'compass:all']
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