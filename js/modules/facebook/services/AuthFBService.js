'use strict';

define([
    '../module'
],function(module){
    module.service('AuthFBService', ['Facebook','BrowserService', function(Facebook,BrowserService){

        this.isAuthFB = false;

        var that = this;
        Facebook.getLoginStatus(function(response) {
            that.isAuthFB = (response.status === 'connected');
        });
        Facebook.subscribe('auth.statusChange',function(response){
            if(response.status === 'connected'){
                that.isAuthFB = true;
            }else{
                that.isAuthFB = false;
                BrowserService.deleteStorage('fbUserID');
            }
        });
    }]);
});