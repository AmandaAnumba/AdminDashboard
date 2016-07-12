module.exports = {
	all: {
		options: {
			environment: "production",
			outputStyle: "compressed",
			httpPath: "../", 
			sassDir: "../static-src/sass/",
			cssDir: "../static/css/",
			imagesDir: "../static/images/",
			javascriptsDir: "../static/js/",
			fontsDir: "../static/fonts/",
			noLineComments: true,
		},
		files: [{
			expand: true,
			cwd: '../static-src/sass/',
			src: [
				'*.scss',
				'!third-party/*/*.scss'
			], 
			dest: '../static/css/',
			ext: '.css',
			extDot: 'last'
		}], 
	}
};