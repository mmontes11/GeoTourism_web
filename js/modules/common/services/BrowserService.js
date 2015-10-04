'use strict';

define([
    '../module'
], function(module){
    module
        .factory('BrowserService', function ($window, $cookies) {
            return {
                getSession: function (key) {
                    return $window.localStorage[key];
                },
                setSession: function (key, value) {
                    $window.localStorage[key] = value;
                },
                deleteSession: function (key) {
                    delete $window.localStorage[key];
                }
            }
        });
});