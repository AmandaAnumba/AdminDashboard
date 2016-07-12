module.exports = {
	all: {
		files: [{
			expand: true,
			cwd: '../static-src/images/',
			src: ['**/*.{png,jpg,gif}'],
			dest: '../static/images/',
		}]
	},
};