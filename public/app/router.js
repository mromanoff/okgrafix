define(function (require, exports, module) {
    'use strict';

    // External dependencies.
    var Backbone = require('backbone');
    var Overview = require('modules/overview');

    var WorkCategory = require('modules/work_category');
    var WorkPage = require('modules/work_page');

    var PhotoCategory = require('modules/photo_category');
    var PhotoPage = require('modules/photo_page');

    var Contact = require('modules/contact');
    var Login = require('modules/login');
    var Error = require('modules/error');
    var Success = require('modules/success');
    var NotFound = require('modules/404');

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'work': 'workCategory',
            'work/:id': 'workPage',
            'photography': 'photographyCategory',
            'photography/:id': 'photographyPage',
            'contact': 'contact',
            'login': 'login',
            'error': 'error',
            'success': 'success',
            '*invalidRoute': 'notFound'
        },

        index: function () {
            Overview.init();
        },

        photographyCategory: function () {
            PhotoCategory.init();
        },

        photographyPage: function (id) {
            PhotoPage.init(id);
        },

        workCategory: function () {
            WorkCategory.init();
        },

        workPage: function (id) {
            WorkPage.init(id);
        },

        contact: function () {
            Contact.init();
        },

        login: function () {
            Login.init();
        },

        error: function () {
            Error.init();
        },

        success: function () {
            Success.init();
        },

        notFound: function () {
            NotFound.init();
        }
    });
});
