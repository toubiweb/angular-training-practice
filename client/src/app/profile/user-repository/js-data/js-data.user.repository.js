(function () {
    'use strict';

    angular.module('tw.practice.profile').factory('twJsdataUserRepository', twJsdataUserRepository);

    /** @ngInject */
    function twJsdataUserRepository($resource, $log, $q, DS) {

        var service = {};

        service.findAll = findAll;
        service.findOne = findOne;
        service.createOne = createOne;
        service.updateOne = updateOne;
        service.removeOne = removeOne;
        service.clearCache = clearCache;
        service.injectAll = injectAll;

        function clearCache() {
            $log.debug('Clear user js-data cache.');
            return DS.ejectAll('users');
        }

        function injectAll(users) {
            $log.debug('Inject %d users to js-data cache.', users.length);

            var injected = DS.inject('users', users);

            return injected;
        }

        /**
         * @param: params { country: 'ma', max: 100 }
         */
        function findAll(params) {

            // use filter is used to retrieved data injected manually to the cache (it can be configured globaly too)
            return DS.findAll('users', params, {
                useFilter: true
            });
        }

        function findOne(userId) {

            return DS.find('users', userId);
        }

        function createOne(user) {

            return DS.create('users', user);
        }

        function updateOne(user) {

            return DS.save('users', user);
        }

        function removeOne(userId) {

            return DS.destroy('users', userId);

        }

        return service;
    }

}());