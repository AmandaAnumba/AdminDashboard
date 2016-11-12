'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.directive('masonry', require('./masonry'));