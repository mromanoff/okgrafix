define(function (require) {
    'use strict';

    var Module = require('modules/error');

    // Test that the module exists.
    describe('Error Module', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});