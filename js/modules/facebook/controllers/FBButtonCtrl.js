'use strict';

define([
    '../module'
],function(module){
    module.controller('FBButtonCtrl',['Facebook','AuthFBService','BrowserService',function(Facebook,AuthFBService,BrowserService){

        this.isAuthFB = function(){
            return AuthFBService.isAuthFB;
        };
        this.logInFB = function(){
            Facebook.login(function(response){
                var userID = response.authResponse.userID;
                if (angular.isDefined(userID)){
                    BrowserService.setStorage('fbUserID',userID);
                }
            });
        };
        this.logOutFB = function(){
            Facebook.logout(function(){
                BrowserService.deleteStorage('fbUserID');
            });
        };
    }]);
});
