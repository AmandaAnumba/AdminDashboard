'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.directive('nav', require('./menu.directive'))
	.factory('sidemenu', require('./mmenu'))
	.controller('MenuController', require('./menu.controller'));