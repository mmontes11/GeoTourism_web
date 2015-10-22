'use strict';

define([
    '../app'
], function(app){
    app.config(['$mdThemingProvider', function($mdThemingProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('blue');
    }]);
})