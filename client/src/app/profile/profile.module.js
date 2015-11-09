(function () {

    'use strict';

    angular.module('tw.practice.profile', ['ui.router', 'ngResource', 'angular-cache']);

    angular.module('tw.practice.profile').config(configureModule);

    angular.module('tw.practice.profile').run(runModule);

    /** @ngInject */
    function configureModule() {

     
    }

    /** @ngInject */
    function runModule($http) {
        
       

    }
})();
