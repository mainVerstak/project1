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

  function formCounters() {
    const formCounters = document.querySelectorAll(".form-counter");

    formCounters.forEach((counter) => {
      const input = counter.querySelector(".form-counter__input");
      const btnMinus = counter.querySelector(".form-counter__btn-minus");
      const btnPlus = counter.querySelector(".form-counter__btn-plus");
      const btnDelete = counter.querySelector(".form-counter__btn-delete");

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
        });
      }

      if (btnPlus) {
        btnPlus.addEventListener("click", function () {
          input.value++;
          btnMinus.disabled = false;
        });
      }

      if (btnDelete) {
        return;
      }
    });
  }

  tooltips();
  formCounters();
});
