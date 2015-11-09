(function () {
    'use strict';

    angular.module('tw.practice.profile').factory('twUserRepository', twUserRepository);

    function twUserRepository(twResourceUserRepository) {

      return twResourceUserRepository;

    }

}());
