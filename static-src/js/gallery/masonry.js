/* globals Masonry, imagesLoaded */
'use strict';

var masonry = function($timeout) {
    var directive = {
        restrict: 'A',
        link: link,
    };
    return directive;


    /////////////////////

    
    function link(scope, element, attrs) {
        /* init Masonry */
        var options = {
                itemSelector: '.grid__item',
                columnWidth: '.grid__item',
                gutter: 10,
                percentPosition: true 
            },
            msnry = new Masonry('#grid', options);

        /* layout Masonry after each image loads */
        imagesLoaded(msnry, function() {
            $timeout( function() {
                msnry.layout();
            }, 500);
        });
    }
};

module.exports = masonry;