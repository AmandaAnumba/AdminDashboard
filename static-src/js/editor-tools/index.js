'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.factory('menu', require('./mmenu'))
	.directive('hmbrgr', require('./hmbrgr'))
	.directive('nav', require('./nav.directive'));