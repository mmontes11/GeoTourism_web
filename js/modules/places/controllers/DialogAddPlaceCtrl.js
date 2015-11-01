'use strict';

define([
    '../module'
], function (module) {
    module.controller('DialogAddPlaceCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {

        $scope.types = [
            {id: "M", name: "Monument"},
            {id: "NS", name: "Natural Space"},
            {id: "H", name: "Hotel"},
            {id: "R", name: "Restaurant"}
        ];

        $scope.close = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            if (angular.isDefined($scope.photo)) {
                $scope.place.photoContent = $scope.photo.$ngfDataUrl;
                $scope.place.photoName = $scope.photo.name;
            }
            if (angular.isDefined($scope.infoUrl)){
                $scope.place.infoUrl = $scope.infoUrl;
            }
            $mdDialog.hide($scope.place);
        };

        $scope.$watch('selectedsearchitem', function (item) {
            if (angular.isDefined(item)) {
                $scope.infoUrl = item.url;
            } else {
                $scope.infoUrl = undefined;
            }
        });
    }]);
});
