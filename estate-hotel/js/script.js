$(function () {
    "use strict";

    $(".js-anchor-hotel").on("click", function () {
        var anchor = $(this).attr("href")
        $('html, body').animate({
            scrollTop: $(anchor).offset().top - 20
        }, 500);
    })

    $('.hotel-reviews__btn-mobile').on('click', function () {
        $(this).closest('.hotel-reviews').addClass('_show-reviews');
    });

    $('.js-hotel-list-show-btn').on('click', function () {
        let $list = $(this).closest('.js-hotel-list-show');
        if ($list.hasClass('_show')) {
            $(this).removeClass('_active');
            $(this).find('span').text('Показать все');
            $list.removeClass('_show');
        } else {
            $(this).addClass('_active');
            $(this).find('span').text('Скрыть');
            $list.addClass('_show');
        }
    });

    $('.hotel-room-row__list-more').on('click', function () {
        let $list = $(this).closest('.hotel-room-row__cell').find('.hotel-room-row__list');
        if ($list.hasClass('_show')) {
            $(this).removeClass('_active');
            $(this).find('span').text('Больше информации');
            $list.removeClass('_show');
        } else {
            $(this).addClass('_active');
            $(this).find('span').text('Скрыть');
            $list.addClass('_show');
        }
    });

    $('.hotel-room__more').on('click', function () {
        let $list = $(this).closest('.hotel-room__bottom').find('.hotel-room__list');
        if ($list.hasClass('_show')) {
            let count = $list.find('.hotel-room-row._hidden').length;
            if (count < 2) {
                count = count + ' тариф'
            } else if (count < 5) {
                count = count + ' тарифа'
            } else {
                count = count + ' тарифов'
            }
            $(this).removeClass('_active');
            $(this).find('span').text('Показать еще ' + count);
            $list.removeClass('_show');
        } else {
            $(this).addClass('_active');
            $(this).find('span').text('Скрыть');
            $list.addClass('_show');
        }
    });

    $('.hotel-room__amenities-show').on('click', function () {
        let $list = $(this).closest('.hotel-room__amenities').find('.hotel-room__amenities-list');
        if ($list.hasClass('_show')) {
            $(this).removeClass('_active');
            $(this).text('Полный список удобств');
            $list.removeClass('_show');
        } else {
            $(this).addClass('_active');
            $(this).text('Скрыть');
            $list.addClass('_show');
        }
    });

    var breadcrumb = [];
    function collapseBreadcrumb() {
        $(".hotel-breadcrumb:not(.no-collapse-breadcrumb) .hotel-breadcrumb__list").each(function (i, breadcrumbList) {
            let breadcrumbItem = $(breadcrumbList);
            if (breadcrumbItem.parent().hasClass('_collapsed')) return
            breadcrumbItem.parent().addClass('_collapsed');

            if (breadcrumbItem.children().length >= 4) {
                let breadcrumbDetached = breadcrumbItem.children().slice(1, -1).detach();

                breadcrumb.push({ 'list': breadcrumbItem, 'detached': breadcrumbDetached })

                let expand_breadcrumb = $('<li><a href=""><strong>...</strong></a></li>');
                expand_breadcrumb.on('click', function (event) {
                    event.preventDefault();
                    breadcrumbItem.children().slice(1, -1).remove();
                    breadcrumbItem.children().eq(0).after(breadcrumbDetached);
                });
                breadcrumbItem.children().eq(0).after(expand_breadcrumb);
            }
        });
    }
    function expandBreadcrumb() {
        let i = breadcrumb.length;
        while (i--) {
            breadcrumb[i].list.children().slice(1, -1).remove();
            breadcrumb[i].list.children().eq(0).after(breadcrumb[i].detached);
            breadcrumb[i].list.parent().removeClass('_collapsed');
            breadcrumb.splice(i, 1);
        }
    }
    let wWidth = $(window).width();
    if (wWidth <= 479) {
        collapseBreadcrumb();
    }
    $(window).on("resize", function (event) {
        let wWidth = $(window).width();
        if (wWidth <= 479) {
            collapseBreadcrumb();
        } else {
            expandBreadcrumb();
        }
    });

    $('.js-modal-hotel').on('click', function () {
        $('.modal-hotel-card').addClass('_active');
        $('body').addClass('_modal-hotel-card');
    });
    $('.modal-hotel-card__close, .modal-hotel-card__back').on('click', function () {
        $('.modal-hotel-card').removeClass('_active');
        $('body').removeClass('_modal-hotel-card');
    });
    $('.modal-hotel-card').on('click', function (e) {
        if ($(e.target).hasClass('modal-hotel-card')) {
            $(this).removeClass('_active');
            $('body').removeClass('_modal-hotel-card');
        }
    })

    $('.deployment-input__confirm').on('click', function () {
        let $container = $(this).closest('.deployment-input');
        closeDeploymentInput($container)
    });
    $('.deployment-input__drop').on('click', function (e) {
        if ($(e.target).hasClass('deployment-input__drop')) {
            let $container = $(this).closest('.deployment-input');
            closeDeploymentInput($container)
        }
    });
    function closeDeploymentInput($container) {
        $container.removeClass('_active');
        $('body').removeClass('_deployment-input-active');
        calcdHotelDeployment($container);
    }

    function calcdHotelDeployment($container) {
        let $rooms = $container.find('.deployment-input__item').not('.deployment-input__item._hidden-copy');
        let $field = $container.find('.deployment-input__current');
        let room = $rooms.length;
        let adult = 0;
        $rooms.each(function () {
            adult += +$(this).find('.deployment-counter__input-adult').val();
        })
        let children = $container.find('.deployment-input__children-tag').length;
        let result = '';
        if (room < 2) {
            room = room + ' номер'
        } else if (room < 5) {
            room = room + ' номера'
        } else {
            room = room + ' номеров'
        }
        result += room;
        if (adult < 2) {
            adult = adult + ' взрослый'
        } else {
            adult = adult + ' взрослых'
        }
        result += ', ' + adult;
        if (children > 0) {
            if (children < 2) {
                children = children + ' ребенок'
            } else {
                children = children + ' детей'
            }
            result += ', ' + children;
        }
        $field.val(result);
    }
    $('.deployment-input__add-room').on('click', function () {
        let $item = $(this).closest('.deployment-input').find('.deployment-input__item._hidden-copy');
        let num = $(this).closest('.deployment-input').find('.deployment-input__item').not('.deployment-input__item._hidden-copy').length;
        let $itemCopy = $item.clone();
        $itemCopy.removeClass('_hidden-copy');
        $itemCopy.find('.deployment-input__item-num span').text(num + 1);
        $item.before($itemCopy);
    });
    $(".deployment-input").on("click", ".deployment-input__item-remove", function (e) {
        let $container = $(this).closest('.deployment-input');
        $(this).closest('.deployment-input__item').remove();
        $container.find('.deployment-input__item').not('.deployment-input__item._hidden-copy').each(function (i) {
            $(this).find('.deployment-input__item-num span').text(i + 1);
        });
        e.stopPropagation();
    });

    $(".deployment-input").on("click", ".deployment-input__children-new", function () {
        $(this).closest('.deployment-input__item').addClass('_adding-child');
    });
    $(".deployment-input").on("click", ".deployment-input__age-remove", function () {
        $(this).closest('.deployment-input__item').removeClass('_adding-child');
    });
    $(".deployment-input").on("click", ".deployment-input__children-tag-remove", function (e) {
        $(this).closest('.deployment-input__children-tag').remove();
        e.stopPropagation();
    });
    $('.deployment-input').on('click', '.deployment-input__age-add', function () {
        $(this).closest('.deployment-input__item').removeClass('_adding-child');
        let $containerBtn = $(this).closest('.deployment-input__item').find('.deployment-input__children-new');
        let age = $(this).closest('.deployment-input__item').find('.deployment-counter__input-age').val();
        if (age < 2) {
            age = age + " год";
        } else if (age < 5) {
            age = age + " года";
        } else {
            age = age + " лет";
        }
        $containerBtn.before('<div class="deployment-input__children-tag">' + age + '<i class="fas fa-times deployment-input__children-tag-remove"></i></div>')
    });
    $('.deployment-input__field').on('click', function () {
        if ($(this).closest('.deployment-input').hasClass('_active')) {
            $(this).closest('.deployment-input').removeClass('_active');
            $('body').removeClass('_deployment-input-active');
        } else {
            $(this).closest('.deployment-input').addClass('_active');
            $('body').addClass('_deployment-input-active');
        }

    });
    $('.deployment-input__drop-close').on('click', function () {
        let $container = $(this).closest('.deployment-input');
        closeDeploymentInput($container)
    });
    $(document).on('click', function (e) {
        let $activeDeploymentInput = $('.deployment-input._active').not($(e.target).closest('.deployment-input'));
        $activeDeploymentInput.each(function () {
            $(this).removeClass('_active');
            calcdHotelDeployment($(this));
        })
        if ($('.deployment-input._active').length < 1)
            $('body').removeClass('_deployment-input-active');
    });

    $(document).on('change keydown paste keyup', '.js-input-counter', function () {
        let $input = $(this);
        let value = $input.val().replace(/[^\d]+/g, '');
        $input.val(value)
    });
    $(document).on('focusout', '.js-input-counter', function () {
        let $input = $(this);
        let value = $input.val().replace(/[^\d]+/g, '');
        let min = $input.attr('min');
        let max = $input.attr('max');
        if (value < Number(min)) {
            value = min;
        }
        if (value > Number(max)) {
            value = max;
        }
        $input.val(value)
    });
    $(document).on('click', '.js-input-dec', function () {
        let $input = $(this).parent().find('input');
        let min = $input.attr('min');
        let value = $input.val() - 1;
        if (value < Number(min)) {
            value = min;
        }
        $input.val(value);
        $input.trigger('change');
    });
    $(document).on('click', '.js-input-inc', function () {
        let $input = $(this).parent().find('input');
        let max = $input.attr('max');
        let value = Number($input.val()) + 1;
        if (value > Number(max)) {
            value = max;
        }
        $input.val(value);
        $input.trigger('change');
    });

    if ($('.map-hotel-list__list-outer').length > 0) {
        $('.map-hotel-list__list-outer').theiaStickySidebar({
            additionalMarginTop: 16,
            additionalMarginBottom: 16
        });
    }

    $('.js-hide-hotel-map').on('click', function () {
        $('body').removeClass('_show-hotel-map');
        $('.hotel-sidebar__map-item').removeClass('_hide');
        $('.hotel-list-wrapper').removeClass('_show-map');
    });
    $('.js-show-hotel-map').on('click', function () {
        if (yaMapReady) {
            ymaps.ready(initHotelMap)
        } else {
            runHotelMap = true;
        }
        $('body').addClass('_show-hotel-map');
        $('.hotel-sidebar__map-item').addClass('_hide');
        $('.hotel-list-wrapper').addClass('_show-map');

        let containerOffset = $('.hotel-content-grid').offset().top - 20;
        $("html, body").animate({ scrollTop: containerOffset });

    });

    $('.js-show-hotel-filter').on('click', function () {
        if ($('.hotel-sidebar').hasClass('_active')) {
            $('.hotel-sidebar').removeClass('_active');
            $('body').removeClass('_hotel-sidebar');
        } else {
            $('.hotel-sidebar').addClass('_active');
            $('body').addClass('_hotel-sidebar');
        }
    });
    $('.card-hotel-full__favorite').on('click', function () {
        if ($(this).hasClass('_active')) {
            $(this).removeClass('_active');
            $(this).find('i').addClass('far').removeClass('fas');
        } else {
            $(this).addClass('_active');
            $(this).find('i').addClass('fas').removeClass('far');
        }
    });

    $('.hotel-sidebar__expand-content').on('click', function () {
        if ($(this).hasClass('_active')) {
            $(this).removeClass('_active');
            $(this).find('span').text('Показать все');
            $(this).parent().find('.hotel-sidebar__option-list_hidden').removeClass('_show');
        } else {
            $(this).addClass('_active');
            $(this).find('span').text('Скрыть');
            $(this).parent().find('.hotel-sidebar__option-list_hidden').addClass('_show');
        }
    });
    if ($('.distance-range-input__range').length > 0) {
        $(".distance-range-input__range").ionRangeSlider({
            skin: "round",
            prettify_enabled: true,
            postfix: ' км',
            hide_min_max: true,
            hide_from_to: true,
            onStart: function (data) {
                distanceRangeUpdateInputs(data);
            },
            onChange: function (data) {
                distanceRangeUpdateInputs(data);
            },
            onUpdate: function (data) {
                distanceRangeUpdateInputs(data);
            },
        });
        function distanceRangeUpdateInputs(data) {
            data.input.parents(".distance-range-input").find('.distance-range-input__input').val(data.from_pretty + ' км');
        }
        $('.distance-range-input input').on("focus", function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''))
        });
        $(".distance-range-input input").on("focusout", function (e) {
            let value = Number($(this).val().replace(/[^0-9]/g, ''))
            let slider = $(this).parents(".distance-range-input").find('.distance-range-input__range').data("ionRangeSlider");
            slider.update({
                from: value
            });
        });
    }
    if ($('.price-range-input__range').length > 0) {
        $(".price-range-input__range").ionRangeSlider({
            skin: "round",
            type: "double",
            prettify_enabled: true,
            postfix: ' ₽',
            hide_min_max: true,
            hide_from_to: true,
            onStart: function (data) {
                priceRangeUpdateInputs(data);
            },
            onChange: function (data) {
                priceRangeUpdateInputs(data);
            },
            onUpdate: function (data) {
                priceRangeUpdateInputs(data);
            },
        });
        function priceRangeUpdateInputs(data) {
            data.input.parents(".price-range-input").find('.price-range-input__from').val(data.from_pretty + ' ₽');
            data.input.parents(".price-range-input").find('.price-range-input__to').val(data.to_pretty + ' ₽');
        }
        $('.price-range-input input').on("focus", function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''))
        });
        $(".price-range-input input").on("focusout", function (e) {
            let value = Number($(this).val().replace(/[^0-9]/g, ''))
            let slider = $(this).parents(".price-range-input").find('.price-range-input__range').data("ionRangeSlider");
            if ($(this).hasClass('price-range-input__from')) {
                slider.update({
                    from: value
                });
            } else {
                slider.update({
                    to: value
                });
            }
        });
    }

    var swiperHotelGallery = new Swiper(".hotel-gallery-slider", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        lazy: {
            loadPrevNext: true,
        },
        navigation: {
            nextEl: ".hotel-gallery-slider-next",
            prevEl: ".hotel-gallery-slider-prev",
        },
    });
    var swiperAboutReviews = new Swiper(".popular-hotel-slider", {
        slidesPerView: 'auto',
        spaceBetween: 16,
        watchOverflow: true,
        navigation: {
            nextEl: ".popular-hotel-slider-next",
            prevEl: ".popular-hotel-slider-prev",
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 16
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 16
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 16
            }
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

    $('.js-search-select').each(function () {
        $(this).select2({
            width: '100%',
            language: 'ru',
            dropdownParent: $(this).parent(),
            placeholder: $(this).data('placeholder')
        });
    });

    $('.custom-select').selectpicker();

    $('.custom-select_placeholder').on('changed.bs.select', function (e) {
        $(this).prevAll('.dropdown-toggle').toggleClass('bs-placeholder', this.value === '');
    }).trigger('changed.bs.select');


    const picker = new easepick.create({
        element: "#set-datepicker-from",
        css: [
            "./css/easepick.css",
            "./css/easepick-custom-stile.css",
        ],
        zIndex: 10,
        lang: "ru-RU",
        format: "DD MMM YYYY",
        grid: 2,
        calendars: 2,
        RangePlugin: {
            elementEnd: "#set-datepicker-to",
            startDate: new Date(),
            endDate: new Date(),
            locale: {
                one: "день",
                other: "дни"
            }
        },
        LockPlugin: {
            minDate: new Date(),
            minDays: 0
        },
        plugins: [
            "RangePlugin",
            "LockPlugin"
        ]
    })

    let runHotelMap = false;
    let yaMapReady = false;

    window.getYaMap = function () {
        yaMapReady = true
        if ($('#hotel-map').length > 0 && runHotelMap)
            ymaps.ready(initHotelMap);
        if ($('#hotel-disposition-map').length > 0)
            ymaps.ready(initHoteDispositionlMap);
    };
    function initHotelMap() {
        let mapX = 55.753215;
        let mapY = 37.622504;
        let contactsMap = new ymaps.Map('hotel-map', {
            center: [mapX, mapY],
            zoom: 16,
            controls: []
        })

        contactsMap.controls.add("zoomControl", {
            position: { top: 120, right: 20 }
        });
    }

    function initHoteDispositionlMap() {
        let mapX = 55.753215;
        let mapY = 37.622504;
        let contactsMap = new ymaps.Map('hotel-disposition-map', {
            center: [mapX, mapY],
            zoom: 16,
            controls: []
        })

        contactsMap.controls.add("zoomControl", {
            position: { top: 120, right: 20 }
        });
    }
});
