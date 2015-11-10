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

    function TwMenuController($state, twUserRepository, twSecurityService) {

        // view model
        var vm = this;

        // public attributes
        vm.user = twSecurityService.getCurrentUser()
        
        // public methods
        vm.clearCache = clearCache;
        
        vm.isUserAuthenticated = twSecurityService.isAuthenticated;
        // public methods

        function clearCache(){
            // clear cache
            twUserRepository.clearCache();
            // reload page
            $state.reload();
        }
        
        return vm;
    }

}());
