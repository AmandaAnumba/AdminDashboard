'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.factory('menu', require('./mmenu'))
	.directive('wysiwyg', require('./wysiwyg'))
	.directive('hmbrgr', require('./hmbrgr'))
	.directive('modal', require('./modals'))
	.directive('nav', require('./nav.directive'));