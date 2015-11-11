(function () {
    'use strict';

    angular.module('tw.practice.profile').controller('TwProfileUserEditController', TwProfileUserEditController);

    /** @ngInject */
    function TwProfileUserEditController($scope, $state, $stateParams, $log, $timeout, toastr, twMoment, twUserRepository, twUserGeneratorService) {

        // view-model
        var vm = this;
        
        // public attributes
        vm.user = null;

        // public methods
        vm.getFullName = getFullName;
        vm.reset = reset;
        vm.getAgeInYears = getAgeInYears;
        vm.employedUpdated = employedUpdated;
        vm.submit = submit;
        vm.getMinSalary = getMinSalary;
        // 'edition' or 'creation'
        vm.mode;
        vm.activeMenu;
        vm.remove = remove;

        // initialization
        init();

        function init() {
            $log.info('Initializing controller...');

            reset();

            $scope.$on('$destroy', onDestroy);

        }

        function onDestroy() {
            $log.info('Releasing resources...');
        }

        function getFullName() {
            if (vm.user && vm.user.firstName && vm.user.lastName) {
                return vm.user.firstName + ' ' + vm.user.lastName;
            }
        }

        function reset() {

            if ($stateParams.userId) {

                vm.mode = 'edition';
                vm.activeMenu = 'edit-user';


                twUserRepository.findOne($stateParams.userId).then(function (user) {
                    // success
                    vm.user = user;
                }, function (err) {
                    $log.error(err);
                    // display an error message
                    toastr.error('An error occured while loading user.');

                    $timeout(function () {
                        // redirect to list after 2s timeout
                        $state.go('view-users');
                    }, 2000);
                });

            } else {

                vm.mode = 'creation';
                vm.activeMenu = 'create-user';
                vm.user = twUserGeneratorService.generateUser();
                delete vm.user._id;
            }

        }

        function getAgeInYears() {
            if (!vm.user || !vm.user.birthdate) {
                return null;
            }

            var today = twMoment(new Date());
            var birthday = twMoment(vm.user.birthdate);

            var years = today.diff(birthday, 'years', false);
            if (years >= 0) {
                return years;
            } else {
                return null;
            }
        }

        function employedUpdated() {
            if (!vm.user.employed) {
                // re-init salary to null
                vm.user.salary = null;
            }
        }

        function submit(userForm) {
            userForm.$setSubmitted();

            if (userForm.$valid) {

                if (vm.mode === 'edition') {

                    twUserRepository.updateOne(vm.user).then(function (user) {
                        // success: display a success message
                        toastr.success('User successfully saved.');

                        $timeout(function () {
                            // redirect to list after 2s timeout
                            $state.go('view-users');
                        }, 2000);
                    }, function (err) {
                        $log.error(err);
                        // display an error message
                        toastr.error('An error occured while updating user.');
                    });
                } else {

                    twUserRepository.createOne(vm.user).then(function (user) {
                        // success: display a success message
                        toastr.success('User successfully created.');

                        $timeout(function () {
                            // redirect to list after 2s timeout
                            $state.go('view-users');
                        }, 2000);
                    }, function (err) {
                        $log.error(err);
                        // display an error message
                        toastr.error('An error occured while creating user.');
                    });

                }
            }
        }

        function remove() {
            twUserRepository.removeOne(vm.user._id).then(function (user) {
                // success: display a success message
                toastr.success('User successfully removed.');

                $timeout(function () {
                    // redirect to list after 2s timeout
                    $state.go('view-users');
                }, 2000);
            }, function (err) {
                $log.error(err);
                // display an error message
                toastr.error('An error occured while removing user.');
            });
        }

        function getMinSalary() {
            var age = getAgeInYears();

            var minSalary;
            if (age && age > 20) {
                minSalary = 4000;
            } else {
                minSalary = 3000;
            }

            return minSalary;
        }

    }
}());