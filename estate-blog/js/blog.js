document.addEventListener("DOMContentLoaded", function () {
  // for remove images if no thumbnail card
  const images = document.querySelectorAll(".ds-blog-list__card_thumd");
  images.forEach(function (img) {
    img.onerror = function () {
      if (window.matchMedia("(max-width: 768px)").matches) {
        img.style.display = "none";
      } else {
        img.src = "./img/no-image.svg";
      }
    };
  });

  // for show mobile slider
  const mobileSlider = document.querySelector(".ds-blog-article-slider-mobile");
  if (window.matchMedia("(max-width: 768px)").matches) {
    mobileSlider.classList.add("active");
    document
      .querySelector(".ds-blog-article-container")
      .classList.add("active");
  }
});
