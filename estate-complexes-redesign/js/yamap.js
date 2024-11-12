const ymaps3 = window.ymaps3;

async function getMapData() {
  try {
    const response = await fetch("./js/map-data.json").then((res) =>
      res.json()
    );
    console.log(response.data); // TODO: удалить
    const sortedData = response.data.sort((a, b) => a.dist - b.dist);
    return sortedData;
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

// Объявляем переменную для карты в глобальной области видимости
let map;

// Объявляем points в глобальной области видимости
let points = [];

async function initMap() {
  await ymaps3.ready;

  // Подключаем тему по умолчанию - не знаю почему без этого не работает
  ymaps3.import.registerCdn(
    "https://cdn.jsdelivr.net/npm/{package}",
    "@yandex/ymaps3-default-ui-theme@latest"
  );

  const { YMapClusterer, clusterByGrid } = await ymaps3.import(
    "@yandex/ymaps3-clusterer@0.0.1"
  );
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
    YMapListener,
  } = ymaps3;

  const { YMapZoomControl } = await ymaps3.import(
    "@yandex/ymaps3-default-ui-theme"
  );

  // Создаем переменную для хранения текущего зума
  let currentZoom;

  // Создаем слушатель событий карты
  const mapListener = new YMapListener({
    layer: "any",
    onUpdate: ({ location }) => {
      // Здесь мы получаем актуальный зум карты при любых его изменениях
      currentZoom = location.zoom;
    },
  });

  const targetMarkerData = await getTargetMarkerData();

  // Сохраняем ссылку на карту
  map = new YMap(document.getElementById("map"), {
    location: {
      center: [targetMarkerData.longitude, targetMarkerData.latitude],
      zoom: 15.5,
    },
  });

  map.addChild(
    new YMapControls({ position: "right" }).addChild(new YMapZoomControl({}))
  );
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());
  map.addChild(mapListener);

  // Создаем главный маркер
  const mainPoint = new YMapMarker(
    {
      coordinates: [targetMarkerData.longitude, targetMarkerData.latitude],
      zIndex: 999, // Устанавливаем высокий z-index чтобы маркер был поверх остальных
    },
    createMainMarkerElement(targetMarkerData)
  );

  // Добавляем маркер на карту
  map.addChild(mainPoint);

  // Функция создания DOM элемента для главного маркера
  function createMainMarkerElement(properties) {
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="new-building main-marker">
      <svg class="map-icon new-building map-icon--main">
        <use xlink:href="./map-icons/map-icons.svg#buildings"></use>
      </svg>
    </div>
  `;
    return element.firstElementChild;
  }

  // Получаем тестовые данные и преобразуем в точки
  const data = await getMapData();

  // Сохраняем точки в глобальную переменную
  points = data.map((item, index) => {
    const uniqueId = generateUniqueId();
    return {
      type: "Feature",
      id: index,
      geometry: {
        type: "Point",
        coordinates: [item.longitude, item.latitude],
      },
      properties: {
        balloonContent: `${index + 1}`,
        clusterCaption: `Объект ${index + 1}`,
        address: item.address,
        tabName: item.tabName,
        name: item.name,
        dist: item.dist,
        subtitle: item.subtitle,
        objId: item.objId,
        status: item.status,
        uniqueId: uniqueId,
      },
    };
  });

  await map.setLocation({
    zoom: 15, // Устанавливаем новый уровень зума
    duration: 500, // Длительность анимации
  });

  // Функция для генерации уникального ID
  function generateUniqueId() {
    return "id_" + Math.random().toString(36).substr(2, 9);
  }

  const listItems = [];

  // Создаем список элементов для маркеров
  const container = document.querySelector(".ds-map__item-container");

  points.forEach((item) => {
    const uniqueId = item.properties.uniqueId;
    const element = document.createElement("div");
    element.innerHTML = `<div class="swiper-slide" data-id="${uniqueId}">
                      <a href="#" class="ds-map__item">
                        ${
                          item.properties.status === 2
                            ? '<div class="status-sticker default-building">Сдан</div>'
                            : ""
                        }
                        ${
                          item.properties.status === 0
                            ? '<div class="status-sticker new-building">Строится</div>'
                            : ""
                        }
                        <div class="ds-map__heading">
                          <h4>${
                            item.properties.name
                              ? item.properties.name
                              : item.properties.address
                          }</h4>
                          <span>${item.properties.dist.toFixed()} м</span>
                        </div>
                        <span class="ds-map__address">${
                          item.properties.address
                        }</span>
                      </a>
                    </div>`;
    container.appendChild(element.firstElementChild);
    listItems.push(element.firstElementChild);
  });

  const sliderLinks = document.querySelectorAll(".ds-map__item");
  sliderLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });

  let swiperScrollContainer = new Swiper(".js-scroll-container", {
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

  // Функция создания DOM элемента для маркера
  function createMarkerElement(properties) {
    let className;
    let content;

    switch (properties.tabName) {
      case "Развлечения":
        className = "entertainment";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#video"></use>
          </svg>`;
        break;
      case "Образование":
        className = "study";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#teacher"></use>
          </svg>`;
        break;
      case "Медицина":
        className = "medical";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#plus"></use>
          </svg>`;
        break;
      case "Спорт":
        className = "sport";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#cup"></use>
          </svg>`;
        break;
      case "Продукты":
        className = "market";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#shop"></use>
          </svg>`;
        break;
      case "Новостройки":
        className =
          properties.status === 2 ? "default-building" : "new-building";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#buildings-2"></use>
          </svg>`;
        break;
      default:
        className = "default-building";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#buildings-2"></use>
          </svg>`;
    }

    const element = document.createElement("div");
    element.innerHTML = `<div class="single-marker ${className}" data-id="${properties.uniqueId}">${content}</div>`;

    element.firstElementChild.addEventListener("click", (e) => {
      const markers = document.querySelectorAll(".single-marker");
      markers.forEach((marker) => marker.classList.remove("active"));

      const listLinks = document.querySelectorAll(".ds-map__item");
      listLinks.forEach((link) => link.classList.remove("active"));

      e.currentTarget.classList.add("active");

      // Ищем слайд по uniqueId
      const markerId = e.currentTarget.dataset.id;
      const slide = document.querySelector(
        `.swiper-slide[data-id="${markerId}"]`
      );

      if (slide) {
        const listItem = slide.firstElementChild;
        listItem.classList.add("active");

        // Изменяем способ прокрутки к элементу
        swiperScrollContainer.el.querySelector(
          ".swiper-wrapper"
        ).style.transition = "300ms";
        swiperScrollContainer.setTranslate(-slide.offsetTop);
      }
    });

    return element.firstElementChild;
  }

  // Функция создания DOM элемента для кластера
  function createClusterElement(count, data) {
    let className;
    const element = document.createElement("div");
    switch (data[0].properties.tabName) {
      case "Развлечения":
        className = "entertainment";
        break;
      case "Образование":
        className = "study";
        break;
      case "Медицина":
        className = "medical";
        break;
      case "Спорт":
        className = "sport";
        break;
      case "Продукты":
        className = "market";
        break;
      case "Новостройки":
        className = "new-building";
        break;
      default:
        className = "default-building";
    }
    element.innerHTML = `
      <div class="cluster-marker">
        <div class="cluster-marker__inner ${className}">${count}</div>
      </div>
    `;

    element.firstElementChild.addEventListener("click", (e) => {
      const nextZoom = Math.min(currentZoom + 1, 20);

      if (currentZoom >= 19) {
        // Передаем координаты клика в createClusterTooltip
        createClusterTooltip(data, data[0].geometry.coordinates, {
          x: e.clientX,
          y: e.clientY,
        });
      } else {
        map.setLocation({
          center: data[0].geometry.coordinates,
          zoom: nextZoom,
          duration: 500,
        });
      }
    });

    return element.firstElementChild;
  }

  // Изменим функцию createClusterTooltip
  function createClusterTooltip(features, coordinates, mousePosition) {
    // Удаляем существующий тултип если есть
    const existingTooltip = document.querySelector(".cluster-tooltip");
    if (existingTooltip) {
      existingTooltip.remove();
      // Удаляем класс active у всех кластеров
      document.querySelectorAll(".cluster-marker").forEach((marker) => {
        marker.classList.remove("active");
        marker
          .querySelector(".cluster-marker__inner")
          .classList.remove("active");
      });
    }

    const tooltip = document.createElement("div");
    tooltip.className = "cluster-tooltip";

    // Добавляем элементы списка
    features.forEach((feature) => {
      const item = document.createElement("div");
      item.className = "cluster-tooltip__item";
      item.innerHTML = `
          ${
            feature.properties.status === 2
              ? '<div class="status-sticker default-building">Сдан</div>'
              : ""
          }
          ${
            feature.properties.status === 0
              ? '<div class="status-sticker new-building">Строится</div>'
              : ""
          }
        <div class="cluster-tooltip__heading">${
          feature.properties.name || "Без названия"
        }</div>
        <div class="cluster-tooltip__address">${
          feature.properties.address
        }</div>
      `;

      // Добавляем обработчик клика на элемент списка
      item.addEventListener("click", () => {
        // Центрируем карту на выбранной точке
        map.setLocation({
          center: feature.geometry.coordinates,
          zoom: 20,
          duration: 500,
        });

        // Активируем соответствующий элемент в основном списке
        const listItem = document.querySelector(
          `.swiper-slide[data-id="${feature.properties.uniqueId}"] .ds-map__item`
        );
        if (listItem) {
          const allItems = document.querySelectorAll(".ds-map__item");
          allItems.forEach((item) => item.classList.remove("active"));
          listItem.classList.add("active");

          // Прокручиваем список к выбранному элементу
          const slide = listItem.closest(".swiper-slide");
          if (slide) {
            swiperScrollContainer.el.querySelector(
              ".swiper-wrapper"
            ).style.transition = "300ms";
            swiperScrollContainer.setTranslate(-slide.offsetTop);
          }
        }

        // Закрываем тултип
        tooltip.remove();
      });

      tooltip.appendChild(item);
    });

    // Добавляем тултип в контейнер с кластером
    const clusterElement = document.querySelector(".cluster-marker");
    if (clusterElement) {
      // Добавляем класс active кластеру
      clusterElement.classList.add("active");
      clusterElement
        .querySelector(".cluster-marker__inner")
        .classList.add("active");

      clusterElement.appendChild(tooltip);

      // Убираем лишние стили позиционирования
      tooltip.style.position = "absolute";
      tooltip.style.width = "200px";

      // Проверяем, не выходит ли тултип за пределы карты
      const mapElement = document.getElementById("map");
      const mapRect = mapElement.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      // Если тултип выходит за правый край карты
      if (tooltipRect.right > mapRect.right) {
        // Размещаем тултип слева от маркера
        tooltip.style.left = "auto";
        tooltip.style.right = "calc(100% + 15px)";
        tooltip.classList.add("cluster-tooltip--left");
      }
    }

    // Изменяем обработчик закрытия тултипа
    document.addEventListener("click", function closeTooltip(e) {
      if (!tooltip.contains(e.target) && !e.target.closest(".cluster-marker")) {
        tooltip.remove();
        // Удаляем класс active у кластера при закрытии тултипа
        if (clusterElement) {
          clusterElement.classList.remove("active");
          clusterElement
            .querySelector(".cluster-marker__inner")
            .classList.remove("active");
        }
        document.removeEventListener("click", closeTooltip);
      }
    });
  }

  // Группируем точки по категориям
  const groupedPoints = {
    entertainment: [],
    study: [],
    medical: [],
    sport: [],
    market: [],
    newBuilding: [],
    default: [],
  };

  points.forEach((point) => {
    let tabName;

    switch (point.properties.tabName) {
      case "Развлечения":
        tabName = "entertainment";
        break;
      case "Образование":
        tabName = "study";
        break;
      case "Медицина":
        tabName = "medical";
        break;
      case "Спорт":
        tabName = "sport";
        break;
      case "Продукты":
        tabName = "market";
        break;
      case "Новостройки":
        tabName = "newBuilding";
        break;
      default:
        tabName = "default";
    }

    if (groupedPoints[tabName]) {
      groupedPoints[tabName].push(point);
    } else {
      groupedPoints.default.push(point);
    }
  });

  // Объявим переменную для хранения кластеризаторов в глобальной области
  let clusterers = {};

  // Создаем кластеризатор для каждой группы
  Object.keys(groupedPoints).forEach((category) => {
    if (groupedPoints[category].length > 0) {
      const clusterer = new YMapClusterer({
        method: clusterByGrid({
          gridSize: 128, // Увеличиваем размер сетки
          minZoom: 12, // Минимальный зум, при котором начинается кластеризация
          maxZoom: 16, // Максимальный зум, при котором работает кластеризация
          minClusterSize: 3, // Минимальное количество точек для создания кластера
        }),
        features: groupedPoints[category],
        marker: (feature) => {
          return new YMapMarker(
            {
              coordinates: feature.geometry.coordinates,
              // Добавляем настройки для маркера
              zIndex: 1, // Базовый z-index для маркеров
              hover: {
                zIndex: 2, // Повышаем z-index при наведении
              },
            },
            createMarkerElement(feature.properties)
          );
        },
        cluster: (coordinates, features) => {
          return new YMapMarker(
            {
              coordinates: coordinates,
              // Добавляем настройки для кластера
              zIndex: 1,
              hover: {
                zIndex: 2,
              },
            },
            createClusterElement(features.length, features)
          );
        },
      });

      // Сохраняем кластеризор
      clusterers[category] = clusterer;

      // Добавляем кластеризатор на карту
      map.addChild(clusterer);
    }
  });

  // После создания списка добавим обработчики кликов для элементов списка
  points.forEach((point) => {
    const slide = document.querySelector(
      `.swiper-slide[data-id="${point.properties.uniqueId}"]`
    );
    const listItem = slide.querySelector(".ds-map__item");

    listItem.addEventListener("click", async (e) => {
      e.preventDefault();

      const listLinks = document.querySelectorAll(".ds-map__item");
      listLinks.forEach((link) => link.classList.remove("active"));

      const markers = document.querySelectorAll(".single-marker");
      markers.forEach((marker) => marker.classList.remove("active"));

      listItem.classList.add("active");

      // Сначала увеличиваем зум карты до значения, при котором кластеры точно раскроются
      await map.setLocation({
        center: point.geometry.coordinates,
        zoom: 20, // Максимальный зум
        duration: 400,
      });

      // Делаем небольшую задержку, чтобы кластер успел раскрыться
      setTimeout(() => {
        // Ищем маркер по uniqueId
        const marker = document.querySelector(
          `.single-marker[data-id="${point.properties.uniqueId}"]`
        );
        if (marker) {
          marker.classList.add("active");

          // Точно центрируем карту на координатах маркера
          map.setLocation({
            center: point.geometry.coordinates,
            duration: 500,
          });
        }
      }, 600);

      // Прокручиваем список
      swiperScrollContainer.el.querySelector(
        ".swiper-wrapper"
      ).style.transition = "300ms";
      swiperScrollContainer.setTranslate(-slide.offsetTop);
    });
  });

  // Функция создания фильтров для карты
  function createMapFilters(points) {
    const filterContainer = document.querySelector(".ds-map-filters");

    // Подсчитываем количество точек для каждой категории
    const categoryCounts = {
      all: points.length,
      entertainment: points.filter(
        (p) => p.properties.tabName === "Развлечения"
      ).length,
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

  // Изменим функцию фильтрации
  function filterMarkers(category) {
    // Сначала удалим все кластеризаторы с карты
    Object.values(clusterers).forEach((clusterer) => {
      map.removeChild(clusterer);
    });

    if (category === "all") {
      // Для "all" возвращаем все кластеризаторы на карту
      Object.keys(groupedPoints).forEach((category) => {
        if (clusterers[category] && groupedPoints[category].length > 0) {
          clusterers[category].features = groupedPoints[category];
          map.addChild(clusterers[category]);
        }
      });
    } else {
      // Исправляем маппинг для study/education
      const categoryKey = category === "education" ? "study" : category;

      // Для конкретной категории показываем только её кластеризатор
      if (clusterers[categoryKey]) {
        clusterers[categoryKey].features = groupedPoints[categoryKey];
        map.addChild(clusterers[categoryKey]);
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
          study: "Образование", // Оставляем как есть для проверки tabName
          medical: "едицина",
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

    // Обновляем Swiper
    swiperScrollContainer.update();
  }

  // Вызываем создание фильтров после создания точек
  createMapFilters(points);
}

// Альтернативный вариант прокрутки
function scrollToSlide(slide) {
  const wrapper = swiperScrollContainer.el.querySelector(".swiper-wrapper");
  const slideOffset = slide.offsetTop;
  const containerHeight = swiperScrollContainer.el.clientHeight;
  const scrollPosition =
    slideOffset - containerHeight / 2 + slide.clientHeight / 2;

  wrapper.style.transition = "300ms";
  swiperScrollContainer.setTranslate(
    -Math.min(scrollPosition, wrapper.clientHeight - containerHeight)
  );
  if (slide) {
    const listItem = slide.firstElementChild;
    listItem.classList.add("active");
    scrollToSlide(slide);
  }
}

initMap();
