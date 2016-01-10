'use strict';

define([
    '../module'
], function(module){
   module.service('DialogService',['$mdDialog', '$q', function($mdDialog,$q){

       this.showAddPlaceDialog = function(){
           return $mdDialog.show({
               controller: 'DialogAddPlaceCtrl',
               templateUrl: 'partials/places/dialogAddPlace.html',
               parent: angular.element(document.body),
               clickOutsideToClose: false
           });
       };

       this.showPlaceDialog = function(feature){
           return $mdDialog.show({
               controller: 'DialogPlaceCtrl',
               templateUrl: 'partials/places/dialogPlace.html',
               parent: angular.element(document.body),
               clickOutsideToClose: false,
               mdIsFullscreen: 'sm,md',
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
           var deferred = $q.defer();
           $mdDialog.show(confirm)
               .then(function(){
                   deferred.resolve({confirm:true});
               }, function(){
                   deferred.reject({confirm:false});
               });
           return deferred.promise;
       };
   }]);
});