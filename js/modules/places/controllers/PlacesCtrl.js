'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$q', 'LocationService', 'CityService', 'TIPs', 'TIP',
        'AuthAdminService', 'NotificationService', 'DialogService',
        function ($scope, $q, LocationService, CityService, TIPs, TIP,
                  AuthAdminService, NotificationService, DialogService) {

            $scope.isAuthenticated = function () {
                return AuthAdminService.isAuthenticated;
            };

            $scope.types = [
                {id: "M", name: "Monument"},
                {id: "NS", name: "Natural Space"},
                {id: "H", name: "Hotel"},
                {id: "R", name: "Restaurant"}
            ];

            $scope.cities = [
                {id: 2, name: "Santiago de Compostela"}
            ];

            $scope.allowAddTIPs = false;

            $scope.addTIP = function () {
                NotificationService.displayMessage("Click to add Places");
                $scope.allowAddTIPs = true;
            };

            $scope.finishAddTIPs= function () {
                $scope.allowAddTIPs = false;
            };

            $scope.$watch('isAuthenticated()', function (newVal, oldVal) {
                if (angular.isDefined(newVal) && !newVal) {
                    $scope.allowAddTIPs = false;
                }
            });

            var processedFeatures = [];
            var addNewFeatures = function(newFeatures){
                var newDifferentFeatures = _.difference(newFeatures,processedFeatures);
                if (_.size(newDifferentFeatures)>0){
                    $scope.features = newDifferentFeatures;
                    processedFeatures = _.union(processedFeatures,newDifferentFeatures);
                }
            };

            $scope.$watch('locationchanged', function (locationNew, locationOld) {
                if (angular.isDefined(locationNew)) {
                    var locationStr = LocationService.getLocationString(locationNew.lng, locationNew.lat);

                    TIPs.query({location: locationStr}).$promise
                        .then(function(resultFeatures){
                            addNewFeatures(resultFeatures);
                        }, function(){
                            NotificationService.displayMessage("Error retrieving TIPS")
                        });
                }
            });

            $scope.$watch('locationclicked', function (location) {
                if ($scope.isAuthenticated() && $scope.allowAddTIPs && angular.isDefined(location)) {

                    var locationStr = LocationService.getLocationString(location.lng, location.lat);

                    CityService.get({location: locationStr}).$promise
                        .then(function () {
                            DialogService.showAddPlaceDialog()
                                .then(function (place) {
                                    place["geometry"] = LocationService.latLng2WKT(location);
                                    TIP.save(place).$promise
                                        .then(function(createdTIP){
                                            addNewFeatures([createdTIP]);
                                            NotificationService.displayMessage("Place created!");
                                        }, function(){
                                            NotificationService.displayMessage("Error creating Place");
                                        });
                                });
                        }, function () {
                            NotificationService.displayMessage("The place should be located in a existing city");
                        });
                }
            });

            $scope.showPlaceDetailsDialog = function(layer){
                var feature = layer.customFeature;

                DialogService.showPlaceDetailsDialog(feature)
                    .then(function(operation){
                        if (operation === "Delete"){
                            DialogService.showConfirmDialog("Delete Place","Are you sure?","Yes","Cancel")
                                .then(function(){
                                    TIP.delete({id:feature.id}).$promise
                                        .then(function(){
                                            $scope.layerdelete = layer;
                                            NotificationService.displayMessage("Place deleted!")
                                        }, function(){
                                            NotificationService.displayMessage("Error deleting Place")
                                        });
                                }, function(){
                                    $scope.showPlaceDetailsDialog(feature);
                                });
                        }
                    });
            };

            $scope.$watch('layerclicked', function(layer){

                if (angular.isDefined(layer)) {
                    $scope.showPlaceDetailsDialog(layer);
                    $scope.layerclicked = undefined;
                }
            });

        }]);
});