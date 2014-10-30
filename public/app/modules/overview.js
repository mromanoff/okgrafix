define(function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var Overview = App.module();
    Overview.picturefill = require('picturefill');

    // Models.
    Overview.Models = {};

    Overview.Models.Index = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Overview',
            activeLink: 'overview'
        }
    });

    Overview.Models.RecentWork = Backbone.Model.extend({
        defaults: {}
    });

    // Collections
    Overview.Collections = {};

    Overview.Collections.Index = Backbone.Collection.extend({
        model: Overview.Models.Index
    });

    Overview.Collections.RecentWork = Backbone.Collection.extend({
        model: Overview.Models.RecentWork,

        url: function () {
            return App.API + '/recent-work.json';
        }
    });


    // Views.
    Overview.Views.Content = Backbone.Layout.extend({
        template: 'overview/index',
        afterRender: function () {
            Overview.picturefill();
        }
    });

    Overview.Views.Header = Backbone.View.extend({
        //el: false,
//        tagName: 'header',
//        className: 'banner',
//        attributes: {
//            'role': 'banner'
//        },

        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    Overview.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });

    Overview.Views.RecentWork = Backbone.View.extend({
        el: false,
        template: 'recent_work/items',

        beforeRender: function () {
            this.collection.each(function (item) {
                // render row
                this.insertView('ul', new Overview.Views.RecentWork.Item({
                    model: item
                }));
            }, this);
        }
    });

    Overview.Views.RecentWork.Item = Backbone.View.extend({
        el: false,
        template: 'recent_work/item',
        serialize: function () {
            return _.clone(this.model.attributes);
        }
    });


    // render layout
    Overview.init = function () {
        // get recent work data
        var recentProjectItems = new Overview.Collections.RecentWork();
        recentProjectItems.fetch().then(function () {

            // Use the main layout.
            App.useLayout({ template: 'layouts/twoColumn'}).setViews({
                'header': new Overview.Views.Header({ model: new Overview.Models.Index() }),
                'main': new Overview.Views.Content({ model: new Overview.Models.Index() }),
                '#recentWork': new Overview.Views.RecentWork({ collection: recentProjectItems }),
                'footer': new Overview.Views.Footer({ model: new Overview.Models.Index() })
            }).render().promise().done(function () {});
        });
    };

    module.exports = Overview;
});