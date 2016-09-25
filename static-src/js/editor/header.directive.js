'use strict';

var header = function(logger) {
    var directive = {
            restrict: 'E',
            link: link,
        },
        lastScrollPosition = window.pageYOffset;
    return directive;


    function link(scope, element, attrs) {
        logger.log('header init()');

        $(window).bind("scroll", stickyHeader);

        function stickyHeader() {
            var newScrollPosition = window.scrollY;
     
            if (newScrollPosition < lastScrollPosition) {
                element.removeClass('slideOutUp').addClass('slideInDown');
            } else {
                element.removeClass('slideInDown').addClass('slideOutUp');
            }

            lastScrollPosition = newScrollPosition;
        }
    }
};

module.exports = header;