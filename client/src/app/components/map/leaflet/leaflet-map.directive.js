(function () {
    'use strict';

    angular.module('tw.practice.map').directive('twLeafletMap', twLeafletMap);

    function twLeafletMap() {
        return {
            templateUrl: 'app/components/map/leaflet/leaflet-map.directive.html',
            controllerAs: 'vm',
            scope: {
                userMapDefaults: '=mapDefaults',
                userMapEvents: '=mapEvents'
            },
            bindToController: true,
            controller: TwLeafletMapController
        };
    }

    /** @ngInject */
    function TwLeafletMapController($scope, $log, $timeout, twLeaflet) {

        var vm = this;

        // scope attributes
        vm.map = {};
        vm.mapConfig = {
            cssId: 'tw-leaflet-map',
            cssClass: 'tw-leaflet-map',
            defaults: {
                //  tileLayer: 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
                tileLayer: 'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg',
                //  tileLayer: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
                //   tileLayer: 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
                scrollWheelZoom: true,
                center: {
                    lat: 34.6798,
                    lng: -1.9103
                },
                zoom: 12,
                layers: []
            },
            events: {
                // http://leafletjs.com/reference.html#events
                click: function (event) {}
            }
        };
        // scope methods

        // init method
        init();

        function init() {

            // override default with user configuration
            angular.extend(vm.mapConfig.defaults, vm.userMapDefaults);
            angular.extend(vm.mapConfig.events, vm.userMapEvents);

            $timeout(function () {
                // DOM has finished rendering
                renderMap();
            });
        }

        function renderMap() {

            vm.map = twLeaflet.map(vm.mapConfig.cssId).setView(
                vm.mapConfig.defaults.center,
                vm.mapConfig.defaults.zoom
            );

            twLeaflet.tileLayer(vm.mapConfig.defaults.tileLayer, {
                maxZoom: 18
            }).addTo(vm.map);

            var circle = twLeaflet.circle({
                    lat: 34.6798,
                    lng: -1.9103
                }, 100, {
                color: '#0045ff',
                fillColor: '#ea461f',
                fillOpacity: 0.5
            });
            circle.addTo(vm.map);

        }

        return vm;

    }

})();