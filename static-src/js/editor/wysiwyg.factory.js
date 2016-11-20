'use strict';

var Editable = function(logger) {
    var service = {
            getHTML: getHTML,
            setHTML: setHTML
        },
        $editable = $('#editor');

    return service;


    ////////////////////////


    function getHTML() {
        logger.log('Editable.getHTML()');
        return $editable.editable('getHTML', false, true);
    }

    function setHTML(content) {
        logger.log('Editable.setHTML()');
        $editable.editable("setHTML", content, true);
    }
};

module.exports = Editable;