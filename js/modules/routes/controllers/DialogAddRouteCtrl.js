'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddRouteCtrl', ['$scope', '$mdDialog', 'travelMode', 'TIPIds', 'TIPs', 'TravelModes',
        function ($scope, $mdDialog, travelMode, TIPIds, TIPs, TravelModes) {

            console.log(travelMode);
            console.log(TIPIds);

            $scope.travelModes = TravelModes.query();

            var urlParams = {
                TIPIds: TIPIds
            };
            $scope.TIPMinDtos = TIPs.getTIPMinDtos(urlParams);

            $scope.route = {
                travelMode: travelMode
            };

            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                $mdDialog.hide($scope.route);
            };
        }]);
});