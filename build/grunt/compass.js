module.exports = {
    dashboard: {
        options: {
            environment: "production",
            outputStyle: "compressed",
            httpPath: "../", 
            sassDir: "../dashboard/static-src/sass/",
            cssDir: "../dashboard/static/css/",
            imagesDir: "../dashboard/static/images/",
            javascriptsDir: "../dashboard/static/js/",
            fontsDir: "../dashboard/static/fonts/",
            noLineComments: true,
        },
        files: [{
            expand: true,
            cwd: '../dashboard/static-src/sass/',
            src: [
                '*.scss',
                '!third-party/*/*.scss'
            ], 
            dest: '../dashboard/static/css/',
            ext: '.css',
            extDot: 'last'
        }], 
    },
    editor: {
        options: {
            environment: "production",
            outputStyle: "compressed",
            httpPath: "../", 
            sassDir: "../editor/static-src/sass/",
            cssDir: "../editor/static/css/",
            imagesDir: "../editor/static/images/",
            javascriptsDir: "../editor/static/js/",
            fontsDir: "../editor/static/fonts/",
            noLineComments: true,
        },
        files: [{
            expand: true,
            cwd: '../editor/static-src/sass/',
            src: ['*.scss'], 
            dest: '../editor/static/css/',
            ext: '.css',
            extDot: 'last'
        }], 
    }
};