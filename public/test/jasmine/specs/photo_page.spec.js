define(function (require) {
    'use strict';

    var Module = require('modules/photo_page');

    // Test that the module exists.
    describe('Photo Page Module:', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});