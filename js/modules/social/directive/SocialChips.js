'use strict';

define([
    '../module'
], function(module){
    module.directive('socialChips',function(){
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
                scope.$watch('selectedFriends', function(selectedFriends){
                    console.log(selectedFriends);
                    scope.$emit('socialChips.selectedFriends',selectedFriends);
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
    });
});
