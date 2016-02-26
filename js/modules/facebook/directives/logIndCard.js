'use strict';

define([
    '../module'
], function (module) {
    module.directive('logInCard', function () {
        return {
            restrict: "E",
            replace: false,
            templateUrl: "partials/facebook/logInCard.html",
            controller: 'FBButtonCtrl',
            controllerAs: 'ctrl',
            link: function (scope, element, attrs) {
                element
                    .find('button')
                    .css('background-color', '#4e69a2')
                    .css('color', '#d6d6d6');
            }
        }
    });
});