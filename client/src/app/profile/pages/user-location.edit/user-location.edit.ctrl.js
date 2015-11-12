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

        vm.mapEvents = {
            click: function (event) {
                updateLocation(event.latlng);
            }
        };

        // public methods

        // initialization
        init();

        function init() {

            initMap();

            loadUser();

        }

        function loadUser() {
            vm.user = twSecurityService.getCurrentUser();

            if ( vm.user.location &&  vm.user.location.coordinates) {
                var circle = twLeaflet.circle(vm.user.location.coordinates, 100, {
                    color: '#0045ff',
                    fillColor: '#ea461f',
                    fillOpacity: 0.5
                });
            }
            vm.mapDefaults.layers.push(circle);
        }

        function updateLocation(coordinates) {
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