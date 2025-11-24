// Создаем класс для активации кнопок таббара
class ActiveTapbarButtonSwitcher {
  constructor() {
    this.buttons = document.querySelectorAll(".tapbar__item");
  }

  // запуск
  run() {
    this.buttons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        this.on(e.target.closest(".tapbar__item").dataset.id);
      })
    );
  }

  // активировать кнопку
  on(id) {
    this.off();
    this.buttons.forEach((btn) => {
      if (btn.dataset.id === id) btn.classList.add("active");
    });
  }

  // деактивировать кнопку
  off() {
    this.buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
  }
}

const switchTapbar = new ActiveTapbarButtonSwitcher();

switchTapbar.run();

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

function showSearchResult() {
  const container = document.querySelector(".live-search__results");
  if (!container) return;
  container.classList.add("in");
  onBackdrop();
}

function hideSearchReasult() {
  const container = document.querySelector(".live-search__results");
  const header = document.querySelector(".blog__header");
  if (!container && !header) return;
  header.classList.remove("in");
  container.classList.remove("in");
  offBackdrop();
  clearSearch();
  switchTapbar.on("new");
}

function openMobileSearch() {
  const header = document.querySelector(".blog__header");
  if (!header && !button) return;
  header.classList.add("in");
  showSearchResult();
  onBackdrop();
}

function clearSearch() {
  const input = document.querySelector("#live_search_input");
  if (!input) return;
  input.value = "";
}

function showResults() {
  const input = document.querySelector("#live_search_input");

  if (input) {
    input.addEventListener("input", (e) => {
      const last = document.querySelector(".search-result.last-search");
      const top = document.querySelector(".search-result.top-search");
      const results = document.querySelector(".search-result.results");

      if (!last && !top && !results) return;

      if (input.value) {
        last.classList.add("hide");
        top.classList.add("hide");
        results.classList.remove("hide");
      } else {
        last.classList.remove("hide");
        top.classList.remove("hide");
        results.classList.add("hide");
      }
    });
  }
}

showResults();

const swiper = new Swiper(".swiper", {
  // auto width for slide
  slidesPerView: "auto",
  // like gap
  spaceBetween: 10,
  // for swipe
  freeMode: true,
  // for scroll
  mousewheel: {
    invert: false,
  },
  // navigation btns
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper2 = new Swiper(".swiper2", {
  // auto width for slide
  slidesPerView: "auto",
  // like gap
  spaceBetween: 10,
  // for swipe
  freeMode: true,
  // for scroll
  mousewheel: {
    invert: false,
  },
  // navigation btns
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
