'use strict';

define([
    '../app'
], function(app){
    app.factory('AuthInterceptor', ['$q','$injector','BrowserService','FBStorageService','AuthFBService',
        function($q,$injector,BrowserService,FBStorageService,AuthFBService){
        return {
            request: function(config){
                config.headers = config.headers || {};
                config.params = config.params || {};
                if (angular.isDefined(BrowserService.getStorage('token'))){
                    config.headers.Authorization = 'Bearer ' + BrowserService.getStorage('token');
                }
                if (angular.isDefined(FBStorageService.getAccessToken())){
                    config.headers.AuthorizationFB = FBStorageService.getAccessToken();
                }
                if (angular.isDefined(FBStorageService.getUserID())){
                    config.params.facebookUserId = FBStorageService.getUserID();
                }
                return config || $q.when(config);
            },
            requestError: function(rejection){
                return $q.reject(rejection);
            },
            responseError: function(rejection){
                var AuthAdminService = $injector.get('AuthAdminService');
                if (rejection != null) {
                    if(AuthFBService.isAuthFB && rejection.status === 403){
                        $injector.get('LogInFacebookService').logOutFB();
                        $injector.get('$mdDialog').cancel();
                        $injector.get('NotificationService').displayMessage("Invalid or expired Facebook token");
                    }else if (AuthAdminService.isAuthenticated && rejection.status === 401){
                        BrowserService.deleteStorage('token');
                        AuthAdminService.isAuthenticated = false;
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