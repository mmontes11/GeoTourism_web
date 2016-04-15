'use strict';

define([
    '../module'
], function (module) {
   module.directive("iconPicker", function(){
       return {
           restrict: 'E',
           replace: true,
           templateUrl: 'partials/common/iconPicker.html',
           scope: {
               "icon": "="
           }
       }
   });
});