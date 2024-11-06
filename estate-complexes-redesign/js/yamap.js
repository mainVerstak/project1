const ymaps3 = window.ymaps3;

async function initMap() {
  await ymaps3.ready;

  const { YMapClusterer, clusterByGrid } = await ymaps3.import(
    "@yandex/ymaps3-clusterer@0.0.1"
  );

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: [37.588144, 55.733842],
      zoom: 10,
    },
  });

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  // Генерируем тестовые данные
  const features = Array.from({ length: 100 }, (_, index) => ({
    type: "Feature",
    id: index,
    geometry: {
      type: "Point",
      coordinates: [
        37.588144 + (Math.random() - 0.5) * 0.2,
        55.733842 + (Math.random() - 0.5) * 0.2,
      ],
    },
    properties: {
      balloonContent: `Объект ${index + 1}`,
      clusterCaption: `Объект ${index + 1}`,
      price: Math.floor(Math.random() * 50000 + 30000),
    },
  }));

  // Функция создания DOM элемента для маркера
  function createMarkerElement(content) {
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="single-marker"></div>
    `;
    return element.firstElementChild;
  }

  // Функция создания DOM элемента для кластера
  function createClusterElement(count) {
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="cluster-marker">
        <div class="cluster-marker__inner">${count}</div>
      </div>
    `;
    return element.firstElementChild;
  }

  // Создаем кластеризатор
  const clusterer = new YMapClusterer({
    method: clusterByGrid({ gridSize: 64 }),
    features: features,
    marker: (feature) => {
      return new YMapMarker(
        {
          coordinates: feature.geometry.coordinates,
        },
        createMarkerElement()
      );
    },
    cluster: (coordinates, features) => {
      return new YMapMarker(
        {
          coordinates: coordinates,
        },
        createClusterElement(features.length)
      );
    },
  });

  // Добавляем кластеризатор на карту
  map.addChild(clusterer);
}

initMap();
