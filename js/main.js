/**
 * ==============================================================================
 * Ecos de Soberanía - Punto de Entrada Principal (ES6 Main Module)
 * ==============================================================================
 * Desarrollado para la Feria de Ingeniería de Sistemas - UNI
 * Integra PWA Service Worker, Galería Táctil, Modal Histórico y Quiz State Machine.
 */

import { HISTORICAL_MILESTONES } from './data.js';
import { QuizController } from './quiz.js';
import { TouchGallery } from './touch-gallery.js';
import { LeaderboardManager } from './leaderboard.js';

document.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  initScrollProgress();
  initNetworkStatusListener();
  renderMilestoneCards();
  initTouchGallery();
  initModalSystem();
  initQuizSystem();
});

/**
 * 1. REGISTRO DE SERVICE WORKER (OFFLINE-FIRST PWA)
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registrado exitosamente con scope:', reg.scope);

          // Escuchar actualizaciones del SW
          reg.onupdatefound = () => {
            const installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] Nueva versión disponible en segundo plano.');
              }
            };
          };
        })
        .catch((err) => {
          console.warn('[PWA] Error al registrar Service Worker:', err);
        });
    });
  }
}

/**
 * 2. BARRA DE PROGRESO DE LECTURA SUPERIOR (SCROLL PROGRESS)
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 3. MONITOR DE ESTADO ONLINE/OFFLINE (Para supervisión en stand)
 */
function initNetworkStatusListener() {
  const statusBadge = document.getElementById('network-status-badge');
  if (!statusBadge) return;

  const updateStatus = () => {
    if (navigator.onLine) {
      statusBadge.textContent = 'En línea (PWA Activa)';
      statusBadge.className = 'status-badge status-online';
    } else {
      statusBadge.textContent = 'Modo 100% Offline (Feria UNI)';
      statusBadge.className = 'status-badge status-offline';
    }
  };

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

/**
 * 4. RENDERIZADO DINÁMICO DE LA LÍNEA DE TIEMPO
 */
function renderMilestoneCards() {
  const track = document.getElementById('timeline-track');
  const dotsContainer = document.getElementById('gallery-dots-container');
  if (!track) return;

  track.innerHTML = '';
  if (dotsContainer) dotsContainer.innerHTML = '';

  HISTORICAL_MILESTONES.forEach((milestone, idx) => {
    // Tarjeta
    const card = document.createElement('article');
    card.className = 'milestone-card';
    card.setAttribute('data-id', milestone.id);
    card.setAttribute('data-index', idx);

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img 
          src="${milestone.imageUrl}" 
          alt="${milestone.title}" 
          loading="lazy" 
          class="card-image"
          onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\' viewBox=\\'0 0 400 250\\'><rect fill=\\'%23112240\\' width=\\'400\\' height=\\'250\\'/><text fill=\\'%2364ffda\\' x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'18\\'>Patria Libre y Soberana</text></svg>'"
        />
        <span class="card-tag">${milestone.tag}</span>
        <span class="card-year-badge">${milestone.year}</span>
      </div>
      <div class="card-content">
        <h3 class="card-title">${milestone.title}</h3>
        <p class="card-protagonists"><strong>Héroes:</strong> ${milestone.protagonists}</p>
        <blockquote class="card-quote">${milestone.quote}</blockquote>
        <p class="card-summary">${milestone.summary}</p>
        <button class="btn btn-outline btn-open-modal" data-id="${milestone.id}">
          Explorar Memoria Histórica 🔍
        </button>
      </div>
    `;

    track.appendChild(card);

    // Indicador dot
    if (dotsContainer) {
      const dot = document.createElement('button');
      dot.className = `gallery-dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Ir al hito ${milestone.year}`);
      dot.addEventListener('click', () => {
        window.touchGalleryInstance?.scrollToIndex(idx);
      });
      dotsContainer.appendChild(dot);
    }
  });
}

/**
 * 5. INICIALIZACIÓN DE LA GALERÍA TÁCTIL (SWIPE)
 */
function initTouchGallery() {
  const container = document.getElementById('timeline-container');
  if (container) {
    window.touchGalleryInstance = new TouchGallery(container);
  }
}

/**
 * 6. SISTEMA DE MODALES PARA PROFUNDIZACIÓN HISTÓRICA
 */
function initModalSystem() {
  const modal = document.getElementById('history-modal');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalBody || !closeBtn) return;

  const openModal = (milestoneId) => {
    const milestone = HISTORICAL_MILESTONES.find(m => m.id === milestoneId);
    if (!milestone) return;

    modalBody.innerHTML = `
      <div class="modal-header-banner">
        <span class="modal-tag">${milestone.tag}</span>
        <h2 class="modal-title">${milestone.title} (${milestone.year})</h2>
        <p class="modal-date">📅 ${milestone.date}</p>
      </div>
      <div class="modal-hero-image-box">
        <img src="${milestone.imageUrl}" alt="${milestone.title}" class="modal-hero-image" />
      </div>
      <div class="modal-text-content">
        <div class="modal-protagonists-box">
          <strong>Protagonistas y Héroes:</strong>
          <p>${milestone.protagonists}</p>
        </div>
        <blockquote class="modal-quote">${milestone.quote}</blockquote>
        <div class="modal-body-text">
          ${milestone.fullDescription.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  // Delegación de eventos para botones de apertura
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-open-modal');
    if (trigger) {
      const id = trigger.getAttribute('data-id');
      openModal(id);
    }
  });

  closeBtn.addEventListener('click', closeModal);

  // Cerrar al hacer clic en el fondo oscuro
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Cerrar con Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/**
 * 7. INICIALIZACIÓN DEL SISTEMA DE TRIVIA
 */
function initQuizSystem() {
  const mountPoint = document.getElementById('quiz-mount-point');
  if (mountPoint) {
    window.quizControllerInstance = new QuizController(mountPoint);
  }
}
