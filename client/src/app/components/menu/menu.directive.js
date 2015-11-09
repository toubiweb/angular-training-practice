(function () {
    'use strict';

    angular.module('tw.practice').directive('twMenu', twMenu);
    /** @ngInject */
    function twMenu() {
        return {
            templateUrl: 'app/components/menu/menu.html',
            controllerAs: 'vm',
            scope: {
                activeMenu: '='
            },
            bindToController: true,
            controller: TwMenuController
        };
    }

    function TwMenuController($state, twUserRepository) {

        // view model
        var vm = this;

        // public attributes
        
        // public methods

        // initialization
        init();

        function init() {}
        
        return vm;
    }

}());
