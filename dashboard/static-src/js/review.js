var admin = require('admin');
var moment = require('moment');


admin.pages.articles = {
	logClass: 'admin.pages.articles',

	initialize: function() {
        log && console.log(this.logClass + '.initialize()');

		$('#menu #review').addClass('active');
        
        /* formatt all dates with momentjs */
        $('.article-date').each(function() {
            var text = $(this).text();

            if (text !== "") {
                var date = moment(text.split(',')).fromNow(); 
                $(this).empty().append('Last updated '+date);
            }
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
	admin.pages.articles.initialize();
});