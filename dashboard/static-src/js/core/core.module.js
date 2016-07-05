'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.config(configure)
	.run(function($cookies, $http) {
		$http.defaults.headers.common['X-CSRFToken'] = $cookies.get('csrftoken');
	})
	.config(function(toastrConfig) {
		angular.extend(toastrConfig, {
			progressBar: true,
			timeOut: 7000,
		});
	})
	.factory('dataService', require('./data.service'));


configure.$inject = ['$httpProvider'];
function configure($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}