$(function () {
    "use strict";
    var sctollTop = $(window).scrollTop();
    var wHeight = $(window).height();
    $(window).on('resize', function () {
        wHeight = $(window).height();
    })

    $(window).on('scroll', function () {
        sctollTop = $(window).scrollTop();
        if ($('.js-floating-container').length > 0) {
            if (sctollTop + wHeight >= $('.js-floating-container').height() + $('.js-floating-container').offset().top + 16) {
                $('.js-floating-content').removeClass('_fixed');
            } else {
                $('.js-floating-content').addClass('_fixed');
            }
        }
    });
    $(window).trigger('scroll');

    $('.publication-item__input').on('change', function () {
        switch ($(this).attr('data-type')) {
            case 'default':
                $('.object-announce').find('.label').remove();
                $('.object-announce').removeClass('object-announce_urgent').addClass('object-announce_default');
                break;
            case 'urgent':
                $('.object-announce').find('.label').remove();
                $('.object-announce').find('.object-announce__status').prepend(
                    '<span class="label label-danger"><i class="fas fa-bolt"></i> Срочное</span>'
                );
                $('.object-announce').removeClass('object-announce_default').addClass('object-announce_urgent');
                break;
            default:
                break;
        }
        let price = $(this).closest('.publication-item').find('.publication-item__price-value').text();
        $('.publications__btn-value').text(price);
    });
});
