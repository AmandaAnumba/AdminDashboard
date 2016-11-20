'use strict';

var Article = function( dataService, $timeout, $window, logger ) {
    var service = {
            delete: deleteArticle,
            publish: publish,
            save: save,
            data: {}
        };

    return service;


    ////////////////////////


    function deleteArticle( id ) {
        var params = {
            id: id
        };



        // dataService.sendRequest('/delete/', params)
        //     .then(function(data) {
        //         $('#deleteModal').modal('hide');
                
        //         if ( data.success ) {
        //             logger.success(data.success, 'Article Deleted.');

        //             $timeout(function(){
        //                 $window.location = "/dashboard/";
        //             }, 2700);
        //         }

        //         if ( data.error ) {
        //             logger.error(data.error, 'Error Occurred');
        //         }
        //     });
    }

    function publish(article) {
        logger.log(article);
    }

    function save(article) {
        logger.log(article);
    }
};

module.exports = Article;