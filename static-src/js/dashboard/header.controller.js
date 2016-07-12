'use strict';

var HeaderController = function($timeout, logger, moment, localStorageService, mmenu) {
    var header = this;
    header.openMessenger = openMessenger;
    header.mail = [];
    header.count = 0;

    var messageDisplayed = localStorageService.get('messageDisplayed');

    logger.log(messageDisplayed);

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        if ( !messageDisplayed ) {
            pollMessages();
            
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
        getExampleMessage();
    }

    function displayMessage() {
        header.count = header.mail.length || 1;

        var $badge = $('.mini-nav li:nth-child(2) .uk-badge');
        if ( $badge.hasClass('uk-hidden') ) {
            $badge.removeClass('uk-hidden');
        }
    }

    function getExampleMessage() {
        var msg = {
            from: 'rebecca',
            sent: moment().fromNow(),
            content: "I need helping editing this article...something with the wording in the 2nd paragraph. Help me take a look? I've highlighted the section I need you to look at.",
            article: "<a href='#'>Through the Wire</a>."
        };

        header.mail.push(msg);
        return header.mail;
    }

    function openMessenger() {
        mmenu.open();
    }
};

module.exports = HeaderController;

