var editor = require('./imports/editor.js');


editor.pages.write = {
	logClass: 'editor.pages.write',

	initialize: function() {
        log && console.log(this.logClass + '.initialize()');

        $('.slide_toggle, .slide_toggle-left, #author, .video, .btn').tooltip();
        $('#editor').editable("setHTML", $('#text').text(), true);

        var tags = $('#article_tags').text().split(','),
            coAuth = $('#coAuthorslist').text().split(','),
            cat = $('#categorylist').text().split(','),
            doctype = $('#article_type').text(),
            inCycle = $('#inCycle').text(),
            release = $('#releaseDate').text().trim(),
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
            $('#rDate').empty().append(date);
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
            $('#more-authors').show();
        }

        if ((cat.length > 0) && (cat[0] !== "")) {
            for (var k=0; k < cat.length; k++) {
                if ((cat[k] !== "") && (cat[k] !== 'None')) {
                    $('#category input:checkbox[value="' + cat[k] + '"]').prop('checked', true);
                }
            }
        }
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
	editor.pages.write.initialize();
});