'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$mdDialog', 'LocationService', 'TIPsService', 'AuthAdminService',
        function ($scope, $mdDialog, LocationService, TIPsService, AuthAdminService) {


            $scope.types = [
                {id:1,name:"Monument"}
            ];

            $scope.cities = [
                {id:1,name:"Santiago de Compostela"}
            ];

            $scope.allowAddTIPs = false;

            $scope.addTIP = function(){
                $scope.allowAddTIPs = true;
            };

            $scope.finishAddTIPs = function(){
                $scope.allowAddTIPs = false;
            };

            $scope.isAuthenticated = function(){
                return AuthAdminService.isAuthenticated;
            };

            $scope.$watch('changed',function(locationNew,locationOld){
                if (angular.isDefined(locationNew)){
                    var locationStr = LocationService.getLocationString(locationNew.lng, locationNew.lat);
                    $scope.features = TIPsService.query({location: locationStr});
                }
            });

        }]);
});