'use strict';

var MenuController = function(logger, sidemenu, dataService) {
    var menu = this;
    menu.messages = [];

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        logger.log('MenuController.activate()');
        
        sidemenu.init();
        getSampleMessage();
    }

    function getSampleMessage() {
        logger.log('MenuController.getSampleMessage()');

        var msg = dataService.moreMessages();
        menu.messages.push(msg);
    }
};

module.exports = MenuController;