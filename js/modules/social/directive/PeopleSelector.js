'use strict';

define([
    '../module'
], function (module) {
    module.directive('peopleSelector', ['ValidationService', function(ValidationService){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'partials/social/peopleSelector.html',
            scope: {
                icon: "@",
                iconclass: "@",
                person: "="
            },
            link: function(scope) {
                scope.people = [
                    {
                        value: 0,
                        text: "Me"
                    },
                    {
                        value: 1,
                        text: "My Friends"
                    }
                ];
                scope.$watch('personSelected',function(newVal,oldVal){
                    if (ValidationService.valueChanged(newVal,oldVal)){
                        scope.$emit('peopleSelector.value',newVal);

                    }
                    scope.person = newVal;
                });
            }
        };
    }]);
});