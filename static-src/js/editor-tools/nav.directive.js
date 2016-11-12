'use strict';

var nav = function(logger, $timeout) {
    var directive = {
        restrict: 'E',
        link: link
    };
    return directive;


    /////////////////////

    
    function link(scope, element, attrs) {
        logger.log('nav.init()');

        element.mmenu({
            "navbar": false,
            "offCanvas": {
                "pageSelector": "#content",
                "position": "right",
                "zposition": "front"
            }
        });

        var API = element.data( "mmenu" );
        API.bind("closed", function() {
            logger.log('nav.close()');
            $timeout(function() {
                var $icon = $('#hmbrgr a');
                if ( $icon.hasClass('expand') ) {
                    $icon.trigger('click');
                }
            }, 50);
        });
    }
};

module.exports = nav;