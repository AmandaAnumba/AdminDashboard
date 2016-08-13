'use strict';


var angular = require('angular');
require('angular-animate');
require('angular-toastr');
require('angular-local-storage');
require('./third-party/uikit-datepicker');

angular
	.module('adminApp', [ 
		    'ngAnimate', 
		    'toastr',
		    'LocalStorageModule'
		]);

require('./core');
require('./editor/index');