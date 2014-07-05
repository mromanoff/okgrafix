define(function (require, exports, module) {
    'use strict';

    var App = require('app');


    // Create a new module.
    var NotFound = App.module();

    // Default Model.
    NotFound.Model = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Page not found',
            activeLink: null
        }
    });

    // Default Collection.
    NotFound.Collection = Backbone.Collection.extend({
        model: NotFound.Model
    });

    // Views.
    NotFound.Views.Content = Backbone.Layout.extend({
        template: '404',
        className: 'error-404'
    });

    NotFound.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    NotFound.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    NotFound.init = function () {
        // Use the main layout.
        App.useLayout({template: 'layouts/main'}).setViews({
            'header': new NotFound.Views.Header({ model: new NotFound.Model() }),
            'main': new NotFound.Views.Content({ model: new NotFound.Model() }),
            'footer': new NotFound.Views.Footer({ model: new NotFound.Model() })
        }).render().promise().done(function () {
            debug('[404] All views finished rendering.');
        });
    };

    module.exports = NotFound;
});