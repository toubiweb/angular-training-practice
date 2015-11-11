(function () {
    'use strict';

    angular.module('tw.practice.util').directive('twMenu', twMenu);
    /** @ngInject */
    function twMenu() {
        return {
            templateUrl: 'app/components/util/menu/menu.html',
            controllerAs: 'vm',
            scope: {
                activeMenu: '='
            },
            bindToController: true,
            controller: TwMenuController
        };
    }

    /** @ngInject */
    function TwMenuController($state, twUserRepository, twSecurityService, twRouteSecurityService) {

        // view model
        var vm = this;

        // public attributes
        vm.user = twSecurityService.getCurrentUser();
        vm.routes = [
            {
                state: 'view-users',
                label: 'Users'
            }, {
                state: 'create-user',
                label: 'Create user'
            }
        ];

        // public methods
        vm.accessibleRoute = accessibleRoute;
        vm.clearCache = clearCache;
        vm.isUserAuthenticated = twSecurityService.isAuthenticated;

        function clearCache() {
            // clear cache
            twUserRepository.clearCache();
            // reload page
            $state.reload();
        }
        
        function accessibleRoute(route) {
            return twRouteSecurityService.hasAccess(route.state);
        }

        return vm;
    }

}());