(function () {

    'use strict';

    angular.module('tw.practice.security', ['angular-jwt']);

    angular.module('tw.practice.security').config(configureModule);

    angular.module('tw.practice.security').run(runModule);

    /** @ngInject */
    function configureModule() {

    }

    /** @ngInject */
    function runModule($rootScope, twSecurityService) {
    }


})();