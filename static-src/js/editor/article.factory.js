'use strict';

var articleService = function( dataService, $timeout, $window, logger ) {
    var service = {
            delete: deleteArticle,
            markProofed: markProofed,
        };

    return service;


    ////////////////////////


    function deleteArticle( id ) {
        var params = {
            id: id
        };

        dataService.sendRequest('/delete/', params)
            .then(function(data) {
                $('#deleteModal').modal('hide')
                if ( message.success ) {
                    logger.success(message.success, 'Article Deleted.')

                    $timeout(function(){
                        $window.location = "/dashboard/";
                    }, 2700);
                }

                if ( message.error ) {
                    logger.error(message.error, 'Error Occurred')
                }
            });
    }

    function markProofed() {
        var id              = $('#id').text(),
            title           = $('#fTitle').text(),
            author          = $('#fAuthor').text(),
            coAuthor        = $('#fCo').text(),
            content         = $('#editor').editable('getHTML', false, true),
            featureIMG      = $('input[name=featureIMGurl]').val(),
            headerIMG       = $('input[name=headerIMGurl]').val(),
            description     = $('#fDescription').text(),
            releaseDate     = $('#dateForRelease').text(),
            doctype         = $('#fType').text(),
            docstyle        = $('#fStyle').text(),
            cycle           = $('#fCycle').text(),
            photoCred       = $('#fPhotoCred').text(),
            tags            = $('#fTags').text(),
            category        = $('#fCategory').text();

        $.post('/queue', {
            id: id,
            title: title,
            author: author,
            description: description,  
            content: content, 
            featureIMG: featureIMG,
            status: 'proofed',
            releaseDate: releaseDate, 
            doctype: doctype,  
            docstyle: docstyle,  
            cycle: cycle,  
            headerIMG: headerIMG,    
            coAuthor: coAuthor,      
            tags: tags,
            category: category,
            photoCred: photoCred
        }).done(function(message) {
            $('#finishModal').modal('hide');

            if (message['success']) {
                $('#success_msg > .message').empty().append(message['success']);
                $('#success_msg').show();
                setTimeout('window.location = "/dashboard";', 3500);
            }

            if (message['error']) {
                $('#errorAlert > .message').empty().append(message['error']);
                $('#errorAlert').show();
            }
        }).fail(function() {
            $('#errorAlert > .message').empty().append('<strong>Error: </strong> An error occured while trying to save your article. Please try again.');
            $('#errorAlert').show();
        }); 
    }
};

module.exports = articleService;