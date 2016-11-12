'use strict';

var angular = require('angular');
require('angular-animate');
require('angular-toastr');
require('angular-local-storage');
require('waypoints');
require('jquery.counterup');
var moment = require('moment');

angular
    .module('adminApp', [ 
        'ngAnimate', 
        'toastr',
        'LocalStorageModule'
    ])
    .config(function(toastrConfig) {
		angular.extend(toastrConfig, {
			progressBar: true,
			timeOut: 7000,
		});
	})
	.config(function(localStorageServiceProvider) {
		localStorageServiceProvider
			.setStorageType('sessionStorage');
	})
	.constant('moment', moment);

require('./blocks');
require('./header');
require('./menu');
require('./messenger');
require('./dash');