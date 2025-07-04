document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const scrollStep = window.innerWidth < 768 ? 200 : 250;
  const slideInterval = 2000;

  // === انسخ كل العناصر مرة تانية لعمل وهم التكرار ===
  const slides = Array.from(slider.children);
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });

  function autoScrollSlider() {
    slider.scrollBy({ left: scrollStep, behavior: "smooth" });

    // لما نوصل للآخر جداً، نرجّع position بدون ما المستخدم يحس
    if (slider.scrollLeft >= slider.scrollWidth / 2) {
      slider.scrollLeft = 0;
    }
  }

  let interval = setInterval(autoScrollSlider, slideInterval);

  function pauseAutoScroll() {
    clearInterval(interval);
  }

  function resumeAutoScroll() {
    interval = setInterval(autoScrollSlider, slideInterval);
  }

  slider.addEventListener("mousedown", pauseAutoScroll);
  slider.addEventListener("touchstart", pauseAutoScroll);
  slider.addEventListener("mouseup", resumeAutoScroll);
  slider.addEventListener("touchend", resumeAutoScroll);
  slider.addEventListener("mouseleave", resumeAutoScroll);

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => isDown = false);
  slider.addEventListener('mouseup', () => isDown = false);

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => isDown = false);

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
});
