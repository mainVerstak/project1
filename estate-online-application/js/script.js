$(function () {
  "use strict";

  $('.set-datepicker').datepicker({
    position: "bottom right",
    autoClose: true,
    dateFormat: "dd.mm.yy",
    startDate: new Date(),
  });

  var wWidth = $(window).width();
  var fotoramaSteps = null;

  function catchFrame(fotorama, $frame) {
    setTimeout(function () {
      fotorama.resize({ height: $('.fotorama__html > *', $frame).height() }, 250);
    }, 1);
  }

  $(window).on('resize', function () {
    wWidth = $(window).width();

    if (wWidth < 768) {
      fotoramaSteps = $('.fotorama-steps').on('fotorama:showend', function (e, fotorama) {
        var $frame = fotorama.activeFrame.$stageFrame;
        if (!$frame.data('state')) {
          $frame.on('f:load f:error', function () {
            fotorama.activeFrame.$stageFrame === $frame && catchFrame(fotorama, $frame);
          });
        } else {
          catchFrame(fotorama, $frame);
        }
      }).fotorama({
        width: '100%',
        maxwidth: '100%',
        minheight: 124,
        allowfullscreen: false,
        nav: 'dots',
        arrows: false,
      });
    } else {
      if (fotoramaSteps) {
        fotoramaSteps.data('fotorama').destroy();
        $('.fotorama-steps').removeClass('fotorama');
      }
    }

    $(window).trigger('scroll');
  })
  $(window).trigger('resize');



  $('.init-tooltip').tooltip()

  $('.mask-phone').mask(
    "+7 (000) 000-000",
    { placeholder: "+7 (___) ___-____" }
  );

  function addressMatches() {
    if ($('.address-matches').is(':checked')) {
      $('.registration-address').attr('disabled', true);
    } else {
      $('.registration-address').attr('disabled', false);
    }
  }
  addressMatches();
  $('.address-matches').on('change', addressMatches);

  $('.custom-select').selectpicker();

  $('.init-range-slider').rangeslider({
    polyfill: false,
    onInit: function () {
      this.$element.parents(".inputs-box").find('.input-wrapper input').val(this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    },
    onSlide: function (position, value) {
      this.$element.parents(".inputs-box").find('.input-wrapper input').val(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    }
  });
  $('.input-money').on("focus", function () {
    $(this).val($(this).val().replace(/[^0-9]/g, ''))
  });
  $(".input-money").on("focusout", function (e) {
    var $inputRange = $(this).parents(".inputs-box").find('input[type=range]');
    var value = Number($(this).val().replace(/[^0-9]/g, '')),
      min = Number($inputRange.attr("min")),
      max = Number($inputRange.attr("max"))
    if (value < min) {
      $(this).val(min);
    } else if (value > max) {
      $(this).val(max);
    } else {
      $(this).val(value);
    }
    $inputRange.val(value).change();
  });
});
