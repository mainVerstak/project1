document.addEventListener("DOMContentLoaded", function () {
  // Функция для рендеринга опции в раскрывающемся списке
  function formatOption(data) {
    if (!data.id) return data.text; // Если нет ID, просто возвращаем текст

    // Получаем изображение из data-image атрибута
    const image = $(data.element).data("image");

    if (!image) {
      return data.text;
    }

    // Возвращаем HTML с изображением и текстом
    return $(
      `<div class="select2-option-with-image">
        <img src="${image}" alt="${data.text}" class="select2-option-image" style="width: 24px; height: 24px; margin-right: 10px; vertical-align: middle;">
        <span>${data.text}</span>
      </div>`,
    );
  }

  // Инициализация Select2 для всех селектов с классом select2-custom
  $(".select2-custom").select2({
    placeholder: "Выберите",
    allowClear: false,
    minimumResultsForSearch: -1, // Отключаем поиск для маленьких списков
    language: {
      noResults: function () {
        return "Ничего не найдено";
      },
    },
    escapeMarkup: function (markup) {
      return markup; // Разрешаем HTML в опциях
    },
    templateResult: formatOption, // Рендеринг опций в dropdown
    templateSelection: formatOption, // Рендеринг выбранной опции
  });

  // Заменяем стрелки на SVG иконки после инициализации
  $(".select2-custom").each(function () {
    const container = $(this).next(".select2-container");
    const arrow = container.find(".select2-selection__arrow");

    // Очищаем содержимое стрелки и добавляем SVG
    arrow.html(`
            <svg class="icon-default select2-arrow-icon">
              <use xlink:href="./img/icons.svg#chevron-d"></use>
            </svg>
          `);
  });
});
