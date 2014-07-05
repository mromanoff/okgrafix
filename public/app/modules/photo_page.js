define(function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var PhotoPage = App.module();

    // Default Model.
    PhotoPage.Model = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Photo',
            activeLink: 'photography',
            url: null
        }
    });

    // Views.
    PhotoPage.Views.Content = Backbone.View.extend({
        el: false,
        template: 'photography/page',

        serialize: function () {
            return _.clone(this.model.attributes);
        }
    });

    PhotoPage.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    PhotoPage.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    PhotoPage.init = function (id) {
        var photo = new PhotoPage.Model();
        photo.url = 'https://api.500px.com/v1/photos/' + id + '?image_size=4&comments=2&consumer_key=vRemLRvbgOrkPsJhzeoGdSNHiuC22aZ4TgwgXQXK';
        photo.fetch().then(function () {
            //console.warn('model', photo);
            // Use the main layout.
            App.useLayout({template: 'layouts/main'}).setViews({
                'header': new PhotoPage.Views.Header({ model: photo }),
                'main': new PhotoPage.Views.Content({ model: photo}),
                'footer': new PhotoPage.Views.Footer({ model: photo })
            }).render().promise().done(function () {
                // debug('[PhotoPage] All views finished rendering.');
            });
        });
    };

    module.exports = PhotoPage;
});