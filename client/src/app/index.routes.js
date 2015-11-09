(function () {
    'use strict';

    // application routes configuration only

    angular.module('tw.practice').config(configureRoutes);

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
            });
    }

})();
