const ymaps3 = window.ymaps3;

async function getMapData() {
  try {
    const response = await fetch("./js/map-data.json").then((res) =>
      res.json()
    );
    console.log(response.data); // TODO: удалить
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function initMap() {
  await ymaps3.ready;

  const { YMapClusterer, clusterByGrid } = await ymaps3.import(
    "@yandex/ymaps3-clusterer@0.0.1"
  );

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: [39.710368, 47.222263],
      zoom: 15,
    },
  });

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // Получаем тестовые данные и преобразуем в точки
  const data = await getMapData();
  const points = data.map(
    ({ latitude, longitude, address, tabName, name }, index) => ({
      type: "Feature",
      id: index,
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      properties: {
        balloonContent: `Объект ${index + 1}`,
        clusterCaption: `Объект ${index + 1}`,
        address: address,
        tabName: tabName,
        name: name,
      },
    })
  );

  // Функция создания DOM элемента для маркера
  function createMarkerElement(data) {
    let className;
    let content;

    switch (data.tabName) {
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
    element.innerHTML = `
      <div class="single-marker ${className}">${content}</div>
    `;
    return element.firstElementChild;
  }

  // Функция создания DOM элемента для кластера
  function createClusterElement(count, data) {
    let className;
    console.log(data);
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
    console.log(point.properties.tabName);
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

      // Создаем кластеризатор
      // const clusterer = new YMapClusterer({
      //   method: clusterByGrid({ gridSize: 64 }),
      //   features: points,
      //   marker: (feature) => {
      //     return new YMapMarker(
      //       {
      //         coordinates: feature.geometry.coordinates,
      //       },
      //       createMarkerElement(feature.properties)
      //     );
      //   },
      //   cluster: (coordinates, features) => {
      //     return new YMapMarker(
      //       {
      //         coordinates: coordinates,
      //       },
      //       createClusterElement(features.length)
      //     );
      //   },
      // });

      // Добавляем кластеризатор на карту
      map.addChild(clusterer);
    }
  });
}

initMap();
