'use strict';

define([
    '../module'
],function(module){
    module.service('FBStorageService',['BrowserService',function(BrowserService){

        this.storeAccessToken = function(accessToken){
            BrowserService.setStorage('FBAccessToken',accessToken);
        };
        this.deleteAccessToken = function(){
            BrowserService.deleteStorage('FBAccessToken');
        };
        this.getAccessToken = function(){
            return BrowserService.getStorage('FBAccessToken');
        };
        this.storeUserID = function(userID){
            BrowserService.setStorage('FBUserID',userID);
        };
        this.deleteUserID = function(){
            BrowserService.deleteStorage('FBUserID');
        };
        this.getUserID = function(){
            return BrowserService.getStorage('FBUserID');
        };
        this.handleLogIn = function(userID,userName,profilePhotoURL){
            BrowserService.setStorage('FBUserName',userName);
            BrowserService.setStorage('FBProfilePhoto',profilePhotoURL);
        };
        this.handleLogOut = function(){
            this.deleteAccessToken();
            this.deleteUserID();
            BrowserService.deleteStorage('FBUserName');
            BrowserService.deleteStorage('FBProfilePhoto');
        };
    }]);
});