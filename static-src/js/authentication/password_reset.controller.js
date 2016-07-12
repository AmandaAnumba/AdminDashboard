'use strict';

var ResetController = function(logger, $location, Authentication) {
    var vmreset = this;
    vmreset.send = send;

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
        Authentication.reset(vmreset.email);
    }
};

module.exports = ResetController;