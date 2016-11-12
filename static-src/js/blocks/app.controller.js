'use strict';

var AppController = function(logger, mmenu, sidemenu) {
    var app = this;
    app.openMessenger = openMessenger;
    app.toggleMenu = toggleMenu;
    app.isSidemenuOpen = false;
    app.isMessengerOpen = false;


    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        logger.log('AppController.activate()');
    }

    function openMessenger() {
        logger.log('AppController.openMessenger()');
        app.isSidemenuOpen = false;
        app.isMessengerOpen = true;
        mmenu.open();
    }

    function toggleMenu() {
        app.isMessengerOpen = false;

        if ( $('.hmbrgr').hasClass('expand') ) {
            logger.log('AppController.toggleMenu()  - close menu');
            app.isSidemenuOpen = false;
            sidemenu.close();
        } else {
            logger.log('AppController.toggleMenu()  - open menu');
            app.isSidemenuOpen = true;
            sidemenu.open();
        }
    }
};

module.exports = AppController;

