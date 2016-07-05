'use strict';

var sendRequestService = function($http, logger, loader) {
    var service = {
        sendRequest: sendRequest
    };

    return service;


    ////////////////////////


    function sendRequest(url, data) {
        /* show the loading animation */
        loader.show();

        /* send ajax request */
        return $http.post(url, data)
            .then(requestComplete)
            .catch(function(message) {
                loader.hide();
                logger.error('An error occured while processing your request. Please refresh the page and try again.', 'Error');
            });

        function requestComplete(response) {
            logger.log(response);
            return response.data[0].data.results;
        }
    }
};

module.exports = sendRequestService;