'use strict';

var ArticleViewController = function(dataService, logger, loader) {
    var vm = this;
    vm.article = {};
    vm.loadPreview = loadPreview;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
    	logger.log('activated!');
    }


    function loadPreview( id ) {
    	logger.log(id);

    	var data = {
    		id: id
    	};

    	return dataService.sendRequest('/dashboard/articles/', data).then(function(response) {
			var article = $.parseJSON(response.article)[0].fields;
			vm.article = article;
			loader.hide();
			$('.article-preview').show();
			$('.placeholder').hide();
			return vm.article;
		}); 
    }
};

module.exports = ArticleViewController;