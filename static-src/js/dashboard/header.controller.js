'use strict';

var HeaderController = function($timeout, logger, localStorageService, mmenu, dataService) {
    var header = this;
    header.openMessenger = openMessenger;
    header.mail = [];
    header.count = 2;

    var messageDisplayed = localStorageService.get('messageDisplayed');

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        pollMessages();
        
        if ( !messageDisplayed ) {
            $timeout(function(){
                logger.info('You just received a new message.');
                displayMessage();
                localStorageService.set('messageDisplayed', true);
            }, 10000);
        } else {
            displayMessage();
        }
        mmenu.init();
    }

    function pollMessages() {
        logger.log('HeaderController.pollMessages()');
        getMessages();
        // header.count = header.mail.length;
    }

    function displayMessage() {
        logger.log('HeaderController.displayMessage()');

        var $badge = $('.mini-nav li:nth-child(2) .uk-badge');
        if ( header.count > 0 ) {
            logger.log('reveal the badge');
            logger.log(header.count);
            $badge.removeClass('uk-hidden');
        }
    }

    function getMessages() {
        logger.log('HeaderController.getMessages()');

        var msg = dataService.moreMessages();
        header.mail.push(msg);
        header.count = header.mail.length;
    }

    function openMessenger() {
        mmenu.open();
    }
};

module.exports = HeaderController;

