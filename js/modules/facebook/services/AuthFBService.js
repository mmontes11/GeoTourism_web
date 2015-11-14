'use strict';

define([
    '../module'
],function(module){
    module.service('AuthFBService', ['Facebook','AuthFBStorageService', function(Facebook,AuthFBStorageService){

        this.isAuthFB = false;

        var that = this;
        Facebook.getLoginStatus(function(response) {
            that.isAuthFB = (response.status === 'connected');
        });
        Facebook.subscribe('auth.statusChange',function(response){
            console.log(response);
            if(response.status === 'connected'){
                that.isAuthFB = true;
            }else{
                that.isAuthFB = false;
                AuthFBStorageService.handleLogOut();
            }
        });
    }]);
});