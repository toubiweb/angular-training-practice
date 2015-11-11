(function () {
    'use strict';

    // application routes configuration only

    angular.module('tw.practice').config(configureRoutes);

    angular.module('tw.practice').run(configureRoutesSecurity);

    /** @ngInject */
    function configureRoutes($stateProvider) {

        // states configuration
        $stateProvider
            .state('view-users', {
                url: '/',
                templateUrl: 'app/profile/pages/users.list/users.list.html',
                controller: 'TwProfileUsersListController',
                controllerAs: 'vm'
            })
            .state('create-user', {
                url: '/user/create-user',
                templateUrl: 'app/profile/pages/user-profile.edit/user-profile.edit.html',
                controller: 'TwProfileUserEditController',
                controllerAs: 'vm',
                roles: ['admin']
            })
            .state('edit-user', {
                url: '/user/:userId/edit-profile',
                templateUrl: 'app/profile/pages/user-profile.edit/user-profile.edit.html',
                controller: 'TwProfileUserEditController',
                controllerAs: 'vm',
                authenticate: true
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'TwLoginController',
                controllerAs: 'vm'
            }).state('logout', {
                url: '/logout',
                controller: 'TwLogoutController',
                controllerAs: 'vm'
            });
    }

    
    function configureRoutesSecurity($rootScope, $location, twSecurityService) {
        // Redirect to login if route requires auth and you're not logged in

        var cb = $rootScope.$on('$stateChangeStart', function (event, nextState) {
            if ((nextState.authenticate || nextState.roles) && !twSecurityService.isAuthenticated()) {
                // user not logged in: redirect
                $location.path('/login');
            } else if (twSecurityService.hasRole(nextState.roles)) {
                // user not authorized: redirect
                $location.path('/');
            }
        });
        $rootScope.$on('$destroy', cb)
    }
    
})();
