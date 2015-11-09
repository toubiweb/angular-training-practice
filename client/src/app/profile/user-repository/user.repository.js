(function () {
    'use strict';

    angular.module('tw.practice.profile').provider('twUserRepository', twUserRepositoryProvider);

    function twUserRepositoryProvider() {

        var provider = {};

        // public methods
        provider.configure = configure;
        provider.$get = getService;

        // default configuration
        var config = {
            // 'ng-resources' or 'js-data'
            repository: 'ng-resources'
        };

        // override default configuration
        function configure(options) {
            angular.extend(config, options);
        }

        // service
        function getService($log, twResourceUserRepository, twJsdataUserRepository) {

            var service;

            switch (config.repository) {
            case 'ng-resources':
                // use ng-resources as user repository service
                service = twResourceUserRepository;
                break;
            case 'js-data':
                // use js-data as user repository service
                service = twJsdataUserRepository;
                break;
            default:
                $log.error('Invalid repository "%s", please choose one of: "ng-resources", js-data".', config.repository);
                throw new Error('Invalid repository');
            }

            return service;
        }
        
        return provider;

    }

}());