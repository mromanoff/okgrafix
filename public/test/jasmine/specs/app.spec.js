define(function (require) {
    'use strict';

    var Module = require('app');

    // Test that the module exists.
    describe('App', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});