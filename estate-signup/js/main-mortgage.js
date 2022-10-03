$(function () {
    "use strict";

    $('.js-calc-mortgage-more').on('click', function () {
        var $container = $('.calc-mortgage');
        if ($container.hasClass('active')) {
            $container.removeClass('active');
            $('body').removeClass('calc-mortgage-filter-popup-show');
        } else {
            $container.addClass('active');
            $('body').addClass('calc-mortgage-filter-popup-show');
        }
    });

    $('.show-table-mortgag-popover').popover()
        .map(function () {
            $(this).data('bs.popover')
                .tip()
                .addClass('table-mortgag-popover')
        });

    //range sliders
    //init
    $('#mortgage-summ').rangeslider({
        polyfill: false,
        onSlide: function (position, value) {
            $(".calc-mortgage-summ").val(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
            sumVal()
        }
    });

    //init
    $('#mortgage-term').rangeslider({
        polyfill: false,
        onSlide: function (position, value) {
            $(".calc-mortgage-term").val(value)
            sumVal()
        }
    });
    
    //init
    $('#mortgage-rate').rangeslider({
        polyfill: false,
        onSlide: function (position, value) {
            $(".calc-mortgage-rate").val(value)
            sumVal()
        }
    });

    //pay in month
    function sumVal() {
        var summ = $(".calc-mortgage-summ").val().replace(/[^0-9]/g, ''),
            years = $(".calc-mortgage-term").val().replace(/[^0-9]/g, ''),
            price = $(".calc-mortgage-price").val().replace(/[^0-9]/g, ''),
            rate = parseFloat($(".calc-mortgage-rate").val()) / 100 + 1
        var result = Math.round(((price - summ) / (years * 12)) * rate)
        result = (result >= 0) ? result : 0
        result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        $(".calc-mortgage__sum").html(result + " ₽")
    }

    sumVal()

    //clear on focus
    $(".calc-mortgage-summ, .calc-mortgage-term").on("focus", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''))
    });

    //on focusout trigger rangeslider #mortgage-sum
    $(".calc-mortgage .calc-mortgage-summ").on("focusout", function (e) {
        var summ = Number($(this).val().replace(/[^0-9]/g, '')),
            min = Number($("#mortgage-summ").attr("min")),
            max = Number($("#mortgage-summ").attr("max"))
        if (summ < min) {
            $(this).val(min)
        } else if (summ > max) {
            $(this).val(max)
        } else {
            $(this).val(summ)
        }
        var $inputRange = $('#mortgage-summ')
        $inputRange.val(summ).change()
    });

    //on focusout trigger rangeslider #mortgage-term
    $(".calc-mortgage .calc-mortgage-term").on("focusout", function (e) {
        var summ = Number($(this).val().replace(/[^0-9]/g, '')),
            min = Number($("#mortgage-term").attr("min")),
            max = Number($("#mortgage-term").attr("max"))
        if (summ < min) {
            $(this).val(min)
        } else if (summ > max) {
            $(this).val(max)
        } else {
            $(this).val(summ)
        }
        var $inputRange = $('#mortgage-term')
        $inputRange.val(summ).change()
    });

    //on focusout trigger rangeslider #mortgage-term
    $(".calc-mortgage .calc-mortgage-rate").on("focusout", function (e) {
        var min = Number($("#mortgage-term").attr("min")),
            max = Number($("#mortgage-term").attr("max")),
            summ = parseFloat($(this).val()) || min,

            summ = Math.round(summ * Math.pow(10, 1)) / Math.pow(10, 1);
        if (summ < min) {
            $(this).val(min)
        } else if (summ > max) {
            $(this).val(max)
        } else {
            $(this).val(summ)
        }
        var $inputRange = $('#mortgage-rate')
        $inputRange.val(summ).change()
    });

});