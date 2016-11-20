'use strict';

var Autosave = function(logger, moment, localStorageService) {
    var service = {
            drafts: [],
            save: save,
            load: load,
            removeItem: removeItem,
            clearAll: clearAll,
            saveInterval: 60000,
            $modal: $("#autosaveModal")
        };

    init();

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
                drafts.push(x);
            });
        }

        service.drafts = drafts;
    }

    function load(key) {
        logger.log('Autosave.load( ' + key + ' )');
        
        var item = get(key),
            x = JSON.parse(item);

        return x;
    }

    function save(article) {
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