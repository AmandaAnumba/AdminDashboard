'use strict';

var wysiwyg = function(logger, $rootScope) {
    var directive = {
        restrict: 'A',
        link: link,
    };
    return directive;

    function link(scope, element, attrs) {
        logger.log('wysiwyg.init()');

        $('#editor').editable({
            inlineMode: true, 
            minHeight: 400,
            // maxHeight: 500,
            placeholder: 'Start typing here...',
            spellcheck: true,
            toolbarButtons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "fontSize",
                "fontFamily",
                "color",
                "sep",
                "subscript",
                "superscript",
                "formatBlock",
                "blockStyle",
                "align",
                "insertOrderedList",
                "insertUnorderedList",
                "outdent",
                "indent",
                "sep",
                "selectAll",
                "createLink",
                "undo",
                "removeFormat",
                "redo",
                "html",
                "insertHorizontalRule",
                "table"
            ]
        });

        $rootScope.$broadcast('setHTML');
    }
};

module.exports = wysiwyg;