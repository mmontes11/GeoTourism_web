'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddPlaceCtrl', ['$scope', '$mdDialog', 'TIP', function ($scope, $mdDialog, TIP) {

        $scope.place = {};

        $scope.types = TIP.getTypes();

        $scope.close = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            $mdDialog.hide($scope.place);
        };
    }]);
});
