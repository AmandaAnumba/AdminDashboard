'use strict';

var loader = function($document, logger) {
    var service = {
            show: show,
            hide: hide
        },
        loader = $document[0].getElementsByClassName('page-loader')[0];
    
    return service;

    /////////////////////

    
    function show() {
        loader.style.display = "block";
    }

    function hide() {
        loader.style.display = "none";
    }
};

module.exports = loader;