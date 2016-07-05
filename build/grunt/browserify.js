module.exports = {
    dashboard: {
        files: [{
            expand: true,
            cwd: '../dashboard/static-src/js/',
            src: ['*.js', '!third-party/*.js'],
            dest: '../dashboard/static/js/'
        }],
    },

    editor: {
        files: [{
            expand: true,
            cwd: '../editor/static-src/js/',
            src: ['*.js', '!imports/*.js', '!third-party/*.js'],
            dest: '../editor/static/js/'
        }],
    },
}