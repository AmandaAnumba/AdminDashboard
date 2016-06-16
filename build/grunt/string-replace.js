module.exports = {
    fonts: {
        files: {
            '../dashboard/static-src/sass/third-party/_font-awesome.scss': '../dashboard/static-src/sass/third-party/_font-awesome.scss',
            '../dashboard/static-src/sass/third-party/_uikit.scss': '../dashboard/static-src/sass/third-party/_uikit.scss',
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
            '../dashboard/static-src/sass/partials/_icons.scss': '../dashboard/static-src/sass/partials/_icons.scss',
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