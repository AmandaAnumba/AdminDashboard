'use strict';

var HeaderController = function($timeout, logger, localStorageService, mmenu, sidemenu, dataService) {
    var header = this;
    header.mail = [];
    header.mailCount = "";

    var messageDisplayed = localStorageService.get('messageDisplayed');

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        getSampleMessage();
        
        if ( !messageDisplayed ) {
            $timeout(function(){
                logger.info('You just received a new message.');
                toggleBadge();
                localStorageService.set('messageDisplayed', true);
            }, 10000);
        } else {
            toggleBadge();
        }
    }

    function toggleBadge() {
        logger.log('HeaderController.toggleBadge()');

        var $badge = $('.mini-nav li:nth-child(2) .uk-badge');
        if ( header.mailCount > 0 ) {
            $badge.removeClass('uk-hidden');
        }
    }

    function getSampleMessage() {
        logger.log('HeaderController.getSampleMessage()');

        var msg = dataService.moreMessages();
        header.mail.push(msg);
        header.mailCount = header.mail.length;
    }
};

module.exports = HeaderController;

