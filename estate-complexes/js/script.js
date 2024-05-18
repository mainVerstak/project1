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


    $('.appartments__list > li').each(function() {
        var subMenu = $(this).find('.appartments__list');
        $(this).find('.appartments__more').on('click', function(e) {
            $(this).toggleClass('opened');
            e.preventDefault();
            subMenu.slideToggle(300);
        })

        $('.ds-docs__wrap a').slice(0, 4).addClass('visible');

        $('.ds-docs__more').click(function(e) {
            e.preventDefault();
            if ($(this).text() === 'Другие документы') {
                $('.ds-docs__wrap a').addClass('visible');
                $(this).text('Свернуть');
                $(this).addClass('arrow-reverse');
            } else {
                $('.ds-docs__wrap a').removeClass('visible');
                $('.ds-docs__wrap a').slice(0, 4).addClass('visible');
                $(this).text('Другие документы');
                $(this).removeClass('arrow-reverse');
            }
        });
    })

});
