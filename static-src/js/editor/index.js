'use strict';

angular
	.module('adminApp')
	.factory('logger', require('../blocks/logger'))
	.factory('loader', require('../blocks/loader'))
	.factory('Article', require('./article.factory'))
	.factory('Autosave', require('./autosave.factory'))
	.factory('Editable', require('./wysiwyg.factory'))
	.directive('dropdown', require('./dropdown.directive'))
	.controller('AutosaveController', require('./autosave.controller'))
	.controller('EditorController', require('./editor.controller'));
