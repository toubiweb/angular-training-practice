(function () {
    'use strict';

    angular.module('tw.practice.profile').controller('TwProfileUserEditController', TwProfileUserEditController);

    function TwProfileUserEditController($scope, $state, $stateParams, $log, $timeout, toastr, twMoment, twUserRepository, twUserGeneratorService) {

        // public attributes
        $scope.user = null;

        // public methods
        $scope.getFullName = getFullName;
        $scope.reset = reset;
        $scope.getAgeInYears = getAgeInYears;
        $scope.employedUpdated = employedUpdated;
        $scope.submit = submit;
        $scope.getMinSalary = getMinSalary;
        // 'edition' or 'creation'
        $scope.mode;
        $scope.activeMenu;
        $scope.remove = remove;

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
            if ($scope.user && $scope.user.firstName && $scope.user.lastName) {
                return $scope.user.firstName + ' ' + $scope.user.lastName;
            }
        }

        function reset() {

            if ($stateParams.userId) {

                $scope.mode = 'edition';
                $scope.activeMenu = 'edit-user';


                twUserRepository.findOne($stateParams.userId).then(function (user) {
                    // success
                    $scope.user = user;
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

                $scope.mode = 'creation';
                $scope.activeMenu = 'create-user';
                $scope.user = twUserGeneratorService.generateUser();
                delete $scope.user._id;
            }

        }

        function getAgeInYears() {
            if (!$scope.user || !$scope.user.birthdate) {
                return null;
            }

            var today = twMoment(new Date());
            var birthday = twMoment($scope.user.birthdate);

            var years = today.diff(birthday, 'years', false);
            if (years >= 0) {
                return years;
            } else {
                return null;
            }
        }

        function employedUpdated() {
            if (!$scope.user.employed) {
                // re-init salary to null
                $scope.user.salary = null;
            }
        }

        function submit(userForm) {
            userForm.$setSubmitted();

            if (userForm.$valid) {

                if ($scope.mode === 'edition') {

                    twUserRepository.updateOne($scope.user).then(function (user) {
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

                    twUserRepository.createOne($scope.user).then(function (user) {
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
            twUserRepository.removeOne($scope.user._id).then(function (user) {
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