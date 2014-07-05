define(function (require, exports, module) {
    'use strict';

    var App = require('app');


    // Create a new module.
    var Login = App.module();

//
//    Backbone.sync = function(method, model) {
//        alert(method + ': ' + JSON.stringify(model));
//        model.id = 1;
//    };

    // Default Model.
    Login.Model = Backbone.Model.extend({
        url: '/index',
        defaults: {
            pageTitle: 'Login',
            activeLink: 'login',
            userName: '',
            password: ''
        },

        validate: function (attrs) {
            var errors = [];

            if (!attrs.userName) {
                errors.push({
                    name: 'userName',
                    message: 'Please fill user name field.'
                });
            }
            if (!attrs.password) {
                errors.push({
                    name: 'password',
                    message: 'Please fill password field.'
                });
            }

            return errors.length > 0 ? errors : false;
        }
    });

    // Default Collection.
//    Login.Collection = Backbone.Collection.extend({
//        model: Login.Model
//    });

    // Views.
    Login.Views.Content = Backbone.Layout.extend({
        template: 'login/index',

        events: {
            'click .submit': 'submitClicked'
        },

        submitClicked: function (e) {
            e.preventDefault();
//
//            var url = '/error';
//            App.router.navigate(url, { trigger: true });

            var loginData = {
                userName: this.$('#userName').val(),
                password: this.$('#password').val()
            };


            this.model.on('invalid', function (model, errors) {
                // reset all errors first
                this.hideErrors();
                this.showErrors(errors);
            }, this);

            this.model.on('change', function () {
                debug('[Success]');
                this.hideErrors();
            }, this);

            //this.model.save(loginData, options);
            this.model.save(loginData);
        },

        showErrors: function (errors) {
            _.each(errors, function (error) {
                debug('[show errors] ', error.name);

                var controlGroup = this.$('.' + error.name);
                controlGroup.addClass('error');
                controlGroup.find('.help-inline').text(error.message);
            }, this);

        },

        hideErrors: function () {
            console.log('hide errors');
            this.$('.control-group').removeClass('error');
            this.$('.help-inline').text('');
        }
    });

    Login.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    Login.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });


    // render layout
    Login.init = function () {
        // Use the main layout.
        App.useLayout({template: 'layouts/main'}).setViews({
            'header': new Login.Views.Header({ model: new Login.Model() }),
            'main': new Login.Views.Content({ model: new Login.Model() }),
            'footer': new Login.Views.Footer({ model: new Login.Model() })
        }).render().promise().done(function () {
            debug('[LOGIN] All views finished rendering.');
        });
    };

    module.exports = Login;
});