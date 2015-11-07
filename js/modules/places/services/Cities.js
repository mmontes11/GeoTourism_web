'use strict';

define([
    '../module'
], function(module){
    module.service('Cities',['$resource','Config', function($resource,Config){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/cities',
            //Default Parameters
            {},
            //Actions
            {}
        );
    }]);
});