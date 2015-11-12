(function () {
    'use strict';

    angular.module('tw.practice.map').directive('twLeafletMap', twLeafletMap);

    function twLeafletMap() {
        return {
            templateUrl: 'app/components/map/leaflet/leaflet-map.directive.html',
            controllerAs: 'vm',
            scope: {
                userMapDefaults: '=mapDefaults',
                userMapEvents: '=mapEvents',
                userMapData: '=mapData'
            },
            bindToController: true,
            controller: TwLeafletMapController
        };
    }

    /** @ngInject */
    function TwLeafletMapController($scope, $log, $timeout, twLeaflet) {

        var vm = this;

        var L = twLeaflet;

        // scope attributes
        vm.map = {};
        vm.pointsLayerGroup = null;
        vm.mapConfig = {
            cssId: 'tw-leaflet-map',
            cssClass: 'tw-leaflet-map',
            defaults: {
                baseLayers: [
                    {
                        label: 'Otile map',
                        url: 'http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg'
                    }, {
                        label: 'Cycle map',
                        url: 'http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'
                    },
                    {
                        label: 'Outdoors map',
                        url: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
                    },
                    {
                        label: 'Transport map',
                        url: 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png'
                    }
                ],
                scrollWheelZoom: true,
                center: {
                    lat: 34.6798,
                    lng: -1.9103
                },
                zoom: 12
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

            vm.pointsLayerGroup = L.layerGroup();

            var baseLayers = vm.mapConfig.defaults.baseLayers.reduce(function (layers, layerInfo) {
                var layer = L.tileLayer(layerInfo.url);
                layerInfo.layer = layer;
                layers.push(layer);
                return layers;
            }, []);

            vm.map = L.map(vm.mapConfig.cssId, {
                center: vm.mapConfig.defaults.center,
                zoom: vm.mapConfig.defaults.zoom,
                layers: baseLayers
            });

            var overlayMaps = {
                'points': vm.pointsLayerGroup
            };

            var layersControls = vm.mapConfig.defaults.baseLayers.reduce(function (layersControls, layerInfo) {
                layersControls[layerInfo.label] = layerInfo.layer;
                return layersControls;
            }, {});

            L.control.layers(layersControls, overlayMaps).addTo(vm.map);

            $scope.$watch('vm.userMapData.points', function (points) {
                if (points && points.length !== 0) {

                    var circles = buildCirclesFromPoints(points);

                    redrawPoints(circles);
                }
            }, true);

            vm.map.on('click', function (e) {
                vm.mapConfig.events.click(e);
            });
        }

        function buildCirclesFromPoints(points) {
            var circles = points.reduce(function (circles, point) {
                if (point && point.location && point.location.coordinates) {
                    var circle = L.circle(point.location.coordinates, 100, {
                        color: '#0045ff',
                        fillColor: '#ea461f',
                        fillOpacity: 0.5
                    });
                    circles.push(circle);
                }
                return circles;
            }, []);
            return circles;
        }

        function redrawPoints(layers) {

            vm.pointsLayerGroup.clearLayers()

            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                layer.addTo(vm.pointsLayerGroup);
            }

            vm.pointsLayerGroup.addTo(vm.map);
        }

        return vm;
    }

})();