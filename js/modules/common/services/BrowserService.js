'use strict';

define([
    '../module'
], function(module){

    module.service('BrowserService', function ($window) {

        this.getSession =  function(key) {
            return $window.localStorage[key];
        };
        this.setSession = function(key, value) {
            $window.localStorage[key] = value;
        };
        this.deleteSession = function(key) {
            delete $window.localStorage[key];
        };
    });
});