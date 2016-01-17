'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddRouteCtrl', ['$scope', '$mdDialog', 'travelMode', 'TIPIds',
        function ($scope, $mdDialog, travelMode, TIPIds) {

            console.log(travelMode);
            console.log(TIPIds);

            $scope.route = {};

            $scope.close = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                $mdDialog.hide($scope.route);
            };
        }]);
});