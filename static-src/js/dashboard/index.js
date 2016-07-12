'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.factory('dataService', require('../core/data.service'))
	.directive('lazyload', require('./lazyload.directive'))
	.controller('CommentsController', require('./comments.controller'))
	.controller('DashboardController', require('./dashboard.controller'))
	.controller('HeaderController', require('./header.controller'));