'use strict';

define([
    '../module'
], function(module){
    module.filter('placetype',function(){
        return function(type){
            switch (type){
                case "M":
                    return "Monument";
                case "NS":
                    return "Natural Space";
                case "H":
                    return "Hotel";
                case "R":
                    return "Restaurant";
            }
        };
    });
});
