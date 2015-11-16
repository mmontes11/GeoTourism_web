'use strict';

define([
    '../app'
], function(app){
    app.factory('AuthInterceptor', ['$q','$injector','BrowserService','AuthAdminService','AuthFBService',
        function($q,$injector,BrowserService,AuthAdminService,AuthFBService){
        return {
            request: function(config){
                config.headers = config.headers || {};
                if (BrowserService.getStorage('token')){
                    config.headers.Authorization = 'Bearer ' + BrowserService.getStorage('token');
                }
                return config || $q.when(config);
            },
            requestError: function(rejection){
                return $q.reject(rejection);
            },
            response: function(response){
                if (response != null && response.status == 200 && !AuthAdminService.isAuthenticated){
                    AuthAdminService.isAuthenticated = true;
                }
                return response || $q.when(response);
            },
            responseError: function(rejection){
                if (rejection != null && rejection.status === 401) {
                    if(AuthFBService.isAuthFB && angular.isDefined(rejection.config.data.accessToken)){
                        $injector.get('LogInFacebookService').logOutFB();
                        $injector.get('$mdDialog').cancel();
                        $injector.get('NotificationService').displayMessage("Invalid or expired Facebook token");
                    }else if (AuthAdminService.isAuthenticated){
                        AuthAdminService.isAuthenticated = false;
                        BrowserService.deleteStorage('token');
                        $injector.get('$state').transitionTo('admin');
                        $injector.get('$mdDialog').cancel();
                        $injector.get('NotificationService').displayMessage("Invalid or expired Admin token");
                    }

                }
                return $q.reject(rejection);
            }
        };
    }]);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);
});