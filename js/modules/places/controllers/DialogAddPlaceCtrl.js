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

        $scope.$watch('selectedsearchitem', function (item) {
            if (angular.isDefined(item)) {
                $scope.place.infoUrl = item.url;
            } else {
                $scope.place.infoUrl = undefined;
            }
        });

        $scope.$watch('uploadedurl', function(uploadedUrl){
            if(angular.isDefined(uploadedUrl)){
                $scope.place.photoUrl = uploadedUrl;
            }
        });
    }]);
});
