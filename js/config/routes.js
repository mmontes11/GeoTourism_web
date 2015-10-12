'use strict';

define([
    '../app',
    'angularUiRouter'
], function(app){

    app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

        $stateProvider
            .state('places', {
                url: '/places',
                templateUrl: 'partials/places/places.html',
                controller: 'PlacesCtrl'
            })
            .state('admin',{
                url: '/admin',
                templateUrl: 'partials/admin/logInAdmin.html',
                controller: 'LogInAdminCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'partials/about'
            });
            $urlRouterProvider.otherwise('/places');
    }]);

    app.run(['$rootScope','$state','AuthAdminService', function($rootScope,$state,AuthAdminService){
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (AuthAdminService.isAuthenticated){
                if (toState.url == '/admin'){
                    event.preventDefault();
                    $state.go(toState);
                    return;
                }
            }
        });
    }]);

});