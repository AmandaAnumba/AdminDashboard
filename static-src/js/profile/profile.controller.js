'use strict';

var ProfileController = function(logger, updateService) {
    var vm = this;
    vm.updateProfile = updateProfile;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    */
    function activate() {
        logger.log('ProfileController activated');
        
        /* loop through all of the data and update the view */
        $('[ng-model*=vm]').each(function() {
            var $this = $(this),
                name = $this.attr('name'),
                val = $this.attr('value');
            vm[name] = val;
        });
    }


    /**
    * @name updateProfile
    * @desc Update the user's profile
    */
    function updateProfile() {
        var data = vm;
        delete data.updateProfile;

        logger.log(data);
        updateService.update(data);
    }
};

module.exports = ProfileController;