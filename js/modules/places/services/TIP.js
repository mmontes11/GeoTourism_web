'use strict';

define([
    '../module'
], function (module) {
    module.service('TIP', ['$resource', 'Config', function ($resource, Config) {
        return $resource(
            //Resource URL
            Config.API_ROOT_URL + '/admin/tip/:id',
            //Default Parameters
            {
                id: '@id',
                type: '@type',
                facebookUserId: '@facebookUserId',
                favouriteValue: '@favouriteValue',
                ratingValue: '@ratingValue',
                commentText: '@commentText'
            },
            //Actions
            {
                get: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/tip/:id?facebookUserId=:facebookUserId'
                },
                patch: {
                    method: 'PATCH'
                },
                getTypes: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/tip/types',
                    isArray: true
                },
                getTypeName: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/tip/type/:type'
                },
                favourite: {
                    method: 'POST',
                    url: Config.API_ROOT_URL + '/social/tip/:id/favourite?facebookUserId=:facebookUserId&favouriteValue=:favouriteValue',
                    isArray: true
                },
                rate: {
                    method: 'POST',
                    url: Config.API_ROOT_URL + '/social/tip/:id/rating?facebookUserId=:facebookUserId&ratingValue=:ratingValue'
                },
                comment: {
                    method: 'POST',
                    url: Config.API_ROOT_URL + '/social/tip/:id/comment?facebookUserId=:facebookUserId&commentText=:commentText',
                    isArray: true
                }
            }
        );
    }]);
});