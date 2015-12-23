'use strict';

define([
    '../../facebook/module'
], function (module) {
    module.service('User', ['$resource', 'Config', function ($resource, Config) {
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/social/user',
            //Default Parameters
            {},
            //Actions
            {
                createOrRetrieve: {
                    method: 'GET'
                },
                getFriends: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/social/user/friends',
                    isArray: true
                }
            }
        );
    }]);
});