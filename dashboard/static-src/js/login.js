'use strict';

var angular = require('angular');
require('angular-cookies');
require('angular-animate');
require('angular-toastr');


angular
	.module('adminApp', [ 
			'ngCookies',
		    'ngAnimate', 
		    'toastr'
		]);

require('./core/core.module.js');
require('./blocks/blocks.module.js');
require('./authentication/auth.module.js');