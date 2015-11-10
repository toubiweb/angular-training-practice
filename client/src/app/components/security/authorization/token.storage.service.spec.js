(function () {
    'use strict';

    describe('Test twTokenStorageService', function () {

        var twTokenStorageService;

        beforeEach(module('tw.practice.security'));

        beforeEach(inject(function (_twTokenStorageService_) {
            twTokenStorageService = _twTokenStorageService_;
        }));

        it('Token storage should work as expected', function () {
            var token = twTokenStorageService.getToken();
            expect(token).toBeNull();
            
            // login
            twTokenStorageService.setToken('123456');
            
            // retrieve authentication token
            token = twTokenStorageService.getToken();
            expect(token).toEqual('123456');
            
            // logout
            twTokenStorageService.removeToken();
            
            token = twTokenStorageService.getToken();
            expect(token).toBeNull();
        });

    });
})();