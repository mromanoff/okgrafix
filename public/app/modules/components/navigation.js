define(function (require, exports, module) {
    'use strict';

    var $ = require('jquery');

    module.exports = function ($el) {

        $el.find('.menu').on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('is-hidden');
            $('nav.main-transparent .icon-close').toggleClass('is-hidden');

            $('nav.main').addClass('open-links');

            $('body').on('touchmove', function (e) {
                e.preventDefault();
            });

            // Fix #DPLAT-695
            setTimeout(function () {
                window.scrollTo(1, 1);
            }, 5);
        });
        $el.find('.icon-close').on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('is-hidden');
            $('nav.main-transparent .menu').toggleClass('is-hidden');

            $('nav.main').removeClass('open-links');

            $('body').off('touchmove');
        });

        // On Scroll, make the nav translucent.
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > $('nav.main').height()) {
                $('nav.main').addClass('active');
            } else {
                $('nav.main').removeClass('active');
            }
        });

        // fix for ipad position fixed on keyboard focus
        $('input').on('focus', function () {
            $('nav.main').css({position: 'absolute'});
        });

        $('input').on('blur', function () {
            $('nav.main').css({position: 'fixed'});
        });

    };
});