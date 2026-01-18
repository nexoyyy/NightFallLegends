// FAQ toggle with answer display (ultra robust)
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-list > li');
    faqItems.forEach((item) => {
        const btn = item.querySelector('.faq-btn');
        const answer = item.querySelector('.faq-answer');
        btn.addEventListener('click', function() {
            const isOpen = answer.classList.contains('show-faq');
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show-faq'));
            document.querySelectorAll('.faq-btn').forEach(b => b.classList.remove('active'));
            // Open if not already open
            if (!isOpen) {
                answer.classList.add('show-faq');
                btn.classList.add('active');
            }
            // Shake animation on button
            btn.classList.remove('shake-faq');
            void btn.offsetWidth;
            btn.classList.add('shake-faq');
        });
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFAQ);
} else {
    setupFAQ();
}

// Animation secousse CSS pour le bouton FAQ
(function(){
    if (document.getElementById('faq-shake-style')) return;
    const style = document.createElement('style');
    style.id = 'faq-shake-style';
    style.innerHTML = `
    @keyframes shakeFaqBtn {
      0% { transform: translateX(0); }
      20% { transform: translateX(-6px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(4px); }
      100% { transform: translateX(0); }
    }
    .shake-faq {
      animation: shakeFaqBtn 0.35s cubic-bezier(.4,2,.6,1);
    }
    `;
    document.head.appendChild(style);
})();
// Navigation mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Effet de parallaxe pour le fond
const parallax = () => {
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        stars.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
    });
}

// Animation au défilement
const scrollAnimation = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    
    const hiddenElements = document.querySelectorAll('.feature-card, .gallery-item, .download-card');
    hiddenElements.forEach(el => {
        observer.observe(el);
        el.classList.add('hidden');
    });
}

// Effet de hover sur les boutons de téléchargement
const downloadButtons = () => {
    const buttons = document.querySelectorAll('.btn-download');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animation de clic
            button.classList.add('clicked');
            
            // Afficher un message de téléchargement
            const originalText = button.textContent;
            button.textContent = 'Téléchargement...';
            
            // Simuler un téléchargement
            setTimeout(() => {
                button.textContent = 'Téléchargé !';
                
                // Revenir au texte original
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('clicked');
                }, 2000);
            }, 2000);
        });
    });
}

// Galerie d'images avec lightbox
const galleryLightbox = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Empêcher le défilement du body
            document.body.style.overflow = 'hidden';
            
            // Animation d'entrée
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Fermer le lightbox
            closeBtn.addEventListener('click', () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }, 300);
            });
            
            // Fermer en cliquant en dehors de l'image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        });
    });
}

// Effet de typage pour le titre principal
const typeEffect = () => {
    const heroTitle = document.querySelector('.hero h1');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
}

// Effet de compteur pour les statistiques
const counterEffect = () => {
    // Ajouter des statistiques plus tard si nécessaire
}

// Navigation fluide
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fermer le menu mobile si ouvert
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Effet de particules pour le fond (version simplifiée)
const particleEffect = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(126, 34, 206, ${Math.random() * 0.5 + 0.1})`,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5
        });
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Effet de survol pour les cartes
const cardHoverEffect = () => {
    const cards = document.querySelectorAll('.feature-card, .download-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(126, 34, 206, 0.4)';
            card.style.borderColor = 'var(--primary-light)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(126, 34, 206, 0.2)';
            card.style.borderColor = 'var(--card-border)';
        });
    });
}

// Effet de survol pour les liens de navigation
const navHoverEffect = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.color = 'var(--primary-light)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.color = 'var(--light-text)';
            }
        });
    });
}

// Ajouter des styles CSS pour les effets JavaScript
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s ease;
        }
        
        .show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            border: 2px solid var(--primary-light);
            box-shadow: 0 0 20px rgba(126, 34, 206, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 30px;
            color: white;
            cursor: pointer;
        }
        
        .particles-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }
        
        .btn-download.clicked {
            transform: scale(0.95);
            background: linear-gradient(135deg, var(--secondary-dark), var(--secondary-color));
        }
    `;
    document.head.appendChild(style);
}

// Initialiser tous les effets
const init = () => {
    navSlide();
    parallax();
    scrollAnimation();
    downloadButtons();
    galleryLightbox();
    smoothScroll();
    cardHoverEffect();
    navHoverEffect();
    addDynamicStyles();
    
    // Effets à déclencher après le chargement complet
    window.addEventListener('load', () => {
        typeEffect();
        particleEffect();
    });
}

// Exécuter l'initialisation
init();
