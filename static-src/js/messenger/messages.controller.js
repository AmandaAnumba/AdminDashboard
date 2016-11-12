'use strict';

var MessagesController = function($scope, logger, $compile, $templateCache, mmenu, Message) {
    var messenger = this;
    messenger.list = Message.all();
    messenger.count = messenger.list.length;
    messenger.view = view;

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        var html = $templateCache.get('messages.html'),
            compiledeHTML = $compile(html)($scope);
        $('#mainPanel ul').html(compiledeHTML);

        mmenu.init();
    }

    function view(id) {
        logger.log('MessagesController.view( '+ id +' )');
        var msg = Message.get(id);
        mmenu.openPanel('#convo');
    }
};

module.exports = MessagesController;