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
                commentId: '@commentId',
                type: '@type',
                favouriteValue: '@favouriteValue',
                ratingValue: '@ratingValue',
                commentText: '@commentText'
            },
            //Actions
            {
                get: {
                    method: 'GET',
                    url: Config.API_ROOT_URL + '/tip/:id'
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
                    url: Config.API_ROOT_URL + '/social/tip/:id/favourite?favouriteValue=:favouriteValue',
                    isArray: true
                },
                rate: {
                    method: 'POST',
                    url: Config.API_ROOT_URL + '/social/tip/:id/rating?ratingValue=:ratingValue'
                },
                comment: {
                    method: 'POST',
                    url: Config.API_ROOT_URL + '/social/tip/:id/comment?&commentText=:commentText',
                    isArray: true
                },
                deleteComment: {
                    method: 'DELETE',
                    url: Config.API_ROOT_URL + '/social/tip/:id/comment/:commentId',
                    isArray: true
                }
            }
        );
    }]);
});