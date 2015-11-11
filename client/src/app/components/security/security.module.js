(function () {

    'use strict';

    angular.module('tw.practice.security', ['angular-jwt', 'tw.practice.util']);

    angular.module('tw.practice.security').config(configureModule);

    angular.module('tw.practice.security').run(runModule);

    /** @ngInject */
    function configureModule($httpProvider) {

        // register authentication interceptor on http service
        $httpProvider.interceptors.push('twHttpSecurityInterceptor');
    }

    /** @ngInject */
    function runModule($rootScope, twSecurityService) {
        var cb = $rootScope.$on('tw.security.do-logout', function (event, data) {
            twSecurityService.logout();
        });

        $rootScope.$on('$destroy', cb)
    }


})();