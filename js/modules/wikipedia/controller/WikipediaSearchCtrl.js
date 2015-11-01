'use strict';

define([
    '../module'
], function(module){
    module.controller('WikipediaSearchCtrl',['$scope','$q','WikipediaSearchService', function($scope,$q,WikipediaSearchService){
        var self = this;
        self.noCache = false;
        self.querySearch   = querySearch;
        self.itemSelected = itemSelected;
        function querySearch (query) {
            var deferred = $q.defer();
            WikipediaSearchService.search(query)
                .then(function(response){
                    if (response.data.length > 0){
                        deferred.resolve(response.data);
                    }else{
                        deferred.reject(response.data);
                    }
                });
            return deferred.promise;
        }
        function itemSelected(item){
            self.selectedsearchitem = item;
        }
    }]);
});
