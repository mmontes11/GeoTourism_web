'use strict';

define([
    '../module'
],function(module){
    module.controller('FBButtonCtrl',['Config','Facebook','AuthFBService','FBStorageService','User','NotificationService','BrowserService',
        function(Config,Facebook,AuthFBService,FBStorageService,User,NotificationService,BrowserService){

        this.userName = BrowserService.getStorage('FBUserName');
        this.profilePhotoURL = BrowserService.getStorage('FBProfilePhoto');

        this.isAuthFB = function(){
            return AuthFBService.isAuthFB;
        };
        this.isFBReady = function(){
            return Facebook.isReady();
        };
        this.logInFB = function(){
            var that = this;
            Facebook.login(function(response){
                var accessToken = response.authResponse.accessToken,
                    userID = response.authResponse.userID;
                if (angular.isDefined(accessToken) && angular.isDefined(userID)){
                    var user = {
                        accessToken: accessToken,
                        userID: userID
                    };
                    User.createOrRetrieve(user).$promise
                        .then(function(response){
                            that.userName = response.name || "Anonymous";
                            that.profilePhotoURL = response.facebookProfilePhotoUrl || "img/user.jpg";
                            FBStorageService.handleLogIn(accessToken,userID,that.userName,that.profilePhotoURL);
                            NotificationService.displayMessage("Logged as "+that.userName);
                        }, function(){
                            NotificationService.displayMessage("Error logging in with Facebook");
                        });
                }
            },{scope:Config.FACEBOOK_PERMISSIONS});
        };
        this.logOutFB = function(){
            var that = this;
            Facebook.logout(function(response){
                FBStorageService.handleLogOut();
                that.userName = undefined;
                that.profilePhotoURL = undefined;
            });
        };
    }]);
});
