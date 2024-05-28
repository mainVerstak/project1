$(function () {
    "use strict";

    $('.sidenav-button').on('click', function () {
        $('.sidenav').addClass('sidenav_open');
        $('.sidenav-overlay').addClass('sidenav-overlay_open');
    });
    $('.sidenav__close, .sidenav-overlay').on('click', function () {
        $('.sidenav').removeClass('sidenav_open');
        $('.sidenav-overlay').removeClass('sidenav-overlay_open');
    });

    $('.card-complex__favorite').on('click', function () {
        $(this).toggleClass('_active');
    });

    $('.card-complex .fotorama__wrap').addClass('fotorama__wrap--no-controls');

    $('.card-complex__btn').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('_active')) return;
        $(this).text($(this).attr('data-num'));
        $(this).addClass('_active');
    });


    $('.appartments__list > li').each(function() {
        var subMenu = $(this).find('.appartments__list');
        $(this).find('.appartments__more').on('click', function(e) {
            $(this).toggleClass('opened');
            e.preventDefault();
            subMenu.slideToggle(300);
        })

        $('.ds-docs__wrap a').slice(0, 4).addClass('visible');

        $('.ds-docs__more').click(function(e) {
            e.preventDefault();
            if ($(this).text() === 'Другие документы') {
                $('.ds-docs__wrap a').addClass('visible');
                $(this).text('Свернуть');
                $(this).addClass('arrow-reverse');
            } else {
                $('.ds-docs__wrap a').removeClass('visible');
                $('.ds-docs__wrap a').slice(0, 4).addClass('visible');
                $(this).text('Другие документы');
                $(this).removeClass('arrow-reverse');
            }
        });
    })


    $('.ds-chart__tabs-list li').on('click', function() {
        var tabIdx = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.ds-chart__tab').removeClass('active').eq(tabIdx).addClass('active');
    })

    const ctx = document.getElementById('barChart');

    new Chart(ctx, {
        type: 'line',
        data: {
        labels: ['авг 24', 'дек 23', 'апр 24'],
        datasets: [{
            label: 'цена $',
            data: [1.1, 1, 2],
            borderWidth: 1
        }]
        },
        options: {
            plugins: {
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    const ctx1 = document.getElementById('lineChart');

    new Chart(ctx1, {
        type: 'bar',
        data: {
        labels: ['авг 24', 'дек 23', 'апр 24'],
        datasets: [{
            label: 'цена $',
            data: [1.1, 1, 2],
            borderWidth: 1
        }]
        },
        options: {
            plugins: {
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    $('.appartments__item, .appartments__mobile .item').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).next().slideToggle(100);
    })

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
      });


      $('.js-fav').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
      })


      $('.js-share').on('click', function(event) {
        event.stopPropagation();
        $('.ds-share').toggleClass('active');
      });
    
      $(document).on('click', function() {
        $('.ds-share').removeClass('active');
      });
    
      $('.ds-share').on('click', function(event) {
        event.stopPropagation();
      });

      $('..ds-share .close').on('click', function(event) {
        event.preventDefault();
        $('.ds-share').removeClass('active');
      })

});
