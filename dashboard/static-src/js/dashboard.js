var admin = require('admin');
var moment = require('moment');
require('./third-party/jquery-ui.slide-effect.min.js');


admin.pages.dashboard = {
	logClass: 'admin.pages.dashboard',

	initialize: function() {
        log && console.log(this.logClass + '.initialize()');

        this.initMoment();

		/* general bindings */
		$('#articles li').on('click', $.proxy( this.handleSectionChange, this));
	},

	initMoment: function() {
		$('.releasedate').each(function() {
			var text = $(this).text();

			if (text === "") {
				$(this).empty().append('No date found');
			}

			else {
				var date = moment(text.split(',')).fromNow(); 
				// console.log(text.split(','));
				$(this).empty().append('Release Date: '+date);
			}
		});

		$('.update-date').each(function() {
			var text = $(this).text();

			if (text !== "") {
				var date = moment(text).format("MMM Do, YYYY");
				$(this).text('Last Updated ' + date);
			}
		});

		$('.release-date').each(function() {
			var text = $(this).text();

			if (text !== "") {
				var date = moment(text).format("MMM Do, YYYY");
				$(this).text('Published on ' + date);
			}
		});
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
	admin.pages.dashboard.initialize();
});