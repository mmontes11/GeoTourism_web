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

       this.showPlaceDetailsDialog = function(feature){
           return $mdDialog.show({
               controller: 'DialogPlaceDetailsCtrl',
               templateUrl: 'partials/places/dialogPlaceDetails.html',
               parent: angular.element(document.body),
               clickOutsideToClose: false,
               locals: {
                   feature: feature
               }
           });
       };

       this.showConfirmDialog = function(title,content,ok,cancel){
           var confirm = $mdDialog.confirm()
               .title(title)
               .content(content)
               .ok(ok)
               .cancel(cancel);
           return $mdDialog.show(confirm);
       };
   }]);
});