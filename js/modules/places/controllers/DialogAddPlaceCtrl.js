'use strict';

define([
    '../module'
], function(module){
   module.controller('DialogAddPlaceCtrl',['$scope','$mdDialog',function($scope,$mdDialog){

       $scope.types = [
           {id: "M", name: "Monument"}
       ];

       $scope.close = function() {
           $mdDialog.cancel();
       };

       $scope.save = function() {
           $mdDialog.hide($scope.place);
       };
   }]);
});
