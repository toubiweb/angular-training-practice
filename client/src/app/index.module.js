(function () {
    'use strict';

    // laxcomma define application module and dependencies
    angular.module('tw.practice', [
        'ngAnimate' // CSS-based animations: https://code.angularjs.org/1.4.7/docs/api/ngAnimate
        , 'ngResource' // RESTful services: https://docs.angularjs.org/1.4.5/docs/api/ngResource
        , 'ngCookies' // cookies management: https://code.angularjs.org/1.4.7/docs/api/ngCookies
        , 'ngTouch' // touch events for tablets & mobiles: https://code.angularjs.org/1.4.7/docs/api/ngTouch
        , 'ngSanitize' // safe HTML: https://code.angularjs.org/1.4.7/docs/api/ngSanitize
        , 'ngMessages' // form error messages: https://code.angularjs.org/1.4.7/docs/api/ngMessages
        , 'ngMessageFormat' // i18n/pluralization message format: https://code.angularjs.org/1.4.7/docs/api/ngMessageFormat
        , 'ui.router' // Angular-UI router: https://github.com/angular-ui/ui-router
        , 'mgcrea.ngStrap' // AngularJS directives for Bootstrap:  https://github.com/mgcrea/angular-strap
        , 'toastr' // angular notifications: https://github.com/Foxandxss/angular-toastr
        , 'validation.match'
        , 'tw.practice.profile' // profile
        , 'tw.practice.form' // form
        , 'tw.practice.security'
        , 'tw.practice.login'
        , 'tw.practice.util'
    ]);
    
    
    angular.module('tw.practice').config(configureModule);
    
    angular.module('tw.practice').run(runModule);
    
    /** @ngInject */
    function configureModule($logProvider, $locationProvider, $urlRouterProvider, toastrConfig, twUserRepositoryProvider, twHttpAuthenticationServiceProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        angular.extend(toastrConfig, {
            extendedTimeOut: 1000,
            closeButton: true
        });

        // HTML5 mode
        $locationProvider.html5Mode(true);

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/');

        twUserRepositoryProvider.configure({
            repository: 'ng-resources'
            // repository: 'js-data'
        });
        
        twHttpAuthenticationServiceProvider.configure({
            // note, as our server does not allow CORS requests gulp http-proxy-middleware redirect /auth/local request to http://localhost:9000/auth/local
            // baseUrl: 'http://localhost:9000',
            loginUrl: '/auth/local',
            // no http logout
            logoutUrl: null
        });
    }

    /** @ngInject */
    function runModule($rootScope, $log, $state) {
                
        // in case of logout, redirect to login page
        
        var cb = $rootScope.$on('tw.security.user-logged-out', function (event, data) {
            // user logged out: redirect to login page
            $log.debug('Received logged-out message.');
            $state.go('login');
        });

        $rootScope.$on('$destroy', cb)

    }

})();
