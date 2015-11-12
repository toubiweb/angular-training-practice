(function () {
    'use strict';

    angular.module('tw.practice.profile').controller('TwProfileUsersListController', TwProfileUsersListController);

    /** @ngInject */
    function TwProfileUsersListController($scope, $log, $state, $q, toastr, twUserRepository, twUserGeneratorService, twRouteSecurityService, twLeaflet) {

        // view model
        var vm = this;

        // public attributes

        vm.users = [];
        vm.itemsByPage = 5;
        vm.currentPage = 1;
        vm.filter = {};
        vm.nbUsersToGenerate = 5;
        vm.genderOptions = [
            {
                id: undefined,
                label: 'All'
            }, {
                id: 'male',
                label: 'Male'
            }, {
                id: 'female',
                label: 'Female'
            }
        ];
        vm.mapDefaults = {
            // Oujda, Morocco
            tileLayer: 'http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
            center: {
                lat: 34.6798,
                lng: -1.9103
            },
            zoom: 12
        };
        vm.mapData = {
            points: []
        };

        // public methods
        vm.goToDetails = goToDetails;
        vm.getFirstIndex = getFirstIndex;
        vm.getFirstHumanIndex = getFirstHumanIndex;
        vm.getLastHumanIndex = getLastHumanIndex;
        vm.getTotalPages = getTotalPages;
        vm.goToNextPage = goToNextPage;
        vm.goToPreviousPage = goToPreviousPage;
        vm.generateUsers = generateUsers;
        vm.isAllowedToEditUser = isAllowedToEditUser

        // initialization
        init();

        function init() {

            loadUsers().then(loadMapData);

            $scope.$watch(function () {
                return vm.filter;
            }, function (newFilter, oldFilter) {
                vm.currentPage = 1;
            }, true);
        }

        function loadMapData() {
            
            vm.mapData.points = vm.users.reduce(function (points, user) {
                if (user.location && user.location.coordinates) {
                    var point = {
                        location: user.location
                    };
                    points.push(point);
                }
                return points;
            }, []);

        }

        function generateUsers(nb) {
            var generatedUsers = twUserGeneratorService.generateUsers(nb);
            vm.users = vm.users.concat(generatedUsers);
            $log.info('Users: ', vm.users.length);
            loadMapData();
        }

        function loadUsers() {

            var deferred = $q.defer();
            var params = {};
            // ex: var params = { country: 'ma', max: 100 }
            twUserRepository.findAll(params).then(function (users) {
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

        function goToDetails(user) {
            twRouteSecurityService.go('edit-user', {
                userId: user._id
            });
        }

        function isAllowedToEditUser(user) {
            return twRouteSecurityService.hasAccess('edit-user');
        }

        function getTotalPages() {
            if (vm.filteredUsers && vm.filteredUsers.length) {
                return Math.ceil(vm.filteredUsers.length / vm.itemsByPage);
            } else {
                return null;
            }
        }

        function getFirstIndex() {
            if (vm.currentPage > 0 && vm.itemsByPage > 0) {
                return vm.itemsByPage * (vm.currentPage - 1);
            }
            return 0;
        }

        function getFirstHumanIndex() {
            return getFirstIndex() + 1;
        }

        function getLastHumanIndex() {
            return Math.min(getFirstHumanIndex() + vm.itemsByPage - 1, vm.users.length);
        }

        function goToNextPage() {
            if (vm.currentPage >= getTotalPages()) {
                vm.currentPage = getTotalPages();
            } else {
                vm.currentPage++;
            }
        }

        function goToPreviousPage() {
            if (vm.currentPage <= 1) {
                vm.currentPage = 1;
            } else {
                vm.currentPage--;
            }
        }
    }
}());