'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.factory('dataService', require('../core/data.service'))
	.factory('articleService', require('./article.factory'))
	.factory('autosaveService', require('./autosave.factory'))
	.controller('ModalsController', require('./modals.controller'))
	.controller('EditorController', require('./editor.controller'));