define(function (require, exports, module) {
    'use strict';

    var App = require('app');


    // Create a new module.
    var Success = App.module();

    // Default Model.
    Success.Model = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Success',
            activeLink: null
        }
    });


    // Views.
    Success.Views.Content = Backbone.Layout.extend({
        template: 'success'
    });

    Success.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    Success.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    Success.init = function () {
        // Use the main layout.
        App.useLayout({template: 'layouts/main'}).setViews({
            'header': new Success.Views.Header({ model: new Success.Model() }),
            'main': new Success.Views.Content({ model: new Success.Model() }),
            'footer': new Success.Views.Footer({ model: new Success.Model() })
        }).render().promise().done(function () {
            debug('[Success] All views finished rendering.');
        });
    };

    module.exports = Success;
});