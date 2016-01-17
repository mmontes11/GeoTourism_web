'use strict';

define([
    '../module'
], function(module){
    module.service('TIPs',['$resource','Config', function($resource,Config){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/tips',
            //Default Parameters
            {},
            //Actions
            {
                getTIPMinDtos: {
                    url: Config.API_ROOT_URL + '/tips/min',
                    method: 'GET',
                    isArray: true
                }
            }
        );
    }]);
});
