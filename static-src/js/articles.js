'use strict';

var angular = require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-toastr');
require('angular-local-storage');

angular
	.module('adminApp', [ 
		'ngAnimate', 
		'ngSanitize',
		'toastr',
		'LocalStorageModule',
	])
	.config(function(localStorageServiceProvider) {
		localStorageServiceProvider
			.setStorageType('sessionStorage');
	});

require('./core');
require('./blocks');
require('./header');
require('./menu');
require('./messenger');
require('./articles/index');