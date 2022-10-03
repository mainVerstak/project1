$(function () {
  $('.set-datepicker-hotel-from').datepicker({
    position: "bottom right",
    autoClose: true,
    dateFormat: "dd MM",
    startDate: new Date(),
  });
  $('.set-datepicker-hotel-from').each(function (index, item) {
    $(item).data('datepicker').selectDate(new Date());
  });
  $('.set-datepicker-hotel-to').datepicker({
    position: "bottom right",
    autoClose: true,
    dateFormat: "dd MM",
    startDate: new Date(),
  });
  $('.set-datepicker-hotel-to').each(function (index, item) {
    $(item).data('datepicker').selectDate(new Date());
  });

  if ($('.js-city-select2').length > 0) {
    $('.js-city-select2').select2({
      width: '100%',
      language: 'ru',
      selectionCssClass: 'select2-slim',
      dropdownCssClass: 'select2-slim',
    });
  }
});
