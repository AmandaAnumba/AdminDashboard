'use strict';

var authService = function(dataService, $http, logger, loader, $window) {
	var service = {
		login: login,
		reset: reset,
		register: register,
	};

	return service;

	/////////////////////

	
	/**
	 * @name login
	 * @desc Try to log in with username and password 
	 * @param {string} username The username entered by the user
	 * @param {string} password The password entered by the user
	 * @returns {Promise}
	 */
	function login(data) {
		loader.show();
		
		return dataService.sendRequest('/login/', data).then(function(response) {
			return loginSuccessFn(response);
		});
		

		/**
		 * @name loginSuccessFn
		 * @desc Process http response
		 */
		function loginSuccessFn(response) {
			logger.log('request response: ', response);
			
			if (response.error) {
				loader.hide();
				logger.error(response.error, 'Error');
			} else {
				$window.location.href = '/dashboard/';
			}
		}
	}



	/**
	 * @name reset
	 * @desc Try to reset a users login
	 * @param {string} email The email entered by the user
	 * @returns {Promise}
	 */
	function reset(email) {
		loader.show();
		
		return $http.post('/reset/', {
				email: email
			}).then(resetSuccessFn, resetErrorFn);

		/**
		* @name resetSuccessFn
		* @desc Log the new user in
		*/
		function resetSuccessFn(data, status, headers, config) {
			loader.hide();

			var response = data.data;

			if (response.error) {
				logger.error(response.error, 'Error');
			} else {
				logger.success(response.success);
			}
		}

		/**
		* @name resetErrorFn
		* @desc Log "Epic failure!" to the console
		*/
		function resetErrorFn(data, status, headers, config) {
			loader.hide();
			
			logger.error('reset failure!');
		}
	}




	/**
	 * @name register
	 * @desc Try to register a new user
	 * @param {string} email The email entered by the user
	 * @param {string} password The password entered by the user
	 * @param {string} username The username entered by the user
	 * @returns {Promise}
	 */
	function register(email, password, username) {
		return $http.post('/register/', {
				username: username,
				password: password,
				email: email
			}).then(registerSuccessFn, registerErrorFn);

		/**
		* @name registerSuccessFn
		* @desc Log the new user in
		*/
		function registerSuccessFn(data, status, headers, config) {
			Authentication.login(email, password);
		}

		/**
		* @name registerErrorFn
		* @desc Log "Epic failure!" to the console
		*/
		function registerErrorFn(data, status, headers, config) {
			console.error('Epic failure!');
		}
	}
};


module.exports = authService;