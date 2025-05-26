document.addEventListener("DOMContentLoaded", function () {
  function tooltips() {
    const tooltipContainers = document.querySelectorAll(".tooltip-container");

    function showTooltip(trigger, content) {
      trigger.addEventListener("mouseenter", function () {
        content.classList.add("active");
      });
    }

    function hideTooltip(trigger, content) {
      trigger.addEventListener("mouseleave", function (e) {
        content.classList.remove("active");
      });
    }

    tooltipContainers.forEach((container) => {
      const trigger = container.querySelector(".tooltip-trigger");
      const content = container.querySelector(".tooltip-content");

      showTooltip(trigger, content);
      hideTooltip(trigger, content);
      showTooltip(content, content);
      hideTooltip(content, content);
    });
  }

  function formCounters(counter) {
    const input = counter.querySelector(".form-counter__input");
    const btnMinus = counter.querySelector(".form-counter__btn-minus");
    const btnPlus = counter.querySelector(".form-counter__btn-plus");

    if (btnMinus) {
      if (input.value <= 1) {
        btnMinus.disabled = true;
      }

      btnMinus.addEventListener("click", function () {
        if (input.value > 2) {
          input.value--;
        } else {
          input.value = 1;
          btnMinus.disabled = true;
        }

        formCounterDelete(counter);
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener("click", function () {
        input.value++;
        btnMinus.disabled = false;

        formCounterDelete(counter);
      });
    }
  }

  function formCounterDelete(counter) {
    const input = counter.querySelector(".form-counter__input");
    const btnMinus = counter.querySelector(".form-counter__btn-minus");
    const btnDelete = counter.querySelector(".form-counter__btn-delete");

    if (!btnDelete) return;

    if (input.value > 1) {
      btnMinus.classList.remove("hidden");
      btnDelete.classList.add("hidden");
    }

    if (input.value <= 1) {
      btnDelete.classList.remove("hidden");
      btnMinus.classList.add("hidden");
    }
  }

  function deleteDropdownWithCounter(dropdown) {
    const btn = dropdown.querySelector(".form-counter__btn-delete");
    btn.addEventListener("click", function () {
      dropdown.remove();
    });
  }

  function addDropdownWithCounter(subSection) {
    const exempleDd = subSection.querySelector(".dropdown-with-counter");
    const btnContainer = subSection.querySelector(".add-field-container");
    if (!exempleDd) return;
    if (!btnContainer) return;

    const btn = btnContainer.querySelector(".add-field");
    if (!btn) return;

    const exempleDdHtml = exempleDd.innerHTML;

    btn.addEventListener("click", function () {
      const newDropdown = document.createElement("div");
      newDropdown.classList.add("form-group", "dropdown-with-counter");
      newDropdown.innerHTML = exempleDdHtml;

      const formCounter = newDropdown.querySelector(".form-counter");

      btnContainer.prepend(newDropdown);
      deleteDropdownWithCounter(newDropdown);
      formCounters(formCounter);
    });
  }

  // Initial
  document.querySelectorAll(".form-counter").forEach((counter) => {
    formCounters(counter);
    formCounterDelete(counter);
  });

  document.querySelectorAll(".dropdown-with-counter").forEach((dropdown) => {
    deleteDropdownWithCounter(dropdown);
  });

  document.querySelectorAll(".form-sub-section").forEach((subSection) => {
    console.log(subSection);
    addDropdownWithCounter(subSection);
  });

  tooltips();
});
