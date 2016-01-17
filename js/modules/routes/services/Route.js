'use strict';

define([
    '../module'
], function (module) {
    module.service('Route',['$resource','Config',function($resource,Config){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/social/route/:id',
            //Default Parameters
            {
                id: '@id',
                origin: '@origin',
                destination: '@destination',
                travelMode: '@travelMode'
            },
            //Actions
            {
                get: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/route/:id'
                },
                patch: {
                    method: 'PATCH'
                },
                getMaxWayPoints: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/social/route/maxpoints'
                },
                getShortestPath: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/social/route/geom?origin=:origin&destination=:destination&travelMode=:travelMode'
                }
            }
        );
    }]);
});