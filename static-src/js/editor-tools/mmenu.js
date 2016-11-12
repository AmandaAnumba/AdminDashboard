'use strict';

var menu = function(logger, $timeout) {
    var service = {
            init        : init,
            open        : open,
            close       : close
        },
        sm;
    return service;
    

    /////////////////////


    function init() {
        logger.log('menu.init()');
        $timeout(function() {
            sm = $("#menu").data("mmenu");
        }, 100);
    }

    function open() {
        logger.log('menu.open()');
        sm.open();
    }

    function close() {
        logger.log('menu.close()');
        sm.close();
    }
};

module.exports = menu;