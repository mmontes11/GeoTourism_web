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
                id: '@id'
            },
            //Actions
            {
                get: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/route/:id?facebookUserId=:facebookUserId'
                },
                patch: {
                    method: 'PATCH'
                },
                getShortestPath: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/social/route/geom'
                }
            }
        );
    }]);
});