// Módulo de Navegação
export function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const navToggle = document.querySelector('.nav__toggle');
    const nav = document.querySelector('.nav');
    const navOverlay = document.querySelector('.nav-overlay');
    
    function closeMenu() {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        nav.classList.add('active');
        navToggle.classList.add('active');
        navOverlay.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isOpen = nav.classList.contains('active');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('nav__link--active'));
            this.classList.add('nav__link--active');
            
            if (nav.classList.contains('active')) {
                closeMenu();
            }
            
            e.preventDefault();
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            closeMenu();
        }
    });
}

export function setupSmoothScrolling() {
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