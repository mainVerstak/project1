document.addEventListener("DOMContentLoaded", () => {
  const dropdownSelect = document.querySelectorAll(".dropdown-select");
  dropdownSelect.forEach((dropdown) => {
    let selectValue = [];
    let selectName = [];
    const dropdownSelectButton = dropdown.querySelector(".dropdown-select-toggle");
    const dropdownSelectButtonText = dropdown.querySelector(".dropdown-select-toggle span");
    const dropdownSelectMenuBtns = dropdown.querySelectorAll(".dropdown-menu a");
    dropdownSelectMenuBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        selectValue.push(e.target.dataset.value);
        selectName.push(e.target.textContent);

        if (e.target.classList.contains("selected")) {
          e.target.classList.remove("selected");
          selectValue = selectValue.filter((value) => value !== e.target.dataset.value);
          selectName = selectName.filter((name) => name !== e.target.textContent);
        } else {
          e.target.classList.add("selected");
        }

        dropdownSelectButton.dataset.value = selectValue;

        if (selectName.length > 1) {
          dropdownSelectButtonText.textContent = `${selectName[0]} +${selectName.length - 1}`;
        } else if (selectName.length === 0) {
          dropdownSelectButtonText.textContent = "Выберите тип";
        } else {
          dropdownSelectButtonText.textContent = selectName[0];
        }
      });
    });
  });
});
