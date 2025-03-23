// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Animate hamburger to X
    const spans = menuToggle.getElementsByTagName("span");
    spans[0].classList.toggle("rotate-45");
    spans[1].classList.toggle("opacity-0");
    spans[2].classList.toggle("rotate-negative-45");
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });
}

// Close mobile menu when clicking outside

// Add fade-in animation for page elements
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".hero-content > *");
  elements.forEach((element, index) => {
    element.style.opacity = 0;
    setTimeout(() => {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const ticker = document.querySelector(".ticker-list");
  if (!ticker) return;

  // Clone the ticker items for seamless scrolling
  const tickerItems = ticker.innerHTML;
  ticker.innerHTML = tickerItems + tickerItems;

  // Calculate the total width of a single set of items
  const tickerWidth = ticker.scrollWidth / 2;

  // Create the animation
  function startAnimation() {
    ticker.style.animation = `ticker ${tickerWidth * 0.02}s linear infinite`;
  }

  // Reset animation when it completes
  ticker.addEventListener("animationend", () => {
    ticker.style.animation = "none";
    // Force reflow
    ticker.offsetHeight;
    startAnimation();
  });

  // Start the initial animation
  startAnimation();

  // Pause on hover
  ticker.parentElement.addEventListener("mouseenter", () => {
    ticker.style.animationPlayState = "paused";
  });

  ticker.parentElement.addEventListener("mouseleave", () => {
    ticker.style.animationPlayState = "running";
  });
});

// Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
  }

  // Auto advance slides
  setInterval(nextSlide, 5000);
});
