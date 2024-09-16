if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; // מניעת גלילה אוטומטית בעת טעינת הדף מחדש
}

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section");

    // פונקציה לגלילה לראש הדף
    function scrollToTop() {
        console.log("Scrolling to top");
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // גלילה חלקה לראש הדף
        });
    }

    // טיפול בגלילה והסתרת הכותרת בעת גלילה מטה
    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && !header.classList.contains("scroll-down")) {
            header.classList.add("scroll-down");
        } else if (scrollTop < lastScrollTop && header.classList.contains("scroll-down")) {
            header.classList.remove("scroll-down");
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer לאנימציות הופעה
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // ביטול מעקב אחרי הופעה
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // ניווט חלק בין המקטעים
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // טיפול בקישור WhatsApp
    const whatsappLink = document.querySelector("a[href*='whatsapp.com']");
    if (whatsappLink) {
        whatsappLink.addEventListener('click', function(event) {
            event.stopPropagation();
            const whatsappURL = this.href;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.location.href = whatsappURL;
            } else {
                window.open(whatsappURL, '_blank');
            }
        });
    }

   // טיפול בקישור הטלפון
    const phoneLink = document.querySelector('.phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(event) {
            if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                event.preventDefault();
                alert('מספר הטלפון: ' + this.textContent);
            }
        });
    }
    // טיפול בטופס יצירת קשר
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        emailjs.init("elldmedia@gmail.com", "53CWe-x4BA5laXgrl"); // החלף ב-User ID האמיתי שלך מ-EmailJS
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            emailjs.sendForm("service_g3mahfa", "template_g4jlx2a", this)
                .then(function() {
                    alert('ההודעה נשלחה בהצלחה!');
                    contactForm.reset();
                }, function(error) {
                    alert('נכשל בשליחת ההודעה...', error);
                });
        });
    }

    // גלילה לראש הדף בעת טעינה מחדש
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        console.log("Page reloaded");
        scrollToTop();
    }
});

// גלילה לראש הדף אחרי שכל המשאבים נטענו
window.addEventListener('load', function() {
    console.log("Window fully loaded");
    setTimeout(scrollToTop, 100); // תזמון הגלילה כדי לוודא שהכל נטען
});

console.log("Script loaded");
