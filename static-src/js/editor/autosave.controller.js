/* globals UIkit */

'use strict';

var AutosaveController = function($scope, logger, Autosave, Article, $interval, $timeout) {
    var ctrl = this,
        interval = '';
    ctrl.drafts = [];
    ctrl.load = load;
    ctrl.remove = remove;
    ctrl.clearStorage = clearStorage;

    activate();

    $scope.$on('startAutosave', startAutosave);
    $scope.$on('stopAutosave', stopAutosave);
    
    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated:
            check if there are any drafts and then load them
    */
    function activate() {
        logger.log('AutosaveController activated');

        /* load the drafts */
        ctrl.drafts = Autosave.drafts;
    }

    function startAutosave() {
        logger.log('AutosaveController.startAutosave()');
        
        interval = $interval(function() {
            var savedLast = Autosave.save(Article.data);
            UIkit.notify({
                message : "saved " + savedLast,
                status  : 'info',
                timeout : 3500,
                pos     : 'bottom-left'
            });
        }, Autosave.saveInterval);
    }

    function stopAutosave() {
        logger.log('AutosaveController.stopAutosave()');
        $interval.cancel(interval);
    }

    function load( key ) {
        logger.log('AutosaveController.load( ' + key + ' )');
        
        var a = Autosave.load(key);
        Article.data = a;

        $scope.$emit('loadArticle');
        $scope.$broadcast('closeAutosave');

        if (interval === '') {
            startAutosave();
        }
    }

    function remove( key ) {
        logger.log('AutosaveController.remove( ' + key + ' )');
        
        Autosave.removeItem(key);

        $scope.$emit('deleteDraft', { key: key });
        $scope.$broadcast('deleteDraft', { key: key });

        for (var i = 0; i < ctrl.drafts.length; i ++) {
            if (ctrl.drafts[i].title === key) {
                ctrl.drafts.splice(i,1);
                break;
            }
        }
    }

    function clearStorage() {
        logger.log('AutosaveController.clearStorage()');
        
        Autosave.clearAll();
        $scope.$broadcast('closeAutosave');
        
        if (interval === '') {
            startAutosave();
        }
    }
};


module.exports = AutosaveController;