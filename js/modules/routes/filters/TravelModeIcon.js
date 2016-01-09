'use strict';

define([
    '../module'
], function (module) {
   module.filter('travelModeIcon', function(){
       return function(travelMode){
           switch(travelMode){
               case "walking":
                   return "directions_walk";
               case "bicycling":
                   return "directions_bike";
               case "driving":
                   return "directions_car";
               default:
                   return "directions";
           }
       };
   });
});
