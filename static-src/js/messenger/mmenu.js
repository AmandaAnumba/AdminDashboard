'use strict';

var mmenu = function(logger, $timeout) {
    var service = {
            init        : init,
            open        : open,
            close       : close,
            openPanel   : openPanel,
            closePanel  : closePanel
        },
        menu;

    return service;
    

    /////////////////////


    function init() {
        $timeout(function() {
            menu = $("#messenger").data("mmenu");
        }, 100);
    }

    function open() {
        menu.open();
    }

    function close() {
        menu.close();
    }

    function openPanel(panel) {
        menu.openPanel($(panel));
    }

    function closePanel(panel) {
        menu.closePanel($(panel));
    }
};

module.exports = mmenu;