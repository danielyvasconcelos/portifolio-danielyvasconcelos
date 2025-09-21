// Módulo de Utilitários
export function showNotification(message, type = 'info') {
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

export function setupProfileImageHover() {
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

export function setupResumeDownload() {
    const downloadBtn = document.getElementById('downloadResume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const link = document.createElement('a');
            link.href = './assets/documents/DanielyEvellin_Curriculo_Backend.pdf';
            link.download = 'DanielyEvellin_Curriculo_Backend.pdf';
            
            try {
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showNotification('Baixando currículo...', 'success');
            } catch (error) {
                window.open('./assets/documents/DanielyEvellin_Curriculo_Backend.pdf', '_blank');
                showNotification('Abrindo currículo em nova aba...', 'info');
            }
        });
    }
}