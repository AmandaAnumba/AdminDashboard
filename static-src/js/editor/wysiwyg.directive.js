'use strict';

var wysiwyg = function(logger) {
    var directive = {
        restrict: 'A',
        link: link,
    };
    return directive;

    function link(scope, element, attrs) {
        scope.$on('wysiwygInit', init);
        
        function init() {
            logger.log('wysiwyg.init()');

            /* init froala editor */
            element.editable({
                inlineMode: false, 
                minHeight: 400,
                maxHeight: 500,
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

            /* init rest of editor and inputs */
            $('.ui.checkbox').checkbox();
        }
    }
};

module.exports = wysiwyg;