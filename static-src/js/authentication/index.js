'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.service('Authentication', require('./auth.service'))
	.controller('LoginController', require('./login.controller'))
	.controller('ResetController', require('./password_reset.controller'));