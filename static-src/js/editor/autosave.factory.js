'use strict';

var Autosave = function(logger, moment, localStorageService) {
    var service = {
            init: init,
            save: save,
            load: load,
            removeItem: removeItem,
            clearAll: clearAll,
            saveInterval: 60000
        };

    return service;


    ////////////////////////


    function init() {
        logger.log('Autosave.init()');

        var lsLength = localStorageService.length(),
            drafts = [];

        if (lsLength > 0) {
            var keys = localStorageService.keys();
            $.each(keys, function(index, key) {
                var item = get(key),
                    x = JSON.parse(item);
                drafts.push[x];
            });
        }

        return drafts; 
    }

    function load(key) {
        var retrieved = localStorage.get(key),
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

    function save( article ) {
        if (article.title === "") {
            var date = moment().format("MM/DD/YYYY");
            article.title = "Article "+ date;
        }

        set(article.title, JSON.stringify(article));

        /* update title */
        return moment().fromNow();
    }

    function set(key, val) {
        return localStorageService.set(key, val);
    }

    function get(key) {
        return localStorageService.get(key);
    }

    function removeItem(key) {
        return localStorageService.remove(key);
    }

    function clearAll() {
        return localStorageService.clearAll();
    }
};

module.exports = Autosave;