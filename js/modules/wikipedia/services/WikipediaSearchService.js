'use strict';

define([
    '../module'
], function (module) {
    module.service('WikipediaSearchService', ['$http', 'Config', function ($http, Config) {
        this.search = function(keywords){
            var languageDetectionUrl = Config.API_ROOT_URL + "/admin/wikipedia?keywords=" + keywords;
            return $http.get(languageDetectionUrl);
        };
    }]);
});