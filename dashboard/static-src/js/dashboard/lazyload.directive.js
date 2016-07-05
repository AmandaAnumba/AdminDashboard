'use strict';
require('jquery-lazyload');

var lazyload = function($timeout, logger) {
	var directive = {
		restrict: 'EA',
		link: link,
	};
	return directive;

	function link(scope, element, attrs) {
		scope.$on('lazyLoadImages', load);
		
		function load() {
			logger.log('lazyload.lazyload()');

			$timeout(function(){
				$("img.lazy:not([src])").lazyload({
					effect : "fadeIn"
				});
			}, 100);
		}
	}
};

module.exports = lazyload;