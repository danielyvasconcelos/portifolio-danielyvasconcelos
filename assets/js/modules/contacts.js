// Módulo de Contatos
import { showNotification } from './utils.js';

export function setupContactButtons() {
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
                    default:
                        console.log('Rede social não configurada:', alt);
                }
            }
        });
    });
}