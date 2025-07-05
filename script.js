// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// GSAP Animations
gsap.timeline()
    .from('.floating h1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.floating p', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.floating .flex', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.5');

// Animate skill bars on scroll
gsap.utils.toArray('.skill-bar').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    ScrollTrigger.create({
        trigger: bar,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(bar, {
                width: width,
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
});

// Animate cards on scroll
gsap.utils.toArray('.card-hover').forEach(card => {
    ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
            gsap.fromTo(card, 
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                }
            );
        }
    });
});

// Parallax effect for background elements
gsap.utils.toArray('.gear-animation').forEach(gear => {
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const speed = 0.5;
            const yPos = -(self.progress * 100 * speed);
            gsap.set(gear, { y: yPos });
        }
    });
});

// Animate section headers
gsap.utils.toArray('section h2').forEach(header => {
    ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo(header,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                }
            );
        }
    });
});

// Animate timeline items
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
            gsap.fromTo(item,
                {
                    x: -50,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'power3.out'
                }
            );
        }
    });
});

// Animate contact information
gsap.utils.toArray('#contact .flex').forEach((contactItem, index) => {
    ScrollTrigger.create({
        trigger: contactItem,
        start: 'top 85%',
        onEnter: () => {
            gsap.fromTo(contactItem,
                {
                    x: -30,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power3.out'
                }
            );
        }
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('a[href="#contact"], a[href="#"], button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Add typing effect to tagline
    const tagline = document.querySelector('.floating p:first-of-type');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after initial animations
        setTimeout(typeWriter, 2000);
    }
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00a2ff, #0066cc);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add particle effect to background
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 162, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
        
        // Animate particles
        gsap.to(particle, {
            y: -100,
            opacity: 0,
            duration: Math.random() * 10 + 10,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 20
        });
    }
};

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Set initial body opacity
document.body.style.opacity = '0'; 