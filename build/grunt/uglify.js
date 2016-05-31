module.exports = {
    options: {
        compress: {
            drop_console: true
        },
        sourceMap: false,
        sourceMapIncludeSources: false,
    },  
    main: {
        files: [{
            expand: true,              
            cwd: '../app/static/js/',       
            src: ['**/*.js', '!**/*.min.js', '!bootstrap/**/*.js', '!trash.js', '!bootstrap-sprockets.js'], 
            dest: '../app/static/js/prod/', 
            ext: '.min.js',             
            extDot: 'last'             
        }],
    },
    froala: {
        files: {
            '../app/static/js/third-party/froala-editor.js': ['../app/static-src/js/third-party/froala_editor.min.js', '../app/static-src/js/third-party/froala-plugins/*.js']
        },
    } 
}