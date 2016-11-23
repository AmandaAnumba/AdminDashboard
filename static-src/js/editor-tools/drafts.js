'use strict';

var draft = function(logger) {
    var directive = {
        restrict: 'E',
        link: link
    };
    return directive;


    /////////////////////

    
    function link(scope, element, attrs) {
        logger.log('draft.link()');

        scope.$on('deleteDraft', deleteDraft);
        
        function deleteDraft(event, args) {
            var $draft = $('draft[data-draft-id="' + args.key + '"]');
            $draft.remove();
        }
    }
};

module.exports = draft;