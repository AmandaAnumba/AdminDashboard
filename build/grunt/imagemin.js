module.exports = {
    dashboard: {
        files: [{
            expand: true,
            cwd: '../dashboard/static-src/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: '../dashboard/static/images/',
        }]
    },
};