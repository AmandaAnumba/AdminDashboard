'use strict';

var EditorController = function($scope, logger, menu, moment, Article, Autosave, Editable, $window, $timeout) {
    var vm = this;
    
    vm.article = {
        article_style: "informational",
        article_type: "regular",
        author: "",
        category: "",
        co_author: "",
        content: "",
        cycle: "",
        cycle_article: "",
        description: "",
        display_date: moment().format("MM/DD/YYYY"),
        feature_image: "",
        header_image: "",
        photo_credit: "",
        published_date: "",
        search_terms: "",
        slug: "",
        status: "",
        tags: "",
        title: ""
    };     // default article data
    vm.goBack = goBack;
    vm.articlePublish = articlePublish;
    vm.articleSave = articleSave;
    vm.articleDelete = articleDelete;
    vm.toggleMenu = toggleMenu;
    vm.setLayout = setLayout;
    vm.getCategories = getCategories;

    activate();

    $scope.$on('setHTML', function() {
        Editable.setHTML(vm.article.content);
    });

    $scope.$on('loadArticle', loadArticle);

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        logger.log('EditorController activated');
        menu.init();

        /* loop through all of the data and update the view */
        $('[data-ng-model*=vm]').each(function() {
            var $this = $(this),
                name = $this.attr('name'),
                val = $this.attr('value');
            vm.article[name] = val;
        });

        Article.data = vm.article;

        /* load the drafts */
        vm.drafts = Autosave.drafts;

        if ( vm.drafts.length > 0 ) {
            $timeout(function() {
                $scope.$broadcast('openAutosave');
            }, 1000);
        } else {
            $scope.$broadcast('startAutosave');
        }

        /* general bindings */
        $(window).on('unload', function() {
            $scope.$broadcast('stopAutosave');
        });
    }

    function toggleMenu() {
        if ( $('.hmbrgr').hasClass('expand') ) {
            logger.log('EditorController.toggleMenu()  - close menu');
            menu.close();
        } else {
            logger.log('EditorController.toggleMenu()  - open menu');
            menu.open();
        }
    }

    function loadArticle() {
        logger.log('EditorController.loadArticle()');
        vm.article = Article.data;
    }

    function goBack() {
        $window.history.back();
    }

    function articlePublish() {
        logger.log('EditorController.articlePublish()');
        Article.publish(vm.article);
    }

    function articleSave() {
        logger.log('EditorController.articleSave()');
        Article.save(vm.article);
    }

    function articleDelete() {
        logger.log('EditorController.articleDelete()');
        Article.delete(vm.article);
    }

    function setLayout( layout ) {
        logger.log('EditorController.setLayout()');
        vm.article.article_type = layout;
    }

    function getCategories() {
        logger.log('EditorController.getCategories()');
        var cat = $('#categories').dropdown('get value');
        vm.article.category = cat;
    }

    function getTags() {
        logger.log('EditorController.getTags()');
        var tags = $('#tags').tagEditor('getTags')[0].tags;
        vm.article.tags = tags.join();
    }
};

module.exports = EditorController;