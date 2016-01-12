'use strict';

define([
    '../module'
], function (module) {
    module.controller('RoutesCtrl', ['$scope', 'AuthFBService', 'FBStorageService', 'Route', 'Cities', 'User', 'TIPs', 'TravelModes',
        'NotificationService','ValidationService',
        function ($scope, AuthFBService, FBStorageService, Route, Cities, User, TIPs, TravelModes,
                  NotificationService,ValidationService) {

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
                console.log('requestFeatures');
            };
        }]);
});