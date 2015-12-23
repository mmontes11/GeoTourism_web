'use strict';

define([
    '../module',
    'underscore'
], function (module, _) {
    module.service('AuthAdminService', ['Admin','BrowserService','PasswordEncrypter', 'NotificationService',
        function (Admin,BrowserService,PasswordEncrypter,NotificationService) {

        this.logIn = function (username, clearPassword) {
            var payload = {
                username: username,
                password: PasswordEncrypter.encryptPassword(clearPassword)
            };
            return Admin.logIn(payload);
        };
        this.logOut = function () {
            BrowserService.deleteStorage("token");
            this.isAuthenticated = false;
            NotificationService.displayMessage("Admin Logged Out");
        };
        this.isAuthenticated = (!_.isUndefined(BrowserService.getStorage("token")));
    }]);
});