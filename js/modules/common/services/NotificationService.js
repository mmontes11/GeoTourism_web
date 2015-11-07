'use strict';

define([
    '../module'
], function(module){
    module.service('NotificationService', ['$mdToast','Config', function($mdToast,Config){

        this.displayMessage = function(message){
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position(Config.TOAST_POSITION)
                    .hideDelay(Config.TOAST_TIMEOUT)
            );
        };
    }]);
});
