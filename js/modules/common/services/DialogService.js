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
               clickOutsideToClose: true
           });
       };

       this.showPlaceDialog = function(feature){
           return $mdDialog.show({
               controller: 'DialogPlaceCtrl',
               templateUrl: 'partials/places/dialogPlace.html',
               parent: angular.element(document.body),
               clickOutsideToClose: true,
               locals: {
                   feature: feature
               }
           });
       };

       this.showAddRouteDialog = function(travelMode,travelModes,TIPIds){
           return $mdDialog.show({
               controller: 'DialogAddRouteCtrl',
               templateUrl: 'partials/routes/dialogAddRoute.html',
               parent: angular.element(document.body),
               clickOutsideToClose: true,
               locals: {
                   travelMode: travelMode,
                   travelModes: travelModes,
                   TIPIds: TIPIds
               }
           });
       };

       this.showRouteDialog = function(feature){
           return $mdDialog.show({
               controller: 'DialogRouteCtrl',
               templateUrl: 'partials/routes/dialogRoute.html',
               parent: angular.element(document.body),
               clickOutsideToClose: true,
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