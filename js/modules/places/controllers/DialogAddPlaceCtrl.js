'use strict';

define([
    '../module'
], function(module){
   module.controller('DialogAddPlaceCtrl',['$scope','$mdDialog',function($scope,$mdDialog){
       $scope.hide = function() {
           $mdDialog.hide();
       };

       $scope.cancel = function() {
           $mdDialog.cancel();
       };

       $scope.answer = function(answer) {
           $mdDialog.hide(answer);
       };
   }]);
});
