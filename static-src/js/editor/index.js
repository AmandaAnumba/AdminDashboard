'use strict';

angular
	.module('adminApp')
	.factory('logger', require('../blocks/logger'))
	.factory('loader', require('../blocks/loader'))
	.factory('articleService', require('./article.factory'))
	.factory('autosaveService', require('./autosave.factory'))
	.directive('wysiwyg', require('./wysiwyg.directive'))
	.directive('dropdown', require('./dropdown.directive'))
	.directive('header', require('./header.directive'))
	.controller('ModalsController', require('./modals.controller'))
	.controller('EditorController', require('./editor.controller'));
