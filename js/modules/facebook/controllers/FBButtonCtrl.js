'use strict';

define([
    '../module'
],function(module){
    module.controller('FBButtonCtrl',['Facebook','AuthFBService',function(Facebook,AuthFBService){

        this.isAuthFB = function(){
            return AuthFBService.isAuthFB;
        };
        this.logInFB = function(){
            Facebook.login(function(response){
                console.log(response);
            });
        };
        this.logOutFB = function(){
            Facebook.logout(function(response){
                console.log(response);
            });
        };
    }]);
});
