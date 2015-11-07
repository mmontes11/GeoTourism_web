'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$q', 'FeatureService', 'Cities', 'City', 'TIPs', 'TIP',
        'AuthAdminService', 'NotificationService', 'DialogService',
        function ($scope, $q, FeatureService, Cities, City, TIPs, TIP,
                  AuthAdminService, NotificationService, DialogService) {

            $scope.isAuthenticated = function () {
                return AuthAdminService.isAuthenticated;
            };

            $scope.types = TIP.getTypes();
            $scope.selectedTypes = [];

            $scope.cities = Cities.query();
            $scope.selectedCities = [];

            $scope.allowAddTIPs = false;

            $scope.addTIP = function () {
                NotificationService.displayMessage("Click to add Places");
                $scope.allowAddTIPs = true;
            };

            $scope.finishAddTIPs = function () {
                $scope.allowAddTIPs = false;
            };

            $scope.$watch('isAuthenticated()', function (newVal) {
                if (angular.isDefined(newVal) && !newVal) {
                    $scope.allowAddTIPs = false;
                }
            });

            $scope.$watchCollection('selectedTypes', function(){
                requestFeatures();
            });

            $scope.$watchCollection('selectedCities', function(){
                requestFeatures();
            });

            var requestFeatures = function () {
                var types = _.map($scope.selectedTypes, function(type){
                    return type.id;
                });
                var cities = _.map($scope.selectedCities, function(city){
                    return city.id;
                });
                var payload = {
                    bounds: $scope.bounds,
                    types: types,
                    cities: cities
                };
                TIPs.query(payload).$promise
                    .then(function (resultFeatures) {
                        $scope.features = resultFeatures;
                    }, function () {
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
                    City.get({location: locationFeature}).$promise
                        .then(function () {
                            DialogService.showAddPlaceDialog()
                                .then(function (place) {
                                    place["geometry"] = locationFeature;
                                    TIP.save(place).$promise
                                        .then(function () {
                                            requestFeatures();
                                            NotificationService.displayMessage("Place created!");
                                        }, function (response) {
                                            if (response.status != 401) {
                                                NotificationService.displayMessage("Error creating Place");
                                            }
                                        });
                                });
                        }, function () {
                            NotificationService.displayMessage("The place should be located in a existing city");
                        });
                }
            });

            $scope.showPlaceDetailsDialog = function (layer) {
                var feature = layer.customFeature;

                DialogService.showPlaceDetailsDialog(feature)
                    .then(function (operation) {
                        if (operation === "Delete") {
                            DialogService.showConfirmDialog("Delete Place", "Are you sure?", "Yes", "Cancel")
                                .then(function () {
                                    TIP.delete({id: feature.id}).$promise
                                        .then(function () {
                                            $scope.layerdelete = layer;
                                            NotificationService.displayMessage("Place deleted!")
                                        }, function (response) {
                                            if (response.status != 401) {
                                                NotificationService.displayMessage("Error deleting Place");
                                            }
                                        });
                                }, function () {
                                    $scope.showPlaceDetailsDialog(layer);
                                });
                        }
                    });
            };

            $scope.$watch('layerclicked', function (layer) {
                if (angular.isDefined(layer)) {
                    $scope.showPlaceDetailsDialog(layer);
                    $scope.layerclicked = undefined;
                }
            });
        }]);
});