'use strict';

define([
    '../module'
], function (module) {
    module.directive('formPlace', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/places/formPlace.html',
            scope: {
                form: "=",
                edit: "=",
                place: "=",
                restoreplace: "=",
                types: "="
            },
            link: function (scope, element, attrs) {
                scope.place = scope.place || {};
                scope.edit = eval(scope.edit);
                console.log(scope.edit);

                scope.$watch('selectedsearchitem', function (item) {
                    if (angular.isDefined(item)) {
                        scope.place.infoUrl = item.url;
                    } else {
                        if (angular.isDefined(scope.restoreplace)){
                            scope.place.infoUrl = angular.copy(scope.restoreplace.infoUrl);
                        }else{
                            scope.place.infoUrl = undefined;
                        }

                    }
                });

                scope.$watch('uploadedurl', function (uploadedUrl) {
                    if (angular.isDefined(uploadedUrl)) {
                        scope.place.photoUrl = uploadedUrl;
                        scope.form.$dirty = true;
                    }
                });
            }
        };
    });
});
