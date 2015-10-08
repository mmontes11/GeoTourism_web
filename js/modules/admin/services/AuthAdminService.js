'use strict';

define([
    '../module',
    'underscore'
], function (module, _) {

    module.service('AuthAdminService', ['$http', '$state', 'Config', 'PasswordEncrypter', 'BrowserService',
        function ($http, $state, Config, PasswordEncrypter, BrowserService) {

            this.login = function (username, clearPassword) {
                var url = Config.API_ROOT_URL + "/logIn";
                var payload = {
                    username: username,
                    password: PasswordEncrypter.encryptPassword(clearPassword)
                };
                return $http.post(url, payload);
            };

            this.logout = function () {
                console.log("logout");
                this.isAuthenticated = false;
                BrowserService.deleteSession("token");
                $state.go('logInAdmin');
            };

            this.isAuthenticated = (!_.isUndefined(BrowserService.getSession("token")));
        }]);
});