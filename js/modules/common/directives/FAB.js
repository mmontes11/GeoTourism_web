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
                element.css({
                    'position':'absolute',
                    'bottom':'0',
                    'margin-left': '85%',
                    'margin-bottom': '2%'
                });
            }
        };
    });
});
