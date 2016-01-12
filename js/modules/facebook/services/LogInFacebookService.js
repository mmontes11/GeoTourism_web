'use strict';

define([
    '../module'
], function (module) {
    module.service('LogInFacebookService', ['$q', 'Facebook', 'FBStorageService', 'User', 'NotificationService', 'AuthFBService', 'Config',
        function ($q, Facebook, FBStorageService, User, NotificationService, AuthFBService, Config) {
            this.logInFB = function () {
                var deferred = $q.defer();
                var that = this;
                Facebook.login(function (response) {
                    if (angular.isDefined(response.authResponse) && response.authResponse!=null &&
                        angular.isDefined(response.authResponse.accessToken) &&
                        angular.isDefined(response.authResponse.userID)) {

                        var accessToken = response.authResponse.accessToken,
                            userID = response.authResponse.userID;
                        FBStorageService.storeAccessToken(accessToken);
                        var user = {
                            facebookUserId: userID
                        };
                        User.createOrRetrieve(user).$promise
                            .then(function (response) {
                                var userName = response.name || "Anonymous",
                                    profilePhotoURL = response.facebookProfilePhotoUrl || "img/user.jpg";
                                AuthFBService.isAuthFB = true;
                                FBStorageService.handleLogIn(userID, userName, profilePhotoURL);
                                NotificationService.displayMessage("Logged as " + userName);
                                deferred.resolve({
                                    userName: userName,
                                    profilePhotoURL: profilePhotoURL
                                });
                            }, function () {
                                that.logOutFB();
                                deferred.reject();
                            });
                    } else {
                        deferred.reject();
                    }
                }, {scope: Config.FACEBOOK_PERMISSIONS});
                return deferred;
            };
            this.logOutFB = function () {
                Facebook.logout(function () {
                    AuthFBService.isAuthFB = false;
                    FBStorageService.handleLogOut();
                });
            };
        }]);
});
