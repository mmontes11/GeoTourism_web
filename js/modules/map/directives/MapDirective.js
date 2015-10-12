'use strict';

define([
    '../module',
    'underscore',
    'leaflet',
    'leaflet-omnivore'
], function(module,_,L,omnivore){
    module.directive('map',['$timeout','Config', function($timeout,Config){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'partials/map/map.html',
            scope: {
                location: "=",
                data: "="
            },
            link: function(scope,element,attrs){

                var map = L.map('map').setView([-8.5622792,42.8802351],18);

                L.tileLayer(Config.BASE_LAYER_URL, {
                    maxZoom: 18,
                    id: Config.MAPBOX_PROJECT_ID,
                    accessToken: Config.MAPBOX_PROJECT_ID
                }).addTo(map);

                var processed = [];
                scope.$watch('data', function(data,oldVal){
                    if (angular.isDefined(data)){
                        if (angular.isDefined(data.userLocation)){
                            map.setView([data.userLocation.latitude,data.userLocation.longitude],13);
                        }

                        angular.forEach(data.features, function(feature, key){
                            if (angular.isDefined(feature) && !_.contains(processed,feature)){
                                omnivore.wkt.parse(feature.geom).addTo(map);
                                processed.push(feature);
                            }
                        });
                    }
                }, true);
            }
        };
    }]);
});
