(function () {

    'use strict';

    angular.module('tw.practice.profile', ['ui.router', 'ngResource', 'angular-cache', 'js-data', 'tw.practice.util', 'tw.practice.security', 'validation.match', 'tw.practice.chart', 'tw.practice.map']);

    angular.module('tw.practice.profile').config(configureModule);

    angular.module('tw.practice.profile').run(runModule);

    /** @ngInject */
    function configureModule(DSProvider, DSHttpAdapterProvider) {

		DSProvider.defaults.basePath = '/api';
        DSProvider.defaults.idAttribute = '_id';

        DSHttpAdapterProvider.defaults.queryTransform = function (resource, params) {
            // disable ie10 cache
            params.nocache = new Date().getTime();
            return params;
        };
     
    }

    /** @ngInject */
    function runModule($http, DS, DSLocalForageAdapter) {
        
        // make local forage the default adapter
        // DS.adapters.localForage === DSLocalForageAdapter;
        DS.registerAdapter('localForage', DSLocalForageAdapter, {
            // default: true
        });
        
        // register js-data resources
        
        DS.defineResource({
            name: 'users'
        });

    }
})();
