'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$mdDialog', 'LocationService', 'TIPsService',
        function ($scope, $mdDialog, LocationService, TIPsService) {

            $scope.$watch('changed',function(locationNew,locationOld){
                if (angular.isDefined(locationNew)){
                    var locationStr = LocationService.getLocationString(locationNew.lng, locationNew.lat);
                    $scope.features = TIPsService.query({location: locationStr});
                }
            });
        }]);
});