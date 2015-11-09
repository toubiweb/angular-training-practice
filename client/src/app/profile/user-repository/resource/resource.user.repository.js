(function () {
    'use strict';

    angular.module('tw.practice.profile').factory('twResourceUserRepository', twResourceUserRepository);

    function twResourceUserRepository($resource, $log, $q) {

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
        service.injectAll = injectAll;

        function injectAll(users){
            // TODO later
        }
        
        /**
         * @param: params { country: 'ma', max: 100 }
         */
        function findAll(params) {

            var deferred = $q.defer();
            
			// query http server
			UserResource.query(params, function (users) {
				// success
				deferred.resolve(users);
			}, function error(err) {
				// http error
				$log.error(err);
				deferred.reject(err);
			});

            return deferred.promise;
        }

        function findOne(userId) {

            var deferred = $q.defer();

           
			// query http server
			UserResource.get({
				userId: userId
			}, function (user) {
				// success
				deferred.resolve(user);
			}, function error(err) {
				// http error
				$log.error(err);
				deferred.reject(err);
			});

            return deferred.promise;
        }

        function createOne(user) {

            var deferred = $q.defer();

            // query http server
            var newUser = new UserResource(user);
            newUser.$save(function (user) {
                // success
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
                // success
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
                // success
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
