document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");
  const scrollStep = 2; // حركة بسيطة جدًا كل فريم
  const slideInterval = 5; // كل 15 مللي ثانية ← بطيئة وسلسة

  // انسخ المحتوى مرتين لخلق وهم الاستمرارية
  const slides = Array.from(slider.children);
  for (let i = 0; i < 2; i++) {
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      slider.appendChild(clone);
    });
  }

  function autoScrollSlider() {
    slider.scrollLeft += scrollStep;

    // لو وصل لنهاية النسخ الأولى، نرجعه لنقطة البداية المكافئة
    if (slider.scrollLeft >= slider.scrollWidth / 1.5) {
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

  // إيقاف الحركة لما المستخدم يتفاعل
  slider.addEventListener("mousedown", pauseAutoScroll);
  slider.addEventListener("touchstart", pauseAutoScroll);
  slider.addEventListener("mouseup", resumeAutoScroll);
  slider.addEventListener("touchend", resumeAutoScroll);
  slider.addEventListener("mouseleave", resumeAutoScroll);

  // سحب بالماوس
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

  // سحب باللمس
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
