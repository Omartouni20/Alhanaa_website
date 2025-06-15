// تعيين المتغيرات
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const btnTop = document.getElementById("btn-top");
const sections = document.querySelectorAll("section[id]");
// ^========= Helper functions to toggle class =========
function toggleClass(element, className, condition) {
if (condition) {
element.classList.add(className);
} else {
element.classList.remove(className);
}
}
function arrayRemoveclass(arr, className) {
arr.forEach((ele) => {
toggleClass(ele, className, false);
});
}
// ?========= Change Background ============
// تغيير خلفية النافبار
function scrollHeader() {
if (navbar) {
toggleClass(navbar, "nav-scrolled", this.scrollY >= 50);
}
}
window.addEventListener("scroll", scrollHeader);
// ?========= Add Active class to Navbar Links ============
// إضافة الكلاس النشط للروابط في النافبار
navLinks.forEach((link) => {
link.addEventListener("click", () => {
arrayRemoveclass(navLinks, "active");
toggleClass(link, "active", true);
toggleClass(document.querySelector(".navbar-collapse"), "show", false);
document.querySelector(".navbar-toggler").setAttribute("aria-expanded", "false");
});
});
// ?========= Show "Back to Top" button ============
// إظهار زر العودة للأعلى
function showBtnTop() {
if (btnTop) {
toggleClass(btnTop, "show", this.scrollY >= 100);
}
}
window.addEventListener("scroll", showBtnTop);
// ?========= Form Validation ============
// التحقق من صحة النموذج
(() => {
"use strict";
const forms = document.querySelectorAll(".needs-validation");
Array.from(forms).forEach((form) => {
form.addEventListener(
"submit",
(event) => {
if (!form.checkValidity()) {
event.preventDefault();
event.stopPropagation();
}
form.classList.add("was-validated");
},
false
);
});
})();
// ?========= Start Counting Numbers ============
document.addEventListener("DOMContentLoaded", startCounting);
function startCounting() {
const counters = document.querySelectorAll(".counter-num p[data-target]");
counters.forEach((counter) => {
const target = parseInt(counter.getAttribute("data-target"), 10);
let count = 0;
const increment = target / 50; // تقليل عدد الزيادات للحصول على تحديثات أسرع
const duration = 1000; // مدة التعداد
const startTime = performance.now(); // الحصول على الوقت الحالي لتحديد مدة التحديث
// تحديث العداد باستخدام requestAnimationFrame
function updateCount(timestamp) {
const elapsed = timestamp - startTime;
const progress = Math.min(elapsed / duration, 1); // تقدير التقدم
// زيادة العد حسب التقدم
count = progress * target;
counter.innerText = Math.ceil(count) + "+";
if (progress < 1) {
requestAnimationFrame(updateCount); // التكرار حتى الوصول إلى الهدف
} else {
counter.innerText = target + "+"; // الوصول إلى العدد النهائي
}
}
requestAnimationFrame(updateCount); // بدء التعداد
});
}
// مراقبة العنصر عند التمرير
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
startCounting();
observer.disconnect(); // توقف المراقبة بعد بدء العد
}
});
},
{ threshold: 0.5 }
);
const countersElement = document.querySelector(".counters");
if (countersElement) {
observer.observe(countersElement);
}
// مراقبة العناصر عند التمرير
document.addEventListener("DOMContentLoaded", function () {
const aboutSectionObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
observer.unobserve(entry.target); // التوقف عن مراقبة العنصر بعد أن يظهر
}
});
},
{ threshold: 0.5 }
);
// مراقبة الصورة والنصوص
const image = document.querySelector(".image-fade-in");
const texts = document.querySelectorAll(".text-fade-in");
if (image) aboutSectionObserver.observe(image);
texts.forEach((text) => {
if (text) aboutSectionObserver.observe(text);
});
});
// ?========= Highlight Item when Link is Clicked ============
// استماع لحدث التمرير
window.addEventListener("scroll", function () {
// جلب جميع الأقسام
const sections = document.querySelectorAll("section");
// مر على كل قسم وشوف اذا كان موجود في نطاق العرض
sections.forEach(function (section) {
const rect = section.getBoundingClientRect();
if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
section.classList.add("highlight"); // إضافة الكلاس عندما يظهر في الشاشة
} else {
section.classList.remove("highlight"); // إزالة الكلاس إذا كان خارج الشاشة
}
});
});
// Enhanced animation observer for all fade-in elements
document.addEventListener("DOMContentLoaded", function() {
// Add animation classes to elements
const addAnimationClasses = () => {
// Add to section titles
document.querySelectorAll('.section__title h3').forEach(el => {
el.classList.add('fade-in');
});
// Add to about section elements
document.querySelectorAll('#About .my-logo').forEach(el => {
el.classList.add('fade-in-scale');
});
document.querySelectorAll('#About h3').forEach(el => {
el.classList.add('fade-in');
});
document.querySelectorAll('#About p').forEach((el, index) => {
el.classList.add('fade-in');
el.classList.add(`delay-${(index + 1) * 100}`);
});
// Add to counter cards
document.querySelectorAll('.counters__card').forEach((el, index) => {
el.classList.add('fade-in');
el.classList.add(`delay-${(index + 1) * 100}`);
});
// Add to collection items
document.querySelectorAll('.works__box').forEach((el, index) => {
el.classList.add('fade-in');
el.classList.add(`delay-${(index % 3 + 1) * 100}`);
});
// Add to certificates
document.querySelectorAll('#About .col-lg-4').forEach((el, index) => {
el.classList.add('fade-in-scale');
el.classList.add(`delay-${(index + 1) * 100}`);
});
// Add to contact section
document.querySelectorAll('.sub-about').forEach(el => {
el.classList.add('fade-in-left');
});
};
// Call function to add classes
addAnimationClasses();
// Create intersection observer
const animationObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
// Unobserve after animation is triggered
observer.unobserve(entry.target);
}
});
},
{ threshold: 0.2 } // Trigger when 20% of the element is visible
);
// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale').forEach(el => {
animationObserver.observe(el);
});
});