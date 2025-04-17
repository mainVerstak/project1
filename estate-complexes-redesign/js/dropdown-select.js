document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".dropdown-multiselect");
  const selectedDiv = document.querySelector(".dropdown-multiselect-toggle");
  const selectedText = document.querySelector(".dropdown-multiselect-toggle span");
  const itemsDiv = document.querySelector(".dropdown-multiselect-menu");

  let selectedValues = [];

  selectedDiv.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  // Обработка кликов по label
  itemsDiv.addEventListener("click", function (e) {
    const label = e.target.closest(".dropdown-multiselect-menu-item");
    if (label) {
      const checkbox = label.querySelector('input[type="checkbox"]');
      if (checkbox && e.target !== checkbox) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        // Создаем и диспатчим событие change вручную
        const event = new Event("change", { bubbles: true });
        checkbox.dispatchEvent(event);
      }
    }
  });

  itemsDiv.addEventListener("change", function (e) {
    if (e.target && e.target.type === "checkbox") {
      const value = e.target.value;
      const label = e.target.closest("label");

      console.log(e.target.closest("label"));
      if (e.target.checked) {
        selectedValues.push(value);
      } else {
        selectedValues = selectedValues.filter((v) => v !== value);
      }

      updateSelectedDisplay();
      updateSelectedText();
    }
  });

  function updateSelectedDisplay() {
    if (selectedValues.length > 0) {
      const firstSelected = selectedValues[0];
      const otherSelected = selectedValues.slice(1).join(", ");
      selectedText.textContent = `Выбрано ${selectedValues.length} значений`;
    } else {
      selectedText.textContent = "Выберите значения";
    }
  }

  function updateSelectedText() {
    if (selectedValues.length > 0) {
      const firstSelected = selectedValues[0];
      const otherSelectedCount = selectedValues.length - 1;

      if (otherSelectedCount > 0) {
        selectedText.textContent = `${firstSelected} +${otherSelectedCount}`;
        selectedText.classList.add("bold");
      } else {
        selectedText.textContent = firstSelected;
        selectedText.classList.add("bold");
      }
    } else {
      selectedText.textContent = "Выберите значения";
      selectedText.classList.remove("bold");
    }
  }

  // Закрыть дропдаун при клике вне его
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown-multiselect")) {
      dropdown.classList.remove("open");
    }
  });
});
