define(function (require) {
    'use strict';

    var Module = require('modules/login');

    // Test that the module exists.
    describe('Login Module: ', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});