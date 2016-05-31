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
    dashboard: {
        files: [{
            expand: true,
            cwd: '../dashboard/static-src/js/',
            src: ['*.js'], 
        }], 
    },
    editor: {
        files: [{
            expand: true,
            cwd: '../editor/static-src/js/',
            src: ['*.js'], 
        }], 
    }
}