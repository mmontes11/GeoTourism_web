'use strict';

define([
    '../module'
], function(module){
    module.directive('wikipediaSearch', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/wikipedia/wikipediaSearch.html',
            controller: 'WikipediaSearchCtrl',
            controllerAs: 'ctrl',
            scope: {
                placeholder: "@"
            },
            bindToController: {
                selectedsearchitem: "="
            }
        };
    });
});
