'use strict';

define([
    '../module'
], function(module) {
    module.directive('chips', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/common/chips.html',
            controller: 'ChipsCtrl',
            controllerAs: 'ctrl',
            scope: {
                selected: "=",
                placeholder: "@"
            },
            bindToController: {
                items: "="
            }
        }
    });
});
