define(function (require) {
    'use strict';

    var Overview = require('modules/overview');
    var Backbone = require('backbone');

    // Test that the module exists.
    describe('Overview module:', function () {
        it('exists', function () {
            expect(Overview).toBeTruthy();
        });
    });

    describe('Overview init method', function () {
        it('exists', function () {
            expect(Overview.init instanceof Function).toBe(true);
        });

        it('is a Backbone.Model Index', function () {
            expect(Overview.Models.Index.prototype instanceof Backbone.Model).toBe(true);
        });

        it('is a Backbone.Model RecentWork', function () {
            expect(Overview.Models.RecentWork.prototype instanceof Backbone.Model).toBe(true);
        });

        it('is a Backbone.Collection Index', function () {
            expect(Overview.Collections.Index.prototype instanceof Backbone.Collection).toBe(true);
        });

        it('is a Backbone.Collection RecentWOrk', function () {
            expect(Overview.Collections.RecentWork.prototype instanceof Backbone.Collection).toBe(true);
        });

        it('is a Backbone.View Content', function () {
            expect(Overview.Views.Content.prototype instanceof Backbone.View).toBe(true);
        });

        it('is a Backbone.View Header', function () {
            expect(Overview.Views.Header.prototype instanceof Backbone.View).toBe(true);
        });

        it('is a Backbone.View Footer', function () {
            expect(Overview.Views.Footer.prototype instanceof Backbone.View).toBe(true);
        });

        it('is a Backbone.View RecentWork', function () {
            expect(Overview.Views.RecentWork.prototype instanceof Backbone.View).toBe(true);
        });

        it('is a Backbone.View RecentWork.Item', function () {
            expect(Overview.Views.RecentWork.Item.prototype instanceof Backbone.View).toBe(true);
        });
    });

    describe('Overview: PictureFill should be loaded', function () {
        it('exists', function () {
            expect(Overview.picturefill).toBeTruthy();
            expect(Overview.picturefill instanceof Function).toBe(true);
        });
    });
});