/* ==========================================================================
   Portfolio Script Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            // Toggle hamburger icon animation (if desired)
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = navLinksContainer.classList.contains('active') 
                ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navLinksContainer.classList.contains('active') 
                ? '0' : '1';
            spans[2].style.transform = navLinksContainer.classList.contains('active') 
                ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 2. Header Style change on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, we can unobserve if we only want animate-once effect
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // triggers slightly before entry enters view
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Navigation Link Highlighting on Scroll (Intersection Observer)
    const sections = document.querySelectorAll('section');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px' // adjust calculations for fixed header height
    });

    sections.forEach(sec => navObserver.observe(sec));

    // 5. Projects Filter Engine
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    // Delay adding opacity to allow grid reflow
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    // Delay hiding card
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Interactive Contact Form Submission Validation & Feedback Simulation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Reset classes
            formFeedback.className = 'form-feedback';
            formFeedback.innerHTML = '';

            // Input fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.classList.add('error');
                formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all fields before sending.';
                return;
            }

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.classList.add('error');
                formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.';
                return;
            }

            // Simulate sending message API delay
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Success response mockup
                formFeedback.classList.add('success');
                formFeedback.innerHTML = `<i class="fas fa-check-circle"></i> Thank you, ${name}! Your message has been sent successfully. I will get back to you shortly.`;
                
                // Reset form fields
                contactForm.reset();
            }, 1800);
        });
    }
});
