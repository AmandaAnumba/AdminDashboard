var admin = require('admin');
require('./third-party/bootstrap-tooltip.js');


admin.pages.tools = {
	logClass: 'admin.pages.tools',

	initialize: function() {
        log && console.log(this.logClass + '.initialize()');

		$('.tab#tools').addClass('active');
	    $('#toolsTab a:last').tab('show');

	    $('.tab').click(function() {
            $(this).addClass('active');
            $('.tab').not(this).removeClass('active');
            $('.tab-content').hide();
            var target = $(this).attr('data-toggle');
            $('#'+target).show();
        });
	},


	/*
    ====================================================================================================
    Handlers
    ====================================================================================================
    */

    /*
    ====================================================================================================
    Functions
    ====================================================================================================
    */
};


$(document).ready(function() {
	admin.pages.tools.initialize();
});