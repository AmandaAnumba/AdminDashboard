var editor = require('./imports/editor.js');


editor.pages.proof = {
	logClass: 'editor.pages.proof',

	initialize: function() {
        log && console.log(this.logClass + '.initialize()');

        $('.slide_toggle, .btn, .actions-tt').tooltip();
        $('.dropdown-menu').dropdown();

        $('#editor').editable("setHTML", $('#text').text(), true);

        // $('#editor').editable({
        //     inlineMode: true, 
        //     minHeight: 500,
        //     placeholder: 'The article\'s content will be displayed here',
        //     spellcheck: true,
        //     buttons: ["bold", "italic", "underline", "strikeThrough", "fontSize","fontFamily", "color",'sep',"subscript", "superscript", "formatBlock", "blockStyle", "align", "insertOrderedList", "insertUnorderedList", "outdent", "indent", 'sep', "selectAll", "createLink", "undo", "removeFormat", "redo", "html", "insertHorizontalRule", "table"]
        // });

        var release = $('#releaseDate').text(),
            category = $('#article_category').text(),
            tags = $('#article_tags').text().split(','),
            cat = $('#categorylist').text().split(','),
            inCycle = $('#inCycle').text(),
            doctype = $('#article_type').text(),
            coAuth = $('#coAuthorslist').text().split(','),
            docstyle = $('#article_style').text();

        $("input[name=doctype][value=" + doctype + "]").prop('checked', true);
        $("input[name=docstyle][value=" + docstyle + "]").prop('checked', true);
        $("input[name=feature-cycle][value=" + inCycle + "]").prop('checked', true);

        if ((release === 'None') || (release === null) || (release === "")) {
            $('#rDate').empty().append('No date selected');
        }

        if ((release !== 'None') && (release !== null) && (release !== "")) {
            var y = release.split(','),
                date = moment(y).format("dddd, MMMM Do YYYY");
            $('#rDate, #displayDate').empty().append(date);
        }

        if (category) {
            var x = category.split(',');
            $('#article_category').empty();

            for (var m = 0; m < x.length; m++) {
                $('#article_category').append('<p class="pull-left">'+x[m].trim()+'</p>');
            }
        }

        if ((tags.length > 0) && (tags[0] !== "")) {
            for (var i=0; i < tags.length; i++) {
                if (tags[i] !== "") {
                    $('#tags_list').append('<p><span class="icon-circle-cross remove_tag" onclick="$(this).parent().hide();"></span>'+tags[i].trim()+'</p>');
                }
            }
            $('#tags_list').show();
        }
        
        if ((coAuth.length > 0) && (coAuth[0] !== "")) {
            for (var j=0; j < coAuth.length; j++) {
                if ((coAuth[j] !== "") && (coAuth[j] !== 'None')) {
                    $('#more-authors input:checkbox[value=' + coAuth[j] + ']').prop('checked', true);
                }
            }
        }

        if ((cat.length > 0) && (cat[0] !== "")) {
            for (var k=0; k < cat.length; k++) {
                if ((cat[k] !== "") && (cat[k] !== 'None')) {
                    $('#category input:checkbox[value=' + cat[k] + ']').prop('checked', true);
                }
            }
        }

        setTimeout(function() {
            $('#startMSG').show();
        }, 1500);
        setTimeout(function() {
            $('#startMSG').hide();
        }, 5000);
	},


	/*
    ====================================================================================================
    Handlers
    ====================================================================================================
    */

    /*
    ====================================================================================================
    Functions
    ====================================================================================================
    */
};


$(document).ready(function() {
	editor.pages.proof.initialize();
});