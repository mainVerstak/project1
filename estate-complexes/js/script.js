$(function () {
  "use strict";

  $(".sidenav-button").on("click", function () {
    $(".sidenav").addClass("sidenav_open");
    $(".sidenav-overlay").addClass("sidenav-overlay_open");
  });
  $(".sidenav__close, .sidenav-overlay").on("click", function () {
    $(".sidenav").removeClass("sidenav_open");
    $(".sidenav-overlay").removeClass("sidenav-overlay_open");
  });

  $(".card-complex__favorite").on("click", function () {
    $(this).toggleClass("_active");
  });

  $(".card-complex .fotorama__wrap").addClass("fotorama__wrap--no-controls");

  $(".card-complex__btn").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("_active")) return;
    $(this).text($(this).attr("data-num"));
    $(this).addClass("_active");
  });

  //   for deleted html
  //   $(".appartments__list > li").each(function () {
  //     var subMenu = $(this).find(".appartments__list");
  //     $(this)
  //       .find(".appartments__more")
  //       .on("click", function (e) {
  //         $(this).toggleClass("opened");
  //         e.preventDefault();
  //         subMenu.slideToggle(300);
  //       });
  //   });

  $(".ds-docs__wrap a").slice(0, 4).addClass("visible");

  $(".ds-docs__more").click(function (e) {
    e.preventDefault();
    if ($(this).text() === "Другие документы") {
      $(".ds-docs__wrap a").addClass("visible");
      $(this).text("Свернуть");
      $(this).addClass("arrow-reverse");
    } else {
      $(".ds-docs__wrap a").removeClass("visible");
      $(".ds-docs__wrap a").slice(0, 4).addClass("visible");
      $(this).text("Другие документы");
      $(this).removeClass("arrow-reverse");
    }
  });

  $(".ds-chart__tabs-list li").on("click", function () {
    var tabIdx = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".ds-chart__tab").removeClass("active").eq(tabIdx).addClass("active");
  });

  $(document).ready(function () {
    var tabIdx = $(".ds-chart__tabs-list li").index();
    $(".ds-chart__tabs-list li")
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(".ds-chart__tab").removeClass("active").eq(tabIdx).addClass("active");
  });

  const ctx = document.getElementById("barChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["авг 24", "дек 23", "апр 24"],
      datasets: [
        {
          label: "цена $",
          data: [1.1, 1, 2],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const ctx1 = document.getElementById("lineChart");

  new Chart(ctx1, {
    data: {
      labels: [
        "сен 2023",
        "окт 2023",
        "ноя 2023",
        "дек 2023",
        "янв 2024",
        "фев 2024",
        "мар 2024",
        "апр 2024",
      ],
      datasets: [
        {
          type: "line",
          label: "- Средняя цена за 1 м2, руб.",
          data: [7, 9, 8, 8, 6, 10, 6, 7, 5],
          backgroundColor: "#ffffff",
          borderWidth: 1,
          borderColor: "#000000",
        },
        {
          type: "bar",
          label: "- Колличество проданных квартир",
          data: [5, 7, 6, 6, 4, 8, 4, 5, 3],
          backgroundColor: "#2D6BA1",
          borderWidth: 1,
          borderRadius: 5,
        },
      ],
    },
    options: {
      elements: {
        line: { tension: 0.4 },
        bar: { borederRadius: 5 },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          align: "start",
          labels: {
            usePointStyle: true,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { display: true },
          ticks: {
            callback: function (value, index, ticks) {
              return "";
            },
          },
        },
        x: { grid: { display: false } },
      },
    },
  });

  const cirklAppart = document.getElementById("appartCirklChart");

  new Chart(cirklAppart, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [33, 77],
          backgroundColor: "#2D6BA1",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: false,
        },
        legend: { display: true },
      },
      scales: {},
    },
  });

  const nonResCirkl = document.getElementById("nonResidentCirklChart");

  new Chart(nonResCirkl, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [33, 77],
          backgroundColor: "#2D6BA1",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: false,
        },
      },
      scales: {},
    },
  });

  const parkingCirkl = document.getElementById("parkingCirklChart");

  new Chart(parkingCirkl, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [33, 77],
          backgroundColor: "#2D6BA1",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: false,
        },
      },
      scales: {},
    },
  });

  //   $(".appartments__item, .appartments__mobile .item").on("click", function (e) {
  // e.preventDefault();
  // $(this).toggleClass("active");
  // $(this).next().slideToggle(100);
  //   });

  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  $(".js-fav").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
  });

  $(".js-share").on("click", function (event) {
    event.stopPropagation();
    $(".ds-share").toggleClass("active");
  });

  $(document).on("click", function () {
    $(".ds-share").removeClass("active");
  });

  $(".ds-share").on("click", function (event) {
    event.stopPropagation();
  });

  $(".ds-share .close").on("click", function (event) {
    event.preventDefault();
    $(".ds-share").removeClass("active");
  });
});
