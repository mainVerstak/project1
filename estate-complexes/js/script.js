$(function () {
    "use strict";

    $('.sidenav-button').on('click', function () {
        $('.sidenav').addClass('sidenav_open');
        $('.sidenav-overlay').addClass('sidenav-overlay_open');
    });
    $('.sidenav__close, .sidenav-overlay').on('click', function () {
        $('.sidenav').removeClass('sidenav_open');
        $('.sidenav-overlay').removeClass('sidenav-overlay_open');
    });

    $('.card-complex__favorite').on('click', function () {
        $(this).toggleClass('_active');
    });

    $('.card-complex .fotorama__wrap').addClass('fotorama__wrap--no-controls');

    $('.card-complex__btn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('_active')) return;
        $(this).text($(this).attr('data-num'));
        $(this).addClass('_active');
    });
});
