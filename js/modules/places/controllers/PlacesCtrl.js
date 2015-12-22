'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$q', 'FeatureService', 'Cities', 'City', 'TIPs', 'TIP', 'User',
        'FBStorageService', 'AuthAdminService', 'AuthFBService', 'NotificationService', 'DialogService','ValidationService',
        function ($scope, $q, FeatureService, Cities, City, TIPs, TIP, User,
                  FBStorageService, AuthAdminService, AuthFBService, NotificationService, DialogService, ValidationService) {

            $scope.isAuthenticated = function () {
                return AuthAdminService.isAuthenticated;
            };
            $scope.isAuthFB = function () {
                return AuthFBService.isAuthFB;
            };
            $scope.getFBUserId = function() {
                return FBStorageService.getUserID();
            };

            $scope.types = TIP.getTypes();
            $scope.selectedTypes = [];
            $scope.cities = Cities.query();
            $scope.selectedCities = [];
            $scope.selectedFriends = [];
            $scope.friends = [];
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
            $scope.$watch('isAuthFB() && getFBUserId()', function(newVal){
                if (angular.isDefined(newVal) && newVal){
                    User.getFriends({facebookUserId: FBStorageService.getUserID()}).$promise
                        .then(function(friends){
                            $scope.friends = friends;
                        });
                }
            });

            $scope.$watchCollection('selectedTypes', function (newVal, oldVal) {
                if (ValidationService.arrayChanged(newVal,oldVal)) {
                    requestFeatures();
                }
            });
            $scope.$watchCollection('selectedCities', function (newVal, oldVal) {
                if (ValidationService.arrayChanged(newVal,oldVal)){
                    requestFeatures();
                }
            });
            $scope.$on('favouriteSelector.favouritedBy', function (event, favouritedBy) {
                $scope.favouritedBy = favouritedBy;
                requestFeatures();
            });
            $scope.$on('socialChips.selectedFriends', function (event, selectedFriends) {
                $scope.selectedFriends = selectedFriends;
                requestFeatures();
            });

            var requestFeatures = function () {
                var types = _.map($scope.selectedTypes, function (type) {
                    return type.id;
                });
                var cities = _.map($scope.selectedCities, function (city) {
                    return city.id;
                });
                var URLparams = {
                    bounds: $scope.bounds,
                    types: types,
                    cities: cities
                };
                if ($scope.isAuthFB()){
                    URLparams["favouritedBy"] = $scope.favouritedBy;
                    URLparams["facebookUserId"] = FBStorageService.getUserID();
                    if (angular.isDefined($scope.favouritedBy) && $scope.favouritedBy == 1 && !_.isEmpty($scope.selectedFriends)) {
                        URLparams["friends"] = _.map($scope.selectedFriends, function (friend) {
                            return friend.facebookUserId;
                        });
                    }
                }else{
                    URLparams["favouritedBy"] = undefined;
                    URLparams["facebookUserId"] = undefined;
                    URLparams["friends"] = undefined;
                }

                TIPs.query(URLparams).$promise
                    .then(function (resultFeatures) {
                        $scope.features = resultFeatures;
                    }, function () {
                        NotificationService.displayMessage("Error retrieving TIPS")
                    });
            };

            $scope.$watch('boundschanged', function (bounds, boundsOld) {
                if (angular.isDefined(bounds) && angular.isDefined(boundsOld)) {
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

            $scope.showPlaceDialog = function (layer) {
                var feature = layer.customFeature;

                DialogService.showPlaceDialog(feature)
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
                                    $scope.showPlaceDialog(layer);
                                });
                        }
                    });
            };

            $scope.$watch('layerclicked', function (layer) {
                if (angular.isDefined(layer)) {
                    $scope.showPlaceDialog(layer);
                    $scope.layerclicked = undefined;
                }
            });
        }]);
});