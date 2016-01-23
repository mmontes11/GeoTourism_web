'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddRouteCtrl', ['$scope', '$mdDialog', 'travelModes', 'travelMode', 'TIPIds', 'TIPs',
        function ($scope, $mdDialog, travelModes, travelMode, TIPIds, TIPs) {

            $scope.travelModes = travelModes;
            $scope.travelModeChanged = false;
            $scope.tipsChanged = false;

            var urlParams = {
                TIPIds: TIPIds
            };

            $scope.route = {
                travelMode: travelMode,
                tips: TIPs.getTIPMinDtos(urlParams)
            };

            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                var response = {
                    route: {
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
        }]);
});