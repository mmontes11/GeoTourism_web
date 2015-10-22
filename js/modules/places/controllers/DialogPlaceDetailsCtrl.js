'use strict';

define([
    '../module'
], function(module){
    module.controller('DialogPlaceDetailsCtrl',['$scope','$mdDialog','feature', function($scope,$mdDialog,feature){

        $scope.feature = feature;

        $scope.close = function() {
            $mdDialog.cancel();
        };

    }]);
});
