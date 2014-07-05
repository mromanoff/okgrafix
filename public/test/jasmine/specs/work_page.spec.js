define(function (require) {
    'use strict';

    var Module = require('modules/work_page');

    // Test that the module exists.
    describe('Work Page Module:', function () {
        it('exists', function () {
            expect(Module).toBeTruthy();
        });
    });
});