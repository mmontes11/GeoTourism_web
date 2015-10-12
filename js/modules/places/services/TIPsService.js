'use strict';

define([
    '../module'
], function(module){
    module.service('TIPsService',['$resource','Config', function($resource,Config){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/tips',
            //Default Parameters
            {
                radius: Config.SEARCH_RADIUS_IN_METRES
            },
            //Actions
            {}
        );
    }]);
});
