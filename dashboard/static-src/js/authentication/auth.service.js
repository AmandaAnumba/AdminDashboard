'use strict';

var authService = function($http, logger, loader, $window, $cookies) {
	var service = {
		getAuthenticatedAccount: getAuthenticatedAccount,
		isAuthenticated: isAuthenticated,
		login: login,
		reset: reset,
		register: register,
		unauthenticate: unauthenticate
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
	function login(username, password) {
		loader.show();
		
		return $http.post('/login/', {
			username: username, 
			password: password
		}).then(loginSuccessFn, loginErrorFn);


		/**
		 * @name loginSuccessFn
		 * @desc Process http response
		 */
		function loginSuccessFn(data, status, headers, config) {
			loader.hide();

			var response = data.data;

			if (response.error) {
				logger.error(response.error, 'Error');
            } else {
                $window.location.href = '/dashboard/';
            }
		}


		/**
		 * @name loginErrorFn
		 * @desc Log error to the console and user
		 */
		function loginErrorFn(data, status, headers, config) {
			loader.hide();
			logger.error('An error occured while processing your request. Please refresh the page and try again.', 'Error');
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



	/**
	 * @name getAuthenticatedAccount
	 * @desc Return the currently authenticated account
	 * @returns {object|undefined} Account if authenticated, else `undefined`
	 */
	function getAuthenticatedAccount() {
	  	if (!$cookies.authenticatedAccount) {
			return;
	  	}

	  	return JSON.parse($cookies.authenticatedAccount);
	}



	/**
	 * @name isAuthenticated
	 * @desc Check if the current user is authenticated
	 * @returns {boolean} True is user is authenticated, else false.
	 */
	function isAuthenticated() {
		return !!$cookies.authenticatedAccount;
	}



	/**
	 * @name unauthenticate
	 * @desc Delete the cookie where the user object is stored
	 * @returns {undefined}
	 */
	function unauthenticate() {
		delete $cookies.authenticatedAccount;
	}
};


module.exports = authService;