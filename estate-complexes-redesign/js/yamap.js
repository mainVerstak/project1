const ymaps3 = window.ymaps3;

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  // Иницилиазируем карту
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById("map"),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [37.588144, 55.733842],

        // Уровень масштабирования
        zoom: 12,
      },
    }
  );

  // Добавляем слой для отображения схематической карты
  map.addChild(new YMapDefaultSchemeLayer());

  // Добавляем слой для маркеров
  map.addChild(new YMapDefaultFeaturesLayer());

  // Массив с данными точек
  const points = [
    { coordinates: [37.588144, 55.733842], text: "Точка 1" },
    { coordinates: [37.598144, 55.743842], text: "Точка 2" },
    { coordinates: [37.578144, 55.723842], text: "Точка 3" },
  ];

  // Добавляем маркеры на карту
  points.forEach((point) => {
    const markerElement = document.createElement("div");
    markerElement.className = "marker";
    markerElement.innerHTML = point.text;

    const marker = new YMapMarker(
      {
        coordinates: point.coordinates,
      },
      markerElement
    );

    map.addChild(marker);
  });
}

initMap();
