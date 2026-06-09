document.addEventListener("DOMContentLoaded", function () {
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
