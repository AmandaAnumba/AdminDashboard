'use strict';

var angular = require('angular');
require('angular-animate');
require('angular-toastr');


angular
	.module('adminApp', [ 
			'ngAnimate', 
			'toastr'
		]);

require('./core');
require('./blocks');
require('./authentication');