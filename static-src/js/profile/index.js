'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.service('updateService', require('./update.service'))
	.controller('ProfileController', require('./profile.controller'));
