'use strict';

var updateService = function($http, logger, loader, $window, $timeout) {
	var service = {
		update: update,
	};

	return service;

	/////////////////////

	
	/**
	 * @name update
	 * @desc Try to user profile based on the changes they enter
	 * @param {object} data The object containing all of the fields of the Member model
	 * @returns {Promise}
	 */
	function update(data) {
		loader.show();
		
		return $http.post('/profile/', data).then(updateSuccessFn, updateErrorFn);


		/**
		 * @name updateSuccessFn
		 * @desc Process http response
		 */
		function updateSuccessFn(data, status, headers, config) {
			loader.hide();

			var response = data.data;

			if (response.error) {
				logger.error(response.error, 'Error');
            } else {
				logger.info(response.success);
				$timeout(function() {
                	$window.location.href = '/dashboard/';
				}, 3000);
            }
		}


		/**
		 * @name updateErrorFn
		 * @desc Log error to the console and user
		 */
		function updateErrorFn(data, status, headers, config) {
			loader.hide();
			logger.error('An error occured while processing your request. Please refresh the page and try again.', 'Error');
		}
	}
};


module.exports = updateService;