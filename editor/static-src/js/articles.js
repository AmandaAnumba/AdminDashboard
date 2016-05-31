var admin = require('admin');
var moment = require('moment');
require('./third-party/jquery-ui.slide-effect.min.js');


admin.pages.articles = {
	logClass: 'admin.pages.articles',

	initialize: function() {
        log && console.log(this.logClass + '.initialize()');

		$('#all').addClass('active');
        $('.releasedate').each(function() {
            var text = $(this).text(),
                date = moment(text.split(',')).fromNow();
            $(this).empty().append(date);
        }).css('visibility', 'visible');

        /* general bindings */
        $('#articles li').on('click', $.proxy( this.handleSectionChange, this));
	},


	/*
    ====================================================================================================
    Handlers
    ====================================================================================================
    */
    handleSectionChange: function( event ) {
        log && console.log(this.logClass + '.handleSectionChange()');

        event.stopPropagation();
        event.preventDefault();

        var $li = $( event.currentTarget ),
            pos = $li.data('position'),
            $active = $('#articles li.active'),
            activePos = $active.data('position');
        
        if ( !$li.hasClass('active') ) {
            var $section = $( $li.data('toggle') ),
                direction, opposite;

            if ( activePos < pos ) {
                direction = "left";
                opposite = "right";
            } else {
                direction = "right";
                opposite = "left";
            }


            /* deactivate currently open section */
            $active.removeClass('active');
            $('#articles .section.active').hide("slide", { direction: direction }, 500 ).removeClass('active');

            /* activate clicked section */
            $li.addClass('active');
            $section.show("slide", { direction: opposite }, 500 ).addClass('active');
        }
    },


    /*
    ====================================================================================================
    Functions
    ====================================================================================================
    */
};


$(document).ready(function() {
	admin.pages.articles.initialize();
});