// JavaScript do portfólio

// Carrega quando a página estiver pronta
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Inicia todas as funções
function initializePortfolio() {
    setupNavigation();
    setupSmoothScrolling();
    setupAnimations();
    setupContactButtons();
    setupCarousel();
    setupImageModal();
    setupProfileImageHover();
    setupContactModal();
}

// Navegação ativa
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('nav__link--active'));
            this.classList.add('nav__link--active');
            e.preventDefault();
        });
    });
}

// Rolagem suave
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animações
function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Botões de contato
function setupContactButtons() {
    const contactButton = document.querySelector('.btn--primary');
    const socialButtons = document.querySelectorAll('.btn--icon');
    
    // Botão principal
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            const contactModal = document.getElementById('contactModal');
            if (contactModal) {
                contactModal.style.display = 'block';
            }
        });
    }
    
    // Botões sociais
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            const contact = this.getAttribute('data-contact');
            const img = this.querySelector('img');
            
            if (url) {
                window.open(url, '_blank');
            } else if (contact) {
                if (contact.includes('@')) {
                    window.location.href = `mailto:${contact}`;
                } else {
                    const phoneNumber = contact.replace(/\D/g, '');
                    window.open(`https://wa.me/55${phoneNumber}`, '_blank');
                }
            } else if (img) {
                const alt = img.getAttribute('alt');
                switch(alt) {
                    case 'LinkedIn':
                        window.open('https://linkedin.com/in/daniely-vasconcelos-b86412188', '_blank');
                        break;
                    case 'GitHub':
                        window.open('https://github.com/danielyvasconcelos', '_blank');
                        break;
                    case 'Instagram':
                        window.open('https://www.instagram.com/danielyvasconcelos_/', '_blank');
                        break;
                    case 'Email':
                        window.location.href = 'mailto:contato.danielyvasconcelos@gmail.com';
                        break;
                    default:
                        console.log('Rede social não configurada:', alt);
                }
            }
        });
    });
}

// Efeito de digitação
function typeWriter(elementSelector, text, speed = 100) {
    const element = document.querySelector(elementSelector);
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007acc',
        color: 'white',
        borderRadius: '4px',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Carrossel
function setupCarousel() {
    const slides = document.querySelectorAll('.carousel__slide');
    const dots = document.querySelectorAll('.carousel__dot');
    const prevBtn = document.querySelector('.carousel__btn--prev');
    const nextBtn = document.querySelector('.carousel__btn--next');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    setInterval(nextSlide, 15000);
}

// Modal de imagens
function setupImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.querySelector('.modal__image');
    const modalCaption = document.querySelector('.modal__caption');
    const closeBtn = document.querySelector('.modal__close');
    const projectImages = document.querySelectorAll('.project__image img');
    const profileImage = document.querySelector('.profile-image');
    
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalCaption.textContent = this.alt;
        });
    });
    
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalCaption.textContent = 'Daniely Vasconcelos';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Hover da foto de perfil
function setupProfileImageHover() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        const originalSrc = profileImage.src;
        const hoverSrc = profileImage.getAttribute('data-hover');
        
        profileImage.addEventListener('mouseenter', function() {
            this.src = hoverSrc;
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.src = originalSrc;
        });
    }
}

// Modal de contato
function setupContactModal() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('#contactModal .modal__close');
    const form = document.querySelector('#contactForm');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Mensagem enviada com sucesso!', 'success');
            modal.style.display = 'none';
            form.reset();
        });
    }
}