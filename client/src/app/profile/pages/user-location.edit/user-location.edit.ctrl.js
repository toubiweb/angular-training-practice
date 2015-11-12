(function () {
    'use strict';

    angular.module('tw.practice.profile').controller('TwProfileUserLocationEditController', TwProfileUserLocationEditController);

    function TwProfileUserLocationEditController($scope, $state, $stateParams, $log, $timeout, toastr, twLeaflet, twSecurityService, twUserRepository) {

        // view model
        var vm = this;

        // public attributes
        vm.user;
        vm.mapDefaults = {
            // Oujda, Morocco
            center: {
                lat: 34.6798,
                lng: -1.9103
            },
            zoom: 12
        };
        vm.mapData = {
            points: []
        };
        vm.mapEvents = {
            click: function (event) {
                updateLocation(event.latlng);
            }
        };

        // public methods

        // initialization
        init();

        function init() {
            if (!$stateParams.userId) {
                $log.error('User id not set: redirect.');
                $state.go('view-users');
            }

            initMap();

            loadUser();

        }

        function loadUser() {
            twUserRepository.findOne($stateParams.userId).then(function (user) {
                // success
                vm.user = user;

                if (user.location && user.location.coordinates) {
                    initMap();
                }

            }, function (err) {
                $log.error(err);
                // display an error message
                toastr.error('An error occured while loading user.');

                $timeout(function () {
                    // redirect to list after 2s timeout
                    $state.go('view-users');
                }, 2000);
            });
        }

        function updateLocation(coordinates) {
            vm.user.location = {
                coordinates: coordinates
            };
            twUserRepository.updateOne(vm.user).then(function (user) {
                // success: display a success message
                toastr.success('User successfully saved.');
                initMap();
                $timeout(function () {
                    // redirect to list after 2s timeout
                    $state.go('view-users');
                }, 2000);
            }, function (err) {
                $log.error(err);
                // display an error message
                toastr.error('An error occured while updating user.');
            });
        }

        function initMap() {
            if (vm.user) {

                // add a vector circle

                if (vm.user.location && vm.user.location.coordinates) {
                    var point = {
                        location: vm.user.location
                    };
                    vm.mapData.points = [point];
                }

            }
        }
    }

}());