$(function () {
  "use strict";
  let sctollTop = $(window).scrollTop();
  let wHeight = $(window).height();

  $(window).on('resize', function () {
    wHeight = $(window).height();
  })

  $(window).on('scroll', function () {
    sctollTop = $(window).scrollTop();
    if ($('.btn-phone-floating').length > 0) {
      //Скрывает кнопку если конец блока появляется на экране
      if ($('.js-adtvt-container').height() + $('.js-adtvt-container').offset().top < sctollTop + wHeight) {
        $('.btn-phone-floating').addClass('_hide');
      } else {
        $('.btn-phone-floating').removeClass('_hide');
      }

      //Скрывает кнопку если начало блока появляется на экране
      /* if ($('.js-adtvt-after-container').offset().top < sctollTop + wHeight) {
        $('.btn-phone-floating').addClass('_hide');
      } else {
        $('.btn-phone-floating').removeClass('_hide');
      } */
    }
  });

});
