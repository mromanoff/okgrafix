define(function (require) {
    'use strict';

    var Contact = require('modules/contact');

    // Test that the Contact exists.
    describe('Contact Module: ', function () {
        it('Contact module should be defined', function () {
            expect(Contact).toBeTruthy();
        });
    });
});