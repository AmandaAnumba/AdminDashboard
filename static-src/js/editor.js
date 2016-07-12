'use strict';


var angular = require('angular');
require('angular-animate');
require('angular-toastr');
require('angular-local-storage');
var moment = require('moment');

angular
	.module('adminApp', [ 
		    'ngAnimate', 
		    'toastr',
		    'LocalStorageModule'
		])
	.constant('moment', moment);

require('./core');
require('./blocks');
require('./editor');