define(function (require) {
    'use strict';

    // External dependencies.
    var _ = require('underscore');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var Layout = require('layoutmanager');
    var Navigation = require('./modules/components/navigation');
    var Console = require('console');
    var Picturefill = require('picturefill');

    var App = {
        root: '/',
        console: Console,
        picturefill: Picturefill,
        API: '/app/api/',
        components: {
            navigation: Navigation
        },
        el: '#page'
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    Backbone.Layout.configure({
        manage: true,
        prefix: App.root + 'app/templates/',

        paths: {
            layout: App.root + 'app/templates/layouts/',
            template: App.root + 'app/templates/'
        },


        // This method will check for prebuilt templates first and fall back to
        // loading in via AJAX.
        fetchTemplate: function (path) {

            // Concatenate the file extension.
            path = path + '.html';

            // If the path exists in the object, use it instead of fetching remotely.
            if (JST[path]) {
                return JST[path];
            }

            // If it does not exist in the JST object, mark this function as
            // asynchronous.
            var done = this.async();

            // Fetch via jQuery's GET.  The third argument specifies the dataType.
            $.get(path, function (contents) {
                // Assuming you're using underscore templates, the compile step here is
                // `_.template`.
                done(JST[path] = _.template(contents));
            }, 'text');
        }
    });

    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(App, {

        // Create a custom object with a nested Views object.
        module: function (additionalProps) {
            return _.extend({ Views: {} }, additionalProps);
        },

        // Helper for using layouts.
        useLayout: function () {
            var layout = new Layout({
                el: App.el,
                template: 'layouts/main'
            });

            // Cache the refererence.
            this.layout = layout;

            // Return the reference, for chainability.
            return layout;
        }
    }, Backbone.Events);

});
