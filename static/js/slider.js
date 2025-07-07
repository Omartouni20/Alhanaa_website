document.addEventListener("DOMContentLoaded", function () {
  // نحضر العنصر الرئيسي للـ slider
  const slider = document.getElementById("slider");

  const scrollStep = 1;   // مقدار التمرير في كل فريم (كل مرة يتحرك 2 بكسل)
  const slideInterval =2; // الفاصل الزمني بين كل تمريرة (5 مللي ثانية → سريع وسلس)

  // نحول العناصر الداخلية لمصفوفة ونعمل لها نسخ مرتين عشان نخلق وهم الاستمرارية في التمرير
  const slides = Array.from(slider.children);
  for (let i = 0; i < 2; i++) {
    slides.forEach(slide => {
      const clone = slide.cloneNode(true); // ننسخ العنصر (true = ينسخ كل ما بداخله)
      slider.appendChild(clone); // نضيف النسخة في نهاية الـ slider
    });
  }

  // دالة تقوم بتحريك الـ slider تلقائيًا
  function autoScrollSlider() {
    slider.scrollLeft += scrollStep; // نمرر لليمين بعدد بكسلات ثابت

    // لو وصلنا لنهاية المحتوى تقريبًا، نرجعه لبداية النسخة الأصلية
    if (slider.scrollLeft >= slider.scrollWidth / 1.5) {
      slider.scrollLeft = 0;
    }
  }

  // نبدأ التمرير التلقائي باستخدام setInterval
  let interval = setInterval(autoScrollSlider, slideInterval);

  // دوال لإيقاف واستئناف التمرير التلقائي
  function pauseAutoScroll() {
    clearInterval(interval); // نوقف الـ interval
  }

  function resumeAutoScroll() {
    interval = setInterval(autoScrollSlider, slideInterval); // نرجعه من جديد
  }

  // --- تفاعل المستخدم يوقف التمرير مؤقتًا ---

  slider.addEventListener("mousedown", pauseAutoScroll);     // لما يضغط المستخدم بالماوس
  slider.addEventListener("touchstart", pauseAutoScroll);    // لما يلمس الشاشة على الموبايل
  slider.addEventListener("mouseup", resumeAutoScroll);      // لما يرفع إيده عن الماوس
  slider.addEventListener("touchend", resumeAutoScroll);     // لما يرفع إصبعه من الشاشة
  slider.addEventListener("mouseleave", resumeAutoScroll);   // لما يخرج الماوس من العنصر

  // --- تم إضافة دعم الوقوف عند الـ hover ---
  slider.addEventListener("mouseenter", pauseAutoScroll);    // يوقف التمرير لما الماوس يدخل على العنصر
  slider.addEventListener("mouseleave", resumeAutoScroll);   // يرجّع التمرير لما الماوس يخرج

  // --- دعم السحب بالماوس (dragging) ---
  let isDown = false;   // هل الماوس مضغوط؟
  let startX;           // موقع البداية لمحور X
  let scrollLeft;       // القيمة الحالية للتمرير وقت بداية السحب

  slider.addEventListener('mousedown', (e) => {
    isDown = true;                                     // بدأ السحب
    startX = e.pageX - slider.offsetLeft;              // نحسب مكان البداية
    scrollLeft = slider.scrollLeft;                    // نخزن التمرير الحالي
  });

  slider.addEventListener('mouseleave', () => isDown = false); // لو خرج الماوس نوقف السحب
  slider.addEventListener('mouseup', () => isDown = false);    // لو شال الماوس نوقف السحب

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;                               // لو مش ضغطين بالماوس → مفيش حاجة تحصل
    e.preventDefault();                                // نمنع السلوك الافتراضي (مثلاً تحديد النص)
    const x = e.pageX - slider.offsetLeft;             // نحسب الموقع الحالي للمؤشر
    const walk = (x - startX) * 1.5;                   // المسافة المقطوعة مضروبة في عامل سرعة
    slider.scrollLeft = scrollLeft - walk;             // نحرك المحتوى بالسحب
  });

  // --- دعم السحب باللمس (touch) ---
  slider.addEventListener('touchstart', (e) => {
    isDown = true;                                     // بدأ اللمس
    startX = e.touches[0].pageX;                       // نحسب البداية من أول لمسة
    scrollLeft = slider.scrollLeft;                    // نحفظ قيمة التمرير الحالية
  });

  slider.addEventListener('touchend', () => isDown = false); // نهاية السحب
  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;                               // لو مش لمس → مفيش حاجة تحصل
    const x = e.touches[0].pageX;                      // نحسب الموضع الحالي
    const walk = (x - startX) * 1.5;                   // المسافة المقطوعة
    slider.scrollLeft = scrollLeft - walk;             // نحرك التمرير حسب الحركة
  });
});
