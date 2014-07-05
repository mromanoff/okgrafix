define(function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var WorkCategory = App.module();

    // Default Model.
    WorkCategory.Model = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Work',
            activeLink: 'work'
        }
    });

    // Default Collection.
    WorkCategory.Collection = Backbone.Collection.extend({
        model: WorkCategory.Model,

        url: function () {
            return App.API + '/work.json';
        }
    });

    // Views.
    WorkCategory.Views.Content = Backbone.Layout.extend({
        el: false,
        template: 'work/category',
        initialize: function () {
            //debug('[WORK] view content collection ', this.collection);
        },

        beforeRender: function () {
            this.collection.each(function (model) {
                // render row if is set to visible
                //debug('[WORK] show item', model.get('visible'));
                if (model.get('visible')) {
                    this.insertView('ul', new WorkCategory.Views.Item({
                        model: model
                    }));
                }
            }, this);
        }
    });

    WorkCategory.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    WorkCategory.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });

    WorkCategory.Views.Item = Backbone.View.extend({
        el: false,
        template: 'work/item',
        serialize: function () {
            var data = _.clone(this.model.attributes);
            data.image = _.isNull(this.model.attributes.image) ? 'http://placehold.it/480X480' : this.model.attributes.image;
            return data;
        }
    });


    // render layout
    WorkCategory.init = function () {
        // get recent work data
        var projects = new WorkCategory.Collection();
        projects.fetch().then(function () {

            // Use the main layout.
            App.useLayout({template: 'layouts/main'}).setViews({
                'header': new WorkCategory.Views.Header({ model: new WorkCategory.Model() }),
                'main': new WorkCategory.Views.Content({ model: new WorkCategory.Model(), collection: projects }),
                'footer': new WorkCategory.Views.Footer({ model: new WorkCategory.Model() })
            }).render().promise().done(function () {
                debug('[WORK] All views finished rendering.');
            });
        });
    };

    module.exports = WorkCategory;
});