define(function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var PhotoCategory = App.module();

    // Default Model.
    PhotoCategory.Model = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Photography',
            activeLink: 'photography'
        }
    });

    // Default Collection.
    PhotoCategory.Collection = Backbone.Collection.extend({
        model: PhotoCategory.Model,

        parse: function (response) {
            return response.photos;
        },

        url: function () {
            //return consts.API + '/mr-500px-all-images.json';
            return 'https://api.500px.com/v1/photos?feature=user&user_id=678550&sort=votes_count&rpp=100&image_size[]=1&image_size[]=2&image_size[]=3&image_size[]=4&include_store=store_download&include_states=voted&consumer_key=vRemLRvbgOrkPsJhzeoGdSNHiuC22aZ4TgwgXQXK';
        }
    });

    // Views.
    PhotoCategory.Views.Content = Backbone.Layout.extend({
        el: false,
        template: 'photography/category',
        initialize: function () {
            //debug('[PHOTOGRAPHY] view content collection ', this.collection);
        },

        beforeRender: function () {
            this.collection.each(function (model) {
                this.insertView('ul', new PhotoCategory.Views.Item({
                    model: model
                }));
            }, this);
        }
    });

    PhotoCategory.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    PhotoCategory.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });

    PhotoCategory.Views.Item = Backbone.View.extend({
        el: false,
        template: 'photography/item',
        serialize: function () {
            return this.model.attributes;
        }
    });


    // render layout
    PhotoCategory.init = function () {
        // get recent work data
        var projects = new PhotoCategory.Collection();
        projects.fetch().then(function () {
            // Use the main layout.
            App.useLayout({template: 'layouts/main'}).setViews({
                'header': new PhotoCategory.Views.Header({ model: new PhotoCategory.Model() }),
                'main': new PhotoCategory.Views.Content({ model: new PhotoCategory.Model(), collection: projects }),
                'footer': new PhotoCategory.Views.Footer({ model: new PhotoCategory.Model() })
            }).render().promise().done(function () {
                //debug('[PHOTOGRAPHY] All views finished rendering.');
            });
        });
    };

    module.exports = PhotoCategory;
});