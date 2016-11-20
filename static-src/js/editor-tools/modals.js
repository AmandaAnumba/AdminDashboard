'use strict';

var modal = function(logger, Autosave) {
    var directive = {
        restrict: 'C',
        link: link
    };
    return directive;


    /////////////////////

    
    function link(scope, element, attrs) {
        logger.log('modal.link()');

        $('.ui.modal').modal();

        scope.$on('openAutosave', openAutosave);
        scope.$on('closeAutosave', closeAutosave);

        function openAutosave() {
            Autosave.$modal.modal('show');
        }

        function closeAutosave() {
            Autosave.$modal.modal('hide');
        }
    }
};

module.exports = modal;