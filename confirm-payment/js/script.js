document.addEventListener("DOMContentLoaded", function () {
  function tooltips() {
    const tooltipContainers = document.querySelectorAll(".tooltip-container");

    function setTooltipPosition(content) {
      content.classList.remove("to_right_side", "to_left_side");

      const rigthDistance = getDistanceToRightEdge(content);
      const leftDistance = getDistanceToLeftEdge(content);

      if (rigthDistance < 15) {
        content.classList.remove("to_right_side");
        content.classList.add("to_left_side");
      } else if (leftDistance < 15) {
        content.classList.remove("to_left_side");
        content.classList.add("to_right_side");
      }
    }

    // service function
    function getDistanceToRightEdge(element) {
      const rect = element.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      return windowWidth - rect.right;
    }
    function getDistanceToLeftEdge(element) {
      const rect = element.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      return windowWidth - rect.left;
    }

    // show and hide tooltip
    function showTooltip(trigger, content) {
      trigger.addEventListener("mouseenter", function () {
        content.classList.add("active");
      });
    }

    function hideTooltip(trigger, content) {
      trigger.addEventListener("mouseleave", function () {
        content.classList.remove("active");
      });
    }

    // init
    tooltipContainers.forEach((container) => {
      const trigger = container.querySelector(".tooltip-trigger");
      const content = container.querySelector(".tooltip-content");

      if (!trigger || !content) return;

      setTooltipPosition(content);
      window.addEventListener("resize", function () {
        setTooltipPosition(content);
      });

      showTooltip(trigger, content);
      hideTooltip(trigger, content);
      showTooltip(content, content);
      hideTooltip(content, content);
    });
  }

  tooltips();
});
