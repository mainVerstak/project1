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
    addDropdownWithCounter(subSection);
  });

  // Type of booking
  function typeOfBookingChangeDescription() {
    const form = document.getElementById("new_advertisement_step_4");

    if (!form) return;

    const descriptionForBookingTypeFull = document.getElementById(
      "description_for_booking_type_full",
    );
    const descriptionForBookingTypeOnRequest = document.getElementById(
      "description_for_booking_type_on_request",
    );

    form.addEventListener("change", function (event) {
      if (event.target.name === "advertisement[booking_type]") {
        if (event.target.value === "full") {
          descriptionForBookingTypeFull.classList.remove("hidden");
          descriptionForBookingTypeOnRequest.classList.add("hidden");
        } else {
          descriptionForBookingTypeFull.classList.add("hidden");
          descriptionForBookingTypeOnRequest.classList.remove("hidden");
        }
      }
    });
  }

  tooltips();
  typeOfBookingChangeDescription();

  // Messages
  // for activate animation
  const track = document.querySelector(".modal-body-track");
  document.querySelectorAll(".message-preview").forEach((message) => {
    message.addEventListener("click", () => {
      track.classList.add("is-chat-active");
    });
  });

  // No copy it just for preview
  const previews = document.querySelectorAll(".message-preview");
  const allMessages = document.querySelectorAll(".message");
  let roleId = "guest";
  let openChatId = "1";

  function selectPreview(id) {
    previews.forEach((preview) => {
      preview.classList.remove("selected");
      if (preview.dataset.chatId == id) {
        preview.classList.add("selected");
      }
    });
  }

  function showMessagesByChatId(id, role) {
    allMessages.forEach((message) => {
      message.style.display = "none";
      const chatIds = message.dataset.chatId.split(", ");
      const forRole = message.dataset.forRole;
      if (chatIds.includes(id) && role == forRole) {
        message.style.display = "grid";
      }
    });
  }

  function switchChat(id, role) {
    selectPreview(id);
    showMessagesByChatId(id, role);
    showForCurrentRole(role);
  }

  function showForCurrentRole(role) {
    previews.forEach((preview) => {
      preview.style.display = "none";
      const roles = preview.dataset.chatRoles.split(", ");
      if (roles.includes(role)) {
        preview.style.display = "grid";
      }
    });
  }

  function changeStatusBadgeCollorByRole(role) {
    previews.forEach((preview) => {
      if (role === "lessor") {
        if (preview.dataset.chatId == 1) {
          const statusEl = preview.querySelector(".message-preview-status");
          statusEl.classList.remove("invalid");
          statusEl.classList.add("primary");
        }
      } else if (role === "admin") {
        if (preview.dataset.chatId == 2) {
          const statusEl = preview.querySelector(".message-preview-status");
          statusEl.classList.remove("primary");
          statusEl.classList.add("invalid");
        }
      } else {
        const statusEl = preview.querySelector(".message-preview-status");
        if (preview.dataset.chatId == 1) {
          statusEl.classList.remove("primary");
          statusEl.classList.add("invalid");
        }
        if (preview.dataset.chatId == 2) {
          statusEl.classList.remove("invalid");
          statusEl.classList.add("primary");
        }
      }
    });
  }

  document.querySelectorAll("._js-serv-role-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("._js-serv-role-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      const b = e.target;
      b.classList.add("active");
      roleId = b.dataset.roleId;
      changeStatusBadgeCollorByRole(roleId);
      if (roleId === "admin") {
        switchChat("2", roleId);
      } else {
        switchChat("1", roleId);
      }
    });
  });

  previews.forEach((preview) => {
    preview.addEventListener("click", (e) => {
      const previewElement = e.target.closest(".message-preview");
      const id = previewElement.dataset.chatId;
      switchChat(id, roleId);
    });
  });

  switchChat(openChatId, roleId);
});

function _chatBack() {
  const track = document.querySelector(".modal-body-track");
  track.classList.remove("is-chat-active");
}

function onBackdrop() {
  const backdrop = document.querySelector(".modal-backdrop");
  backdrop.style.display = "block";
  backdrop.classList.add("in");
}

function offBackdrop() {
  const backdrop = document.querySelector(".modal-backdrop");
  backdrop.style.display = "none";
  backdrop.classList.remove("in");
}

// Для открытия модального окна
function _showModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "block";
  modal.classList.add("in");
  onBackdrop();
}

// Для закрытия модального окна
function _hideModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  modal.classList.remove("in");
  offBackdrop();
}

_showModal("chat");
