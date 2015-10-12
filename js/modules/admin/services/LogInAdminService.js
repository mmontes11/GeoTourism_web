'use strict';

define([
    '../module'
], function (module) {
    module.service('LogInAdminService', ['$http', 'Config', 'AuthAdminService', 'PasswordEncrypter', 'BrowserService', 'NotificationService',
        function ($http, Config, AuthAdminService, PasswordEncrypter, BrowserService, NotificationService) {

            this.logIn = function (username, clearPassword) {
                var url = Config.API_ROOT_URL + "/logIn";
                var payload = {
                    username: username,
                    password: PasswordEncrypter.encryptPassword(clearPassword)
                };
                return $http.post(url, payload);
            };

            this.logOut = function () {
                BrowserService.deleteSession("token");
                AuthAdminService.isAuthenticated = false;
                NotificationService.displayMessage("Logged Out!");
            };
        }]);
});
