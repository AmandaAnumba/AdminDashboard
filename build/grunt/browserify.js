module.exports = {
	all: {
		files: [{
			expand: true,
			cwd: '../static-src/js/',
			src: ['*.js', '!third-party/*.js'],
			dest: '../static/js/'
		}],
	}
}