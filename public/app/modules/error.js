define(function (require, exports, module) {
    'use strict';

    var App = require('app');


    // Create a new module.
    var Error = App.module();

    // Default Model.
    Error.Model = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Error',
            activeLink: null
        }
    });


    // Views.
    Error.Views.Content = Backbone.Layout.extend({
        template: 'error'
    });

    Error.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    Error.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    Error.init = function () {
        // Use the main layout.
        App.useLayout({template: 'layouts/main'}).setViews({
            'header': new Error.Views.Header({ model: new Error.Model() }),
            'main': new Error.Views.Content({ model: new Error.Model() }),
            'footer': new Error.Views.Footer({ model: new Error.Model() })
        }).render().promise().done(function () {
            debug('[Error] All views finished rendering.');
        });
    };

    module.exports = Error;
});