document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");

  const scrollStep = 1;
  const slideInterval = 15;

  // تكرار السلايدات مرة واحدة فقط
  const slides = Array.from(slider.children);
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });

  // تشغيل التمرير التلقائي
  let autoScroll;
  function startAutoScroll() {
    autoScroll = setInterval(() => {
      slider.scrollLeft += scrollStep;
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
      }
    }, slideInterval);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  startAutoScroll();

  // التحكم بالسحب
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
    const walk = (x - startX) * 1.5;
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

  // لمس الموبايل
  slider.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollStart = slider.scrollLeft;
    stopAutoScroll();
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 10) e.preventDefault();
    slider.scrollLeft = scrollStart - walk;
  }, { passive: false });

  slider.addEventListener("touchend", () => {
    isDragging = false;
    startAutoScroll();
  });

  // hover يعمل pause للتلقائي
  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", () => {
    if (!isDragging) startAutoScroll();
  });
});
