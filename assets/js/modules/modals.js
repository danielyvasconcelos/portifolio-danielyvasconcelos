// Módulo de Modais
import { showNotification } from './utils.js';

export function setupImageModal() {
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

export function setupContactModal() {
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
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            const emailBody = `Nome: ${name}\n\nEmail: ${email}\n\nMensagem:\n${message}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contato.danielyvasconcelos@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            window.open(gmailUrl, '_blank');
            
            showNotification('Abrindo Gmail...', 'success');
            modal.style.display = 'none';
            form.reset();
        });
    }
}