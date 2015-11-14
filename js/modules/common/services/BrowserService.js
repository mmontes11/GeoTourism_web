'use strict';

define([
    '../module'
], function(module){

    module.service('BrowserService', function ($window) {

        this.getStorage =  function(key) {
            return $window.localStorage[key];
        };
        this.setStorage = function(key, value) {
            $window.localStorage[key] = value;
        };
        this.deleteStorage = function(key) {
            delete $window.localStorage[key];
        };
    });
});