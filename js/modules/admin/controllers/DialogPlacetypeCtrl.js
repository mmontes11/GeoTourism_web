'use strict';

define([
    '../module'
], function(module){
    module.controller("DialogPlaceTypeCtrl", ["$scope",'$mdDialog',"placeType",function($scope,$mdDialog,placeType){
        $scope.placeType = placeType || {};
        $scope.close = function () {
            $mdDialog.cancel();
        };
        $scope.save = function () {
            $mdDialog.hide($scope.placeType);
        };
    }]);
});