'use strict';

define([
    '../app',
    'angularUiRouter'
], function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('places', {
                url: '/places',
                templateUrl: 'partials/places/places.html',
                controller: 'PlacesCtrl'
            })
            .state('routes', {
                url: '/routes',
                templateUrl: 'partials/routes/routes.html',
                controller: 'RoutesCtrl'
            })
            .state('adminConfig', {
                url: '/admin/config',
                templateUrl: 'partials/admin/configAdmin.html',
                controller: 'ConfigAdminCtrl as ctrl'
            })
            .state('adminLogIn', {
                url: '/admin/logIn',
                templateUrl: 'partials/admin/logInAdmin.html',
                controller: 'LogInAdminCtrl as ctrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'partials/common/about.html'
            });
        $urlRouterProvider.otherwise('/places');
    }]);

    app.run(['$rootScope', '$state', 'AuthAdminService', function ($rootScope, $state, AuthAdminService) {
        $rootScope.$on("$stateChangeStart", function (event, toState) {
            if (AuthAdminService.isAuthenticated && toState.url == "/admin/logIn") {
                event.preventDefault();
            }

            if (!AuthAdminService.isAuthenticated && toState.url == "/admin/config"){
                $state.go('adminLogIn');
                event.preventDefault();
            }
        });
    }]);

});