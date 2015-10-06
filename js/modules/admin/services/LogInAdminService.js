'use strict';

define([
    '../module'
], function (module) {

    module.service('LogInAdminService', ['$http','Config','PasswordEncrypter',function ($http,Config,PasswordEncrypter) {

        this.login = function (username, clearPassword) {
            var url = Config.API_ROOT_URL + "/logIn";
            var payload = {
                username: username,
                password: PasswordEncrypter.encryptPassword(clearPassword)
            };
            return $http.post(url,payload);
        };
    }]);
});