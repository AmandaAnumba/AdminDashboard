'use strict';

var sidemenu = function(logger, $timeout) {
    var service = {
            init        : init,
            open        : open,
            close       : close
        },
        sm;
    return service;
    

    /////////////////////


    function init() {
        logger.log('sidemenu.init()');
        $timeout(function() {
            sm = $("#menu").data("mmenu");
            // logger.log(sm);
        }, 100);
    }

    function open() {
        logger.log('sidemenu.open()');
        sm.open();
    }

    function close() {
        logger.log('sidemenu.close()');
        sm.close();
    }
};

module.exports = sidemenu;