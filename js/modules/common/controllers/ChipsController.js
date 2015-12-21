'use strict';

define([
    '../module'
], function (module) {
    module.controller('ChipsCtrl', function () {
        var self = this;

        self.items.$promise.then(function (items) {
            var lowerItems = items.map(function (item) {
                return {
                    id: item.id,
                    name: item.name,
                    lowerName: item.name.toLowerCase()
                }
            });

            self.selectedItem = null;
            self.searchText = null;
            self.querySearch = querySearch;
            self.transformChip = transformChip;

            function transformChip(chip) {
                if (angular.isObject(chip)) {
                    return chip;
                }
            }
            function querySearch(query) {
                return query ? lowerItems.filter(createFilterFor(query)) : [];
            }

            function createFilterFor(query) {
                return function filterFn(item) {
                    return (item.lowerName.indexOf(query) != -1);
                };
            }

        });

    });
});