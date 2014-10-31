require.config({
    paths: {
        almond: '../vendor/bower/almond/almond',
        underscore: '../vendor/bower/lodash/dist/lodash.underscore',
        jquery: '../vendor/bower/jquery/jquery',
        backbone: '../vendor/bower/backbone/backbone',
        layoutmanager: '../vendor/bower/layoutmanager/backbone.layoutmanager',
        picturefill: '../vendor/bower/picturefill/picturefill'
    },

    shim: {
        'picturefill': {
            exports: 'picturefill'
        },

        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    }
});
