'use strict';

var LoginController = function(logger, $location, Authentication) {
    var vm = this;
    vm.login = login;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        logger.log('LoginController activated');
    }


    /**
    * @name login
    * @desc Log the user in
    */
    function login() {
        Authentication.login(vm.username, vm.password);
    }
};

module.exports = LoginController;