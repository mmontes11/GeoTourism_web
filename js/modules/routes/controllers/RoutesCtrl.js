'use strict';

define([
    '../module'
], function (module) {
    module.controller('RoutesCtrl', ['$scope', '$q', 'AuthFBService', 'FBStorageService', 'Route', 'Routes', 'Cities', 'User', 'TIPs', 'TravelModes',
        'NotificationService', 'ValidationService', 'FeatureService', 'FeatureStyleService', 'DialogService',
        function ($scope, $q, AuthFBService, FBStorageService, Route, Routes, Cities, User, TIPs, TravelModes,
                  NotificationService, ValidationService, FeatureService, FeatureStyleService,DialogService) {

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
                    $scope.travelModePreference = {selected: travelModes[0]};
                });
            $scope.selectedTravelModes = [];
            $scope.cities = Cities.query();
            $scope.selectedCities = [];
            $scope.selectedFriends = [];
            $scope.friends = [];
            $scope.allowAddRoutes = false;
            $scope.loading = false;
            $scope.selectectedTIPLayers = [];
            $scope.partialRouteGeoms = [];

            $scope.toggleTravelMode = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) list.splice(idx, 1);
                else list.push(item);
            };

            $scope.existsTravelMode = function (item, list) {
                return list.indexOf(item) > -1;
            };

            $scope.selectTravelModePreference = function(travelMode){
                $scope.travelModePreference = travelMode;
            };

            $scope.enableAddRoutes = function () {
                $scope.displayHelpMessage();
                $scope.allowAddRoutes = true;
            };

            var activateLoading = function () {
                $scope.loading = true;
            };

            var disableLoading = function () {
                $scope.loading = false;
            };

            $scope.createRoute = function () {
                var TIPIds = TIPIdsFromTIPLayers($scope.selectectedTIPLayers);
                DialogService.showAddRouteDialog($scope.travelModePreference.selected,$scope.travelModes,TIPIds)
                    .then(function(response){
                        if (!response.changed){
                            response.route['lineStrings'] = $scope.partialRouteGeoms;
                        }
                        $scope.resetRoute();
                        activateLoading();
                        return Route.save(response.route).$promise.finally(disableLoading)
                    }, function(){
                        return $q.reject();
                    })
                    .then(function(route){
                        NotificationService.displayMessage("Route created!");
                    }, function(response){
                        if (response && response.status == 500){
                            NotificationService.displayMessage("Error creating Route");
                        }
                    });
            };

            $scope.resetLastRoutePlace = function(){
                var TIPlayer = _.last($scope.selectectedTIPLayers,1)[0];
                $scope.selectectedTIPLayers.splice(_.indexOf($scope.selectectedTIPLayers,TIPlayer),1);
                $scope.permanentlayers.removeLayer(TIPlayer);
                var customIcon = FeatureStyleService.getMarkerIcon(TIPlayer.customFeature.icon);
                TIPlayer.setIcon(customIcon);
                $scope.boundingboxlayers.addLayer(TIPlayer);
            };

            $scope.resetRoute = function () {
                $scope.permanentlayers.clearLayers();
                angular.forEach($scope.selectectedTIPLayers, function (TIPlayer) {
                    var customIcon = FeatureStyleService.getMarkerIcon(TIPlayer.customFeature.icon);
                    TIPlayer.setIcon(customIcon);
                    $scope.boundingboxlayers.addLayer(TIPlayer);
                });
                $scope.selectectedTIPLayers = [];
                $scope.partialRouteGeoms = [];
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
            $scope.$on('favouriteSelector.createdBy', function (event, favouritedBy) {
                $scope.createdBy = createdBy;
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
                var TIPparams = {
                    bounds: $scope.bounds,
                    cities: cities
                };

                if ($scope.isAuthFB()) {

                } else {

                }

                TIPs.query(TIPparams).$promise
                    .then(function (resultFeatures) {
                        $scope.boundingboxfeatures = resultFeatures;
                    }, function (response) {
                        if (response.status == 500) {
                            NotificationService.displayMessage("Error retrieving TIPS");
                        }
                    });
                /*
                Routes.query(TIPparams).$promise
                    .then(function (resultFeatures) {

                    });*/
            };

            $scope.$watch('boundschanged', function (bounds, boundsOld) {
                if (angular.isDefined(bounds) && angular.isDefined(boundsOld)) {
                    $scope.bounds = FeatureService.layer2WKT(bounds);
                    requestFeatures();
                }
            });

            $scope.$watch('travelModePreference.selected',function(newVal,oldVal){
                if (angular.isDefined(newVal) && angular.isDefined(oldVal) && newVal != oldVal){
                    $scope.resetRoute();
                }
            });

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
                                var customIcon = FeatureStyleService.getMarkerIcon(layer.customFeature.icon, 'green');
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

            $scope.$watchCollection('selectectedTIPLayers', function (selectectedTIPlayers,oldTIPlayers) {
                var newTIPlayers = _.difference(selectectedTIPlayers,oldTIPlayers);
                if (angular.isDefined(selectectedTIPlayers) &&
                    selectectedTIPlayers.length > 1 && _.intersection(selectectedTIPlayers,newTIPlayers).length > 0) {
                    var TIPIds = TIPIdsFromTIPLayers(selectectedTIPlayers);
                    var lastTIPIds = _.last(TIPIds, 2);
                    var origin = lastTIPIds[0];
                    var destination = lastTIPIds[1];
                    var urlParams = {
                        origin: origin,
                        destination: destination,
                        travelMode: $scope.travelModePreference.selected
                    };
                    Route.getShortestPath(urlParams).$promise
                        .then(function(response){
                            var feature = {
                                geom: response.geom,
                                color: 'green'
                            };
                            $scope.permanentfeatures = [feature];
                            $scope.partialRouteGeoms.push(feature.geom);
                        }, function(){
                            $scope.resetLastRoutePlace();
                            NotificationService.displayMessage("There is no possible Route between that Places");
                        });
                }
            });

            $scope.$on('peopleSelector.value', function (event, createdBy) {
                $scope.createdBy = createdBy;
                //requestFeatures();
            });
            $scope.$on('socialChips.selectedFriends', function (event, selectedFriends) {
                $scope.selectedFriends = selectedFriends;
                //requestFeatures();
            });
        }]);
});