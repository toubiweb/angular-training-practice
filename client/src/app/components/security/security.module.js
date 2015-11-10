(function () {

    'use strict';

    angular.module('tw.practice.security', ['ngCookies', 'angular-jwt']);

    angular.module('tw.practice.security').config(configureModule);

    angular.module('tw.practice.security').run(runModule);

    /** @ngInject */
    function configureModule($httpProvider) {

        // register authentication interceptor on http service
        $httpProvider.interceptors.push('twAuthenticationHttpInterceptor');
    }

    /** @ngInject */
    function runModule($rootScope, twSecurityService) {
        var cb = $rootScope.$on('tw.security.do-logout', function (event, data) {
            twSecurityService.logout();
        });

        $rootScope.$on('$destroy', cb)
    }


})();