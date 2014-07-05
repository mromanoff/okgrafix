define(function (require) {
    'use strict';

    var Module = require('modules/components/navigation');

    // Test that the module exists.
    describe('Component Navigation Component:', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});