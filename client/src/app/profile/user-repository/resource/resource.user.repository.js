(function () {
    'use strict';

    angular.module('tw.practice.profile').factory('twResourceUserRepository', twResourceUserRepository);

    /** @ngInject */
    function twResourceUserRepository($resource, $log, $q, twResourceUserCacheService) {

        var service = {};

        var UserResource = $resource('api/users/:userId', {
            userId: '@_id'
        }, {
            'update': {
                method: 'PUT'
            }
        });

        service.findAll = findAll;
        service.findOne = findOne;
        service.createOne = createOne;
        service.updateOne = updateOne;
        service.removeOne = removeOne;
        service.clearCache = clearCache;
        service.injectAll = injectAll;

        function clearCache(){
            $log.debug('Clear user resources cache.');
            return twResourceUserCacheService.removeAll();
        }
        
        function injectAll(users){
            $log.debug('Inject %d users to resources cache.', users.length);
            return twResourceUserCacheService.injectAll(users);
        }
        
        /**
         * @param: params { country: 'ma', max: 100 }
         */
        function findAll(params) {

            var deferred = $q.defer();

            var users = twResourceUserCacheService.getAll();

            if (users.length !== 0) {
                // return users from cach
                $log.debug('Retrieve %d users from cache.', users.length);
                deferred.resolve(users);
            } else {
                // query http server
                UserResource.query(params, function (users) {
                    // success: store users into cache
                    twResourceUserCacheService.replaceAll(users);
                    deferred.resolve(users);
                }, function error(err) {
                    // http error
                    $log.error(err);
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        function findOne(userId) {

            var deferred = $q.defer();

            var user = twResourceUserCacheService.get(userId);

            if (user) {
                // return user from cache
                $log.debug('Retrieve user %d from cache.', user._id);
                deferred.resolve(user);
            } else {
                // query http server
                UserResource.get({
                    userId: userId
                }, function (user) {
                    // success: store user into cache
                    twResourceUserCacheService.set(user);
                    deferred.resolve(user);
                }, function error(err) {
                    // http error
                    $log.error(err);
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        function createOne(user) {

            var deferred = $q.defer();

            // query http server
            var newUser = new UserResource(user);
            newUser.$save(function (user) {
                // success: add user into cache
                twResourceUserCacheService.set(user);
                deferred.resolve(user);

            }, function (err) {
                // http error
                $log.error(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function updateOne(user) {

            var deferred = $q.defer();

            // query http server
            UserResource.update({
                userId: user._id
            }, user, function (user) {
                // success: update user into cache
                twResourceUserCacheService.set(user);
                deferred.resolve(user);

            }, function (err) {
                // http error
                $log.error(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function removeOne(userId) {

            var deferred = $q.defer();

            // query http server
            UserResource.remove({
                userId: userId
            }, function (response) {
                // success: remove from cache
                twResourceUserCacheService.remove(userId);
                deferred.resolve(response);

            }, function (err) {
                // http error
                $log.error(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return service;
    }

}());