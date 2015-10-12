'use strict';

define([
    '../module',
    'underscore'
], function (module, _) {

    module.service('AuthAdminService', ['$http', '$state', '$mdToast', 'Config', 'PasswordEncrypter', 'BrowserService',
        function ($http, $state, $mdToast, Config, PasswordEncrypter, BrowserService) {

            this.logIn = function (username, clearPassword) {
                var url = Config.API_ROOT_URL + "/logIn";
                var payload = {
                    username: username,
                    password: PasswordEncrypter.encryptPassword(clearPassword)
                };
                return $http.post(url, payload);
            };

            this.logOut = function () {
                this.isAuthenticated = false;
                BrowserService.deleteSession("token");
                $state.go('logInAdmin');
                $mdToast.show(
                    $mdToast.simple()
                        .content('Logged Out!')
                        .position('top right')
                        .hideDelay(Config.TOAST_TIMEOUT)
                );
            };

            this.isAuthenticated = (!_.isUndefined(BrowserService.getSession("token")));
        }]);
});