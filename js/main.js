// ================================
// RouteWise - Main JavaScript
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();

    // FAQ Accordion
    initFAQ();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Intersection Observer for animations
    initScrollAnimations();
});

// ================================
// Mobile Menu
// ================================

function initMobileMenu() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        toggle.classList.toggle('active');

        // Toggle aria-expanded
        const isExpanded = mobileMenu.classList.contains('active');
        toggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !toggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
}

// ================================
// FAQ Accordion
// ================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ================================
// Smooth Scroll
// ================================

function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Scroll Animations
// ================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .faq-item');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
}

// ================================
// Contact Form Handling
// ================================

// Note: The contact form uses Formspree for email delivery
// No additional JavaScript needed - it works via standard form POST
// Success/error handling is done by Formspree's redirect

// If you want to add custom form validation:
function validateContactForm(form) {
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form-error').forEach(el => el.remove());

    // Validate name
    if (name && !name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
    }

    // Validate email
    if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (message && !message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const error = document.createElement('span');
    error.className = 'form-error';
    error.style.cssText = 'color: #dc2626; font-size: 0.875rem; margin-top: 4px;';
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.style.borderColor = '#dc2626';
}
