(function () {
    'use strict';

    describe('form password service', function () {

        var twPasswordService;

        beforeEach(module('tw.practice.form'));

        beforeEach(inject(function (_twPasswordService_) {
            twPasswordService = _twPasswordService_;
        }));

        it('short password (<= 2 characters) should result to strongness 0', function () {
            var strongness = twPasswordService.checkStrongnessLength('1');
            expect(strongness).toEqual(0);
        });

        it('medium password (8 characters) should result to strongness 4', function () {
            var strongness = twPasswordService.checkStrongnessLength('12345678');
            expect(strongness).toEqual(4);
        });

        it('long password (> 12 characters) should result to strongness 5', function () {
            var strongness = twPasswordService.checkStrongnessLength('123456789012');
            expect(strongness).toEqual(5);
        });

        it('lowercase password should result to strongness 1', function () {
            var strongness = twPasswordService.checkStrongnessType('dsgsfghdfsgdfg');
            expect(strongness).toEqual(1);
        });

        it('UPPERCASE password should result to strongness 1', function () {
            var strongness = twPasswordService.checkStrongnessType('SDQFSDFQQSDFSQDF');
            expect(strongness).toEqual(1);
        });

        it('special characters password should result to strongness 2', function () {
            var strongness = twPasswordService.checkStrongnessType('@_-()');
            expect(strongness).toEqual(2);
        });

        it('number characters password should result to strongness 1', function () {
            var strongness = twPasswordService.checkStrongnessType('576756565');
            expect(strongness).toEqual(1);
        });

        it('number + special characters password should result to strongness 3', function () {
            var strongness = twPasswordService.checkStrongnessType('5767@56565');
            expect(strongness).toEqual(3);
        });

        it('number + uppercase + special characters password should result to strongness 4', function () {
            var strongness = twPasswordService.checkStrongnessType('5767@SDFSDF');
            expect(strongness).toEqual(4);
        });

        it('lowercase + uppercase + special characters password should result to strongness 4', function () {
            var strongness = twPasswordService.checkStrongnessType('sdfsdf@SDFSDF');
            expect(strongness).toEqual(4);
        });

        it('lowercase + uppercase + number password should result to strongness 3', function () {
            var strongness = twPasswordService.checkStrongnessType('sdfsdf0000SDFSDF');
            expect(strongness).toEqual(3);
        });

    });
})();