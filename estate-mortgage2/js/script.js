$(function () {
    "use strict";
    var sctollTop = $(window).scrollTop();
    var wHeight = $(window).height();

    if ($('.about-questions-form-validation').length > 0) {
        var swiperAboutReviews = new Swiper(".about-reviews-slider", {
            slidesPerView: 1,
            spaceBetween: 12,
            watchOverflow: true,
            loop: true,
            navigation: {
                nextEl: ".about-reviews-slider-next",
                prevEl: ".about-reviews-slider-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                }
            }
        });
    }

    if ($('.about-questions-form-validation').length > 0) {
        $('.about-questions-form-validation').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            excluded: [':disabled'],
            fields: {
                firstName: {
                    validators: {
                        notEmpty: {
                            message: 'Обязательное поле для заполнения'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Обязательное поле для заполнения'
                        },
                        emailAddress: {
                            message: 'Некорректный адрес'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Обязательное поле для заполнения'
                        },
                        phone: {
                            message: 'Некорректный номер',
                            country: 'RU'
                        }
                    }
                },
                msgText: {
                    validators: {
                        notEmpty: {
                            message: 'Обязательное поле для заполнения'
                        }
                    }
                },
            }
        });
    }

    $('.table-tariff2__show-all').on('click', function () {
        let $table = $(this).closest('.table-tariff2');
        if (!$(this).closest('.table-tariff2').hasClass('_show')) {
            $table.addClass('_show')
            $table.find('.table-tariff2__hidden .table-tariff2__item').slideDown({
                start: function () {
                    $(this).css({
                        display: "flex"
                    })
                }
            });
        } else {
            $table.removeClass('_show')
            $table.find('.table-tariff2__hidden .table-tariff2__item').slideUp();
        }
    });

    if ($('.js-city-select').length > 0) {
        $('.js-city-select').select2({
            width: '100%',
            language: 'ru',
        });
    }
    if ($('.js-bank-select').length > 0) {
        $.fn.select2.amd.define('select2/HideSelectedResultsAdapter', ['select2/utils', 'select2/results'],
            function (Utils, ResultsList) {
                var HideSelectedResultsAdapter = function (decorated, $element, options, dataAdapter) {
                    return decorated.call(this, $element, options, dataAdapter);
                };
                HideSelectedResultsAdapter.prototype.append = function (decorated, data) {
                    return decorated.call(this, {
                        results: $.grep(data.results, function (element) {
                            return element.selected;
                        }, true)
                    });
                };
                return Utils.Decorate(ResultsList, HideSelectedResultsAdapter);
            }
        );

        var Utils = $.fn.select2.amd.require('select2/utils');
        var Dropdown = $.fn.select2.amd.require('select2/dropdown');
        var DropdownSearch = $.fn.select2.amd.require('select2/dropdown/search');
        var CloseOnSelect = $.fn.select2.amd.require('select2/dropdown/closeOnSelect');
        var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');

        var dropdownAdapter = Utils.Decorate(Utils.Decorate(Utils.Decorate(Dropdown, DropdownSearch), CloseOnSelect), AttachBody);

        $('.js-bank-select').each((_i, e) => {
            var $e = $(e);
            $e.select2({
                width: '100%',
                placeholder: 'Все',
                language: 'ru',
                resultsAdapter: $.fn.select2.amd.require('select2/HideSelectedResultsAdapter'),
                dropdownAdapter: dropdownAdapter,
                minimumResultsForSearch: 0,
                dropdownParent: $e.parent()
            }).on('select2:opening select2:closing', function (event) {
                var searchfield = $(this).parent().find('textarea.select2-search__field');
                searchfield.prop('disabled', true);
            });
        })
    }


    if ($('.modal-feed-form-validation').length > 0) {
        $('.modal-feed-form-validation').bootstrapValidator({
            feedbackIcons: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            excluded: [':disabled'],
            fields: {
                feedLink: {
                    validators: {
                        uri: {
                            message: 'Некорректная ссылка'
                        },
                        notEmpty: {
                            message: 'Обязательное поле для заполнения'
                        }
                    }
                }
            }
        });
    }

    $(document).on('click', '.js-open-edit-feed-input', function () {
        $('.feed-input__input._last-edit').removeClass('_last-edit');
        $(this).closest('.feed-input').find('.feed-input__input').addClass('_last-edit');
        let currentFeed = $(this).closest('.feed-input').find('.feed-input__input').attr('href');
        $('.modal-edit-feed-input').val(currentFeed);
        $('#modal-edit-feed .modal-feed-form-validation').data('bootstrapValidator').resetForm();
    })
    $(document).on('click', '.js-open-add-feed-input', function () {
        $('.modal-new-feed-input').val("");
        $('#modal-add-feed .modal-feed-form-validation').data('bootstrapValidator').resetForm();
    })

    $('.js-add-feed-input').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.modal-feed-form-validation').bootstrapValidator('validate');
        if ($(this).closest('.modal-feed-form-validation').data('bootstrapValidator').isValid()) {
            let newFeed = $('.modal-new-feed-input').val();
            let rowSource = $('.xml-feed__row_hidden');
            let newRow = rowSource.clone();
            newRow.find('.feed-input__input').attr('href', newFeed).text(newFeed);
            newRow.removeClass('xml-feed__row_hidden').insertBefore(rowSource);
            $('#modal-add-feed').modal('hide');
        }

    })
    $('.js-edit-feed-input').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.modal-feed-form-validation').bootstrapValidator('validate');
        if ($(this).closest('.modal-feed-form-validation').data('bootstrapValidator').isValid()) {
            let newFeed = $('.modal-edit-feed-input').val();
            $('.feed-input__input._last-edit').attr('href', newFeed).text(newFeed);
            $('#modal-edit-feed').modal('hide');
        }

    })
    $(document).on('click', '.js-remove-feed-input', function () {
        $(this).closest('.xml-feed__row').remove();
    })
    $('.xml-feed-table-show').on('click', function () {
        $(this).prev('.xml-feed-table').addClass('_show-all');
        $(this).addClass('_hide');
    })

    $('.calc-mortgage-new').on('click', function (e) {
        if ($(e.target).hasClass('calc-mortgage-new')) {
            $('.calc-mortgage-new').removeClass('_show');
            $('body').removeClass('mortgage-filter-popup-show');
        }
    });
    $('.js-mortgage-filter').on('click', function () {
        $('.calc-mortgage-new').toggleClass('_show');
        $('body').toggleClass('mortgage-filter-popup-show');
    });

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

    $(document).on('click', '.js-tab', function () {
        var $tabs = $(this).parents('.tabs');
        $tabs.find('.js-tab._active').removeClass('_active');
        $(this).addClass('_active');
        var index = $(this).index();
        var $contents = $tabs.next('.tabs-content');
        $contents.find('.tab-content._active').removeClass('_active');
        $contents.find('.tab-content').eq(index).addClass('_active');
    });

    $('.sidenav-button').on('click', function () {
        $('.sidenav').addClass('sidenav_open');
        $('.sidenav-overlay').addClass('sidenav-overlay_open');
    });
    $('.sidenav__close, .sidenav-overlay').on('click', function () {
        $('.sidenav').removeClass('sidenav_open');
        $('.sidenav-overlay').removeClass('sidenav-overlay_open');
    });

    $('.table-tariff__accordion-head').on('click', function () {
        var $container = $(this).closest('.table-tariff__accordion');
        var $drop = $container.children('.table-tariff__accordion-content');
        if ($container.hasClass('_active')) {
            $drop.first().slideUp('fast').queue(function () {
                $container.removeClass('_active');
                $drop.removeAttr('style');
                $drop.find('.table-tariff__accordion').removeClass('_active');
                $(this).dequeue();
            });
        } else {
            $drop.slideDown('fast').queue(function () {
                $container.addClass('_active');
                $drop.removeAttr('style');
                $(this).dequeue();
            });
        }
    });

    $(window).on('resize', function () {
        wHeight = $(window).height()

        //Переносит кнопки формы
        if ($(window).width() < 992) {
            $('.calc-mortgage-new__bottom-btns').appendTo($('.mortgage-mobile-btn-wrapper'));
        } else {
            $('.calc-mortgage-new__bottom-btns').appendTo($('.calc-mortgage-new__bottom'))
        }
    })
    $(window).trigger('resize');

    if ($('.show-table-tariff-popover').length > 0) {
        $('.show-table-tariff-popover').popover()
            .map(function () {
                $(this).data('bs.popover')
                    .tip()
                    .addClass('table-tariff-popover')
            });
    }
    $('body').on('click', function (e) {
        $('.show-table-tariff-popover').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    // Кнопка отображения списка ссылок в блоке "Часто ищут"
    $('.often-searched__title').on('click', function () {
        $(this).parents('.often-searched__contet').toggleClass('show')
    });

    // Кнопка отображения всей таблици в мобильном виде
    $('.table-mortgage2-show-all').on('click', function () {
        $(this).remove();
        $('.table-mortgage2').addClass('table-mortgage2_all')
    });

    //Инициализация сортировки таблицы
    if ($('#table-mortgage2').length > 0) {
        new Tablesort(document.getElementById('table-mortgage2'));
    }

    //Подсветка колонки при наведении
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

    // Инициализация селектов
    $('.select-styled-new2').selectpicker();

    // Фильтры ипотеки - переключает состояние кнопки
    $('.js-mortgage-filter-toggle').on('click', function () {
        $(this).toggleClass('active');
    });

    // Фильтры ипотеки - кнопка "+ Еще"
    $('.js-mortgage-filter-more').on('click', function () {
        var $container = $(this).parents('.mortgage-filter');
        if ($container.hasClass('active')) {
            $container.removeClass('active');
            $(this).html(
                '<i class="fa fa-plus"></i>' +
                '<span class="btn-styled-new2_bold">Еще</span>'
            );
        } else {
            $container.addClass('active');
            $(this).html(
                '<i class="fa  fa-minus"></i>' +
                '<span class="btn-styled-new2_bold">Свернуть</span>'
            );
        }
    });

    // Дополнительные условия Ипотеки: кнопка "+ Еще условия", крестик в попапе
    $('.js-mortgage-more').on('click', function () {
        var $container = $('.calc-mortgage-new');
        if ($container.hasClass('active')) {
            $container.removeClass('active');
            $('.btn.js-mortgage-more').find('.btn-styled-new2__inner').html(
                '<i class="fa fa-plus"></i>' +
                '<span class="btn-styled-new2_bold">Еще условия</span>'
            );
        } else {
            $container.addClass('active');
            $('.btn.js-mortgage-more').find('.btn-styled-new2__inner').html(
                '<i class="fa  fa-minus"></i>' +
                '<span class="btn-styled-new2_bold">Свернуть</span>'
            );
        }
    });
    if ($('.calc-mortgage-new').length > 0) {
        //range sliders
        //init
        $('#mortgage-summ').rangeslider({
            polyfill: false,
            onSlide: function (position, value) {
                $("#calc-mortgage-summ").val(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
                sumVal();
            }
        });

        //init
        $('#initial-fee').rangeslider({
            polyfill: false,
            onSlide: function (position, value) {
                $("#calc-mortgage-initial-fee").val(value).val(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
                sumVal();
            }
        });

        //init
        $('#mortgage-term').rangeslider({
            polyfill: false,
            onSlide: function (position, value) {
                $("#calc-mortgage-term").val(value);
                sumVal();
            }
        });


        //clear on focus
        $("#calc-mortgage-summ, #calc-mortgage-initial-fee").on("focus", function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''))
        });

        //on focusout trigger rangeslider
        $(".calc-mortgage-new #calc-mortgage-initial-fee").on("focusout", function (e) {
            var summ = Number($(this).val().replace(/[^0-9]/g, '')),
                min = Number($("#initial-fee").attr("min")),
                max = Number($("#initial-fee").attr("max"))
            if (summ < min) {
                $(this).val(min)
            } else if (summ > max) {
                $(this).val(max)
            } else {
                $(this).val(summ)
            }
            var $inputRange = $('#initial-fee')
            $inputRange.val(summ).change()
        });

        //on focusout trigger rangeslider
        $(".calc-mortgage-new #calc-mortgage-term").on("focusout", function (e) {
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

        //on focusout trigger rangeslider
        $(".calc-mortgage-new #calc-mortgage-summ").on("focusout", function (e) {
            var min = Number($("#mortgage-summ").attr("min")),
                max = Number($("#mortgage-summ").attr("max")),
                summ = parseFloat($(this).val()) || min,

                summ = Math.round(summ * Math.pow(10, 1)) / Math.pow(10, 1);
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

        function sumVal() {
            var initialFee = $("#calc-mortgage-initial-fee").val().replace(/[^0-9]/g, ''),
                years = $("#calc-mortgage-term").val().replace(/[^0-9]/g, ''),
                price = $("#calc-mortgage-summ").val().replace(/[^0-9]/g, '');
            $(".calc-mortgage-new__sum").html(Math.round(((price - initialFee) / (years * 12)) * 1.09).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " ₽")
        }
        sumVal()
    }
});
