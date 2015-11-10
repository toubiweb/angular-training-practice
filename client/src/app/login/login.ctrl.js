(function () {
    'use strict';

    angular.module('tw.practice.login').controller('TwLoginController', TwLoginController);

    function TwLoginController($rootScope, $log, $state, toastr, twSecurityService) {

        // view model
        var vm = this;

        // public attributes
        vm.user = {
            "login": "mary",
            "password": "pass"
        };
        vm.errors = {};
        vm.submitted = false;

        // public methods
        vm.login = login;

        // initialization
        init();

        function init() {
        }

        function login(form) {
            vm.submitted = true;

            if (form.$valid) {
                twSecurityService.login(vm.user.login, vm.user.password).then(function () {
                    // success
                    toastr.success('Authentication succes');
                }).catch(function (err) {
                    $log.error(err);
                    toastr.error(err.message);
                });
            }
        }

    }
}());