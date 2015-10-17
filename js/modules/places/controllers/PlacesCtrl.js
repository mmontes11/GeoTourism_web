'use strict';

define([
    '../module'
], function (module) {
    module.controller('PlacesCtrl', ['$scope', '$mdDialog', 'LocationService', 'CityService', 'TIPsService', 'AuthAdminService', 'NotificationService',
        function ($scope, $mdDialog, LocationService, CityService, TIPsService, AuthAdminService, NotificationService) {

            $scope.isAuthenticated = function(){
                return AuthAdminService.isAuthenticated;
            };

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

            $scope.$watch('locationchanged',function(locationNew,locationOld){
                if (angular.isDefined(locationNew)){
                    var locationStr = LocationService.getLocationString(locationNew.lng, locationNew.lat);
                    $scope.features = TIPsService.query({location: locationStr});
                }
            });

            $scope.$watch('locationclicked',function(location){
                if ($scope.isAuthenticated && $scope.allowAddTIPs && angular.isDefined(location)){
                    console.log(location);
                    var locationStr = LocationService.getLocationString(location.lng, location.lat);
                    CityService.get({location: locationStr}).$promise
                        .then(function(){

                        }, function(){
                            NotificationService.displayMessage("The place should be located in a existing city");
                        });

                }
            });

        }]);
});