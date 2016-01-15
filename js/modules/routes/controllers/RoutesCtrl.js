'use strict';

define([
    '../module'
], function (module) {
    module.controller('RoutesCtrl', ['$scope', 'AuthFBService', 'FBStorageService', 'Route', 'Routes', 'Cities', 'User', 'TIPs', 'TravelModes',
        'NotificationService','ValidationService', 'FeatureService',
        function ($scope, AuthFBService, FBStorageService, Route, Routes, Cities, User, TIPs, TravelModes,
                  NotificationService,ValidationService,FeatureService) {

            $scope.isAuthFB = function () {
                return AuthFBService.isAuthFB;
            };
            $scope.getFBUserId = function () {
                return FBStorageService.getUserID();
            };
            $scope.filtersEnabled = false;
            $scope.travelModes = TravelModes.query();
            $scope.selectedTravelModes = [];
            $scope.cities = Cities.query();
            $scope.selectedCities = [];
            $scope.selectedFriends = [];
            $scope.friends = [];
            $scope.allowAddRoutes = false;
            $scope.loading = false;

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

            $scope.finishAddRoutes = function () {
                $scope.allowAddRoutes = false;
            };

            $scope.displayHelpMessage = function(){
                NotificationService.displayMessage("Click on the places in order to create Routes");
            };

            $scope.$watch('isAuthFB() && getFBUserId()', function(newVal){
                if (angular.isDefined(newVal) && newVal){
                    $scope.allowAddRoutes = false;
                    User.getFriends({facebookUserId: FBStorageService.getUserID()}).$promise
                        .then(function(friends){
                            $scope.friends = friends;
                        });
                }
            });

            $scope.$watchCollection('selectedCities', function (newVal, oldVal) {
                if (ValidationService.arrayChanged(newVal,oldVal)){
                    requestFeatures();
                }
            });
            $scope.$watchCollection('selectedTravelModes', function (newVal,oldVal){
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

            var requestFeatures = function(){
                var cities = _.map($scope.selectedCities, function (city) {
                    return city.id;
                });
                var URLparams = {
                    bounds: $scope.bounds,
                    cities: cities,
                    travelModes: $scope.selectedTravelModes
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
                    }, function (response) {
                        if (response.status == 500) {
                            NotificationService.displayMessage("Error retrieving TIPS");
                        }
                    });

                Routes.query(URLparams).$promise
                    .then(function (resultFeatures){
                    });
            };

            $scope.$watch('boundschanged', function (bounds, boundsOld) {
                if (angular.isDefined(bounds) && angular.isDefined(boundsOld)) {
                    $scope.bounds = FeatureService.layer2WKT(bounds);
                    requestFeatures();
                }
            });

            var activateLoading = function(){
                $scope.loading = true;
            };

            var disableLoading = function(){
                $scope.loading = false;
            };

            $scope.$watch('layerclicked', function (layer) {
                if (angular.isDefined(layer)) {
                    $scope.layerclicked = undefined;
                }
            });
        }]);
});