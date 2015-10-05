'use strict';

define([
    '../app',
    'angularUiRouter'
], function(app){
    return app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

            $stateProvider
                .state('adminPlaces', {
                    url: '/places',
                    templateUrl: 'partials/places/places.html',
                    controller: 'PlacesAdminCtrl'
                })
                .state('logInAdmin',{
                    url: '/login',
                    templateUrl: 'partials/admin/logInAdmin.html',
                    controller: 'LogInAdminCtrl'
                });

            $urlRouterProvider.otherwise('/login');

        }]);
});