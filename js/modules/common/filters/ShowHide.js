'use strict';

define([
    '../module'
], function (module) {
    module.filter('showHide',function(){
        return function(value){
            if (value){
                return "Show";
            }else{
                return "Hide";
            }
        };
    });
});