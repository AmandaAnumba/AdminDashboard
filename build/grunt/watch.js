module.exports = {
    /* Reload the watcher if the configuration changes */
    configFiles: {
        files: [ 'Gruntfile.js', 'grunt/*.js' ],
        options: {
            reload: true
        }
    }, 



    /* dashboard */
    dashboard_styles: {
        files: ['../dashboard/static-src/sass/*.scss'],
        tasks: ['newer:compass:dashboard']
    }, 
    dashboard_style_imports: {
        files: [
            '../dashboard/static-src/sass/modules/**/*.scss',
            '../dashboard/static-src/sass/partials/**/*.scss',
            '../dashboard/static-src/sass/third-party/**/*.scss'
        ],
        tasks: ['compass:dashboard']
    }, 
    fonts: {
        files: [
            '../dashboard/static-src/sass/third-party/_font-awesome.scss',
            '../dashboard/static-src/sass/third-party/_uikit.scss',
        ],
        tasks: ['newer:string-replace:fonts', 'compass:dashboard', 'clean:fonts', 'copy:fonts']
    }, 
    icons: {
        files: [
            '../dashboard/static-src/sass/partials/_icons.scss'
        ],
        tasks: ['string-replace:icons', 'compass:dashboard', 'clean:fonts', 'copy:fonts']
    }, 
    dashboard_scripts: {
        files: [
            '../dashboard/static-src/js/*.js', 
        ],
        tasks: ['newer:jshint:dashboard', 'newer:browserify:dashboard']
    },
    dashboard_scripts_imports: {
        files: [
            '../dashboard/static-src/js/imports/*.js'
        ],
        tasks: ['jshint:dashboard', 'browserify:dashboard']
    }, 
    dashboard_images: {
        files: [
            '../dashboard/static-src/images/**/*.{png,jpg,jpeg,gif}', 
        ],
        tasks: ['imagemin:dashboard']
    },



    /* editor */
    editor_styles: {
        files: ['../editor/static-src/sass/*.scss'],
        tasks: ['newer:compass:editor']
    }, 
    editor_style_imports: {
        files: [
            '../editor/static-src/sass/modules/**/*.scss',
            '../editor/static-src/sass/partials/**/*.scss',
            '../editor/static-src/sass/third-party/**/*.scss'
        ],
        tasks: ['compass:editor']
    }, 
    editor_scripts: {
        files: [
            '../editor/static-src/js/*.js', 
        ],
        tasks: ['newer:jshint:editor', 'newer:browserify:editor']
    },
    editor_scripts_imports: {
        files: [
            '../editor/static-src/js/imports/*.js'
        ],
        tasks: ['jshint:editor', 'browserify:editor']
    }, 
    // editor_images: {
    //     files: [
    //         '../dashboard/static-src/images/**/*.{png,jpg,jpeg,gif}', 
    //     ],
    //     tasks: ['imagemin:dashboard']
    // } 
}