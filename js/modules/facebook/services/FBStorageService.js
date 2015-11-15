'use strict';

define([
    '../module'
],function(module){
    module.service('FBStorageService',['BrowserService',function(BrowserService){

        this.handleLogIn = function(accessToken,userID,userName,profilePhotoURL){
            BrowserService.setStorage('FBAccessToken',accessToken);
            BrowserService.setStorage('FBUserID',userID);
            BrowserService.setStorage('FBUserName',userName);
            BrowserService.setStorage('FBProfilePhoto',profilePhotoURL);
        };
        this.handleLogOut = function(){
            BrowserService.deleteStorage('FBAccessToken');
            BrowserService.deleteStorage('FBUserID');
            BrowserService.deleteStorage('FBUserName');
            BrowserService.deleteStorage('FBProfilePhoto');
        };
    }]);
});