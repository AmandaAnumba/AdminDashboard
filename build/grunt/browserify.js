module.exports = {
    dashboard: {
        files: [{
            expand: true,
            cwd: '../dashboard/static-src/js/',
            src: ['*.js', '!imports/*.js', '!third-party/*.js'],
            dest: '../dashboard/static/js/'
        }],
        options: {
            debug: true,
            alias: [
                '../dashboard/static-src/js/imports/admin.js:admin',
            ],
            external: null
        }
    },

    editor: {
        files: [{
            expand: true,
            cwd: '../editor/static-src/js/',
            src: ['*.js', '!imports/*.js', '!third-party/*.js'],
            dest: '../editor/static/js/'
        }],
        options: {
            debug: true,
            alias: [
                '../editor/static-src/js/imports/editor.js:editor',
            ],
            external: null
        }
    },
}