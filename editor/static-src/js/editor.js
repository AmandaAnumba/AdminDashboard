'use strict';


var angular = require('angular');
require('angular-cookies');
require('angular-animate');
require('angular-toastr');
require('angular-local-storage');
var moment = require('moment');

angular
	.module('adminApp', [ 
			'ngCookies',
		    'ngAnimate', 
		    'toastr',
		    'LocalStorageModule'
		])
	.constant('moment', moment);

require('./core/core.module.js');
require('./blocks/blocks.module.js');
require('./editor/editor.module.js');