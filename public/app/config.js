//var consts = {};
//
//consts.BASEPATH = '';
//consts.VENDOR = consts.BASEPATH + '/vendor';
//consts.BOWER = consts.VENDOR + '/bower';
//consts.APP = consts.BASEPATH + '/app';
//consts.MODULES = consts.APP + '/modules';
//consts.TEMPLATES = consts.APP + '/templates/'; // must have trailing '/' for templates
//consts.API = consts.APP + '/api';


// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
    paths: {
        almond: '../vendor/bower/almond/almond',
        underscore: '../vendor/bower/lodash/dist/lodash.underscore',

        // Map remaining vendor dependencies.
        jquery: '../vendor/bower/jquery/jquery',
        backbone: '../vendor/bower/backbone/backbone',
        layoutmanager: '../vendor/bower/layoutmanager/backbone.layoutmanager',
        console: '../vendor/bower/console-polyfill/index',
        picturefill: '../vendor/bower/picturefill/picturefill'
    },

    shim: {
        'console': {
            exports: 'console'
        },

        'picturefill': {
            exports: 'picturefill'
        },

        // This is required to ensure Backbone works as expected within the AMD
        // environment.
        'backbone': {
            // These are the two hard dependencies that will be loaded first.
            deps: ['jquery', 'underscore'],

            // This maps the global `Backbone` object to `require('backbone')`.
            exports: 'Backbone'
        }
    }
});
