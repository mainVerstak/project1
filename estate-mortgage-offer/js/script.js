$(function () {
  "use strict";

  $(document).on('click', '.table-mortgage2__btn-detail', function () {
    var $item = $(this).parents('tr');
    var $content = $item.find('.table-mortgage2__detail');
    if ($content.hasClass('_active')) {
      $item.find('.table-mortgage2__btn-detail').removeClass('_active').text('Показать условия');
      $content.removeClass('_active');
    } else {
      $item.find('.table-mortgage2__btn-detail').addClass('_active').text('Скрыть условия');
      $content.addClass('_active');
    }
  });

  $('.table-mortgage2-show-all').on('click', function () {
    $(this).remove();
    $('.table-mortgage2').addClass('table-mortgage2_all')
  });

  if ($('#table-mortgage2').length > 0) {
    new Tablesort(document.getElementById('table-mortgage2'));
  }

  $('.table-mortgage2 tbody td').on('mouseenter', function () {
    var index = $(this).index();
    var rows = $(this).parents('.table-mortgage2').find('tr').each(function () {
      $(this).find('td').eq(index).addClass('hover');
      $(this).find('th').eq(index).addClass('hover');
    });
  });
  $('.table-mortgage2 tbody td').on('mouseleave', function () {
    var index = $(this).index();
    var rows = $(this).parents('.table-mortgage2').find('tr').each(function () {
      $(this).find('td').eq(index).removeClass('hover');
      $(this).find('th').eq(index).removeClass('hover');
    });
  });
  
});
