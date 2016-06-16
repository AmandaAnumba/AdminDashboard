'use strict';

var ResetController = function(logger, $location, Authentication) {
    var reset = this;
    reset.send = send;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        logger.log('ResetController activated');
    }


    /**
    * @name send
    * @desc Send the request to reset user's password
    */
    function send() {
        Authentication.reset(reset.email);
    }
};

module.exports = ResetController;