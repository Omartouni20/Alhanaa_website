// =================== Navbar Scroll & Active Link ===================
const navbar = document.getElementById("navbar"); // يمسك عنصر النافبار
const navLinks = document.querySelectorAll(".nav-link"); // يمسك كل روابط النافبار
const btnTop = document.getElementById("btn-top"); // زر الرجوع للأعلى
const sections = document.querySelectorAll("section[id]"); // جميع الأقسام التي لها ID

// دالة لتبديل كلاس حسب شرط معين
function toggleClass(element, className, condition) {
  if (condition) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

// دالة لإزالة كلاس من كل العناصر في مصفوفة
function arrayRemoveclass(arr, className) {
  arr.forEach((ele) => {
    toggleClass(ele, className, false);
  });
}

// تغيير خلفية النافبار عند التمرير
function scrollHeader() {
  if (navbar) {
    toggleClass(navbar, "nav-scrolled", this.scrollY >= 50);
  }
}
window.addEventListener("scroll", scrollHeader); // حدث التمرير

// تفعيل رابط النافبار عند الضغط عليه وإغلاق القائمة المنسدلة
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    arrayRemoveclass(navLinks, "active");
    toggleClass(link, "active", true);
    toggleClass(document.querySelector(".navbar-collapse"), "show", false); // إغلاق القائمة
    document.querySelector(".navbar-toggler").setAttribute("aria-expanded", "false");
  });
});

// إظهار زر العودة للأعلى عند التمرير
function showBtnTop() {
  if (btnTop) {
    toggleClass(btnTop, "show", this.scrollY >= 100);
  }
}
window.addEventListener("scroll", showBtnTop);

// =================== Form Validation ===================
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation"); // كل الفورمات المطلوب التحقق منها
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault(); // يمنع الإرسال
        event.stopPropagation(); // يمنع الحدث من الانتشار
      }
      form.classList.add("was-validated"); // يضيف كلاس Bootstrap
    }, false);
  });
})();

// =================== Start Counting Numbers ===================
document.addEventListener("DOMContentLoaded", startCounting);
function startCounting() {
  const counters = document.querySelectorAll(".counter-num p[data-target]");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10); // الهدف النهائي للعداد
    let count = 0;
    const increment = target / 50; // معدل الزيادة
    const duration = 3000; // مدة التعداد بالملي ثانية
    const startTime = performance.now();

    function updateCount(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      count = progress * target;
      counter.innerText = Math.ceil(count) + "+";
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + "+";
      }
    }
    requestAnimationFrame(updateCount);
  });
}

// مراقبة عنصر العداد وتفعيل التعداد عند ظهوره
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounting();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const countersElement = document.querySelector(".counters");
if (countersElement) {
  observer.observe(countersElement);
}

// =================== Fade In When Scrolling ===================
document.addEventListener("DOMContentLoaded", function () {
  const aboutSectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const image = document.querySelector(".image-fade-in");
  const texts = document.querySelectorAll(".text-fade-in");
  if (image) aboutSectionObserver.observe(image);
  texts.forEach((text) => {
    if (text) aboutSectionObserver.observe(text);
  });
});

// =================== Highlight Visible Section ===================
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  sections.forEach(function (section) {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      section.classList.add("highlight");
    } else {
      section.classList.remove("highlight");
    }
  });
});

// =================== Fade In Animations for Elements ===================
document.addEventListener("DOMContentLoaded", function() {
  const addAnimationClasses = () => {
    document.querySelectorAll('.section__title h3').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('#About .my-logo').forEach(el => el.classList.add('fade-in-scale'));
    document.querySelectorAll('#About h3').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('#About p').forEach((el, i) => {
      el.classList.add('fade-in', `delay-${(i + 1) * 100}`);
    });
    document.querySelectorAll('.counters__card').forEach((el, i) => {
      el.classList.add('fade-in', `delay-${(i + 1) * 100}`);
    });
    document.querySelectorAll('.works__box').forEach((el, i) => {
      el.classList.add('fade-in', `delay-${(i % 3 + 1) * 100}`);
    });
    document.querySelectorAll('#About .col-lg-4').forEach((el, i) => {
      el.classList.add('fade-in-scale', `delay-${(i + 1) * 100}`);
    });
    document.querySelectorAll('.sub-about').forEach(el => el.classList.add('fade-in-left'));
  };
  addAnimationClasses();

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale').forEach(el => {
    animationObserver.observe(el);
  });
});

// =================== تغيير لوجو الموقع عند التمرير ===================
const logo = document.getElementById("main-logo");
const originalLogo = "/static/images/ALHANAA_Logo_Clean.webp";
const whiteLogo = "/static/images/ALHANAA_Logo_White.webp";

window.addEventListener("scroll", function () {
  logo.src = window.scrollY > 50 ? whiteLogo : originalLogo;
});

// =================== سلايدر أفقي تلقائي ===================
//const slider = document.getElementById('slider');
//const track = document.getElementById('track');
//let scrollSpeed = 0.5;
//let isPaused = false;
//track.innerHTML += track.innerHTML;
//function autoScroll() {
//  if (!isPaused) {
//    slider.scrollLeft += scrollSpeed;
//    if (slider.scrollLeft >= track.scrollWidth / 2) {
//      slider.scrollLeft = 0;
//    }
//  }
//  requestAnimationFrame(autoScroll);
//}
//requestAnimationFrame(autoScroll);
//slider.addEventListener('mouseenter', () => isPaused = true);
//slider.addEventListener('mouseleave', () => isPaused = false);

// =================== بريلودر ===================
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => preloader.style.display = "none", 1000);
});

// =================== AOS Animation Init ===================
AOS.init({ duration: 1000, once: true });

// =================== تفعيل عناصر Timeline ===================
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.timeline-item:not(.show-now)').forEach(item => {
    observer.observe(item);
  });
});

// =================== تغيير شفافيه النافبار ===================
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.remove("transparent-navbar");
  } else {
    navbar.classList.add("transparent-navbar");
  }
});

// =================== فلترة المنتجات ===================
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('#productFilter button');
  const items = document.querySelectorAll('.product-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
      });
    });
  });
});

// =================== بارالاكس و Hover ===================
document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const circle1 = document.querySelector('.circle-1');
    const circle2 = document.querySelector('.circle-2');
    if (circle1 && circle2) {
      circle1.style.transform = `translateY(${scrollY * 0.1}px)`;
      circle2.style.transform = `translateY(${-scrollY * 0.05}px)`;
    }
  });
  document.querySelectorAll('.about-content').forEach(block => {
    block.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    });
    block.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
    });
  });
});
