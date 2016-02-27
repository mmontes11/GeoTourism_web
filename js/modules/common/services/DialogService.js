'use strict';

define([
    '../module'
], function(module){
   module.service('DialogService',['$mdDialog', '$q', 'TIP', function($mdDialog,$q,TIP){

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

       this.showCreateOrUpdateRouteDialog = function(route,travelMode,travelModes,TIPIds){
           return $mdDialog.show({
               controller: 'DialogAddRouteCtrl',
               templateUrl: 'partials/routes/dialogAddRoute.html',
               parent: angular.element(document.body),
               clickOutsideToClose: true,
               locals: {
                   route: route,
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

       this.showConfirmDeleteTIPDialog = function(TIPId,title,ok,cancel){
           var deferred = $q.defer();
           TIP.getNumRoutes({id:TIPId}).$promise
               .then(function(response){
                   var numRoutes = response.numRoutes;
                   var content = "Are you sure?";
                   if (numRoutes > 0){
                       var containedRoutes = numRoutes == 1? numRoutes + " Route" : numRoutes + " Routes";
                       var subject = numRoutes == 1? " it" : " they";
                       content = "This Place is contained in "+containedRoutes+", if you delete it," +
                           subject+" will have to be recalculated (It can take a long time).";
                   }
                   var confirm = $mdDialog.confirm()
                       .title(title)
                       .content(content)
                       .ok(ok)
                       .cancel(cancel);
                   $mdDialog.show(confirm)
                       .then(function(){
                           deferred.resolve({confirm:true});
                       }, function(){
                           deferred.reject({confirm:false});
                       });
               });
           return deferred.promise;
       };

       this.showStatsDialog = function(){
           return $mdDialog.show({
               controller: 'DialogStatsCtrl',
               templateUrl: 'partials/stats/dialogStats.html',
               parent: angular.element(document.body),
               clickOutsideToClose: true
           });
       };
   }]);
});