module.exports = {
	fonts: {
		files: {
			'../static-src/sass/third-party/_font-awesome.scss': '../static-src/sass/third-party/_font-awesome.scss',
			// '../static-src/sass/third-party/_uikit.scss': '../static-src/sass/third-party/_uikit.scss',
		},
		options: {
			replacements: [
				{
					pattern: /..\/fonts\//ig,
					replacement: '/static/fonts/'
				}
			]
		}
	},
	icons: {
		files: {
			'../static-src/sass/partials/_icons.scss': '../static-src/sass/partials/_icons.scss',
		},
		options: {
			replacements: [
				{
					pattern: /fonts\//ig,
					replacement: '/static/fonts/'
				}
			]
		}
	},
};