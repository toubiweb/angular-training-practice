(function () {
    'use strict';

    angular.module('tw.practice.profile').controller('TwProfileUserLocationEditController', TwProfileUserLocationEditController);

    function TwProfileUserLocationEditController($q, $scope, $state, $stateParams, $log, $timeout, toastr, twLeaflet, twSecurityService, twUserRepository, DS) {

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
                    var circle = twLeaflet.circle(user.location.coordinates, 100, {
                        color: '#0045ff',
                        fillColor: '#ea461f',
                        fillOpacity: 0.5
                    });
                    vm.mapDefaults.layers.push(circle);
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
            patchLocation(vm.user._id, coordinates).then(function (user) {
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
            
        }

        function classicUpdateLocation() {
           
            vm.user.location = {
                coordinates: coordinates
            };

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
            
            var deffered = $q.defer();

        }

        function patchLocation(userId, coordinates) {
            var deffered = $q.defer();

           // patch way points
            var patches = [{
                op: 'TODO',
                path: 'TODO',
                value: 'TODO'
            }];

            DS.update('users', userId, {
                patches: patches
            }, {
                method: 'TODO'
            }).then(function (user) {
                // success
                deffered.resolve(user);
            }, function (err) {
                $log.error(err);
                deffered.reject(err);
            });

            return deffered.promise;
        }


        function initMap() {
            // add a vector circle

            var circle = twLeaflet.circle(vm.mapDefaults.center, 7000, {
                color: '#f03',
                fillColor: '#645',
                fillOpacity: 0.1
            })

            vm.mapDefaults.layers = [circle];
        }
    }

}());