'use strict';

define([
    '../module'
],function(module){
    module.service('AuthFBService', ['Facebook', function(Facebook){

        this.isAuthFB = false;

        var that = this;
        Facebook.getLoginStatus(function(response) {
            that.isAuthFB = (response.status === 'connected');
        });
        Facebook.subscribe('auth.statusChange',function(response){
            that.isAuthFB = (response.status === 'connected');
        });
    }]);
});