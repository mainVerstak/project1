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

// Catalog main class
class CatalogDesktop {
  constructor() {
    this.sections = document.querySelectorAll(
      ".js-catalog-category-switch-section"
    );
    this.subSections = document.querySelectorAll(
      ".js-catalog-category-switch-subsection"
    );
    this.articles = document.querySelectorAll(
      ".js-catalog-category-switch-acrticles"
    );
    this.backButton = document.querySelector(
      ".js-catalog-category-switch-back"
    );
    this.activeSection = "";
    this.activeSubSection = "";
    this.isMobile = false;
    this.lvl = 1;
  }

  addActiveClass = (id) => {
    this.sections.forEach((btn) => {
      if (btn.dataset.id === id) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  showSubSection = (id) => {
    this.subSections.forEach((section) => {
      if (section.dataset.id === id) {
        section.style.display = "grid";
      } else {
        section.style.display = "none";
      }
    });
  };
  showArticles = (id) => {
    this.articles.forEach((articles) => {
      if (articles.dataset.id === id) {
        articles.style.display = "flex";
      } else {
        articles.style.display = "none";
      }
    });
  };

  hideAll = () => {
    this.subSections.forEach((section) => {
      section.style.display = "none";
    });
  };

  hideSections = () => {
    this.sections.forEach((btn) => {
      if (this.activeSection !== btn.dataset.id) {
        btn.style.display = "none";
      }
    });
  };

  // hideSubSections = () => {
  //   this.subSections.forEach((btn) => {
  //     if (this.activeSubSection !== btn.dataset.id) {
  //       btn.style.display = "none";
  //     }
  //   });
  // };

  hideArticles = () => {
    this.articles.forEach((subSection) => {
      if (this.activeSubSection !== subSection.dataset.subSectionId) {
        subSection.style.display = "none";
      }
    });
  };

  hideOrShowBackButton = () => {
    if (this.lvl > 1) {
      this.backButton.style.display = "block";
    } else {
      this.backButton.style.display = "none";
    }
  };

  handelSwitch = (e) => {
    const btn = e.target.closest(".js-catalog-category-switch-section");
    const id = btn.dataset.id;
    this.addActiveClass(id);
    this.activeSection = id;
    this.lvl++;
    this.lvlControl();
    this.showSubSection(id);
  };

  handleBack = () => {
    console.log("back");
    this.backButton.addEventListener("click", () => {
      if (this.lvl > 1) {
        this.lvl--;
      }
    });
  };

  resizeControl = () => {
    if (window.screen.width <= 767) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  };

  lvlControl = () => {
    console.log("lvlControl", this.lvl);
    if (this.isMobile) {
      this.hideOrShowBackButton();
      if (this.lvl === 1) {
        this.hideSections();
      }
      if (this.lvl === 2) {
        this.hideSections();
        this.hideArticles();
      }
      if (this.lvl === 3) {
        this.hideSections();
      }
    }
  };

  onUpdate = () => {};

  init = () => {
    this.hideAll();
    this.hideOrShowBackButton();
    this.resizeControl();

    this.handleBack();

    console.log(this.articles);

    this.resizeControl();
    window.addEventListener("resize", () => this.resizeControl);

    this.showSubSection(this.activeSection);
    this.sections.forEach((section) => {
      section.addEventListener("click", this.handelSwitch);
    });
  };
}

const catalogDesktop = new CatalogDesktop();

catalogDesktop.init();
