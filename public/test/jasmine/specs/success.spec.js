define(function (require) {
    'use strict';

    var Module = require('modules/success');

    // Test that the module exists.
    describe('Success Module:', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});