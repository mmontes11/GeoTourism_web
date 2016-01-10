'use strict';

define([
    '../module'
],function(module){
    module.controller('FBButtonCtrl',
        ['Config','Facebook','AuthFBService','FBStorageService','LogInFacebookService','User','NotificationService','BrowserService',
        function(Config,Facebook,AuthFBService,FBStorageService,LogInFacebookService,User,NotificationService,BrowserService){

        this.userName = BrowserService.getStorage('FBUserName');
        this.profilePhotoURL = BrowserService.getStorage('FBProfilePhoto');
        this.loading = false;

        this.isAuthFB = function(){
            return AuthFBService.isAuthFB;
        };
        this.isFBReady = function(){
            return Facebook.isReady();
        };
        this.logInFB = function(){
            var that = this;
            that.loading = true;
            LogInFacebookService.logInFB().promise
                .then(function(response){
                    that.loading = false;
                    that.userName = response.userName;
                    that.profilePhotoURL = response.profilePhotoURL;
                });
        };
        this.logOutFB = function(){
            LogInFacebookService.logOutFB();
            this.userName = undefined;
            this.profilePhotoURL = undefined;
        };
    }]);
});
