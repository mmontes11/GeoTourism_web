'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogStatsCtrl',['$scope','$mdDialog',function($scope,$mdDialog){
        $scope.close = function(){
            $mdDialog.cancel();
        };
        $scope.accept = function(){
            $mdDialog.hide(1);
        };
    }]);
});