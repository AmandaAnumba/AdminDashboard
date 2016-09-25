'use strict';

var wysiwyg = function(logger) {
    var directive = {
        restrict: 'A',
        link: link,
    };
    return directive;

    function link(scope, element, attrs) {
        /* init froala editor */
        element.editable({
            inlineMode: true, 
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

        /* init auto expanding textarea */
        $('#description textarea')
            .one('focus', function(){
                var savedValue = this.value;
                this.value = '';
                this.baseScrollHeight = this.scrollHeight;
                this.value = savedValue;
            })
            .on('input', function(){
                var minRows = this.getAttribute('data-min-rows')|0,
                    rows;
                this.rows = minRows;
                rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
                this.rows = minRows + rows;
            });
    }
};

module.exports = wysiwyg;