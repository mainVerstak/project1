$(function () {
  "use strict";
  let sctollTop = $(window).scrollTop();
  $(window).on('scroll', function () {
    sctollTop = $(window).scrollTop();
    if ($('.btn-place-an-ad').length > 0) {
      if (sctollTop > 300) {
        $('.btn-place-an-ad').addClass('_hide');
      } else {
        $('.btn-place-an-ad').removeClass('_hide');
      }
    }
  });

});
