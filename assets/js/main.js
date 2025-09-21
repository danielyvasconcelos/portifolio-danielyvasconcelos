/**
 * ==========================================================================
 * JavaScript principal do portfólio - Daniely Vasconcelos
 * ==========================================================================
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

/**
 * Inicializa todas as funcionalidades do portfólio
 */
function initializePortfolio() {
    setupNavigation();
    setupSmoothScrolling();
    setupAnimations();
    setupContactButtons();
}

/**
 * Configura a navegação ativa
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove classe ativa de todos os links
            navLinks.forEach(l => l.classList.remove('nav__link--active'));
            
            // Adiciona classe ativa ao link clicado
            this.classList.add('nav__link--active');
            
            // Aqui você pode adicionar lógica para mostrar/esconder seções
            // Por enquanto, apenas previne o comportamento padrão
            e.preventDefault();
        });
    });
}

/**
 * Configura rolagem suave para âncoras
 */
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

/**
 * Configura animações de entrada dos elementos
 */
function setupAnimations() {
    // Observador de interseção para animações
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

    // Aplica animação inicial e observa elementos
    const animatedElements = document.querySelectorAll('.section');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

/**
 * Configura funcionalidade dos botões de contato
 */
function setupContactButtons() {
    const contactButton = document.querySelector('.btn--primary');
    const socialButtons = document.querySelectorAll('.btn--icon');
    
    // Botão principal de contato
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            // Aqui você pode adicionar lógica para abrir modal de contato
            // ou redirecionar para seção de contato
            alert('Funcionalidade de contato será implementada em breve!');
        });
    }
    
    // Botões de redes sociais
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const alt = img.getAttribute('alt');
                
                // Aqui você pode adicionar links reais para suas redes sociais
                switch(alt) {
                    case 'LinkedIn':
                        window.open('https://linkedin.com/in/seu-perfil', '_blank');
                        break;
                    case 'Instagram':
                        window.open('https://instagram.com/seu-perfil', '_blank');
                        break;
                    case 'GitHub':
                        window.open('https://github.com/seu-usuario', '_blank');
                        break;
                    default:
                        console.log('Rede social não configurada:', alt);
                }
            }
        });
    });
}

/**
 * Utilitário para adicionar efeito de digitação
 * @param {string} elementSelector - Seletor do elemento
 * @param {string} text - Texto para digitar
 * @param {number} speed - Velocidade da digitação (ms)
 */
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

/**
 * Utilitário para mostrar notificações
 * @param {string} message - Mensagem da notificação
 * @param {string} type - Tipo da notificação (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Estilos inline para a notificação
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
    
    // Anima entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}