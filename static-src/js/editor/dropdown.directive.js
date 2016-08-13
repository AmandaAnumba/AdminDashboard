'use strict';

var dropdown = function(logger) {
    var directive = {
        restrict: 'A',
        link: link,
    };
    return directive;

    function link(scope, element, attrs) {
        element.find('#addAuthor').bind('click', toggleAuthorList);
        element.find('#authorSelect input').bind('change', addAuthor);
        
        function toggleAuthorList( event ) {
            logger.log('dropdown.toggleAuthorList()');

            event.preventDefault();
            event.stopPropagation();

            element.find('.icon').toggleClass('icon-circle-plus icon-circle-cross');
            $('#authorSelect ul').slideToggle('fast');
        }

        function addAuthor( event ) {
            logger.log('dropdown.addAuthor()');

            event.preventDefault();
            event.stopPropagation();

            var coAuthors = [],
                authors;
            
            $('#authorSelect input:checkbox:checked').each(function() {
                coAuthors.push($(this).val());
            });
            authors = coAuthors.join(", ");

            /* update the article authors and co-authors input*/
            if (coAuthors.length === 0) {
                $('#authors').empty();
                $('input[name="coAuthor"]').val('');
            } else {
                $('#authors').text(', ' + authors);
                $('input[name="coAuthor"]').val(authors);
            }
        }
    }
};

module.exports = dropdown;