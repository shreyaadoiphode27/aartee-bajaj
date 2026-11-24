
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// Close mobile menu after clicking a link
document.querySelectorAll(".navbar a").forEach(function(link) {

    link.addEventListener("click", function() {

        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});

/* =========================
   TESTIMONIAL CAROUSEL
========================= */

const testimonialTrack =
    document.getElementById("testimonialTrack");

const testimonialPrev =
    document.getElementById("testimonialPrev");

const testimonialNext =
    document.getElementById("testimonialNext");

const testimonialDots =
    document.querySelectorAll(".testimonial-dot");

if (testimonialTrack && testimonialPrev && testimonialNext) {

    const testimonialCards =
        testimonialTrack.querySelectorAll(".testimonial-card");

    let currentTestimonial = 0;
    let autoScroll;

    function getCardWidth() {

        const card = testimonialCards[0];

        const gap = parseFloat(
            getComputedStyle(testimonialTrack).gap
        ) || 0;

        return card.getBoundingClientRect().width + gap;

    }

    function showTestimonial(index) {

        currentTestimonial =
            (index + testimonialCards.length) %
            testimonialCards.length;

        testimonialTrack.scrollTo({
            left: currentTestimonial * getCardWidth(),
            behavior: "smooth"
        });

        testimonialDots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentTestimonial
            );

        });

    }

    testimonialNext.addEventListener("click", () => {
        showTestimonial(currentTestimonial + 1);
    });

    testimonialPrev.addEventListener("click", () => {
        showTestimonial(currentTestimonial - 1);
    });

    testimonialDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {
            showTestimonial(index);
        });

    });

    function startAutoScroll() {

        stopAutoScroll();

        autoScroll = setInterval(() => {

            showTestimonial(currentTestimonial + 1);

        }, 5000);

    }

    function stopAutoScroll() {

        clearInterval(autoScroll);

    }

    // Pause when the visitor interacts
    testimonialTrack.addEventListener(
        "mouseenter",
        stopAutoScroll
    );

    testimonialTrack.addEventListener(
        "mouseleave",
        startAutoScroll
    );

    testimonialTrack.addEventListener(
        "touchstart",
        stopAutoScroll,
        { passive: true }
    );

    testimonialTrack.addEventListener(
        "touchend",
        startAutoScroll,
        { passive: true }
    );

    testimonialTrack.addEventListener(
        "focusin",
        stopAutoScroll
    );

    testimonialTrack.addEventListener(
        "focusout",
        startAutoScroll
    );

    // Pause when browser tab is hidden
    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }

    });

    startAutoScroll();

}

/* =========================
   FAQ ACCORDION
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function(item) {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function() {

        const isOpen = item.classList.contains("active");

        // Close all other questions
        faqItems.forEach(function(otherItem) {

            otherItem.classList.remove("active");

            otherItem.querySelector(".faq-question")
                .setAttribute("aria-expanded", "false");

        });

        // Open selected question
        if (!isOpen) {

            item.classList.add("active");

            question.setAttribute("aria-expanded", "true");

        }

    });

});

// Initialise accessible accordion buttons
document.querySelectorAll(".faq-question").forEach(function(button) {
    button.setAttribute("aria-expanded", "false");
});
