// Fallback لـ متصفحات قديمة
window.requestAnimationFrame = window.requestAnimationFrame || function(cb) {
  return setTimeout(cb, 16);
};
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");

  // سرعة التمرير
  let scrollSpeed = 0.5;
  let autoScroll;

  // ========== تكرار العناصر مرتين إضافيتين ========== //
  const originalSlides = Array.from(slider.children);
  for (let i = 0; i < 2; i++) {
    originalSlides.forEach(slide => {
      const clone = slide.cloneNode(true);
      slider.appendChild(clone);
    });
  }

  // ========== التمرير التلقائي باستخدام requestAnimationFrame ========== //
  function autoScrollLoop() {
    slider.scrollLeft += scrollSpeed;

    const threshold = slider.scrollWidth / 3;
    if (slider.scrollLeft >= threshold * 2) {
      slider.scrollLeft = threshold;
    }

    autoScroll = requestAnimationFrame(autoScrollLoop);
  }

  function startAutoScroll() {
    autoScroll = requestAnimationFrame(autoScrollLoop);
  }

  function stopAutoScroll() {
    cancelAnimationFrame(autoScroll);
  }

  startAutoScroll();

  // ========== السحب بالماوس ========== //
  let isDragging = false;
  let startX, scrollStart;

  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollStart = slider.scrollLeft;
    stopAutoScroll();
    slider.classList.add("dragging");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.2;
    slider.scrollLeft = scrollStart - walk;
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("dragging");
    startAutoScroll();
  });

  slider.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      slider.classList.remove("dragging");
      startAutoScroll();
    }
  });

  // ========== السحب بالتاتش للموبايل ========== //
  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollStart = slider.scrollLeft;
    stopAutoScroll();
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.2;
    if (Math.abs(walk) > 10) e.preventDefault(); // يمنع التمرير الرأسي
    slider.scrollLeft = scrollStart - walk;
  }, { passive: false });

  slider.addEventListener("touchend", () => {
    isDragging = false;
    startAutoScroll();
  });

  // ========== إيقاف وتشغيل التمرير التلقائي عند الدخول والخروج بالماوس ========== //
  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", () => {
    if (!isDragging) startAutoScroll();
  });
});
