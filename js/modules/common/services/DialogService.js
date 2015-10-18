'use strict';

define([
    '../module'
], function(module){
   module.service('DialogService',['$mdDialog', function($mdDialog){

       this.showAddPlaceDialog = function(){
           return $mdDialog.show({
               controller: 'DialogAddPlaceCtrl',
               templateUrl: 'partials/places/dialogAddPlace.html',
               parent: angular.element(document.body),
               clickOutsideToClose: false
           });
       };
   }]);
});