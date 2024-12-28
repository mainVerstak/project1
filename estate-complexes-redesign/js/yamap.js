// Глобальные переменные
let map;
let points = [];
let clusterers = {};
let swiperScrollContainer;

async function getMapData() {
  try {
    const response = await fetch("./js/map-data.json");
    const data = await response.json();
    return data.data.sort((a, b) => a.dist - b.dist);
  } catch (e) {
    console.log(e);
  }
}

async function getTargetMarkerData() {
  try {
    return {
      objId: 44781,
      latitude: 47.221766,
      longitude: 39.723286,
    };
  } catch (e) {
    console.log(e);
  }
}

function generateUniqueId() {
  return "id_" + Math.random().toString(36).substr(2, 9);
}

// Функция создания тултипа для кластера
function createClusterTooltip(geoObjects, cluster) {
  const existingTooltip = document.querySelector(".cluster-tooltip");
  if (existingTooltip) {
    existingTooltip.remove();
  }

  const tooltip = document.createElement("div");
  tooltip.className = "cluster-tooltip";

  geoObjects.forEach((geoObject) => {
    const props = geoObject.properties;
    const item = document.createElement("div");
    item.className = "cluster-tooltip__item";
    item.innerHTML = `
      <div class="cluster-tooltip__heading">${
        props.get("name") || "Без названия"
      }</div>
      <div class="cluster-tooltip__address">${props.get("address")}</div>
    `;

    item.addEventListener("click", () => {
      map.setCenter(geoObject.geometry.getCoordinates(), 20);

      // Активируем соответствующий элемент в списке
      const listItem = document.querySelector(
        `.swiper-slide[data-id="${props.get("uniqueId")}"] .ds-map__item`
      );
      if (listItem) {
        const allItems = document.querySelectorAll(".ds-map__item");
        allItems.forEach((item) => item.classList.remove("active"));
        listItem.classList.add("active");

        const slide = listItem.closest(".swiper-slide");
        if (slide) {
          swiperScrollContainer.el.querySelector(
            ".swiper-wrapper"
          ).style.transition = "300ms";
          swiperScrollContainer.setTranslate(-slide.offsetTop);
        }
      }

      tooltip.remove();
    });

    tooltip.appendChild(item);
  });

  const clusterElement = cluster.getOverlaySync().getElement();
  clusterElement.appendChild(tooltip);

  // Проверяем, не выходит ли тултип за пределы карты
  const mapElement = document.getElementById("map");
  const mapRect = mapElement.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  if (tooltipRect.right > mapRect.right) {
    tooltip.style.left = "auto";
    tooltip.style.right = "calc(100% + 15px)";
    tooltip.classList.add("cluster-tooltip--left");
  }
}

// Функция создания фильтров
function createMapFilters(points) {
  const filterContainer = document.querySelector(".ds-map-filters");

  // Подсчитываем количество точек для каждой категории
  const categoryCounts = {
    all: points.length,
    entertainment: points.filter((p) => p.properties.tabName === "Развлечения")
      .length,
    education: points.filter((p) => p.properties.tabName === "Образование")
      .length,
    medical: points.filter((p) => p.properties.tabName === "Медицина").length,
    sport: points.filter((p) => p.properties.tabName === "Спорт").length,
    market: points.filter((p) => p.properties.tabName === "Продукты").length,
    newBuilding: points.filter((p) => p.properties.tabName === "Новостройки")
      .length,
  };

  // Создаем HTML для фильтров
  filterContainer.innerHTML = `
      <button class="filter-btn active" data-category="all">
        <span class="filter-text-all">Все</span> <span class="filter-count">${categoryCounts.all}</span>
      </button>
      <button class="filter-btn" data-category="entertainment">
        <div class="filter-icon entertainment">
          <svg class="map-icon">
            <use xlink:href="./map-icons/map-icons.svg#video"></use>
          </svg>
        </div>
        <span class="filter-count">${categoryCounts.entertainment}</span>
      </button>
      <button class="filter-btn" data-category="study">
        <div class="filter-icon study">
          <svg class="map-icon">
            <use xlink:href="./map-icons/map-icons.svg#teacher"></use>
          </svg>
        </div>
        <span class="filter-count">${categoryCounts.education}</span>
      </button>
      <button class="filter-btn" data-category="medical">
        <div class="filter-icon medical">
          <svg class="map-icon">
            <use xlink:href="./map-icons/map-icons.svg#plus"></use>
          </svg>
        </div>
        <span class="filter-count">${categoryCounts.medical}</span>
      </button>
      <button class="filter-btn" data-category="sport">
        <div class="filter-icon sport">
          <svg class="map-icon">
            <use xlink:href="./map-icons/map-icons.svg#cup"></use>
          </svg>
        </div>
        <span class="filter-count">${categoryCounts.sport}</span>
      </button>
      <button class="filter-btn" data-category="market">
        <div class="filter-icon market">
          <svg class="map-icon">
            <use xlink:href="./map-icons/map-icons.svg#shop"></use>
          </svg>
        </div>
        <span class="filter-count">${categoryCounts.market}</span>
      </button>
      <button class="filter-btn" data-category="newBuilding">
        <div class="filter-icon new-building">
          <svg class="map-icon">
            <use xlink:href="./map-icons/map-icons.svg#buildings-2"></use>
          </svg>
        </div>
        <span class="filter-count">${categoryCounts.newBuilding}</span>
      </button>
  `;

  // Добавляем обработчики событий для фильтров
  const filterButtons = filterContainer.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterMarkers(button.dataset.category);
    });
  });
}

// Функция фильтрации маркеров
function filterMarkers(category) {
  Object.values(clusterers).forEach((clusterer) => {
    map.geoObjects.remove(clusterer);
  });

  if (category === "all") {
    Object.values(clusterers).forEach((clusterer) => {
      map.geoObjects.add(clusterer);
    });
  } else {
    const categoryKey = category === "education" ? "study" : category;
    if (clusterers[categoryKey]) {
      map.geoObjects.add(clusterers[categoryKey]);
    }
  }

  // Обновляем список
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide) => {
    const slideId = slide.dataset.id;
    if (category === "all") {
      slide.style.display = "";
    } else {
      const point = points.find((p) => p.properties.uniqueId === slideId);
      const categoryMapping = {
        entertainment: "Развлечения",
        study: "Образование",
        medical: "Медицина",
        sport: "Спорт",
        market: "Продукты",
        newBuilding: "Новостройки",
      };
      slide.style.display =
        point && point.properties.tabName === categoryMapping[category]
          ? ""
          : "none";
    }
  });

  swiperScrollContainer.update();
}

// Инициализация карты
ymaps.ready(async () => {
  const targetMarkerData = await getTargetMarkerData();
  const data = await getMapData();

  // Создаем карту
  map = new ymaps.Map("map", {
    center: [targetMarkerData.latitude, targetMarkerData.longitude],
    zoom: 15.5,
    controls: [],
    behaviors: ["drag", "dblClickZoom", "multiTouch"],
  });

  // Отключаем контекстное меню на карте
  map.behaviors.disable("rightMouseButtonMagnifier");

  // Создаем и добавляем зум-контрол справа
  const zoomControl = new ymaps.control.ZoomControl({
    options: {
      position: {
        right: 10,
        top: 50,
      },
      size: "small",
    },
  });
  map.controls.add(zoomControl);

  // Создаем главный маркер
  const mainPlacemark = new ymaps.Placemark(
    [targetMarkerData.latitude, targetMarkerData.longitude],
    {},
    {
      iconLayout: "default#imageWithContent",
      iconImageHref: "",
      iconImageSize: [28, 28],
      iconImageOffset: [-14, -14],
      iconContentLayout: ymaps.templateLayoutFactory.createClass(
        '<div class="new-building main-marker">' +
          '<svg class="map-icon new-building map-icon--main">' +
          '<use xlink:href="./map-icons/map-icons.svg#buildings"></use>' +
          "</svg>" +
          "</div>"
      ),
    }
  );
  map.geoObjects.add(mainPlacemark);

  // Преобразуем данные в точки
  points = data.map((item, index) => {
    const uniqueId = generateUniqueId();
    return {
      type: "Feature",
      id: index,
      geometry: {
        type: "Point",
        coordinates: [item.latitude, item.longitude],
      },
      properties: {
        ...item,
        uniqueId: uniqueId,
      },
    };
  });

  // Группируем точки по категориям
  const groupedPoints = {
    entertainment: points.filter((p) => p.properties.tabName === "Развлечения"),
    study: points.filter((p) => p.properties.tabName === "Образование"),
    medical: points.filter((p) => p.properties.tabName === "Медицина"),
    sport: points.filter((p) => p.properties.tabName === "Спорт"),
    market: points.filter((p) => p.properties.tabName === "Продукты"),
    newBuilding: points.filter((p) => p.properties.tabName === "Новостройки"),
  };

  // Создаем собственный макет для меток
  const customMarkerLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="single-marker $[properties.className]" data-id="$[properties.uniqueId]">' +
      '<svg class="map-icon">' +
      "$[properties.iconContent]" +
      "</svg>" +
      "</div>",
    {
      build: function () {
        customMarkerLayout.superclass.build.call(this);
        const element = this.getElement();

        // Добавляем обработчик клика
        element.addEventListener("click", (e) => {
          e.stopPropagation(); // Предотвращаем всплытие события

          // Убираем активные классы у всех маркеров
          const markers = document.querySelectorAll(".single-marker");
          markers.forEach((marker) => marker.classList.remove("active"));

          // Убираем активные классы у всех элементов списка
          const listLinks = document.querySelectorAll(".ds-map__item");
          listLinks.forEach((link) => link.classList.remove("active"));

          // Активируем текущий маркер
          element.classList.add("active");

          // Получаем данные метки
          const properties = this.getData().properties;

          // Находим и активируем соответствующий элемент в списке
          const listItem = document.querySelector(
            `.swiper-slide[data-id="${properties.get(
              "uniqueId"
            )}"] .ds-map__item`
          );

          if (listItem) {
            listItem.classList.add("active");
            const slide = listItem.closest(".swiper-slide");

            if (slide && swiperScrollContainer) {
              swiperScrollContainer.el.querySelector(
                ".swiper-wrapper"
              ).style.transition = "300ms";
              swiperScrollContainer.setTranslate(-slide.offsetTop);
            }
          }

          // Центрируем карту на метке
          map.setCenter(
            this.getData().geometry.getCoordinates(),
            map.getZoom(),
            {
              duration: 300,
            }
          );
        });
      },
    }
  );

  // Создаем собственный макет для кластеров
  const customClusterLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="cluster-marker">' +
      '<div class="cluster-marker__inner $[properties.className]">$[properties.geoObjects.length]</div>' +
      "</div>",
    {
      build: function () {
        customClusterLayout.superclass.build.call(this);
        const element = this.getElement();
        const cluster = this.getData().properties.get("cluster");

        element.addEventListener("click", (e) => {
          const zoom = map.getZoom();
          if (zoom >= 17) {
            createClusterTooltip(cluster.getGeoObjects(), cluster);
          } else {
            map.setCenter(cluster.geometry.getCoordinates(), zoom + 2, {
              duration: 300,
            });
          }
        });
      },
    }
  );

  // Создаем кластеризаторы для каждой категории
  const categorySettings = {
    entertainment: {
      className: "entertainment",
      tabName: "Развлечения",
    },
    study: {
      className: "study",
      tabName: "Образование",
    },
    medical: {
      className: "medical",
      tabName: "Медицина",
    },
    sport: {
      className: "sport",
      tabName: "Спорт",
    },
    market: {
      className: "market",
      tabName: "Продукты",
    },
    newBuilding: {
      className: "new-building",
      tabName: "Новостройки",
    },
  };

  Object.keys(groupedPoints).forEach((category) => {
    if (groupedPoints[category].length > 0) {
      // Создаем кластеризатор для категории
      const clusterer = new ymaps.Clusterer({
        gridSize: 128,
        minClusterSize: 3,
        hasBalloon: false,
        clusterIconLayout: ymaps.templateLayoutFactory.createClass(
          '<div class="cluster-marker">' +
            '<div class="cluster-marker__inner ' +
            categorySettings[category].className +
            '">' +
            "{{ properties.geoObjects.length }}" +
            "</div>" +
            "</div>"
        ),
        clusterIconShape: {
          type: "Circle",
          coordinates: [14, 14],
          radius: 14,
        },
      });

      // Создаем метки для точек этой категории
      const placemarks = groupedPoints[category].map((point) => {
        let className = categorySettings[category].className;

        // Особая обработка для новостроек
        if (category === "newBuilding") {
          className =
            point.properties.status === 2 ? "default-building" : "new-building";
        }

        return new ymaps.Placemark(
          point.geometry.coordinates,
          {
            ...point.properties,
            className: className,
            iconContent: getIconContent(point.properties.tabName),
          },
          {
            iconLayout: customMarkerLayout,
            iconShape: {
              type: "Circle",
              coordinates: [14, 14],
              radius: 14,
            },
          }
        );
      });

      // Добавляем метки в кластеризатор
      clusterer.add(placemarks);

      // Сохраняем кластеризатор
      clusterers[category] = clusterer;

      // Добавляем на карту
      map.geoObjects.add(clusterer);
    }
  });

  // Функция для получения содержимого иконки
  function getIconContent(tabName) {
    const iconMap = {
      Развлечения: '<use xlink:href="./map-icons/map-icons.svg#video"></use>',
      Образование: '<use xlink:href="./map-icons/map-icons.svg#teacher"></use>',
      Медицина: '<use xlink:href="./map-icons/map-icons.svg#plus"></use>',
      Спорт: '<use xlink:href="./map-icons/map-icons.svg#cup"></use>',
      Продукты: '<use xlink:href="./map-icons/map-icons.svg#shop"></use>',
      Новостройки:
        '<use xlink:href="./map-icons/map-icons.svg#buildings-2"></use>',
    };
    return `<svg class="map-icon">${
      iconMap[tabName] || iconMap["Новостройки"]
    }</svg>`;
  }

  // Создаем список элементов
  const container = document.querySelector(".ds-map__item-container");
  container.innerHTML = ""; // Очищаем контейнер перед добавлением

  points.forEach((point) => {
    const uniqueId = point.properties.uniqueId;
    const element = document.createElement("div");
    element.className = "swiper-slide";
    element.dataset.id = uniqueId;

    element.innerHTML = `
      <a href="#" class="ds-map__item">
        ${
          point.properties.status === 2
            ? '<div class="status-sticker default-building">Сдан</div>'
            : ""
        }
        ${
          point.properties.status === 0
            ? '<div class="status-sticker new-building">Строится</div>'
            : ""
        }
        <div class="ds-map__heading">
          <h4>${point.properties.name || point.properties.address}</h4>
          <span>${point.properties.dist.toFixed()} м</span>
        </div>
        <span class="ds-map__address">${point.properties.address}</span>
      </a>
    `;

    // Добавляем обработчик клика на элемент списка
    const listItem = element.querySelector(".ds-map__item");
    listItem.addEventListener("click", async (e) => {
      e.preventDefault();

      // Убираем активные классы
      const listLinks = document.querySelectorAll(".ds-map__item");
      listLinks.forEach((link) => link.classList.remove("active"));

      const markers = document.querySelectorAll(".single-marker");
      markers.forEach((marker) => marker.classList.remove("active"));

      // Активируем текущий элемент списка
      listItem.classList.add("active");

      // Центрируем карту с максимальным зумом
      map.setCenter(
        [point.properties.latitude, point.properties.longitude],
        20,
        {
          duration: 400,
          callback: function () {
            // После центрирования ищем и активируем маркер
            setTimeout(() => {
              const marker = document.querySelector(
                `.single-marker[data-id="${point.properties.uniqueId}"]`
              );
              if (marker) {
                marker.classList.add("active");

                // Дополнительное центрирование для точности
                map.setCenter(
                  [point.properties.latitude, point.properties.longitude],
                  {
                    duration: 500,
                  }
                );
              }
            }, 600);
          },
        }
      );

      // Прокручиваем список к выбранному элементу
      swiperScrollContainer.el.querySelector(
        ".swiper-wrapper"
      ).style.transition = "300ms";
      swiperScrollContainer.setTranslate(-listItem.offsetTop);
    });

    container.appendChild(element);
  });

  // Инициализируем Swiper для вертикальной прокрутки списка
  swiperScrollContainer = new Swiper(".js-scroll-container", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      dragSize: "auto",
      snapOnRelease: true,
      hide: false,
    },
    mousewheel: true,
  });

  // Предотвращаем действие по умолчанию для всех ссылок в списке
  const sliderLinks = document.querySelectorAll(".ds-map__item");
  sliderLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });

  // Создаем список и фильтры
  createMapFilters(points);
  // ... продолжение следует
});
