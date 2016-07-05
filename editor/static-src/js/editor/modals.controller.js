'use strict';


var ModalsController = function(logger, dataService, articleService, autosaveService) {
    var ctrl = this;
    ctrl.loadFromLS = loadFromLS;
    ctrl.removeFromLS = removeFromLS;
    ctrl.clearStorage = clearStorage;
    ctrl.deleteArticle = deleteArticle;
    ctrl.markProofed = markProofed;
    ctrl.modal = $("#autosaveDrafts");

    activate();


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated:
            check if there are any drafts and then load them
    */
    function activate() {
        logger.log('ModalsController activated');

        /* load all drafts from LS if there are any */
        var response = autosaveService.recover();
        if (response) {
            ctrl.modal('show');
        }

        /* init froala editor */
    }

    function loadFromLS( key ) {
        autosaveService.load(key);
    }

    function removeFromLS( key ) {
        autosaveService.removeItem(key);
    }

    function clearStorage() {
        autosaveService.clearAll();
        ctrl.modal('hide');
        autosaveService.startAutosave();
    }

    function deleteArticle( id ) {
        articleService.delete(id);
    }

    function markProofed() {
        articleService.markProofed(id);
    }
};


module.exports = ModalsController;