'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.factory('mmenu', require('./mmenu'))
    .factory('Message', require('./message'))
	.controller('MessagesController', require('./messages.controller'));