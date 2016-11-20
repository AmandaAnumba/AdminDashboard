'use strict';

var ArticleViewController = function(dataService, logger, loader, $timeout) {
    var vm = this;
    vm.preview = {};
    vm.articles = [];
    vm.loadPreview = loadPreview;
    vm.loadMore = loadMore;
    vm.pageCount = 1;
    vm.maxPages = 3;
    vm.showPreview = false;

    var loadURL = "/api/load-articles/",
        getURL = "/api/get-article/",
        delay = 800;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        logger.log('ArticleViewController activated!');
    }

    function loadMore() {
        logger.log('ArticleViewController.loadMore()');
        
        var params = { page: vm.pageCount };

        dataService
            .sendRequest(loadURL, params)
            .then(function(response) {
                var articles = JSON.parse(response.articles);
                vm.articles = vm.articles.concat(articles);
                vm.pageCount ++;
            });

        $timeout(function() {
            loader.hide();
        }, delay);
    }

    function loadPreview( id, slug, status ) {
        logger.log('ArticleViewController.loadPreview()');
        
        var data = { id: id },
            $preview = $('#preview');

        if ( $preview.is(':visible') ) {
            dataService
                .sendRequest(getURL, data)
                .then(function(response) {
                    response = JSON.parse(response.article)[0];
                    vm.preview = response.fields;
                    vm.preview.id = response.pk;
                    vm.showPreview = true;
                });

            $timeout(function() {
                loader.hide();
            }, delay);
        } else {
            if (status === 'published') {
                window.open('https://chicreptawr-blog.herokuapp.com/cycle/' + slug + '/');
            } else {
                window.location.href = '/editor/id=' + id;
            }
        }
    }
};

module.exports = ArticleViewController;