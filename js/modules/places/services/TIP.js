'use strict';

define([
    '../module'
], function(module){
    module.service('TIP',['$resource','Config', function($resource,Config){
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/admin/tip/:id',
            //Default params
            {
                id:'@id'
            },
            //Actions
            {
                patch: {
                    method: 'PATCH'
                }
            }
        );
    }]);
});