'use strict';

var autosaveService = function($interval, localStorageService) {
    var service = {
            // init: init,
            startAutosave: startAutosave,
            stopAutosave: stopAutosave,
            save: save,
            recover: recover,
            load: load,
            removeItem: removeItem,
            clearAll: clearAll
        },
        interval,
        autosaveStarted = false,
        storageItems;

    return service;


    ////////////////////////


    function startAutosave() {
        /* save current progress every minute */
        $interval.cancel(interval);
        autosaveStarted = true;
    }

    function stopAutosave() {
        interval = $interval(save, 60000);
        autosaveStarted = false;
    }

    function recover() {
        var lsLength = localStorageService.length();

        if (lsLength > 0) {
            $('#draftsList').empty();
            
            var keys = localStorageService.keys();

            $.each(keys, function(index, key) {
                var item = getItem(key),
                    x = JSON.parse(item),
                    html = '<li><span class="icon-circle-cross dLS" style="color:indianred;padding-right:15px;" data-ng-click="removeFromLS(' + key + ');"></span><span class="loadLS" style="cursor:pointer;" data-ng-click="loadFromLS(' + key + ')">' + x.title + ' - ' + x.timestamp + '</span></li>';
                $('#draftsList').append(html);
            });
        } else {
            if ( !autosaveStarted ) {
                startAutosave();
            }
        }   
    }

    function load(key) {
        var retrieved = localStorage.getItem(key),
            x = JSON.parse(retrieved);

        $('#post input[name=title]').val(x.title);
        $('#post input[name=author]').val(x.author);
        $('#post textarea[name=description]').val(x.description);
        $('#editor').editable("setHTML", x.content, true);
        $('#post input[name=headerIMGurl]').val(x.headerIMG);
        $('#post input[name=photo_cred]').val(x.photoCred);

        if (x.doctype) {
            $("input[name=doctype][value=" + x.doctype + "]").prop('checked', true);
        }

        if (x.docstyle) {
            $("input[name=docstyle][value=" + x.docstyle + "]").prop('checked', true);
        }

        if ((x.releaseDate === 'None') || (x.releaseDate === null) || (x.releaseDate === "")) {
            $('#rDate').empty().append('No date selected');
            $('#date').show();
        }

        if ((x.releaseDate !== 'None') && (x.releaseDate !== null) && (x.releaseDate !== "")) {
            var y = x.releaseDate.split(','),
                date = moment(y).format("dddd, MMMM Do YYYY");
            $('#rDate').empty().append(date).val(x.releaseDate);
            $('#date').show();
        }

        if (x.featureIMG === 'same') {
            $('#headerSame').prop("checked", true);
        }

        var tags = x.tags.split(','),
            coAuth = x.coAuthor.split(','),
            cat = x.category.split(',');

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
                    $('#more-authors input:checkbox[value="' + coAuth[j] + '"]').prop('checked', true);
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

        $('#autosaveDrafts').modal('hide');

        // autosave every 1.5 mins
        // window.setInterval(autosave,60000);
    }

    function save() {
        var title           = $('#post input[name=title]').val(),
            author          = $('#post input[name=author]').val(),
            description     = $('#post textarea[name=description]').val(),
            content         = $('#editor').editable('getHTML', false, true),
            featureIMG      = $('#post input[name=featureIMGurl]').val(),
            releaseDate     = $('input[name=release]').val(),
            doctype         = $('#post input[name=doctype]:checked').val(),
            docstyle        = $('#post input[name=docstyle]:checked').val(),
            headerIMG       = $('#post input[name=headerIMGurl]').val(),
            photoCred       = $('#post input[name=photo_cred]').val(),
            selected        = [],
            options         = [],
            release         = "",
            coAuthors       = [];

        $('#tags_list p').each(function() {
            selected.push($(this).text());
        });
        var tags = selected.join(", ");

        $('#category option:selected').each(function() {
            options.push($(this).val());
        });
        var category = options.join(", ");

        if (title === "") {
            var date = moment().format("MM/D/YYYY");
            title = "Article "+ date;
        }

        if (releaseDate === "") {
            release = null;
        }

        if (releaseDate !== "") {
            release = moment(releaseDate).toArray().toString();
        }

        if (featureIMG === "") {
            if ($('#headerSame').prop("checked")) {
                featureIMG = 'same';
            }
            else {
                featureIMG = '';
            }
        }

        $('#more-authors input:checkbox:checked').each(function() {
            coAuthors.push($(this).val());
        });
        var ca = coAuthors.join(", ");

        var x = {};
        x.title = title;
        x.author = author;
        x.description = description;  
        x.content = content; 
        x.featureIMG = featureIMG;
        x.releaseDate = release; 
        x.doctype = doctype;  
        x.docstyle = docstyle;  
        x.headerIMG = headerIMG;    
        x.coAuthor = ca;      
        x.tags = tags;
        x.category = category;
        x.photoCred = photoCred;
        x.timestamp = moment().format('MMMM Do YYYY, h:mm a');

        // localStorage.clear();
        localStorage.setItem(title, JSON.stringify(x));
    }

    function getItem(key) {
        return localStorageService.get(key);
    }

    function removeItem(key) {
        return localStorageService.remove(key);
    }

    function clearAll() {
        return localStorageService.clearAll();
    }
};

module.exports = autosaveService;