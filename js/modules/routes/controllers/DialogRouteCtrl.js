'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogRouteCtrl', ['$scope', '$mdDialog', 'feature', 'Route', 'AuthFBService', 'NotificationService',
        function ($scope, $mdDialog, feature, Route, AuthFBService, NotificationService) {

            $scope.isAuthFB = function () {
                return AuthFBService.isAuthFB;
            };

            Route.get({
                id: feature.id
            }).$promise.then(
                function(route){
                    $scope.route = route;
                    $scope.copy = angular.copy(route);
                }, function(response){
                    if (response.status === 404) {
                        NotificationService.displayMessage("Place not found");
                    }
                    if (response.status = 500){
                        NotificationService.displayMessage("Error retrieving Route")
                    }
                    $scope.close();
                }
            );

            $scope.close = function () {
                $mdDialog.cancel();
            };
        }]);
});