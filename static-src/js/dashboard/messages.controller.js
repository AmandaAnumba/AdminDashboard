'use strict';

var MessagesController = function($scope, $timeout, logger, dataService, $compile, $templateCache, mmenu) {
    var messager = this;
    messager.list = [];
    messager.count = 0;
    messager.view = view;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        getMessages();
        
        var html = $templateCache.get('messages.html'),
            compiledeHTML = $compile(html)($scope);
        $('#messager ul').html(compiledeHTML);

        mmenu.init();
    }

    function getMessages() {
        var msgs = dataService.loadMessages();
        messager.list = msgs;
        messager.count = msgs.length;
        logger.log(messager.count);
    }

    function view(id) {
        logger.log(id);
        mmenu.openPanel('#convo');
    }
};

module.exports = MessagesController;