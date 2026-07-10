/* =====================================================
                ADSPHERE AGENCY
                script.js
                Phase 4.1B.1
===================================================== */
"use strict";
if("scrollRestoration" in history){
    history.scrollRestoration = "manual";
}
/* =====================================================
                DOM ELEMENTS
===================================================== */
const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const themeBtn = document.querySelector(".theme-btn");
const themeIcon = themeBtn ?
themeBtn.querySelector("i") : null;
const heroStats = document.querySelector(".hero-stats");
let viewportHeight =
window.innerHeight;
window.addEventListener(
"resize",
()=>{
viewportHeight=
window.innerHeight;
},
{ passive:true }
);
/* =====================================================
                STICKY HEADER
===================================================== */
function handleHeader(){
if(!header) return;
header.classList.toggle(
    "scrolled",
    window.scrollY > 40
);
}
window.addEventListener(
    "scroll",
    handleHeader,
    { passive:true }
);
handleHeader();
/* =====================================================
                MOBILE MENU
===================================================== */
function toggleMenu(){
    if(!menuToggle || !nav) return;
    nav.classList.toggle("active");
    const isOpen =
    nav.classList.contains("active");
    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );
    const icon =
    menuToggle.querySelector("i");
    if(icon){
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    }
}
if(menuToggle){
    menuToggle.addEventListener(
        "click",
        toggleMenu
    );
    menuToggle.addEventListener(
        "keydown",
        (e)=>{
            if(
                e.key==="Enter" ||
                e.key===" "
            ){
                e.preventDefault();
                toggleMenu();
            }
        }
    );
}
/* =====================================================
            CLOSE MENU AFTER CLICK
===================================================== */
navLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        if(window.innerWidth <= 992){
            nav?.classList.remove("active");
            menuToggle?.setAttribute(
            "aria-expanded",
            "false"
            );
            menuToggle?.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            if(icon){
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });
});
/* =====================================================
                ESC KEY SUPPORT
===================================================== */
document.addEventListener("keydown",(e)=>{
    if(e.key !== "Escape") return;
    nav?.classList.remove("active");
    menuToggle?.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    if(icon){
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});
/* =====================================================
            ACTIVE NAVIGATION LINK
===================================================== */
const currentPage = window.location.pathname
.split("/")
.pop() || "index.html";
navLinks.forEach(link=>{
    const href = link.getAttribute("href");
    nav?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded","false");
    if(href === currentPage){
        link.classList.add("active");
    }
});
/* =====================================================
                THEME TOGGLE
===================================================== */
let savedTheme="light";
try{
savedTheme=
localStorage.getItem("theme") || "light";
}
catch(e){}
if(savedTheme === "dark"){
    document.body.classList.add("dark-theme");
    if(themeIcon){
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
}
if(themeBtn){
    themeBtn.addEventListener("click",()=>{
        document.body.classList.toggle("dark-theme");
        const darkMode =
        document.body.classList.contains("dark-theme");
        if(themeIcon){
            themeIcon.classList.toggle("fa-moon");
            themeIcon.classList.toggle("fa-sun");
        }
        try{localStorage.setItem("theme",darkMode ? "dark":"light");
}
catch(e){};
    });
}
/* =====================================================
                SCROLL PROGRESS BAR
===================================================== */
const progressBar = document.querySelector(".scroll-progress span");
function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
    const progress =
        (scrollTop / documentHeight) * 100;
    progressBar.style.width = `${progress}%`;
}
/* =====================================================
                BACK TO TOP BUTTON
===================================================== */
const backToTop =
document.querySelector(".back-to-top");
function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    }
    else {
        backToTop.classList.remove("show");
    }
}
if (backToTop) {
    backToTop.addEventListener(
"click",
()=>{
requestAnimationFrame(()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
});
}
);
}
/* =====================================================
                HERO COUNTER
===================================================== */
const counters =
document.querySelectorAll(".hero-stats h2");
let counterPlayed = false;
function animateCounter() {
    if (counterPlayed) return;
    const heroStats =
    document.querySelector(".hero-stats");
    if (!heroStats) return;
    const trigger =
    heroStats.getBoundingClientRect().top;
    if (trigger > viewportHeight - 120) return;
    counterPlayed = true;
    counters.forEach(counter => {
        const original =
        counter.textContent.trim();
        let target = 0;
        let prefix = "";
        let suffix = "";
        if (original.includes("₹")) {
            prefix = "₹";
            suffix = "Cr+";
            target = 15;
        }
        else if (original.includes("%")) {
            suffix = "%";
            target = parseInt(original);
        }
        else {
            suffix = "+";
            target = parseInt(original);
        }
        let current = 0;
        const step =
        Math.max(1, Math.ceil(target / 80));
        const timer =
        setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent =
                prefix + current + suffix;
        }, 20);
    });
}
/* =====================================================
                SCROLL REVEAL
===================================================== */
const revealElements = document.querySelectorAll(
    ".service-card, \
     .process-card, \
     .case-card, \
     .testimonial-card, \
     .feature-box, \
     .contact-card"
);
let revealedCount = 0;
revealElements.forEach(el=>{
    el.style.opacity="0";
    el.style.transform="translateY(40px)";
    el.style.transition=
    "opacity .7s ease, transform .7s ease";
});
function revealOnScroll(){
    if(revealedCount===revealElements.length){
        return;
    }
    revealElements.forEach(el=>{
        if(el.dataset.revealed) return;
        const top=
        el.getBoundingClientRect().top;
        if(top<viewportHeight-80){
            el.dataset.revealed="true";
            revealedCount++;
            el.style.opacity="1";
            el.style.transform="translateY(0)";
        }
    });
}
/* =====================================================
                FAQ ACCORDION
===================================================== */
const faqItems =
document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
        if (!item.open) return;
        faqItems.forEach(other => {
            if (other !== item) {
                other.removeAttribute("open");
            }
        });
    });
});
/* =====================================================
            OPTIMIZED SCROLL LOOP
===================================================== */
let ticking = false;
function handleScroll(){
    handleHeader();
    updateScrollProgress();
    handleBackToTop();
    if(!counterPlayed){  
    animateCounter();
    }
    revealOnScroll();
    ticking = false;
}
window.addEventListener(
    "scroll",
    ()=>{
        if(!ticking){
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    },
    { passive:true }
);
/* =====================================================
                INITIAL LOAD
===================================================== */
window.addEventListener(
"DOMContentLoaded",
() => {
updateScrollProgress();
handleHeader();
handleBackToTop();
animateCounter();
revealOnScroll();
}
);
const isLocalhost =
location.hostname==="localhost" ||
location.hostname==="127.0.0.1";
if(isLocalhost){
    console.log(
        "AdSphere Loaded Successfully"
    );
}
