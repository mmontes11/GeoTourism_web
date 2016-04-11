'use strict';

define([
    '../module'
], function(module){
    module.controller("DialogPlaceTypeCtrl", ["$scope",'$mdDialog',function($scope,$mdDialog){
        $scope.close = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            $mdDialog.hide($scope.place);
        };
    }]);
});