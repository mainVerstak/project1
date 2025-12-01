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
  header.scrollIntoView({ behavior: "smooth", block: "center" });
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
        last.classList.add("hidden");
        top.classList.add("hidden");
        results.classList.remove("hidden");
      } else {
        last.classList.remove("hidden");
        top.classList.remove("hidden");
        results.classList.add("hidden");
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

const swiperAnnounces = new Swiper(".swiper_announces", {
  slidesPerView: 1,
  spaceBetween: 15,

  breakpoints: {
    767: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },

  navigation: {
    nextEl: ".swiper_annonces-button-next",
    prevEl: ".swiper_annonces-button-prev",
  },
  mousewheel: false,
});

function closePopup(id) {
  const popup = document.getElementById(id);
  console.log("close", id);
  popup.style.display = "none";
}
function openPopup(id) {
  const popup = document.getElementById(id);
  console.log("open", id);
  popup.style.display = "block";
}

// Catalog main class for desktop
class Catalog {
  constructor() {
    this.btns = document.querySelectorAll(
      ".js-catalog-category-switch-section-btn"
    );
    this.sections = document.querySelectorAll(
      ".js-catalog-category-switch-section-inner"
    );

    this.activeId = "";

    // run script
    this.init();
  }

  // Hide elements
  hideElements = (elements) => {
    elements.forEach((el) => {
      el.classList.add("hidden");
    });
  };

  // Show elements by ID
  showElementById = (elements, id) => {
    elements.forEach((el) => {
      if (el.dataset.id === id) {
        el.classList.remove("hidden");
      }
    });
  };

  // Event Listenet for clicks
  handlePick = (btns, selector) => {
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest(selector).dataset.id;
        this.activeId = id;

        this.control();
      });
    });
  };

  // Add class active for pick btn
  lightBtn = (btns, id) => {
    btns.forEach((btn) => {
      if (btn.dataset.id === id) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  // Main actions
  control = () => {
    this.hideElements(this.sections);
    this.showElementById(this.sections, this.activeId);
    this.lightBtn(this.btns, this.activeId);
  };

  // Run class
  init = () => {
    this.control();
    this.handlePick(this.btns, ".js-catalog-category-switch-section-btn");
  };
}

const desktopCatalogEvents = new Catalog();
