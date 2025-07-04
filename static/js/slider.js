document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("slider");

  const scrollStep = 270;
  const slideInterval = 2000; // أسرع من 3000

  function autoScrollSlider() {
    // لو وصل للآخر، يرجع للبداية بسلاسة
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
      slider.scrollTo({ left: 0, behavior: "auto" });
    } else {
      slider.scrollBy({ left: scrollStep, behavior: "smooth" });
    }
  }

  let interval = setInterval(autoScrollSlider, slideInterval);

  // لما المستخدم يتفاعل (يسحب)، نوقف التمرير التلقائي مؤقتًا
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

  // دعم السحب بالماوس والموبايل
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
