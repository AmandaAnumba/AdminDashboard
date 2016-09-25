'use strict';

var mmenu = function() {
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
        menu = $("#messager").data( "mmenu" );
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