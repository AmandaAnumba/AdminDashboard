module.exports = {
	options: {
		curly: true,
		eqeqeq: true,
		eqnull: true,
		browser: true,
		browserify: true,
		reporter : require('jshint-stylish'),
		"-W030": true,
	}, 
	all: {
		files: [{
			expand: true,
			cwd: '../static-src/js/',
			src: ['*.js'], 
		}], 
	}
}