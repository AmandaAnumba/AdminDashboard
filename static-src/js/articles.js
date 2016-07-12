'use strict';

var angular = require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-toastr');
require('angular-local-storage');
var moment = require('moment');

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
	})
	.constant('moment', moment);

require('./core');
require('./blocks');
require('./articles/index');