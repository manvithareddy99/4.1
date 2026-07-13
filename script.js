/* ==========================================================================
   Advanced Premium Portfolio Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Mobile Menu Toggles
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = navLinksContainer.classList.contains('active') 
                ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navLinksContainer.classList.contains('active') 
                ? '0' : '1';
            spans[2].style.transform = navLinksContainer.classList.contains('active') 
                ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
        });

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

    // ==========================================================================
    // 2. Custom Glowing Cursor Simulation
    // ==========================================================================
    const cursorGlow = document.getElementById('cursor-glow');
    const cursorDot = document.getElementById('cursor-dot');
    
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let dotX = 0;
    let dotY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Lerp animation loop for smooth trailing cursor
    function animateCursor() {
        // Smooth positioning (lerp)
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;

        if (cursorGlow) {
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
        }
        if (cursorDot) {
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        }

        requestAnimationFrame(animateCursor);
    }
    
    // Only activate cursor tracking on desktop screens
    if (window.innerWidth > 1024) {
        animateCursor();

        // Attach hover event scaling
        const hoverInteractives = document.querySelectorAll('.hover-interactive, a, button, input, textarea, .filter-btn');
        hoverInteractives.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (cursorDot) cursorDot.classList.add('cursor-active');
            });
            item.addEventListener('mouseleave', () => {
                if (cursorDot) cursorDot.classList.remove('cursor-active');
            });
        });
    }

    // ==========================================================================
    // 3. Interactive Particle Network Background Canvas
    // ==========================================================================
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let connectionDistance = 110;
        let mouseNode = { x: null, y: null, radius: 150 };

        // Set dimensions
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Mouse interaction (push away effect)
                if (mouseNode.x !== null) {
                    const dx = this.x - mouseNode.x;
                    const dy = this.y - mouseNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouseNode.radius) {
                        const force = (mouseNode.radius - distance) / mouseNode.radius;
                        this.x += (dx / distance) * force * 1.8;
                        this.y += (dy / distance) * force * 1.8;
                    }
                }
            }

            draw() {
                ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            // Particle density proportional to screen area
            const numParticles = Math.floor((canvas.width * canvas.height) / 9500);
            for (let i = 0; i < numParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const alpha = (1 - (distance / connectionDistance)) * 0.15;
                        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        window.addEventListener('mousemove', (e) => {
            mouseNode.x = e.clientX;
            mouseNode.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouseNode.x = null;
            mouseNode.y = null;
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }

    // ==========================================================================
    // 4. Advanced 3D Parallax Card Tilt Effect
    // ==========================================================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (window.innerWidth > 1024) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // mouse position relative to element bounds
                const y = e.clientY - rect.top;
                
                // Calculate percentage offsets
                const mousePercentX = (x / rect.width) * 100;
                const mousePercentY = (y / rect.height) * 100;
                
                // Set CSS variables for glare reflection tracking
                card.style.setProperty('--mouse-x', `${mousePercentX}%`);
                card.style.setProperty('--mouse-y', `${mousePercentY}%`);
                
                // Compute rotation limits (-8deg to +8deg)
                const rotateX = ((y / rect.height) - 0.5) * -12;
                const rotateY = ((x / rect.width) - 0.5) * 12;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // ==========================================================================
    // 5. Scroll Reveal Animations (Intersection Observer)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Section Navbar Highlighting
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
        threshold: 0.25,
        rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));

    // ==========================================================================
    // 6. Dynamic Typewriter Effect
    // ==========================================================================
    const typewriterText = document.getElementById('typewriter-text');
    const words = ["Data Science Systems.", "Predictive Models.", "Interactive Analytics.", "Statistical Pipelines."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 80;

    function type() {
        if (!typewriterText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 40;
        } else {
            typewriterText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeDelay = 2000; // Wait before starting delete
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 400; // Pause before typing next word
        }

        setTimeout(type, typeDelay);
    }
    
    if (typewriterText) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // 7. Projects Filters
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // 8. Contact Form Validator & Interactive Simulation
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            formFeedback.className = 'form-feedback';
            formFeedback.innerHTML = '';

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.classList.add('error');
                formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Complete all credentials first.';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.classList.add('error');
                formFeedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Provide a valid email pointer.';
                return;
            }

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                formFeedback.classList.add('success');
                formFeedback.innerHTML = `<i class="fas fa-check-circle"></i> Node connecting! Thanks ${name}. Transmission complete.`;
                contactForm.reset();
            }, 1800);
        });
    }
});
