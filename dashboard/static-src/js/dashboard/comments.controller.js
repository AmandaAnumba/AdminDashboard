'use strict';

var CommentsController = function($scope, dataService, logger, $compile, $templateCache, $timeout) {
    var comments = this;
    comments.list = [];
    comments.count = "";
    comments.approve = remove;
    comments.deny = remove;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        getComments();

        var html = $templateCache.get('comments.html'),
            compiledeHTML = $compile(html)($scope);
        $('#reviewComments').html(compiledeHTML);

        $scope.$broadcast('lazyLoadImages');

        /* simulate comment update */
        $timeout(function(){
            displayComment();
        }, 10000);
    }

    function getComments() {
        var data = dataService.loadComments();
        comments.list = data;
        comments.count = data.length;
    }

    function displayComment() {
        var data = dataService.moreComments();
        comments.list.push(data);
        comments.count ++;
        $scope.$broadcast('lazyLoadImages');
    }

    function remove(id) {
        logger.log(id);
        
        var $comment = $('.comment[data-comment-id="' + id + '"]')
        $comment.hide();
        comments.count --;
    }
};

module.exports = CommentsController;