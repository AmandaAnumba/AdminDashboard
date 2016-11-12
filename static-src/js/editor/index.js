'use strict';

angular
	.module('adminApp')
	.factory('logger', require('../blocks/logger'))
	.factory('loader', require('../blocks/loader'))
	.factory('Article', require('./article.factory'))
	.factory('Autosave', require('./autosave.factory'))
	.factory('Wysiwyg', require('./wysiwyg.factory'))
	.directive('wysiwyg', require('./wysiwyg'))
	.directive('dropdown', require('./dropdown.directive'))
	.controller('ModalsController', require('./modals.controller'))
	.controller('EditorController', require('./editor.controller'));
