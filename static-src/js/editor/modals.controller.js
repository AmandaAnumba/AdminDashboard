'use strict';


var ModalsController = function(logger, dataService, Article, Autosave) {
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
    }

    function loadFromLS( key ) {
        Autosave.load(key);
    }

    function removeFromLS( key ) {
        Autosave.removeItem(key);
    }

    function clearStorage() {
        Autosave.clearAll();
        ctrl.modal('hide');
        Autosave.startAutosave();
    }

    function deleteArticle( id ) {
        Article.delete(id);
    }

    function markProofed( id ) {
        Article.markProofed(id);
    }
};


module.exports = ModalsController;