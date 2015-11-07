'use strict';

define([
    '../module'
], function (module) {
   module.directive('formPlace', function(){
       return {
           restrict: 'E',
           replace: true,
           templateUrl: 'partials/places/formPlace.html',
           scope: {
               form: "=",
               place: "=",
               types: "="
           }
       };
   });
});
