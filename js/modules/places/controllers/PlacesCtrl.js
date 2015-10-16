'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$mdDialog', 'LocationService', 'TIPsService', 'AuthAdminService', 'NotificationService',
        function ($scope, $mdDialog, LocationService, TIPsService, AuthAdminService, NotificationService) {


            $scope.types = [
                {id:1,name:"Monument"}
            ];

            $scope.cities = [
                {id:1,name:"Santiago de Compostela"}
            ];

            $scope.allowAddTIPs = false;

            $scope.addTIP = function(){
                NotificationService.displayMessage("Click to add Places");
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