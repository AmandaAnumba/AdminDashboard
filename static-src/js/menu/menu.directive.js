'use strict';

var nav = function(logger) {
    var directive = {
        restrict: 'E',
        link: link
    };
    return directive;


    /////////////////////

    
    function link(scope, element, attrs) {
        logger.log('nav.init()');

        var id = attrs.id;

        if (id === "messenger") {
            element.mmenu({
                "navbar": {
                    "title": "Messages"
                },
                "navbars": [
                    {
                       "content": [ "prev", "title", "next" ],
                       "position": "top"
                    }
                ],
                "offCanvas": {
                    "pageSelector": "#content",
                    "position": "right",
                    "zposition": "front"
                }
            });
        } else {
            element.mmenu({
                "navbar": false,
                "offCanvas": {
                    "pageSelector": "#content",
                    "position": "left",
                }
            });

            var API = element.data( "mmenu" );
            API.bind("closed", function() {
                logger.log('nav.close()');
                setTimeout(function() {
                    var $icon = $('#hmbrgr a');
                    if ( $icon.hasClass('expand') ) {
                        $icon.trigger('click');
                    }
                }, 50);
            });
        }
    }
};

module.exports = nav;