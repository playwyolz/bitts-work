
/* =====================================
   PROJECT CAROUSEL
===================================== */

let currentSlide = 0;

const slides = document.querySelectorAll(".project-slide");
const slideCounter = document.getElementById("slide-counter");

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("hidden", index !== currentSlide);
  });

  if (slideCounter) {
    const current = String(currentSlide + 1).padStart(2, "0");
    const total = String(slides.length).padStart(2, "0");

    slideCounter.textContent = `${current} / ${total}`;
  }
}

function nextSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  currentSlide = index;
  updateCarousel();
}

async function copyEmail(email) {
  try {
    await navigator.clipboard.writeText(email);
  } catch (error) {
    // Fallback for localhost or browsers without clipboard access
    const input = document.createElement("textarea");
    input.value = email;
    input.style.position = "fixed";
    input.style.opacity = "0";

    document.body.appendChild(input);
    input.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(input);

    if (!copied) {
      alert("Could not copy the email. Please copy it manually.");
      return;
    }
  }

  const toast = document.getElementById("copy-toast");

  if (toast) {
    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 2500);
  }
}

updateCarousel();
