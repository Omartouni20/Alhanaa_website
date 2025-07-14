   const slider = document.getElementById("slider");
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // fallback للمتصفحات القديمة
    window.requestAnimationFrame = window.requestAnimationFrame || function(cb) {
      return setTimeout(cb, 16);
    };
    window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

    // === التمرير التلقائي ===
    let autoScroll;
    function autoScrollLoop() {
      slider.scrollLeft += 1;
      if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        slider.scrollLeft = 0;
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

    // === السحب بالماوس ===
    slider.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      stopAutoScroll();
      slider.classList.add("dragging");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
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

    // === السحب بالتاتش ===
    slider.addEventListener("touchstart", (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      scrollLeft = slider.scrollLeft;
      stopAutoScroll();
    });

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.5;
  if (Math.abs(walk) > 5) e.preventDefault(); // تمنع السحب العمودي
  slider.scrollLeft = scrollLeft - walk;
}, { passive: false }); // ✅ ضروري لمتصفحات سامسونج


    slider.addEventListener("touchend", () => {
      isDragging = false;
      startAutoScroll();
    });

    slider.addEventListener("mouseenter", stopAutoScroll);
    slider.addEventListener("mouseleave", () => {
      if (!isDragging) startAutoScroll();
    });
