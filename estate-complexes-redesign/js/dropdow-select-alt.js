document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelectorAll(".dropdown-multiselect");
  const dropdownSelectButton = dropdown.querySelector(".dropdown-multiselect-toggle");
  const dropdownSelectButtonText = dropdown.querySelector(".dropdown-multiselect-toggle span");
  const dropdownSelectMenuBtns = dropdown.querySelectorAll(".dropdown-multiselect-menu-item");

  let selectValue = [];
  let selectName = [];

  const btnText = dropdownSelectButtonText.textContent;

  dropdown.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdown.classList.remove("open");
      dropdownSelectButton.classList.remove("active");
    }
  });

  dropdownSelectButton.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("open");
  });

  dropdown.setAttribute("tabindex", "-1");
  dropdown.addEventListener("focusout", (e) => {
    if (!dropdown.contains(e.relatedTarget)) {
      dropdown.classList.remove("open");
      dropdownSelectButton.classList.remove("active");
    }
  });

  dropdownSelectMenuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const input = btn.querySelector("input");
      selectName.push(e.target.textContent);

      if (input) {
        selectValue.push(input.value);
      }

      if (e.target.classList.contains("active")) {
        selectValue = selectValue.filter((value) => value !== input.value);
        selectName = selectName.filter((name) => name !== e.target.textContent);
      }

      dropdown.dataset.value = selectValue;

      if (selectName.length > 1) {
        dropdownSelectButtonText.textContent = `${selectName[0]} +${selectName.length - 1}`;
        dropdownSelectButtonText.classList.add("bold");
      } else if (selectName.length === 0) {
        dropdownSelectButtonText.textContent = btnText;
        dropdownSelectButtonText.classList.remove("bold");
      } else {
        dropdownSelectButtonText.textContent = selectName[0];
        dropdownSelectButtonText.classList.add("bold");
      }
    });
  });
});
