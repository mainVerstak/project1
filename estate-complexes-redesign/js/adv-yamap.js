const mapPanelHtml = `
    <div class="map_panel_body">
      <form
        class="form form-inline withoutBootstrapValidator search_form_action"
        role="form"
        itemprop="potentialAction"
        itemscope="itemscope"
        itemtype="http://schema.org/SearchAction"
        data-root-section-class="Section"
        action="/"
        accept-charset="UTF-8"
        data-remote="true"
        method="get"
      >
        <input name="utf8" type="hidden" value="✓" /><input
          type="hidden"
          name="search_form_submit"
          id="search_form_submit"
        /><input type="hidden" name="map" value="true" /><meta
          content="https://olan.ru?advertisement[description]={q}"
          itemprop="target"
        />
        <div
          itemprop="query-input"
          itemscope="itemscope"
          itemtype="http://schema.org/PropertyValueSpecification"
        >
          <meta content="q" itemprop="valueName" />
        </div>
        <span id="js-offer-type-filter"
          ><div class="form-group offerTypeButtons">
            <label>Я хочу</label>
            <div
              class="btn-group"
              data-toggle="buttons"
              id="js-offer-type-filter-content"
            >
              <label
                class="btn btn-default click_additional_search_params_action active"
                ><input
                  checked=""
                  name="advertisement[offer_type][]"
                  type="checkbox"
                  value="0"
                />купить</label
              ><label
                class="btn btn-default click_additional_search_params_action"
                ><input
                  name="advertisement[offer_type][]"
                  type="checkbox"
                  value="2"
                />снять</label
              ><label
                class="btn btn-default click_additional_search_params_action"
                ><input
                  name="advertisement[offer_type][]"
                  type="checkbox"
                  value="3"
                />посуточно</label
              >
            </div>
          </div>
        </span>
        <div class="form-group categoryButtons">
          <div
            class="btn-group"
            data-toggle="buttons"
            id="js-category-filter"
          >
            <label
              class="btn btn-default click_additional_search_params_action"
              ><span class="hidden-xs"
                ><svg class="icon-default">
                  <use xlink:href="./img/new-icons.svg#house"></use>
                </svg> </span
              ><input
                name="advertisement[property_type][]"
                type="checkbox"
                value="1"
              />жильё</label
            ><label
              class="btn btn-default click_additional_search_params_action active"
              ><input
                checked=""
                name="advertisement[category][]"
                type="checkbox"
                value="1"
              />
              квартиру</label
            ><label
              class="btn btn-default click_additional_search_params_action"
              ><input
                name="advertisement[category][]"
                type="checkbox"
                value="2"
              />
              дом</label
            ><label
              class="btn btn-default click_additional_search_params_action"
              ><input
                name="advertisement[category][]"
                type="checkbox"
                value="4"
              />
              комнату</label
            >
          </div>
          <div class="form-group propertyTypeButtons">
            <div class="btn-group" data-toggle="buttons" id="js-hotel-filter">
              <label
                class="btn btn-default click_additional_search_params_action"
                ><span class="hidden-xs"
                  ><svg class="icon-default">
                    <use xlink:href="./img/new-icons.svg#hotel"></use>
                  </svg> </span
                ><input
                  name="advertisement[property_type][]"
                  type="checkbox"
                  value="4"
                />отель</label
              >
            </div>
            <div class="btn-group" data-toggle="buttons" id="js-land-filter">
              <label
                class="btn btn-default click_additional_search_params_action"
                ><span class="hidden-xs"
                  ><svg class="icon-default">
                    <use xlink:href="./img/new-icons.svg#plot"></use>
                  </svg> </span
                ><input
                  name="advertisement[property_type][]"
                  type="checkbox"
                  value="2"
                />участок</label
              >
            </div>
            <div
              class="btn-group"
              data-toggle="buttons"
              id="js-commerce-filter"
            >
              <label
                class="btn btn-default click_additional_search_params_action"
                ><span class="hidden-xs"
                  ><svg class="icon-default">
                    <use xlink:href="./img/new-icons.svg#comm"></use>
                  </svg> </span
                ><input
                  name="advertisement[property_type][]"
                  type="checkbox"
                  value="0"
                />коммерческую</label
              >
            </div>
            <div
              class="btn-group"
              data-toggle="buttons"
              id="js-vehicle-filter"
            >
              <label
                class="btn btn-default click_additional_search_params_action"
                ><span class="hidden-xs"
                  ><svg class="icon-default">
                    <use xlink:href="./img/new-icons.svg#garage"></use>
                  </svg> </span
                ><input
                  name="advertisement[property_type][]"
                  type="checkbox"
                  value="3"
                />гараж</label
              >
            </div>
          </div>
        </div>
        <br /><span id="js-search-locations-filter"
          ><span class="search_control_action"
            ><input
              type="hidden"
              name="advertisement[location_ids][]"
              value="2190710"
              uid="2190710"
              parent_id="2190711"
              utype="city" /><input
              type="hidden"
              name="advertisement[location_ids][]"
              value="2190711"
              uid="2190711"
              utype="region"
          /></span>
          <div class="form-group">
            <label>место</label>
            <div class="btn-group">
              <div
                class="btn btn-default get-search-locations-action dropdown-toggle active"
                data-toggle="dropdown"
                mode="single"
                style="min-width: 100px"
                uid="2190710"
              >
                <span class="hidden-xs"
                  ><svg class="icon-map-small">
                    <use xlink:href="./img/new-icons.svg#placeholder"></use>
                  </svg> </span
                ><span class="title-search-locations-action"
                  >г Ростов-на-Дону</span
                >
                <svg class="icon-default">
                  <use xlink:href="./img/new-icons.svg#dd"></use>
                </svg>
              </div>
            </div></div
        ></span>
        <span id="js-search-price-container"
          ><div class="form-group">
            <label>цена</label>
            <div class="input-group">
              <input
                autocomplete="off"
                class="form-control text-input-lg"
                name="advertisement[price_from]"
                placeholder="от"
                style="margin-right: -1px"
                type="text"
              /><input
                autocomplete="off"
                class="form-control text-input-lg"
                name="advertisement[price_to]"
                placeholder="до"
                type="text"
              /><span class="input-group-addon input-sm"
                ><i class="fas fa-ruble-sign"
                  ><span class="hidden">₽</span></i
                ></span
              >
            </div>
          </div></span
        >
        <span id="js-search-owner-container"
          ><div class="btn-group" data-toggle="buttons">
            <label class="btn btn-xs btn-default" yaparam="from_owner"
              ><svg class="icon-default yaSend">
                <use xlink:href="./img/new-icons.svg#owner"></use>
              </svg>
              <input
                name="advertisement[owner]"
                type="checkbox"
                value="1"
              />без посредников</label
            >
          </div></span
        >
        <span
          class="additional_search_categories_container_action"
          id="js-additional-search-categories-container"
        ></span>
        <span
          class="additional_search_subcategories_container_action"
          id="js-additional-search-subcategories-container"
          ><div class="form-group">
            <label>тип</label>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[subcategory][]"
                  type="checkbox"
                  value="39"
                />новостройку</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[subcategory][]"
                  type="checkbox"
                  value="40"
                />вторичку</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[subcategory][]"
                  type="checkbox"
                  value="41"
                />гостинку</label
              >
            </div>
          </div></span
        >
        <span
          class="additional_search_params_container_action"
          id="js-additional-search-params-container"
          ><div class="form-group">
            <label>комнат</label>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[room][0]"
                  type="checkbox"
                  value="1"
                />студия</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[room][1]"
                  type="checkbox"
                  value="1"
                />1</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[room][2]"
                  type="checkbox"
                  value="1"
                />2</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[room][3]"
                  type="checkbox"
                  value="1"
                />3</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[room][4]"
                  type="checkbox"
                  value="1"
                />4+</label
              >
            </div>
          </div>
          <div class="form-group">
            <label>площадь</label>
            <div class="input-group input-group-sm">
              <input
                autocomplete="off"
                class="form-control text-input"
                name="advertisement[space_from]"
                placeholder="от"
                style="width: 57px"
                type="text"
                valid-type="integer"
              /><input
                autocomplete="off"
                class="form-control text-input"
                name="advertisement[space_to]"
                placeholder="до"
                style="width: 57px; margin-left: -1px"
                type="text"
                valid-type="integer"
              /><span class="input-group-addon">м²</span>
            </div>
          </div>
          <div class="form-group buildingTypeButtons">
            <label>тип дома</label>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[building_type][]"
                  type="checkbox"
                  value="0"
                />кирпичный</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[building_type][]"
                  type="checkbox"
                  value="1"
                />панельный</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[building_type][]"
                  type="checkbox"
                  value="2"
                />монолит</label
              >
            </div>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[building_type][]"
                  type="checkbox"
                  value="3"
                />кирп-мон</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[building_type][]"
                  type="checkbox"
                  value="4"
                />блочный</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[building_type][]"
                  type="checkbox"
                  value="5"
                />деревянный</label
              >
            </div>
          </div>
          <div class="form-group">
            <label>этаж</label>
            <div class="input-group input-group-sm">
              <input
                autocomplete="off"
                class="form-control text-input"
                name="advertisement[floor_from]"
                placeholder="от"
                style="width: 36px"
                type="text"
                valid-type="integer"
              /><input
                autocomplete="off"
                class="form-control text-input"
                name="advertisement[floor_to]"
                placeholder="до"
                style="width: 36px; margin-left: -1px"
                type="text"
                valid-type="integer"
              />
            </div>
          </div>
          <div class="form-group">
            <label>этажей</label>
            <div class="input-group input-group-sm">
              <input
                autocomplete="off"
                class="form-control text-input"
                name="advertisement[floor_cnt_from]"
                placeholder="от"
                style="width: 36px"
                type="text"
                valid-type="integer"
              /><input
                autocomplete="off"
                class="form-control text-input"
                name="advertisement[floor_cnt_to]"
                placeholder="до"
                style="width: 36px; margin-left: -1px"
                type="text"
                valid-type="integer"
              />
            </div>
          </div>
          <div class="form-group renovationButtons">
            <label>ремонт</label>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[renovation][]"
                  type="checkbox"
                  value="0"
                />дизайн</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[renovation][]"
                  type="checkbox"
                  value="1"
                />евро</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[renovation][]"
                  type="checkbox"
                  value="2"
                />с отделкой</label
              >
            </div>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[renovation][]"
                  type="checkbox"
                  value="3"
                />хороший</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[renovation][]"
                  type="checkbox"
                  value="4"
                />частичный</label
              ><label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[renovation][]"
                  type="checkbox"
                  value="5"
                />черновой</label
              >
            </div>
            <div class="btn-group" data-toggle="buttons">
              <label class="btn btn-default btn-xs"
                ><input
                  name="advertisement[renovation][]"
                  type="checkbox"
                  value="6"
                />без ремонта</label
              >
            </div>
          </div>
        </span>
        <span
          class="additional_category_search_params_container_action"
          id="js-additional-category-search-params-container"
        ></span>
        <div class="form-group">
          <label><i class="fas fa-tag"></i></label>
          <div class="description-group">
            <input
              autocomplete="off"
              class="form-control"
              name="advertisement[description]"
              placeholder="поиск по тексту или №"
              type="text"
            />
          </div>
        </div>
        <div class="form-group pull-right hidden-xs search_buttons">
          <span class="add_search_link_block_action"></span>
          <div class="main_search_buttons">
            <a class="btn btn-default list_search_btn"
              ><svg class="icon-default">
                <use xlink:href="./img/new-icons.svg#list"></use>
              </svg>
              Списком</a
            >
            <button
              class="btn btn-primary yaSend load_points_btn"
              type="button"
              yaparam="search"
            >
              <svg class="icon-default">
                <use xlink:href="./img/new-icons.svg#search"></use>
              </svg>
              Найти
            </button>
          </div>
        </div>
        <div class="visible-xs">
          <input class="hidden" id="submitSearchForm" type="submit" /><span
            class="add_search_link_block_action"
          ></span>
        </div>
      </form>
    </div>
    <div class="map_panel_hider">
      <svg class="icon-default">
        <use xlink:href="./img/new-icons.svg#chevron-l"></use>
      </svg>
    </div>
`;

// Тестовые данные с точками
const testData = {
  points: [
    {
      id: 142138885,
      latitude: 47.07557678,
      longitude: 39.56221771,
      price: 1000000,
      viewed: true,
    },
    {
      id: 142137293,
      latitude: 47.195511,
      longitude: 39.622675,
      price: 2500000,
      viewed: false,
    },
    {
      id: 142137294,
      latitude: 47.196511,
      longitude: 39.623675,
      price: 3200000,
      viewed: false,
    },
    {
      id: 142137295,
      latitude: 47.197511,
      longitude: 39.624675,
      price: 5600000,
      viewed: true,
    },
    {
      id: 142137296,
      latitude: 47.197611,
      longitude: 39.624775,
      price: 12000000,
      viewed: false,
    },
    {
      id: 142137297,
      latitude: 47.250075,
      longitude: 39.653635,
      price: 1500000000,
      viewed: false,
    },
    {
      id: 142137298,
      latitude: 47.251075,
      longitude: 39.654635,
      price: 10000,
      viewed: true,
    },
  ],
};

// Инициализация карты и отображение меток
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM полностью загружен");

  // Проверяем наличие контейнера для карты
  const mapContainer = document.getElementById("adv_map");
  if (!mapContainer) {
    console.error("Контейнер для карты не найден!");
    return;
  }

  console.log("Контейнер для карты найден:", mapContainer);

  // Тестовые данные с точками
  const testData = {
    points: [
      {
        id: 142138885,
        latitude: 47.07557678,
        longitude: 39.56221771,
        price: 1000000,
        viewed: true,
      },
      {
        id: 142137293,
        latitude: 47.195511,
        longitude: 39.622675,
        price: 2500000,
        viewed: false,
      },
      {
        id: 142137294,
        latitude: 47.196511,
        longitude: 39.623675,
        price: 3200000,
        viewed: false,
      },
      {
        id: 142137295,
        latitude: 47.197511,
        longitude: 39.624675,
        price: 5600000,
        viewed: true,
      },
      {
        id: 142137296,
        latitude: 47.197611,
        longitude: 39.624775,
        price: 12000000,
        viewed: false,
      },
      {
        id: 142137297,
        latitude: 47.250075,
        longitude: 39.653635,
        price: 1500000000,
        viewed: false,
      },
      {
        id: 142137298,
        latitude: 47.251075,
        longitude: 39.654635,
        price: 10000,
        viewed: true,
      },
    ],
  };

  // Функция форматирования цены
  function formatPrice(price) {
    if (price >= 1000000000) {
      return (price / 1000000000).toFixed(1).replace(/\.0$/, "") + " млрд";
    } else if (price >= 1000000) {
      return (price / 1000000).toFixed(1).replace(/\.0$/, "") + " млн";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1).replace(/\.0$/, "") + " тыс";
    } else {
      return price;
    }
  }

  // Инициализация карты
  ymaps.ready(function () {
    console.log("Yandex Maps API готов");

    // Создание карты
    const map = new ymaps.Map("adv_map", {
      center: [47.250075, 39.653635],
      zoom: 12,
      controls: [], // Убираем все стандартные контролы
    });

    console.log("Карта создана");

    // Добавляем зум-контрол справа
    const zoomControl = new ymaps.control.ZoomControl({
      options: {
        position: {
          right: 15,
          top: 15,
        },
        size: "small",
      },
    });
    map.controls.add(zoomControl);
    console.log("Зум-контрол добавлен");

    // Добавляем контрол полноэкранного режима
    const fullscreenControl = new ymaps.control.FullscreenControl({
      options: {
        position: {
          right: 15,
          top: 95,
        },
        size: "small",
      },
    });
    map.controls.add(fullscreenControl);
    console.log("Контрол полноэкранного режима добавлен");

    // Создаем собственный класс для панели поиска
    const SearchPanelControl = function (options) {
      SearchPanelControl.superclass.constructor.call(this, options);
      this._$content = null;
    };

    // Наследуем его от collection.Item
    ymaps.util.augment(SearchPanelControl, ymaps.collection.Item, {
      onAddToMap: function (map) {
        SearchPanelControl.superclass.onAddToMap.call(this, map);
        this.getParent()
          .getChildElement(this)
          .then(this._onGetChildElement, this);
      },

      onRemoveFromMap: function (oldMap) {
        if (this._$content) {
          this._$content.remove();
        }
        SearchPanelControl.superclass.onRemoveFromMap.call(this, oldMap);
      },

      _onGetChildElement: function (parentDomContainer) {
        // Создаем HTML-элемент с панелью поиска
        this._$content = $('<div class="map_panel"></div>').appendTo(
          parentDomContainer
        );

        // Добавляем содержимое панели поиска
        this._$content.html(mapPanelHtml);

        // Добавляем обработчик для кнопки сворачивания/разворачивания
        const mapPanelHider = this._$content.find(".map_panel_hider");
        mapPanelHider.on("click", () => {
          console.log("Клик по кнопке сворачивания/разворачивания");
          this._$content.toggleClass("collapsed");
        });

        console.log("Панель поиска создана и добавлена на карту");
      },
    });

    // Создаем экземпляр нашего контрола
    const searchPanel = new SearchPanelControl();

    // Добавляем контрол на карту
    map.controls.add(searchPanel, {
      float: "none",
      position: {
        left: 15,
        top: 15,
      },
    });

    console.log("Контрол панели поиска добавлен на карту");

    // Создание кастомного макета для меток
    const MarkLayout = ymaps.templateLayoutFactory.createClass(
      `<div class="placemark-label {% if properties.viewed %}viewed{% endif %} {% if properties.isZoomHidden %}hidden{% endif %}">{{ properties.formattedPrice }}</div>
       <div class="placemark-point {% if properties.viewed %}viewed{% endif %}"></div>`, // Здесь подставится стандартная иконка
      {
        build: function () {
          MarkLayout.superclass.build.call(this);

          // Получаем карту
          this.map = this.getData().geoObject.getMap();

          // Если карта существует, добавляем обработчик изменения зума
          if (this.map) {
            this.mapZoomEndListener = this.map.events
              .group()
              .add("boundschange", this.onMapZoomChange, this);

            // Проверяем текущий зум при инициализации
            this.onMapZoomChange();
          }
        },

        clear: function () {
          // Удаляем обработчик при удалении макета
          if (this.mapZoomEndListener) {
            this.mapZoomEndListener.removeAll();
          }
          MarkLayout.superclass.clear.call(this);
        },

        onMapZoomChange: function () {
          // Получаем текущий зум карты
          const currentZoom = this.map.getZoom();

          console.log("currentZoom", currentZoom);

          // Устанавливаем флаг скрытия в зависимости от зума
          const isHidden = currentZoom <= 14;

          // Проверяем, изменилось ли значение, чтобы избежать рекурсии
          const currentHiddenState =
            this.getData().properties.get("isZoomHidden");
          if (currentHiddenState !== isHidden) {
            this.getData().properties.set("isZoomHidden", isHidden);
          }
        },
      }
    );

    // Создание кастомного макета для кластеров
    const ClusterLayout = ymaps.templateLayoutFactory.createClass(
      `<div class="cluster-label {% if properties.isZoomHidden %}hidden{% endif %} {% if properties.viewed %}viewed{% endif %}">{{ properties.minPrice }}</div>
       <div class="cluster-content {% if properties.isZoomHidden %}label-hidden{% endif %} {% if properties.viewed %}viewed{% endif %}">{{ properties.geoObjects.length }}</div>`,
      {
        build: function () {
          ClusterLayout.superclass.build.call(this);
          // Получаем карту
          this.map = this.getData().geoObject.getMap();

          // Если карта существует, добавляем обработчик изменения зума
          if (this.map) {
            this.mapZoomEndListener = this.map.events
              .group()
              .add("boundschange", this.onMapZoomChange, this);

            // Проверяем текущий зум при инициализации
            this.onMapZoomChange();
          }
        },

        clear: function () {
          // Удаляем обработчик при удалении макета
          if (this.mapZoomEndListener) {
            this.mapZoomEndListener.removeAll();
          }
          MarkLayout.superclass.clear.call(this);
        },

        onMapZoomChange: function () {
          // Получаем текущий зум карты
          const currentZoom = this.map.getZoom();

          console.log("currentZoomCluster", currentZoom);

          // Устанавливаем флаг скрытия в зависимости от зума
          const isHidden = currentZoom <= 14;

          // Проверяем, изменилось ли значение, чтобы избежать рекурсии
          const currentHiddenState =
            this.getData().properties.get("isZoomHidden");
          if (currentHiddenState !== isHidden) {
            this.getData().properties.set("isZoomHidden", isHidden);
          }
        },
      }
    );

    // Создание кластеризатора
    const clusterer = new ymaps.Clusterer({
      // Макет метки кластера pieChart
      clusterIconLayout: "default#pieChart",
      // Радиус диаграммы в пикселях
      clusterIconPieChartRadius: 20,
      // Радиус центральной части макета
      clusterIconPieChartCoreRadius: 13,
      // Ширина линий-разделителей секторов и внешней обводки диаграммы
      clusterIconPieChartStrokeWidth: 3,
      // Определяет наличие поля balloon
      hasBalloon: false,
      // Цвет центральной части диаграммы
      clusterIconPieChartCoreColor: "#ffffff",
      // Отключаем зум при клике на кластер
      clusterDisableClickZoom: true,
    });

    // Кастомизация кластеров
    clusterer.createCluster = function (center, geoObjects) {
      // Создаем кластер через родительский метод
      const cluster = ymaps.Clusterer.prototype.createCluster.call(
        this,
        center,
        geoObjects
      );

      // Вычисляем минимальную цену среди объектов кластера
      let minPrice = Infinity;

      // Подсчитываем количество просмотренных и непросмотренных объектов
      let viewedCount = 0;
      let notViewedCount = 0;

      geoObjects.forEach((geoObject) => {
        const price = geoObject.properties.get("price");
        const viewed = geoObject.properties.get("viewed");

        // Подсчитываем количество просмотренных и непросмотренных
        if (viewed) {
          viewedCount++;
        } else {
          notViewedCount++;
        }

        if (price < minPrice) minPrice = price;
      });

      // Определяем, все ли объекты просмотрены или нет
      const allViewed = viewedCount === geoObjects.length;
      const allNotViewed = notViewedCount === geoObjects.length;

      // Устанавливаем свойства кластера
      cluster.properties.set({
        minPrice: "от " + formatPrice(minPrice),
        viewed: allViewed,
        geoObjectsLength: geoObjects.length,
        isZoomHidden: false, // Начальное значение
      });

      // Создаем данные для диаграммы
      const data = [];

      // Добавляем сектор для непросмотренных объектов, если они есть
      if (notViewedCount > 0) {
        data.push({
          weight: notViewedCount,
          color: "#56db40", // Зеленый для непросмотренных
        });
      }

      // Добавляем сектор для просмотренных объектов, если они есть
      if (viewedCount > 0) {
        data.push({
          weight: viewedCount,
          color: "#b3b3b3", // Серый для просмотренных
        });
      }

      // Устанавливаем данные для диаграммы
      cluster.properties.set("data", data);

      // Создаем кастомный макет для отображения цены и количества объектов
      const PieChartWithLabelLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="cluster-label {% if properties.isZoomHidden %}hidden{% endif %}">{{ properties.minPrice }}</div>
         <div class="cluster-content {% if properties.isZoomHidden %}label-hidden{% endif %}">{{ properties.geoObjectsLength }}</div>
         <div class="pie-chart-content"></div>`,
        {
          build: function () {
            PieChartWithLabelLayout.superclass.build.call(this);

            // Получаем карту
            this.map = this.getData().geoObject.getMap();

            // Если карта существует, добавляем обработчик изменения зума
            if (this.map) {
              this.mapZoomEndListener = this.map.events
                .group()
                .add("boundschange", this.onMapZoomChange, this);

              // Проверяем текущий зум при инициализации
              this.onMapZoomChange();
            }
          },

          clear: function () {
            // Удаляем обработчик при удалении макета
            if (this.mapZoomEndListener) {
              this.mapZoomEndListener.removeAll();
            }
            PieChartWithLabelLayout.superclass.clear.call(this);
          },

          onMapZoomChange: function () {
            // Получаем текущий зум карты
            const currentZoom = this.map.getZoom();

            // Устанавливаем флаг скрытия в зависимости от зума
            const isHidden = currentZoom <= 14;

            // Проверяем, изменилось ли значение, чтобы избежать рекурсии
            const currentHiddenState =
              this.getData().properties.get("isZoomHidden");
            if (currentHiddenState !== isHidden) {
              this.getData().properties.set("isZoomHidden", isHidden);
            }
          },
        }
      );

      // Если в кластере есть как просмотренные, так и непросмотренные объекты,
      // используем кастомный макет с диаграммой
      if (!allViewed && !allNotViewed) {
        cluster.options.set(
          "clusterIconContentLayout",
          PieChartWithLabelLayout
        );
      } else {
        // Если все объекты просмотрены или все непросмотрены, используем стандартный макет
        cluster.options.set("clusterIconContentLayout", ClusterLayout);
        cluster.options.set(
          "preset",
          allViewed ? "islands#grayClusterIcons" : "islands#greenClusterIcons"
        );
      }

      return cluster;
    };

    // Массив для хранения меток
    const placemarks = [];

    // Создание меток на основе данных
    testData.points.forEach((point) => {
      const formattedPrice = formatPrice(point.price);

      // Создание метки
      const placemark = new ymaps.Placemark(
        [point.latitude, point.longitude],
        {
          id: point.id,
          price: point.price,
          formattedPrice: formattedPrice,
          viewed: point.viewed,
        },
        {
          iconLayout: MarkLayout,
          iconShape: {
            type: "Circle",
            coordinates: [0, 0],
            radius: 20,
          },
        }
      );

      // Добавляем обработчик клика
      placemark.events.add("click", function (e) {
        try {
          // Предотвращаем всплытие события, чтобы не срабатывал клик по карте
          e.stopPropagation();

          // Получаем текущий статус просмотра
          const currentViewed = placemark.properties.get("viewed");

          // Инвертируем статус
          const newViewedStatus = !currentViewed;

          // Устанавливаем новый статус
          placemark.properties.set("viewed", newViewedStatus);

          // Логируем изменение
          console.log(
            "Точка " +
              placemark.properties.get("id") +
              " отмечена как " +
              (newViewedStatus ? "просмотренная" : "непросмотренная")
          );
        } catch (error) {
          console.error("Ошибка при обработке клика на метку:", error);
        }
      });

      placemarks.push(placemark);
    });

    // Добавление меток в кластеризатор
    clusterer.add(placemarks);

    // Добавление кластеризатора на карту
    map.geoObjects.add(clusterer);

    // Добавляем обработчик клика по кластеру
    clusterer.events.add("click", function (e) {
      const cluster = e.get("target");

      // Проверяем, что это действительно кластер
      if (!cluster.getGeoObjects && cluster.properties) {
        console.log("Это не кластер или у кластера нет метода getGeoObjects");
        return;
      }

      try {
        // Получаем геообъекты кластера
        const geoObjects = cluster.getGeoObjects();

        // Получаем текущий статус кластера
        const isViewed = cluster.properties.get("viewed");

        // Меняем статус всех точек в кластере
        geoObjects.forEach((geoObject) => {
          geoObject.properties.set("viewed", !isViewed);
        });

        // Обновляем статус кластера
        cluster.properties.set("viewed", !isViewed);

        // Меняем пресет кластера в зависимости от нового статуса
        cluster.options.set(
          "preset",
          !isViewed ? "islands#grayClusterIcons" : "islands#greenClusterIcons"
        );

        // Предотвращаем стандартное поведение (раскрытие кластера)
        e.preventDefault();

        console.log(
          "Статус кластера изменен на: " +
            (!isViewed ? "просмотренный" : "непросмотренный")
        );
      } catch (error) {
        console.error("Ошибка при обработке клика на кластер:", error);

        // Альтернативный способ получения геообъектов
        if (cluster.properties && cluster.properties.get("geoObjects")) {
          const geoObjects = cluster.properties.get("geoObjects");
          console.log(
            "Получены геообъекты через properties:",
            geoObjects.length
          );

          // Дальнейшая обработка...
        }
      }
    });

    // Установка границ карты по меткам
    map.setBounds(clusterer.getBounds(), {
      checkZoomRange: true,
    });

    console.log("Инициализация карты завершена");
  });
});
