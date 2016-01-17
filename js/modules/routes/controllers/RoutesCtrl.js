'use strict';

define([
    '../module'
], function (module) {
    module.controller('RoutesCtrl', ['$scope', 'AuthFBService', 'FBStorageService', 'Route', 'Routes', 'Cities', 'User', 'TIPs', 'TravelModes',
        'NotificationService', 'ValidationService', 'FeatureService', 'MarkerIconService',
        function ($scope, AuthFBService, FBStorageService, Route, Routes, Cities, User, TIPs, TravelModes,
                  NotificationService, ValidationService, FeatureService, MarkerIconService) {

            $scope.isAuthFB = function () {
                return AuthFBService.isAuthFB;
            };
            $scope.getFBUserId = function () {
                return FBStorageService.getUserID();
            };
            $scope.filtersEnabled = false;
            TravelModes.query().$promise
                .then(function (travelModes) {
                    $scope.travelModes = travelModes;
                    $scope.travelModePreference = travelModes[0]
                });
            $scope.selectedTravelModes = [];
            $scope.cities = Cities.query();
            $scope.selectedCities = [];
            $scope.selectedFriends = [];
            $scope.friends = [];
            $scope.allowAddRoutes = false;
            $scope.loading = false;
            $scope.selectectedTIPLayers = [];

            $scope.toggleTravelMode = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) list.splice(idx, 1);
                else list.push(item);
            };

            $scope.existsTravelMode = function (item, list) {
                return list.indexOf(item) > -1;
            };

            $scope.enableAddRoutes = function () {
                $scope.displayHelpMessage();
                $scope.allowAddRoutes = true;
            };

            $scope.createRoute = function () {

            };

            $scope.resetRoute = function () {
                $scope.permanentlayers.clearLayers();
                angular.forEach($scope.selectectedTIPLayers, function (TIPlayer) {
                    var customIcon = MarkerIconService.getMarkerIcon(TIPlayer.customFeature.icon);
                    TIPlayer.setIcon(customIcon);
                    $scope.boundingboxlayers.addLayer(TIPlayer);
                });
                $scope.selectectedTIPLayers = [];
            };

            $scope.cancelAddRoutes = function () {
                $scope.resetRoute();
                $scope.allowAddRoutes = false;
            };

            $scope.displayHelpMessage = function () {
                NotificationService.displayMessage("Click on the places in order to create Routes");
            };

            $scope.$watch('isAuthFB() && getFBUserId()', function (newVal) {
                if (angular.isDefined(newVal) && newVal) {
                    if (!angular.isDefined($scope.maxRoutePoints)) {
                        Route.getMaxWayPoints().$promise
                            .then(function (data) {
                                $scope.maxRoutePoints = data.value;
                            });
                    }
                    $scope.allowAddRoutes = false;
                    $scope.friends = User.getFriends();
                }
            });

            $scope.$watchCollection('selectedCities', function (newVal, oldVal) {
                if (ValidationService.arrayChanged(newVal, oldVal)) {
                    requestFeatures();
                }
            });
            $scope.$watchCollection('selectedTravelModes', function (newVal, oldVal) {
                if (ValidationService.arrayChanged(newVal, oldVal)) {
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

            var TIPIdsFromTIPLayers = function (TIPLayers) {
                return _.map(TIPLayers, function (TIPLayer) {
                    return TIPLayer.customFeature.id;
                });
            };

            var requestFeatures = function () {
                var cities = _.map($scope.selectedCities, function (city) {
                    return city.id;
                });
                var URLparams = {
                    bounds: $scope.bounds,
                    cities: cities,
                    travelModes: $scope.selectedTravelModes
                };

                if ($scope.isAuthFB()) {
                    URLparams["favouritedBy"] = $scope.favouritedBy;
                    URLparams["facebookUserId"] = FBStorageService.getUserID();
                    if (angular.isDefined($scope.favouritedBy) && $scope.favouritedBy == 1 && !_.isEmpty($scope.selectedFriends)) {
                        URLparams["friends"] = _.map($scope.selectedFriends, function (friend) {
                            return friend.facebookUserId;
                        });
                    }
                } else {
                    URLparams["favouritedBy"] = undefined;
                    URLparams["facebookUserId"] = undefined;
                    URLparams["friends"] = undefined;
                }

                TIPs.query(URLparams).$promise
                    .then(function (resultFeatures) {
                        $scope.boundingboxfeatures = resultFeatures;
                    }, function (response) {
                        if (response.status == 500) {
                            NotificationService.displayMessage("Error retrieving TIPS");
                        }
                    });

                Routes.query(URLparams).$promise
                    .then(function (resultFeatures) {

                    });
            };

            $scope.$watch('boundschanged', function (bounds, boundsOld) {
                if (angular.isDefined(bounds) && angular.isDefined(boundsOld)) {
                    $scope.bounds = FeatureService.layer2WKT(bounds);
                    requestFeatures();
                }
            });

            var activateLoading = function () {
                $scope.loading = true;
            };

            var disableLoading = function () {
                $scope.loading = false;
            };


            $scope.$watch('layerclicked', function (layerClicked) {
                if (angular.isDefined(layerClicked) && $scope.allowAddRoutes) {
                    var typeClicked = layerClicked.typeClicked;
                    var layer = layerClicked.layer;
                    if (typeClicked == "Point") {
                        if (_.contains($scope.selectectedTIPLayers, layer)) {
                            NotificationService.displayMessage("This Place is already in the new Route");
                        } else {
                            if (($scope.selectectedTIPLayers.length + 1) > $scope.maxRoutePoints) {
                                NotificationService.displayMessage("The maximum number of Places per Route is " + $scope.maxRoutePoints);
                            } else {
                                var customIcon = MarkerIconService.getMarkerIcon(layer.customFeature.icon, 'green-light');
                                layer.setIcon(customIcon);
                                $scope.boundingboxlayers.removeLayer(layer);
                                $scope.permanentlayers.addLayer(layer);
                                $scope.selectectedTIPLayers.push(layer);

                            }
                        }
                    }
                    $scope.layerclicked = undefined;
                }
            });

            $scope.$watchCollection('selectectedTIPLayers', function (selectectedTIPLayers) {
                if (angular.isDefined(selectectedTIPLayers) && selectectedTIPLayers.length > 1) {
                    var TIPIds = TIPIdsFromTIPLayers(selectectedTIPLayers);

                    var lastTIPIds = _.last(TIPIds, 2);
                    var origin = lastTIPIds[0];
                    var destination = lastTIPIds[1];

                    var urlParams = {
                        origin: origin,
                        destination: destination,
                        travelMode: $scope.travelModePreference
                    };
                    Route.getShortestPath(urlParams).$promise
                        .then(function(response){
                            $scope.permanentfeatures = [{geom:response.geom}];
                        });
                }
            });
        }]);
});