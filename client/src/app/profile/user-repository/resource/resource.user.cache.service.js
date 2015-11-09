(function () {
    'use strict';

    angular.module('tw.practice.profile').factory('twResourceUserCacheService', twResourceUserCacheService);

    function twResourceUserCacheService(CacheFactory) {

        var service = {};

        // try to retrieve existing cache
        var cacheId = 'users.resources';
        var cache = CacheFactory.get(cacheId);
        
        if (!cache){
            // create cache if necessary
            CacheFactory(cacheId, {
                storageMode: 'localStorage'
            });
        }

        service.getAll = getAll;
        service.replaceAll = replaceAll;
        service.set = set;
        service.get = get;
        service.remove = remove;
        service.removeAll = removeAll;
        service.injectAll = injectAll;
        
        function removeAll() {
            // TODO clear cache
        }

        function getAll() {
            return cache.keys().reduce(function (values, key) {
                values.push(cache.get(key));
                return values;
            }, []);
        }

        function replaceAll(values) {
            cache.removeAll();
            injectAll(values);
        }

        function injectAll(users) {
            // TODO inject all items into cache
            return users;
        }
        
        function set(user) {
            var cacheKey = 'user.' + user._id;
            // TODO update cache
            return user;
        }

        function get(userId) {
            var cacheKey = 'user.' + userId;
            // TODO read cache
            var value = null;
            return value;
        }

        function remove(userId) {
            var cacheKey = 'user.' + userId;
            // TODO remove from cache
        }

        return service;
    }

}());