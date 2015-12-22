'use strict';

define([
    '../module'
], function(module){
    module.directive('socialChips', ['ValidationService', function(ValidationService){
        return {
            restrict: 'E',
            replace: false,
            templateUrl: "partials/social/socialChips.html",
            scope: {
                friends: "="
            },
            link: function(scope,element,attrs){
                scope.selectedFriends = [];
                scope.$watch('friends', function(friends){
                    if (angular.isDefined(friends)){
                        scope.allFriends = _.map(friends,function(friend){
                            friend["lowerName"] = friend.name.toLowerCase();
                            return friend;
                        });
                    }
                });
                scope.$watchCollection('selectedFriends', function(newVal,oldVal){
                    if (ValidationService.arrayChanged(newVal,oldVal)) {
                        scope.$emit('socialChips.selectedFriends', newVal);
                    }
                });
                scope.querySearch =  function(query) {
                    return query ? scope.allFriends.filter(scope.createFilterFor(query)) : [];
                };
                scope.createFilterFor = function(query){
                    return function filterFn(friend) {
                        return (friend.lowerName.indexOf(query) != -1);
                    };
                }
            }
        }
    }]);
});
