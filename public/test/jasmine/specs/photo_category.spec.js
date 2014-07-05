define(function (require) {
    'use strict';

    var Module = require('modules/photo_category');

    // Test that the module exists.
    describe('Photo Category Module', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});