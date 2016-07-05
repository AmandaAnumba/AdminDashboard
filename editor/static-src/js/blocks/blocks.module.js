'use strict';

var angular = require('angular'),
	logger = require('./logger'),
	loader = require('./loader');

angular
	.module('adminApp')
	.factory('logger', logger)
	.factory('loader', loader)
	.directive('adminSlideEffect', require('./slide-effect.directive'));