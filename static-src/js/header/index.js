'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.directive('hmbrgr', require('./hmbrgr'))
	.controller('HeaderController', require('./header.controller'));