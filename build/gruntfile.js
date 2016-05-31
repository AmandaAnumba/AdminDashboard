module.exports = function(grunt) {
    /* load all grunt tasks matching the ['grunt-*', '@*\/grunt-*'] patterns */
    require('load-grunt-tasks')(grunt);
    
    /* load grunt config */
    require('load-grunt-config')(grunt);

    grunt.loadNpmTasks('grunt-collection');
    
    /* register grunt tasks */
    grunt.registerTask('build', [
        'compass:dev',
        'string-replace:fonts',
        'jshint:all',
        'browserify:all',
    ]);
};