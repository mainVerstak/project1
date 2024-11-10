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
  } = ymaps3;

  const { YMapZoomControl } = await ymaps3.import(
    "@yandex/ymaps3-default-ui-theme"
  );

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: [39.710368, 47.222263],
      zoom: 15,
    },
  });

  map.addChild(
    new YMapControls({ position: "right" }).addChild(new YMapZoomControl({}))
  );
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // Получаем тестовые данные и преобразуем в точки
  const data = await getMapData();

  // Функция для генерации уникального ID
  function generateUniqueId() {
    return "id_" + Math.random().toString(36).substr(2, 9);
  }

  // При создании точек добавим уникальный ID каждому объекту
  const points = data.map((item, index) => {
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
        uniqueId: uniqueId, // Добавляем уникальный ID
      },
    };
  });

  const listItems = [];

  // Создаем список элементов для маркеров
  const container = document.querySelector(".ds-map__item-container");

  points.forEach((item) => {
    const uniqueId = item.properties.uniqueId;
    const element = document.createElement("div");
    element.innerHTML = `<div class="swiper-slide" data-id="${uniqueId}">
                      <a href="#" class="ds-map__item">
                        <div class="ds-map__heading">
                          <h4>${item.properties.name}</h4>
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
        className = "new-building";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#buildings"></use>
          </svg>`;
        break;
      default:
        className = "default-building";
        content = `
          <svg class="map-icon" >
            <use xlink:href="./map-icons/map-icons.svg#buildings"></use>
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

    element.firstElementChild.addEventListener("click", () => {
      console.log(map._props.location.zoom);
      map.setLocation({
        center: data[0].geometry.coordinates,
        zoom: 17, // TODO: исправить на динамический
      });
    });

    return element.firstElementChild;
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

  // Создаем кластеризатор для каждой группы
  Object.keys(groupedPoints).forEach((category) => {
    if (groupedPoints[category].length > 0) {
      const clusterer = new YMapClusterer({
        method: clusterByGrid({ gridSize: 64 }),
        features: groupedPoints[category],
        marker: (feature) => {
          return new YMapMarker(
            {
              coordinates: feature.geometry.coordinates,
            },
            createMarkerElement(feature.properties)
          );
        },
        cluster: (coordinates, features) => {
          return new YMapMarker(
            {
              coordinates: coordinates,
            },
            createClusterElement(features.length, features)
          );
        },
      });

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

    listItem.addEventListener("click", (e) => {
      e.preventDefault();

      const listLinks = document.querySelectorAll(".ds-map__item");
      listLinks.forEach((link) => link.classList.remove("active"));

      const markers = document.querySelectorAll(".single-marker");
      markers.forEach((marker) => marker.classList.remove("active"));

      listItem.classList.add("active");

      // Ищем маркер по uniqueId
      const marker = document.querySelector(
        `.single-marker[data-id="${point.properties.uniqueId}"]`
      );
      if (marker) {
        marker.classList.add("active");
      }

      // Изменяем способ прокрутки к элементу
      swiperScrollContainer.el.querySelector(
        ".swiper-wrapper"
      ).style.transition = "300ms";
      swiperScrollContainer.setTranslate(-slide.offsetTop);
    });
  });
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
}

// Используем эту функцию в обработчиках кликов
if (slide) {
  const listItem = slide.firstElementChild;
  listItem.classList.add("active");
  scrollToSlide(slide);
}

initMap();
