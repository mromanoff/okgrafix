define(function (require, exports, module) {
    'use strict';

    var App = require('app');

    // Create a new module.
    var Contact = App.module();

    // Models.
    Contact.Models = {};

    Contact.Models.Index = Backbone.Model.extend({
        defaults: {
            pageTitle: 'Contact',
            activeLink: 'contact',
            firstName: null,
            lastName: null,
            email: null,
            phone: null
        },

        validate: function (attrs) {
            var errors = [];

            if (!attrs.firstName) {
                errors.push({
                    name: 'firstName',
                    message: 'Please fill first name field.'
                });
            }

            if (!attrs.lastName) {
                errors.push({
                    name: 'lastName',
                    message: 'Please fill lastName field.'
                });
            }

            if (!attrs.email) {
                errors.push({
                    name: 'email',
                    message: 'Please fill email field.'
                });
            }

            if (!attrs.phone) {
                errors.push({
                    name: 'phone',
                    message: 'Please fill phone field.'
                });
            }

            return errors.length > 0 ? errors : false;
        }
    });

    // Views.
    Contact.Views.Content = Backbone.Layout.extend({
        //el: false,
        template: 'contact/index',

        events: {
            'click .submit': 'submitClicked'
        },

        submitClicked: function (e) {
            e.preventDefault();

            var loginData = {
                firstName: this.$('#firstName').val(),
                lastName: this.$('#lastName').val(),
                email: this.$('#email').val(),
                phone: this.$('#phone').val()
            };


            this.model.on('invalid', function (model, errors) {
                // reset all errors first
                this.hideErrors();
                this.showErrors(errors);
            }, this);

            this.model.on('change', function () {
                this.hideErrors();
            }, this);

            //this.model.save(loginData, options);
            this.model.save(loginData);
        },

        showErrors: function (errors) {
            _.each(errors, function (error) {
                var controlGroup = this.$('.' + error.name);
                controlGroup.addClass('error');
                controlGroup.find('.help-inline').text(error.message);
            }, this);

        },

        hideErrors: function () {
            this.$('.control-group').removeClass('error');
            this.$('.help-inline').text('');
        }
    });

    Contact.Views.Header = Backbone.View.extend({
        template: 'partials/header',

        afterRender: function () {
            App.components.navigation(this.$el);
        }
    });

    Contact.Views.Footer = Backbone.View.extend({
        template: 'partials/footer'
    });

    // render layout
    Contact.init = function () {
        // Use the main layout.
        App.useLayout({ template: 'layouts/main'}).setViews({
            'header': new Contact.Views.Header({ model: new Contact.Models.Index() }),
            'main': new Contact.Views.Content({ model: new Contact.Models.Index() }),
            'footer': new Contact.Views.Footer({ model: new Contact.Models.Index() })
        }).render().promise().done(function () {});
    };

    module.exports = Contact;
});