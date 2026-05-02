let currentSlideIndex = 0;

/**
 * Type: Helper (DOM)
 * Updates the carousel position based on the current index.
 */
function updateCarousel() {
  const carousel = document.querySelector(".hero-carousel");
  const slideWidth = carousel.children[0].offsetWidth;

  carousel.style.transform =
    `translateX(-${currentSlideIndex * slideWidth}px)`;
}

/**
 * Type: Controller (event handler)
 * Shows the next slide.
 */
function showNextSlide() {
  const slides = document.querySelectorAll(".hero-slide");

  currentSlideIndex += 1;

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }

  updateCarousel();
}

/**
 * Type: Controller (event handler)
 * Shows the previous slide.
 */
function showPrevSlide() {
  const slides = document.querySelectorAll(".hero-slide");

  currentSlideIndex -= 1;

  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  updateCarousel();
}

/**
 * Type: Controller (initialization/main)
 * Initializes the carousel and auto-slide behavior.
 */
function main() {
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  nextBtn.addEventListener("click", showNextSlide);
  prevBtn.addEventListener("click", showPrevSlide);

  // Auto slide every 10 seconds
  setInterval(showNextSlide, 10000);
}

main();