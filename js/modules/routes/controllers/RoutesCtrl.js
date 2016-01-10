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
            $scope.filtersEnabled = false;
            $scope.travelModes = TravelModes.query();
            $scope.selectedTravelModes = [];
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
        }]);
});