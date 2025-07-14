document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");

  let scrollSpeed = 2;
  let intervalTime = 3;
  let autoScroll;

  // ✅ تكرار محتوى السلايدر 3 مرات لتحقيق وهم "التمرير اللانهائي"
  const originalSlides = Array.from(slider.children);
  for (let i = 0; i < 100; i++) { // تكرار مرتين إضافيتين
    originalSlides.forEach(slide => {
      const clone = slide.cloneNode(true);
      slider.appendChild(clone);
    });
  }

  function startAutoScroll() {
    autoScroll = setInterval(() => {
      slider.scrollLeft += scrollSpeed;

      // ✅ لو اقترب من نهاية العناصر المكررة، نرجع للخلف بصمت
      const threshold = slider.scrollWidth / 3; // بعد الثلث التالت نرجع
      if (slider.scrollLeft >= threshold * 2) {
        slider.scrollLeft = threshold; // نرجع لبداية الثلث التاني (منتصف العناصر)
      }

    }, intervalTime);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  startAutoScroll();

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
    if (Math.abs(walk) > 10) e.preventDefault();
    slider.scrollLeft = scrollStart - walk;
  }, { passive: false });

  slider.addEventListener("touchend", () => {
    isDragging = false;
    startAutoScroll();
  });

  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", () => {
    if (!isDragging) startAutoScroll();
  });
});
