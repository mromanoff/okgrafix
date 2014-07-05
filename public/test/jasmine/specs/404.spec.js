define(function (require) {
    'use strict';

    var Module = require('modules/404');

    // Test that the module exists.
    describe('Module 404', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});