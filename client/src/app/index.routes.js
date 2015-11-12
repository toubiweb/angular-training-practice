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
            .state('view-users-statistics', {
                url: '/users/statistics',
                templateUrl: 'app/profile/pages/users.statistics/users.statistics.html',
                controller: 'TwProfileUsersStatisticsController',
                controllerAs: 'vm'
            })
             .state('edit-location', {
                url: '/user/edit-my-location',
                templateUrl: 'app/profile/pages/user-location.edit/user-location.edit.html',
                controller: 'TwProfileUserLocationEditController',
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

    /** @ngInject */
    function configureRoutesSecurity($log, $rootScope, $state, twSecurityService, twRouteSecurityService) {

        // redirect if user does not has access to next route
        var cb = $rootScope.$on('$stateChangeStart', function (event, nextState) {

            if (!twRouteSecurityService.hasAccess(nextState)) {
                // prevent current route change
                event.preventDefault();
                if (twSecurityService.isAuthenticated()) {
                    // access denied
                    $log.error('Access denied: redirect to home page.');
                    $state.go('view-users');
                } else {
                    // use not authenticated
                    $log.error('User not authenticated: redirect to login page.');
                    $state.go('login');
                }
            }

        });
        $rootScope.$on('$destroy', cb)
    }

})();
