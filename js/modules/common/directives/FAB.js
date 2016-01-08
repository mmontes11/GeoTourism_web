'use strict';

define([
    '../module'
], function(module){
    module.directive('fab', function(){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'partials/common/fab.html',
            link: function(scope,element,attrs){
                scope.isOpen = false;
            }
        };
    });
});
