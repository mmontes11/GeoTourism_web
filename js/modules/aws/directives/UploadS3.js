'use strict';

define([
    '../module'
], function(module){
   module.directive('file',function(){
       return {
           restrict: 'AE',
           scope: {
               file: '@'
           },
           link: function(scope, el, attrs){
               el.bind('change', function(event){
                   var files = event.target.files;
                   var file = files[0];
                   console.log(file);
                   scope.file = file;
                   scope.$parent.file = file;
                   scope.$apply();
               });
           }
       };
   });
});