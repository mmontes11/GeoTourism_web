'use strict';

define([
    '../app',
    'angularUiRouter'
], function(app){

    app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

        $stateProvider
            .state('adminPlaces', {
                url: '/places',
                templateUrl: 'partials/places/places.html',
                controller: 'PlacesAdminCtrl'
            })
            .state('logInAdmin',{
                url: '/logIn',
                templateUrl: 'partials/admin/logInAdmin.html',
                controller: 'LogInAdminCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrk: 'partials/about'
            });
            $urlRouterProvider.otherwise('/logIn');
    }]);

    app.run(function($rootScope,$state){
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {


        });
    });

});