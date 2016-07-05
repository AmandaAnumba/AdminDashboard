'use strict';

var angular = require('angular'),
	logger = require('./logger'),
	loader = require('./loader'),
	mmenu = require('./mmenu');

angular
	.module('adminApp')
	.factory('logger', logger)
	.factory('loader', loader)
	.factory('mmenu', mmenu)
	.directive('slideEffect', require('./slide-effect.directive'));