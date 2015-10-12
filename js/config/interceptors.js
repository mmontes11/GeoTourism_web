'use strict';

define([
    '../app'
], function(app){
    app.factory('TokenInterceptor', ['$q','BrowserService','AuthAdminService',
        function($q,BrowserService,AuthAdminService){
        return {
            request: function(config){
                config.headers = config.headers || {};
                if (!_.isUndefined(BrowserService.getSession('token'))){
                    config.headers.Authorization = 'Bearer ' + BrowserService.getSession('token');
                }
                return config;
            },
            requestError: function(rejection){
                return $q.reject(rejection);
            },
            response: function(response){
                if (response != null && response.status == 200 && BrowserService.getSession('token') && !AuthAdminService.isAuthenticated){
                    AuthAdminService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },
            responseError: function(rejection){
                if (rejection != null && rejection.status === 401 && (BrowserService.getSession('token') || AuthenticationService.isAuthenticated)) {
                    BrowserService.deleteSession('token');
                    AuthenticationService.isAuthenticated = false;
                }
                NotificationService.displayMessage("Your session as Admin has expired");
                return $q.reject(rejection);
            }
        };
    }]);

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    }]);
});