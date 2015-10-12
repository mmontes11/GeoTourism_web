'use strict';

define([
    '../module'
], function(module){
    module.service('LocationService', ['$q',function($q){

        this.getCurrentLocation = function(){
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function (pos) {
                deferred.resolve(pos);
            }, function (error) {
                deferred.reject(error)
            });
            return deferred.promise;
        };

        this.getLocationString = function(longitude,latitude){
            return longitude + "," + latitude;
        };
    }]);
});