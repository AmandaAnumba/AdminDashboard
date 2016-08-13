'use strict';

var articleService = function( dataService, $timeout, $window, logger ) {
    var service = {
            delete: deleteArticle,
            markProofed: markProofed,
        };

    return service;


    ////////////////////////


    function deleteArticle( id ) {
        var params = {
            id: id
        };

        dataService.sendRequest('/delete/', params)
            .then(function(data) {
                $('#deleteModal').modal('hide');
                
                if ( data.success ) {
                    logger.success(data.success, 'Article Deleted.');

                    $timeout(function(){
                        $window.location = "/dashboard/";
                    }, 2700);
                }

                if ( data.error ) {
                    logger.error(data.error, 'Error Occurred');
                }
            });
    }

    function markProofed() {
        logger.log('markProofed');
    }
};

module.exports = articleService;