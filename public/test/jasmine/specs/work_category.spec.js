define(function (require) {
    'use strict';

    var Module = require('modules/work_category');

    // Test that the module exists.
    describe('Work Module', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});