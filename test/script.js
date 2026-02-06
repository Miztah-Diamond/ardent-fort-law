// ===== ARDENT FORT LAW - GOTHIC LUXURY JAVASCRIPT =====

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            if (hamburger) hamburger.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Practice Areas Accordion
const practiceItems = document.querySelectorAll('.practice-item');

practiceItems.forEach(item => {
    const header = item.querySelector('.practice-header');
    
    header.addEventListener('click', () => {
        // Close all other items
        practiceItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Scroll animations - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe differentiators
document.querySelectorAll('.diff-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Form validation enhancement
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--gold)';
    });
});

// Email validation
const emailInput = document.querySelector('input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        }
    });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'var(--white)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--gold)';
        }
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Gold glow effect on hover for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.3)';
    });
});

// Add gold glow to buttons on hover
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

console.log('Ardent Fort Law - Gothic Luxury website loaded successfully');

// ===== GOOGLE reCAPTCHA v3 FORM PROTECTION =====

// Form submission with reCAPTCHA v3
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Verifying...';
        submitBtn.disabled = true;
        
        // Execute reCAPTCHA
        grecaptcha.ready(function() {
            grecaptcha.execute('6Lf7w2IsAAAAAE72QJvqOtLVtEQojaWApmGZz9Lw', {action: 'submit'}).then(function(token) {
                // Add token to form
                document.getElementById('recaptchaResponse').value = token;
                
                // Submit form
                contactForm.submit();
            }).catch(function(error) {
                console.error('reCAPTCHA error:', error);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Security verification failed. Please try again.');
            });
        });
    });
}

// Additional bot protection - time-based submission check
let formLoadTime = Date.now();

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submissionTime = Date.now();
        const timeDiff = (submissionTime - formLoadTime) / 1000; // seconds
        
        // If submitted in less than 3 seconds, likely a bot
        if (timeDiff < 3) {
            e.preventDefault();
            console.warn('Form submitted too quickly - possible bot');
            return false;
        }
    });
}

// Prevent multiple rapid submissions
let isSubmitting = false;

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
        isSubmitting = true;
        
        // Reset after 5 seconds
        setTimeout(function() {
            isSubmitting = false;
        }, 5000);
    });
}

console.log('reCAPTCHA v3 protection enabled');
