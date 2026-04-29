/* ═══════════════════════════════════════════════
   ARDENT FORT LAW — Shared JavaScript
   Navigation, Theme Toggle, GSAP, WhatsApp,
   Forms, Scroll Effects
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Initialize Lucide Icons ──
    if (window.lucide) lucide.createIcons();

    // ── Navigation scroll effect ──
    const nav = document.querySelector('.nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 80);
        }, { passive: true });
    }

    // ── Hamburger & Mobile Menu ──
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');

        const closeMobileMenu = () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-hidden', !isActive);
            hamburger.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
            if (isActive) mobileLinks[0]?.focus();
        });

        mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
                hamburger.focus();
            }
        });
    }

    // ── Smooth Scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ── Theme Toggle ──
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('afl-theme') || 'dark';
        if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const newTheme = isLight ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme === 'light' ? 'light' : '');
            if (newTheme === 'dark') document.documentElement.removeAttribute('data-theme');
            else document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('afl-theme', newTheme);
            if (window.lucide) lucide.createIcons();
        });
    }

    // ── Active Nav Link ──
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                if (pageYOffset >= section.offsetTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        }, { passive: true });
    }

    // ── Practice Areas Accordion ──
    document.querySelectorAll('.practice-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.practice-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.practice-header')?.setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });

        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });

    // ── GSAP ScrollTrigger Animations ──
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero animation (home page only)
        const heroLogo = document.querySelector('.hero-logo');
        if (heroLogo) {
            const heroTl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
            heroTl
                .to('.hero-logo', { opacity: 1, scale: 1, duration: 1 }, 0.2)
                .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.5)
                .to('.hero h1', { opacity: 1, y: 0, duration: 1 }, 0.7)
                .to('.hero-description', { opacity: 1, y: 0, duration: 0.8 }, 1)
                .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8 }, 1.2)
                .to('.hero-scroll', { opacity: 1, duration: 0.6 }, 1.6);
        }

        // Page hero animation (inner pages)
        const pageHero = document.querySelector('.page-hero');
        if (pageHero) {
            gsap.fromTo('.page-hero .section-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
            gsap.fromTo('.page-hero h1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
            gsap.fromTo('.page-hero .page-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power3.out' });
            gsap.fromTo('.breadcrumb', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.3, ease: 'power3.out' });
        }

        // Scroll-triggered reveals
        gsap.utils.toArray('.reveal').forEach(el => {
            gsap.to(el, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        gsap.utils.toArray('.reveal-scale').forEach(el => {
            gsap.to(el, {
                opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        gsap.utils.toArray('.reveal-left').forEach(el => {
            gsap.to(el, {
                opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        gsap.utils.toArray('.reveal-right').forEach(el => {
            gsap.to(el, {
                opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        // Batch animations for cards
        const batchSelectors = ['.service-card', '.client-card', '.diff-card', '.testimonial-card'];
        batchSelectors.forEach(selector => {
            const els = document.querySelectorAll(selector);
            if (els.length) {
                ScrollTrigger.batch(selector, {
                    onEnter: (elements) => {
                        gsap.to(elements, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' });
                    },
                    start: 'top 85%',
                    once: true
                });
            }
        });
    }

    // ── Form Validation Enhancement ──
    document.querySelectorAll('.form-field input, .form-field textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = 'rgba(255, 68, 68, 0.5)';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '';
        });
    });

    // ── reCAPTCHA Form Submit ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm && window.grecaptcha) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Verifying...';
            btn.disabled = true;
            if (window.lucide) lucide.createIcons();

            grecaptcha.ready(function() {
                grecaptcha.execute('6Lf7w2IsAAAAAE72QJvqOtLVtEQojaWApmGZz9Lw', { action: 'submit' })
                    .then(token => {
                        const recaptchaInput = document.getElementById('recaptchaResponse');
                        if (recaptchaInput) recaptchaInput.value = token;
                        contactForm.submit();
                    })
                    .catch(() => {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                        if (window.lucide) lucide.createIcons();
                        alert('Security verification failed. Please try again.');
                    });
            });
        });
    }

    // ── Newsletter Form ──
    document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && input.value) {
                const btn = form.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Subscribed!';
                btn.style.background = '#25D366';
                input.value = '';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 3000);
            }
        });
    });

    // ── Spin animation ──
    const spinStyle = document.createElement('style');
    spinStyle.textContent = '.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(spinStyle);

    console.log('Ardent Fort Law — Premium Website loaded');
});
