'use strict';

define([
    '../module'
],function(module){
    module.service('AuthFBStorageService',['BrowserService',function(BrowserService){

        this.handleLogIn = function(accessToken,userID){
            BrowserService.setStorage('FBAccessToken',accessToken);
            BrowserService.setStorage('FBUserID',userID);
        };
        this.handleLogOut = function(){
            BrowserService.deleteStorage('FBAccessToken');
            BrowserService.deleteStorage('FBUserID');
        };
    }]);
});