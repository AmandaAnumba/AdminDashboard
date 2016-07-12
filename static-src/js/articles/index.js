'use strict';

var angular = require('angular');

angular
	.module('adminApp')
	.factory('dataService', require('../core/data.service'))
	.controller('HeaderController', require('../dashboard/header.controller'))
	.controller('ArticleViewController', require('./article_view.controller'));