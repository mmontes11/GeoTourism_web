'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$q', 'FeatureService', 'CityService', 'TIPs', 'TIP',
        'AuthAdminService', 'NotificationService', 'DialogService',
        function ($scope, $q, FeatureService, CityService, TIPs, TIP,
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

            $scope.$watch('isAuthenticated()', function (newVal) {
                if (angular.isDefined(newVal) && !newVal) {
                    $scope.allowAddTIPs = false;
                }
            });

            var requestFeatures = function(){
                TIPs.query({bounds: $scope.bounds}).$promise
                    .then(function(resultFeatures){
                        $scope.features = resultFeatures;
                    }, function(){
                        NotificationService.displayMessage("Error retrieving TIPS")
                    });
            };

            $scope.$watch('boundschanged', function (bounds) {
                if (angular.isDefined(bounds)) {
                    $scope.bounds = FeatureService.toWKT(bounds);
                    requestFeatures();
                }
            });

            $scope.$watch('locationclicked', function (location) {
                if ($scope.isAuthenticated() && $scope.allowAddTIPs && angular.isDefined(location)) {
                    var locationFeature = FeatureService.toWKT(location);
                    CityService.get({location: locationFeature}).$promise
                        .then(function () {
                            DialogService.showAddPlaceDialog()
                                .then(function (place) {
                                    place["geometry"] = locationFeature;
                                    TIP.save(place).$promise
                                        .then(function(){
                                            requestFeatures();
                                            NotificationService.displayMessage("Place created!");
                                        }, function(response){
                                            if (response.status != 401){
                                                NotificationService.displayMessage("Error creating Place");
                                            }
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
                                        }, function(response){
                                            if (response.status != 401){
                                                NotificationService.displayMessage("Error deleting Place");
                                            }
                                        });
                                }, function(){
                                    $scope.showPlaceDetailsDialog(layer);
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