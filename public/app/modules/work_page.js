define(function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var WorkPage = App.module();

    // Default Model.
    WorkPage.Model = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Work',
            activeLink: 'work'
        }
    });

    // Default Collection.
    WorkPage.Collection = Backbone.Collection.extend({
        model: WorkPage.Model,

        url: function () {
            return App.API + '/work.json';
        }
    });


    // Views.
    WorkPage.Views.Content = Backbone.View.extend({
        el: false,
        template: 'work/page',

        serialize: function () {
            return _.clone(this.model.attributes);
        }
    });

    WorkPage.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    WorkPage.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    WorkPage.init = function (id) {

        // get recent work data again
        // TODO: this is not REST so call collection again afilter though to get model.
        // TODO: we don't want to call server for this collection again and again
        // TODO: cache in localstorage or unless use directly navigates to gallery item (bookmark)
        var projects = new WorkPage.Collection();
        projects.fetch().then(function () {

            var item = projects.get(id);
            //console.warn('model', projects.get(id));


            // Use the main layout.
            App.useLayout({template: 'layouts/main'}).setViews({
                'header': new WorkPage.Views.Header({ model: new WorkPage.Model() }),
                'main': new WorkPage.Views.Content({ model: item}),
                'footer': new WorkPage.Views.Footer({ model: new WorkPage.Model() })
            }).render().promise().done(function () {
                //debug('[WorkPage] All views finished rendering.');
            });
        });
    };

    module.exports = WorkPage;
});