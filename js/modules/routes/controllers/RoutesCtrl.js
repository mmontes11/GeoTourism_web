'use strict';

define([
    '../module'
], function (module) {
    module.controller('RoutesCtrl', ['$scope', 'AuthFBService', 'FBStorageService', 'Route', 'TravelModes', 'NotificationService',
        function ($scope, AuthFBService, FBStorageService, Route, TravelModes, NotificationService) {

            $scope.isAuthFB = function () {
                return AuthFBService.isAuthFB;
            };
            $scope.getFBUserId = function () {
                return FBStorageService.getUserID();
            };

            TravelModes.query().$promise
                .then(function(travelModes){
                    $scope.travelModes = travelModes;
                    $scope.travelModePreference = travelModes[0];
                });
            $scope.allowAddRoutes = false;
            $scope.loading = false;

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
        }]);
});