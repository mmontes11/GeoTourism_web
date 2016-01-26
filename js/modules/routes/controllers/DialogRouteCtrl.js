'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogRouteCtrl', ['$scope', '$mdDialog', 'feature', 'Route', 'AuthFBService', 'NotificationService', 'TravelModes',
        function ($scope, $mdDialog, feature, Route, AuthFBService, NotificationService, TravelModes) {

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
            $scope.travelModes = TravelModes.query();

            $scope.edit = false;
            $scope.enableEdit = function () {
                $scope.edit = true;
            };

            $scope.disableEdit = function (reset) {
                if (reset) {
                    $scope.route = angular.copy($scope.copy);
                }
                $scope.edit = false;
            };

            $scope.formValidAndDirty = function (form) {
                return (angular.isDefined(form) && form.$valid && (form.$dirty || $scope.travelModeChanged || $scope.tipsChanged));
            };

            $scope.saveChanges = function () {
                var patchPayload = _.pick($scope.route, 'name', 'description', 'travelMode');
                if ($scope.travelModeChanged || $scope.tipsChanged){
                    patchPayload["tipIds"] = _.map($scope.route.tips, function(tip){
                        return tip.id;
                    });
                }
                Route.patch({id:$scope.route.id}, patchPayload).$promise
                    .then(function (route) {
                        $scope.route = route;
                        $scope.route = angular.copy(route);
                        $scope.disableEdit(false);
                        NotificationService.displayMessage("Route updated!");
                    }, function (response) {
                        if (response.status == 500) {
                            NotificationService.displayMessage("Error updating Route");
                        }
                        $scope.close();
                    });
            };

            $scope.delete = function () {
                $scope.disableEdit();
                $mdDialog.hide("Delete");
            };

            $scope.close = function () {
                $mdDialog.cancel();
            };
        }]);
});