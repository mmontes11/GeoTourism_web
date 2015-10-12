'use strict';

define([
    '../module',
    'underscore'
], function (module, _) {
    module.service('AuthAdminService', ['BrowserService', function (BrowserService) {

        this.isAuthenticated = (!_.isUndefined(BrowserService.getSession("token")));
    }]);
});