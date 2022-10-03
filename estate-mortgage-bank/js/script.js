$(function () {
  "use strict";
  //+ calculator page
  $('.init-tooltip').tooltip()

  $(document).on('click', '.js-tab', function () {
    var $tabs = $(this).parents('.tabs');
    $tabs.find('.js-tab._active').removeClass('_active');
    $(this).addClass('_active');
    var index = $(this).index();
    var $contents = $tabs.next('.tabs-content');
    $contents.find('.tab-content._active').removeClass('_active');
    $contents.find('.tab-content').eq(index).addClass('_active');
  });

  $('.input-wrapper-select__btn').on('click', function () {
    $(this).parents(".input-wrapper-select").toggleClass('_select-active');
  });
  $(document).on('click', function (e) {
    var currentSelect = e.target.closest(".input-wrapper-select");
    if (!currentSelect) {
      $(".input-wrapper-select._select-active").removeClass('_select-active');
    } else {
      $(".input-wrapper-select._select-active").not(currentSelect).removeClass('_select-active');
    }
  });
  $('.input-wrapper-select__drop-item').on('click', function () {
    $(this).parents(".input-wrapper-select").removeClass('_select-active');
    var value = $(this).attr('data-value') || $(this).text();
    $(this).parents(".input-wrapper-select").find('input').val(value).trigger("focusout");
  });

  $('.init-range-slider').rangeslider({
    polyfill: false,
    onInit: function () {
      this.$element.parents(".inputs-box").find('.input-wrapper input').val(this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    },
    onSlide: function () {
      this.$element.parents(".inputs-box").find('.input-wrapper input').val(this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    }
  });
  $('.input-money').on("focus", function () {
    $(this).val($(this).val().replace(/[^0-9]/g, ''))
  });
  $(".input-money").on("focusout", function (e) {
    var $inputRange = $(this).parents(".inputs-box").find('input[type=range]');
    var summ = Number($(this).val().replace(/[^0-9]/g, '')),
      min = Number($inputRange.attr("min")),
      max = Number($inputRange.attr("max"))
    if (summ < min) {
      $(this).val(min)
    } else if (summ > max) {
      $(this).val(max)
    } else {
      $(this).val(summ)
    }
    $inputRange.val(summ).change()
  });

  var ctxSummaryChart = document.getElementById('chart-summary').getContext('2d');
  var summaryChart = new Chart(ctxSummaryChart, {
    type: 'pie',
    data: {
      labels: ['К возврату', 'Сумма ипотечного кредита', 'Сумма процентов'],
      datasets: [{
        data: [22, 52, 26],
        backgroundColor: [
          '#5ABEDC',
          '#337AB7',
          '#CACEDB',
        ],
        borderWidth: 2
      }]
    },
    options: {
      rotation: -15,
      responsive: true,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false
        },
        labels: {
          render: 'percentage',
          fontColor: ['#FFFFFF', '#FFFFFF', '#333C67'],
          precision: 2,
          fontStyle: 'bold',
          fontSize: 14,
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label
            },
            afterLabel: function (tooltipItem) {
              return tooltipItem.formattedValue + '%';
            }
          },
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          bodyFontSize: 14,
          displayColors: false
        }
      }
    },
  });
  //- calculator page

  //+ mortgage2 page
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
  //- mortgage2 page

  $(".anchor-mortgage").on("click", function () {
    var anchor = $(this).attr("href")
    $('html, body').animate({
      scrollTop: $(anchor).offset().top - 20
    }, 500);
  })
});
