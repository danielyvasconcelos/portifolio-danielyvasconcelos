// Main JavaScript - Orquestrador dos módulos
import { setupNavigation, setupSmoothScrolling } from './modules/navigation.js';
import { setupAnimations } from './modules/animations.js';
import { setupCarousel } from './modules/carousel.js';
import { setupImageModal, setupContactModal } from './modules/modals.js';
import { fetchGitHubStats } from './modules/github.js';
import { setupProfileImageHover, setupResumeDownload } from './modules/utils.js';
import { setupContactButtons } from './modules/contacts.js';

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
    setupStatsCounters();
    setupResumeDownload();
}

// Contadores das estatísticas
function setupStatsCounters() {
    fetchGitHubStats();
}