'use strict';

var DashboardController = function(logger) {
    var dash = this;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        $('.counter').counterUp();
    }
};

module.exports = DashboardController;