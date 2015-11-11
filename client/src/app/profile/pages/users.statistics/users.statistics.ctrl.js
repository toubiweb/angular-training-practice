(function () {
    'use strict';

    angular.module('tw.practice.profile').controller('TwProfileUsersStatisticsController', TwProfileUsersStatisticsController);

    function TwProfileUsersStatisticsController($scope, $log, $state, $q, toastr, twUserGeneratorService, twUserRepository) {

        // view model
        var vm = this;

        // public attributes
        vm.users = [];
        vm.nbUsersToGenerate = 50;
        vm.genderChartConfig = {
            title: 'Gender'
        };
        vm.salaryChartConfig = {
            title: 'Salary'
        };

        // public methods
        vm.generateUsers = generateUsers;

        // initialization
        init();

        function init() {

            loadUsers().then(loadStatistics);
        }

        function loadStatistics() {

            var genderCount = vm.users.reduce(function (counts, user) {
                if (user.gender === 'male') {
                    counts.malesCount++;
                }
                if (user.gender === 'female') {
                    counts.femalesCount++;
                }
                return counts;
            }, {
                malesCount: 0,
                femalesCount: 0
            });

            vm.genderChartData = [
                {
                    key: 'Men',
                    y: genderCount.malesCount
                }, {
                    key: 'Women',
                    y: genderCount.femalesCount
                }
            ];

            var salaryCounts = vm.users.reduce(function (counts, user) {
                var s = user.salary;
                if (s && s > 0) {
                    var range;
                    if (s < 3000) {
                        range = '< 3K€'
                    } else if (s < 6000) {
                        range = '3K€-6K€'
                    }else if (s < 9000) {
                        range = '6K€-9K€'
                    } else if (s < 12000) {
                        range = '9K€-12K€'
                    } else{
                        range = '> 12K€'
                    }
                    if (!counts[range]) {
                        counts[range] = 1;
                    } else {
                        counts[range]++;
                    }
                }
                return counts;
            }, {});

            var salaryChartData = [];
            for (var propertyName in salaryCounts) {
                salaryChartData.push({
                    key: propertyName,
                    y: salaryCounts[propertyName]
                });
            }

            vm.salaryChartData = salaryChartData;
        }

        function generateUsers(nb) {
            var generatedUsers = twUserGeneratorService.generateUsers(nb, true);
            vm.users = vm.users.concat(generatedUsers);
            loadStatistics();
        }

        function loadUsers() {

            var deferred = $q.defer();

            twUserRepository.findAll().then(function (users) {
                // success
                vm.users = users;
                deferred.resolve(users);
            }, function (err) {
                $log.error(err);
                // display an error message
                toastr.error('An error occured while loading users.');
                deferred.reject(new Error('Error loading users'));
            });

            return deferred.promise;
        }

    }
}());