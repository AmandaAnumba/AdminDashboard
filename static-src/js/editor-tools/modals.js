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

        /* save modal */
        $('#saveModal')
            .modal({
                inverted: true
            })
            .modal('attach events', '[data-target="#saveModal"]', 'show');

        $('#autosaveModal, #deleteModal').modal();

        // $('[data-toggle="modal"]').on('click', function() {
        //     var $this = $(this),
        //         $modal = $( $this.data('target') );

        //     $modal.modal('show');
        // });

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