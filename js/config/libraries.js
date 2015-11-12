'use strict';

define([
    '../app'
], function(app){
    app.config(['$mdThemingProvider', function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('blue');
    }]);
    app.config(['FacebookProvider','Config',function(FacebookProvider,Config){
        FacebookProvider.init(Config.FACEBOOK_APP_ID);
    }]);
});