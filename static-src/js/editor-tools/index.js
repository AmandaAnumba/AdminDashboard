'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.factory('menu', require('./mmenu'))
	.directive('draft', require('./drafts'))
	.directive('wysiwyg', require('./wysiwyg'))
	.directive('hmbrgr', require('./hmbrgr'))
	.directive('modal', require('./modals'))
	.directive('nav', require('./nav.directive'));