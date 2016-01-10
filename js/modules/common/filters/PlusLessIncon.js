'use strict';

define([
    '../module'
], function (module) {
   module.filter('plusLessIcon',function(){
       return function(value){
           if (value){
               return "add";
           }else{
                return "remove";
           }
       };
   });
});