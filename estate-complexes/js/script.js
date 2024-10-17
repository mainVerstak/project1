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
    $(".ds-chart__tab").removeClass("active").eq(tabIdx).addClass("active");
  });

  function toPercent(current, total) {
    if (total === 0) return [current];
    if (current === 0) return [total];
    const percentage = +((current / total) * 100).toFixed();
    const remainder = 100 - percentage;

    return [percentage, remainder];
  }

  Chart.register(ChartDataLabels);

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
          datalabels: { display: false },
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

  function createLineBarChart(elementId, dataBar, dataLine, labels) {
    const ctx1 = document.getElementById(elementId);

    function findMax(realised) {
      const max = Math.max.apply(null, realised);
      return max + Math.max(max / 2, 20);
    }

    new Chart(ctx1, {
      data: {
        labels: labels,
        datasets: [
          {
            type: "line",
            label: "Средняя цена за 1 м2, руб.",
            data: dataLine,
            backgroundColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#000000",
            yAxisID: "y-axis-1",
            datalabels: {
              align: "top",
              anchor: "end",
              font: { size: 14 },
              formatter: (value) =>
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
            },
          },
          {
            type: "bar",
            label: "Количество проданных квартир",
            data: dataBar,
            backgroundColor: "#2D6BA1",
            borderWidth: 1,
            borderRadius: 5,
            yAxisID: "y-axis-2",
            datalabels: {
              font: { size: 12 },
              anchor: "end",
              align: "top",
            },
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: false,
        onResize: (chart, size) => {
          console.log("chart", chart);
          console.log("size", size);
          chart.resize();
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        elements: {
          line: { tension: 0.4 },
          bar: { borderRadius: 5 },
        },
        layout: {
          padding: {
            top: 20,
            bottom: 20,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "start",
            labels: {
              usePointStyle: true,
              font: {
                color: "#000000",
                size: 14,
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          "y-axis-1": {
            type: "linear",
            position: "left",
            beginAtZero: true,
            title: {
              display: false,
            },
            ticks: {
              display: false,
            },
            grid: {
              drawBorder: false,
            },
            afterFit: (scaleInstance) => {
              scaleInstance.paddingTop = 30;
              scaleInstance.paddingBottom = 30;
            },
          },
          "y-axis-2": {
            type: "linear",
            position: "right",
            beginAtZero: true,
            max: findMax(dataBar),
            title: {
              display: false,
            },
            ticks: {
              display: false,
            },
            grid: {
              drawOnChartArea: false,
              drawBorder: false,
            },
            afterFit: (scaleInstance) => {
              scaleInstance.paddingTop = 30;
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }

  createLineBarChart(
    "lineChart",
    [63, 29, 0, 15, 6, 15, 14, 27, 31],
    [113797, 150818, "", 153797, 158849, 156287, 353602, 150711, 159501],
    // [151296, 153797, 153797, 153797, 153797, 158849, 153797, 156287, 153797],
    [
      "сен 2023",
      "окт 2023",
      "ноя 2023",
      "дек 2023",
      "янв 2024",
      "фев 2024",
      "мар 2024",
      "апр 2024",
    ]
  );

  function createDoughnutChart(elementId, data, colors, textColor = "#000000") {
    const ctx = document.getElementById(elementId);

    new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          datalabels: { display: false },
        },
      },
      plugins: [
        {
          id: "centerText",
          afterDraw: (chart) => {
            const {
              ctx,
              chartArea: { top, bottom, left, right },
            } = chart;
            const centerX = (left + right) / 2 + 1;
            const centerY = (top + bottom) / 2 + 2;

            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "bold 18px Helvetica";
            ctx.fillStyle = textColor;

            const percentage = data[0];
            ctx.fillText(`${percentage}%`, centerX, centerY);
            ctx.restore();
          },
        },
      ],
    });
  }

  const appartData = toPercent(16, 169);
  createDoughnutChart(
    "appartCirklChart",
    appartData,
    ["#ffffff", "#579AD4"],
    "#FFFFFF"
  );

  const nonResData = toPercent(56, 169);
  createDoughnutChart("nonResidentCirklChart", nonResData, [
    "#2D6BA1",
    "#E0E9FF",
  ]);

  const parkingData = toPercent(159, 169);
  createDoughnutChart("parkingCirklChart", parkingData, ["#2D6BA1", "#E0E9FF"]);

  // $(".appartments__item, .appartments__mobile .item").on("click", function (e) {
  //   e.preventDefault();
  //   $(this).toggleClass("active");
  //   $(this).next().slideToggle(100);
  // });

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
