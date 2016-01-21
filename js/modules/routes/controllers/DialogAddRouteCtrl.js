'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddRouteCtrl', ['$scope', '$mdDialog', 'travelModes', 'travelMode', 'TIPIds', 'TIPs',
        function ($scope, $mdDialog, travelModes, travelMode, TIPIds, TIPs) {

            console.log(travelModes);
            console.log(travelMode);
            console.log(TIPIds);

            $scope.travelModes = travelModes;

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