(function () {
    'use strict';

    describe('Test twResourceUserCacheService', function () {

        var twResourceUserCacheService;

        beforeEach(module('tw.practice.profile'));

        beforeEach(inject(function (_twResourceUserCacheService_) {
            twResourceUserCacheService = _twResourceUserCacheService_;
            twResourceUserCacheService.removeAll();
        }));

        it('Token storage should work as expected', function () {

            // initial state: cache is empty
            var value1 = twResourceUserCacheService.get('key1');
            expect(value1).toBeNull();
            var value2 = twResourceUserCacheService.get('key2');
            expect(value2).toBeNull();

            // set items to cache
            twResourceUserCacheService.set({
                _id: 'key1',
                name: 'name1',
                quantity: 12
            });
            twResourceUserCacheService.set({
                _id: 'key2',
                label: 'label2'
            });

            // retrieve items from cache
            value1 = twResourceUserCacheService.get('key1');
            expect(value1.name).toEqual('name1');
            expect(value1.quantity).toEqual(12);

            value2 = twResourceUserCacheService.get('key2');
            expect(value2.label).toEqual('label2');

            // update cache
            twResourceUserCacheService.set({
                _id: 'key1',
                name: 'name1.1'
            });

            // retrieve items from cache
            value1 = twResourceUserCacheService.get('key1');
            expect(value1.name).toEqual('name1.1');

            value2 = twResourceUserCacheService.get('key2');
            expect(value2.label).toEqual('label2');

            /// remove one item from cache
            twResourceUserCacheService.remove('key1');

            // retrieve items from cache
            value1 = twResourceUserCacheService.get('key1');
            expect(value1).toBeNull();

            value2 = twResourceUserCacheService.get('key2');
            expect(value2.label).toEqual('label2');

            /// replace all items from cache
            twResourceUserCacheService.replaceAll([{
                _id: 'key1',
                name: 'name1.3'
            }, {
                _id: 'key2',
                name: 'name2.2'
            }, {
                _id: 'key5',
                name: 'name5'
            }]);

            // retrieve items from cache

            value1 = twResourceUserCacheService.get('key1');
            expect(value1.name).toEqual('name1.3');

            value2 = twResourceUserCacheService.get('key2');
            expect(value2.name).toEqual('name2.2');

            var value5 = twResourceUserCacheService.get('key5');
            expect(value5.name).toEqual('name5');

        });

    });
})();