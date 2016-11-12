'use strict';

var Wysiwyg = function(logger) {
    var service = {
            getHTML: getHTML,
            setHTML: setHTML
        };

    return service;


    ////////////////////////


    function init() {

    }

    function getHTML() {
        // interval = $interval(save, 60000);
        // autosaveStarted = true;
    }

    function setHTML() {
        // $interval.cancel(interval);
        // autosaveStarted = false;
    }
};

module.exports = Wysiwyg;