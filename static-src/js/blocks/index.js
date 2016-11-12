'use strict';

var angular = require('angular'),
	logger = require('./logger'),
	loader = require('./loader');

angular
	.module('adminApp')
	.factory('logger', logger)
	.factory('loader', loader)
	.directive('slideEffect', require('./slide-effect.directive'))
	.controller('AppController', require('./app.controller'));