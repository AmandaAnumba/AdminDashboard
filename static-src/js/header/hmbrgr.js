'use strict';

require('../third-party/jquery.hmbrgr.js');

var hmbrgr = function(logger) {
    var directive = {
        restrict: 'A',
        link: link
    };
    return directive;


    /////////////////////

    
    function link(scope, element, attrs) {
        element.hmbrgr({
            width     : 20,
            height    : 15,
            speed     : 200,
            barHeight : 1,
            barRadius : 3,
            barColor  : '#000000'
        });
    }
};

module.exports = hmbrgr;