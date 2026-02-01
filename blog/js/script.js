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
      }),
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

const swiper = new Swiper(".main-swiper", {
  // auto width for slide
  slidesPerView: "auto",
  slidesPerGroup: 3,
  // like gap
  spaceBetween: 10,
  // for swipe
  freeMode: true,
  // for scroll
  mousewheel: {
    invert: false,
  },
  setTranslate: 500,
  // navigation btns
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper2 = new Swiper(".swiper2", {
  // auto width for slide
  slidesPerView: "auto",
  slidesPerGroup: 3,
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

const swiperTags = new Swiper(".swiper-tags", {
  // auto width for slide
  slidesPerView: "auto",
  slidesPerGroup: 3,
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

// Catalog main
class Catalog {
  constructor() {
    // Elements
    this.btns = document.querySelectorAll(".js-catalog-category-switch-section-btn");
    this.sections = document.querySelectorAll(".js-catalog-category-switch-section-inner");
    this.moreMessage = document.querySelectorAll(
      ".js-catalog-category-switch-section-more-message",
    );
    this.subBtns = document.querySelectorAll(".js-catalog-category-switch-subsection-btn");
    this.subSection = document.querySelectorAll(".js-catalog-category-switch-subsection-inner");
    this.subMoreMessage = document.querySelectorAll(
      ".js-catalog-category-switch-subsection-more-message",
    );
    this.backBtn = document.querySelector(".js-catalog-category-switch-back");
    this.sidebar = document.querySelector(".catalog-sidebar");
    this.modalBody = document.querySelector(".js-catalog-category-switch-modal-body");

    // state variables
    this.ids = ["news", ""];
    this.level = 1;
    this.isMobile = false;

    // run script
    this.mobileControl();
    this.init();
  }

  // Hide single element
  hideElement = (element) => {
    element.classList.add("hidden");
  };

  // Hide elements
  hideElementsAll = (elements) => {
    elements.forEach((el) => {
      this.hideElement(el);
    });
  };

  // Show single element
  showElement = (element) => {
    element.classList.remove("hidden");
  };

  // Show elements
  showElementsAll = (elements) => {
    elements.forEach((el) => {
      this.showElement(el);
    });
  };

  // Show elements by ID
  showElementById = (elements, id) => {
    elements.forEach((el) => {
      if (el.dataset.id === id) {
        this.showElement(el);
      }
    });
  };

  // Click function
  onPick = (id) => {
    this.ids[this.level - 1] = id;
    this.isMobile && this.levelUp();

    this.controls();
  };

  // Event Listenet for clicks
  handlePick = (btns, selector, impassableLevel = null) => {
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target.tagName === "A" || e.target.closest("a")) {
          return;
        }
        if (this.level === impassableLevel) {
          return;
        }

        const id = e.target.closest(selector).dataset.id;
        this.onPick(id);
      });
    });
  };

  // Event Listener for back
  handleBack = () => {
    this.backBtn.addEventListener("click", () => {
      this.levelDown();
      this.ids[this.level - 1] = "";

      this.controls();
    });
  };

  // Add class active for pick btn
  addActiveClass = (btns, id) => {
    btns.forEach((btn) => {
      if (btn.dataset.id === id) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  };

  // Delete active class
  removeActiveClass = (btns) => {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  };

  // Check mobile with function
  mobileCheck = () => {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
      this.level = 1;
      this.ids = ["", ""];
      this.modalBody.dataset.level = this.level;
    }
    this.controls();
  };

  // Listener resize window and check mobile
  mobileControl = () => {
    this.mobileCheck();
    window.addEventListener("resize", this.mobileCheck);
  };

  // Main actions
  controls = () => {
    this.modalBody.dataset.level = this.level;
    this.levelControl();
  };

  // Actions by level
  levelControl = () => {
    switch (this.level) {
      case 1:
        // hide
        this.hideElementsAll(this.sections);
        this.hideElement(this.backBtn);

        // show
        this.showElement(this.sidebar);
        this.showElementsAll(this.btns);
        this.showElementById(this.sections, this.ids[0]);

        this.addActiveClass(this.btns, this.ids[0]);

        if (!this.isMobile) {
          // this.showElementsAll(this.sections);
          this.showElementsAll(this.subBtns);
          this.showElementsAll(this.subSection);
        }

        break;

      case 2:
        // hide
        this.hideElementsAll(this.subMoreMessage);
        this.hideElementsAll(this.btns);
        this.hideElementsAll(this.subSection);

        // show
        this.showElement(this.backBtn);
        this.showElement(this.sidebar);
        this.showElementById(this.btns, this.ids[0]);
        this.showElementById(this.sections, this.ids[0]);
        this.showElementsAll(this.subBtns);
        this.showElementsAll(this.moreMessage);

        this.addActiveClass(this.btns, this.ids[0]);
        this.removeActiveClass(this.subBtns);

        break;

      case 3:
        // hide
        this.hideElement(this.sidebar);
        this.hideElementsAll(this.moreMessage);
        this.hideElementsAll(this.btns);
        this.hideElementsAll(this.subBtns);

        // show
        this.showElementById(this.subMoreMessage, this.ids[1]);
        this.showElementById(this.subBtns, this.ids[1]);
        this.showElementById(this.subSection, this.ids[1]);
        this.showElementsAll(this.subMoreMessage);

        this.addActiveClass(this.subBtns, this.ids[1]);

        break;
    }
  };

  // Level up
  levelUp = () => {
    switch (this.level) {
      case 1:
        this.level = 2;
        break;
      case 2:
        this.level = 3;
        break;
    }
  };

  // Level down
  levelDown = () => {
    switch (this.level) {
      case 3:
        this.level = 2;
        break;
      case 2:
        this.level = 1;
        break;
    }
  };

  // Run class
  init = () => {
    this.controls();
    this.handlePick(this.btns, ".js-catalog-category-switch-section-btn", 2);
    this.handlePick(
      this.subBtns,
      ".js-catalog-category-switch-subsection-btn",
      this.isMobile ? 3 : 1,
    );
    this.handleBack();

    // default values
    this.ids = ["news", ""];
    this.onPick("news");

    if (this.isMobile) {
      this.level = 1;
      this.ids = [];
      this.levelControl();
    }
  };
}

const desktopCatalogEvents = new Catalog();

// progress bar click function
function onProgress(btn) {
  const persent = btn.dataset.persent;
  const progress = btn.querySelector(".progress");

  console.log("progress", persent);
  btn.classList.add("active");

  progress.style.paddingRight = `${persent}%`;
}

// active all progress fuction for form
function activeProgress() {
  const form = document.getElementById("progress_form");
  if (!form) return;
  const btns = form.querySelectorAll(".progress-bar");

  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      onProgress(btn);
      btns.forEach((btn) => onProgress(btn));
    });
  });
}

activeProgress();

function collapsesBlock(element) {
  const head = element.querySelector(".js-block-collapses-head");
  head.addEventListener("click", () => {
    element.classList.toggle("active");
  });
}

document.querySelectorAll(".js-block-collapses").forEach((block) => {
  collapsesBlock(block);
});

function toggleActiveClass(event, parentElement = ".btn") {
  const element = event.target.closest(parentElement);
  element.classList.toggle("active");
  visibleBadge(element);
}

function visibleBadge(parentElement) {
  const badge = parentElement.querySelector(".badge");

  if (parentElement.classList.contains("active")) {
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
}

function renderSharePopup({ top, left }) {
  const sharePopup = document.createElement("div");
  sharePopup.classList.add("blog", "popup_share");
  sharePopup.id = "share_popup";

  if (window.innerWidth < 991) {
    sharePopup.classList.add("popup_share_mobile");
  } else {
    sharePopup.classList.add("popup_share_desktop");
  }

  sharePopup.style.top = `${top + 60}px`;
  sharePopup.style.left = `${left}px`;

  const innerSharePopup = `
    <div class="popup_share__title">
      <h3>Поделитесь</h3>
      <button class="btn btn-default btn-close" onclick="removeSharePopup()">
        <svg class="icon-default">
          <use xlink:href="../../img/icons.svg#cross"></use>
        </svg>
      </button>
    </div>
    <div class="popup_share__btns">
      <a href="#" class="btn btn-default btn-vk">
        <svg class="icon-default">
          <use xlink:href="../../img/icons.svg#vk"></use>
        </svg>
      </a>
      <a href="#" class="btn btn-default btn-odnoklassniki">
        <svg class="icon-default">
          <use xlink:href="../../img/icons.svg#ok"></use>
        </svg>
      </a>
    </div>
  `;

  sharePopup.innerHTML = innerSharePopup;
  document.body.appendChild(sharePopup);
}

function removeSharePopup() {
  const sharePopup = document.getElementById("share_popup");
  if (sharePopup) {
    sharePopup.remove();
  }
}

function onShowSharePopup(event) {
  const button = event.target.closest(".btn");

  const { top, left } = getElementDocumentPosition(button);

  removeSharePopup();
  renderSharePopup({ top, left });
}

function getElementDocumentPosition(element) {
  const rect = element.getBoundingClientRect();
  const scrollX = window.scrollX || document.documentElement.scrollLeft;
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  return {
    top: rect.top + scrollY,
    left: rect.left + scrollX - element.offsetWidth,
  };
}

// for imitate lazy load for images
const srcs = [];
document.querySelectorAll(".article-preview__image img").forEach((img, index) => {
  srcs[index] = img.src;
  img.src = "img/loading.gif";
  setTimeout(() => {
    img.src = srcs[index];
    img.classList.add("loaded");
  }, 5000);
});
