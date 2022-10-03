$(function () {
  "use strict";

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

  $('.calculators__item').on('click', function () {
    $(this).parents('.calculators__select').removeClass("_active")
    $(this).parents('.calculators').find('.calculators__item._active').removeClass('_active');
    $(this).addClass('_active')
  });

  $('.interest-payments__tab').on('click', function () {
    $(this).parent().find('.interest-payments__tab._active').removeClass('_active');
    $(this).addClass('_active')
  });

  $('.payment-schedule__more').on('click', function () {
    $(this).parents(".payment-schedule").find('.payment-schedule-table').removeClass('_cut');
    $(this).remove();
  });

  $('.calculators__select-mobile').on('click', function () {
    $(this).parents(".calculators__select").toggleClass('_active');
  });

  $('.js-early-repayment').on('click', function () {
    $(this).parents(".calculator").toggleClass('_early-repayment');
  });

  $('.set-datepicker').datepicker({
    position: "bottom right",
    autoClose: true,
    dateFormat: "dd.mm.yy",
    startDate: new Date(),
  });
  $('.set-datepicker').each(function (index, item) {
    $(item).data('datepicker').selectDate(new Date());
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
  $(".interest-rate").on("focusout", function (e) {
    var $inputRange = $(this).parents(".inputs-box").find('input[type=range]');
    var summ = parseFloat($(this).val().replace(/,/g, '.')).toFixed(1),
      min = Number($(this).attr("min")),
      max = Number($(this).attr("max"));
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

  function calcBarBg(data) {
    var maxValue = Math.max.apply(null, data);
    var array = data.map(function (x) {
      return maxValue - x;
    });
    return array;
  };
  var paymentChartLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
  var paymentChartData = [53, 15, 47, 33, 21, 45, 23, 75, 13, 19, 72, 37, 52, 69, 34, 24, 68, 55, 22, 78, 23, 15, 60, 77, 22, 45, 10, 56];
  var paymentChartDataBg = calcBarBg(paymentChartData);
  var ctxPaymentChart = document.getElementById('interest-payments').getContext('2d');
  var paymentChart = new Chart(ctxPaymentChart, {
    type: 'bar',
    data: {
      labels: paymentChartLabels,
      datasets: [
        {
          data: paymentChartData,
          backgroundColor: '#337AB7',
          borderWidth: 0
        },
        {
          data: paymentChartDataBg,
          backgroundColor: '#F0F2F6',
          hoverBackgroundColor: '#F0F2F6',
          borderWidth: 0,
          pointHitRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      categoryPercentage: 0.97,
      barPercentage: 0.97,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return parseInt(value + 1);
            },
            autoSkip: true,
            maxTicksLimit: 10,
            stepSize: 4,
            color: "#8285B4",
            font: {
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              size: 12,
              lineHeight: 1.5,
            },
            color: '#8E95A5',
          },
        },
        y: {
          stacked: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        labels: false,
        tooltip: {
          filter: function (tooltipItem) {
            return tooltipItem.datasetIndex === 0;
          },
          callbacks: {
            title: function (tooltipItem) {
              return false
            },
            label: function (tooltipItem) {
              return "Выплаты процентов: " + tooltipItem.label
            },
            afterLabel: function (tooltipItem) {
              return tooltipItem.formattedValue;
            }
          },
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          bodyFontSize: 14,
          displayColors: false,
        }
      }
    },
  });
});
