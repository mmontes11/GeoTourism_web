'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddRouteCtrl', ['$scope', '$mdDialog', 'route', 'travelModes', 'travelMode', 'TIPIds', 'TIPs',
        function ($scope, $mdDialog, route, travelModes, travelMode, TIPIds, TIPs) {

            $scope.travelModes = travelModes;
            $scope.travelModeChanged = false;
            $scope.tipsChanged = false;

            var urlParams = {
                TIPIds: TIPIds
            };

            $scope.route = route;
            $scope.route.travelMode = travelMode;
            $scope.route.tips = TIPs.getTIPMinDtos(urlParams);

            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                var response = {
                    route: {
                        id: $scope.route.id,
                        name: $scope.route.name,
                        description: $scope.route.description,
                        travelMode: $scope.route.travelMode,
                        tipIds: _.map($scope.route.tips, function (tip) {
                            return tip.id;
                        })
                    },
                    changed: ($scope.travelModeChanged || $scope.tipsChanged)
                };
                $mdDialog.hide(response);
            };

            $scope.$on("Route.AddPlaces", function(){
                $scope.close();
            });
        }]);
});