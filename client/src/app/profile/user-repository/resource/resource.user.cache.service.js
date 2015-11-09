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
            // clear cache
            return cache.removeAll();
        }

        function getAll() {
            return cache.keys().reduce(function (values, key) {
                values.push(cache.get(key));
                return values;
            }, []);
        }

        function replaceAll(values) {
            removeAll();
            injectAll(values);
        }

        function injectAll(users) {
            // inject all items into cache
            for(var i = 0; i < users.length; i++){
                var user = users[i];
                set(user);
            }
            return users;
        }
        
        function set(user) {
            var cacheKey = 'user.' + user._id;
            // update cache
            cache.put(cacheKey, user);
            return user;
        }

        function get(userId) {
            var cacheKey = 'user.' + userId;
            // read cache
            var value = cache.get(cacheKey);
            if (!value){
                value = null;
            }
            return value;
        }

        function remove(userId) {
            var cacheKey = 'user.' + userId;
            // remove from cache
            return cache.remove(cacheKey);
        }

        return service;
    }

}());