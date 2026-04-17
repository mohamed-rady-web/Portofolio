document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 800);
    }, 1200);

    // 2. Mouse Spotlight (Desktop)
    const spotlight = document.querySelector('.mouse-spotlight');
    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            spotlight.style.left = e.clientX + 'px';
            spotlight.style.top = e.clientY + 'px';
        });
    }

    // 3. Navbar Sticky Effect
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 5%';
            nav.style.background = 'rgba(7, 17, 31, 0.9)';
        } else {
            nav.style.padding = '1.5rem 5%';
            nav.style.background = 'rgba(7, 17, 31, 0.7)';
        }
    });

    // 4. Hero Particles Canvas
    const canvas = document.getElementById('hero-particles');
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2,
                color: Math.random() > 0.5 ? 'rgba(0, 217, 255, 0.2)' : 'rgba(139, 92, 246, 0.2)'
            });
        }
    }
    function draw() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color; ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    initCanvas(); draw();
    window.addEventListener('resize', initCanvas);

    // 5. Typewriter Effect
    const roles = ["Junior .NET Developer", "Backend Engineer", "ASP.NET Core Developer", "API Builder", "Node.js Developer"];
    let roleIndex = 0; let charIndex = 0; let isDeleting = false;
    const typeElement = document.getElementById('typewriter');

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typeElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1500); // Initial delay

    // 6. Scroll Reveal & Counters
    const reveals = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Counters
                if (entry.target.classList.contains('stats-container') && !counted) {
                    counted = true;
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const update = setInterval(() => {
                            count += target / 40; // speed
                            if (count >= target) {
                                counter.innerText = target + '+';
                                clearInterval(update);
                            } else {
                                counter.innerText = Math.ceil(count) + '+';
                            }
                        }, 40);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // 7. Magnetic Buttons
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const pos = this.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });

    // 8. 3D Tilt Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rx = ((y / rect.height) - 0.5) * -10;
            const ry = ((x / rect.width) - 0.5) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        });
    });

    // 9. Set Footer Year
    document.getElementById('year').innerText = new Date().getFullYear();

    // 10. Form Submission
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('formStatus');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                statusMsg.style.color = 'var(--accent-emerald)';
                statusMsg.textContent = 'Data transmitted. I will respond shortly.';
                form.reset();
            }
        } catch (error) {
            statusMsg.style.color = '#ff5f56';
            statusMsg.textContent = 'Transmission failed. Please try again.';
        }
    });
});