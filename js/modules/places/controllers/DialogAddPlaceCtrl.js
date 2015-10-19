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
           if (angular.isDefined($scope.photo)){
               $scope.place.photoContent = $scope.photo.$ngfDataUrl;
               $scope.place.photoName = $scope.photo.name;
           }
           $mdDialog.hide($scope.place);
       };
   }]);
});
