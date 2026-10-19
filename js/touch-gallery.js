/**
 * ==============================================================================
 * Ecos de Soberanía - Galería Horizontal Touch & Swipe Avanzado (ES6)
 * ==============================================================================
 * Optimizada para pantallas táctiles y tablets en stands de feria.
 * Soporta gestos Swipe (inercia, umbral de desplazamiento, touch y pointer events),
 * navegación por teclado y sincronización con Intersection Observer.
 */

export class TouchGallery {
  /**
   * @param {HTMLElement} containerElement - El contenedor de scroll horizontal (.timeline-container)
   * @param {Object} options - Configuración de sensibilidad y callbacks
   */
  constructor(containerElement, options = {}) {
    if (!containerElement) return;

    this.container = containerElement;
    this.track = containerElement.querySelector('.timeline-track') || containerElement;
    this.cards = Array.from(this.track.querySelectorAll('.milestone-card'));

    this.options = {
      swipeThreshold: 50,     // Píxeles mínimos para considerar un swipe
      velocityThreshold: 0.3, // Velocidad px/ms para swipe rápido (flick)
      onCardChange: options.onCardChange || null,
      ...options
    };

    this.currentIndex = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.startTime = 0;
    this.isHorizDrag = null;

    this.initEvents();
    this.initIntersectionObserver();
  }

  initEvents() {
    // Pointer Events (Unifica Touch y Mouse)
    this.container.addEventListener('pointerdown', (e) => this.onPointerDown(e), { passive: true });
    window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: false });
    window.addEventListener('pointerup', (e) => this.onPointerUp(e));
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e));

    // Teclas de dirección (Accesibilidad y control en laptop de stand)
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Botones de navegación previa/siguiente si existen
    const nextBtn = document.querySelector('#gallery-next-btn');
    const prevBtn = document.querySelector('#gallery-prev-btn');

    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
  }

  onPointerDown(e) {
    // Si se hizo clic en un botón interactivo dentro de la tarjeta, no bloquear
    if (e.target.closest('button, a, input')) return;

    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startTime = performance.now();
    this.isHorizDrag = null;
    this.container.classList.add('is-dragging');
  }

  onPointerMove(e) {
    if (!this.isDragging) return;

    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;

    // Determinar intención del usuario: scroll horizontal o scroll vertical de la página
    if (this.isHorizDrag === null) {
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        this.isHorizDrag = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    // Si es arrastre horizontal, evitar scroll nativo de la página
    if (this.isHorizDrag) {
      if (e.cancelable) e.preventDefault();
    }
  }

  onPointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.container.classList.remove('is-dragging');

    const deltaX = e.clientX - this.startX;
    const deltaTime = performance.now() - this.startTime;
    const velocity = Math.abs(deltaX) / Math.max(deltaTime, 1);

    if (this.isHorizDrag) {
      // Swipe hacia la izquierda -> Avanzar siguiente
      if (deltaX < -this.options.swipeThreshold || (deltaX < -20 && velocity > this.options.velocityThreshold)) {
        this.next();
      }
      // Swipe hacia la derecha -> Retroceder anterior
      else if (deltaX > this.options.swipeThreshold || (deltaX > 20 && velocity > this.options.velocityThreshold)) {
        this.prev();
      } else {
        // Regresar a la tarjeta actual si no superó el umbral
        this.scrollToIndex(this.currentIndex);
      }
    }

    this.isHorizDrag = null;
  }

  next() {
    if (this.currentIndex < this.cards.length - 1) {
      this.scrollToIndex(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.scrollToIndex(this.currentIndex - 1);
    }
  }

  scrollToIndex(index) {
    const targetCard = this.cards[index];
    if (!targetCard) return;

    this.currentIndex = index;
    targetCard.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });

    this.updateControls();
    if (this.options.onCardChange) {
      this.options.onCardChange(index, targetCard);
    }
  }

  updateControls() {
    const prevBtn = document.querySelector('#gallery-prev-btn');
    const nextBtn = document.querySelector('#gallery-next-btn');

    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.cards.length - 1;

    // Actualizar dots indicadores
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === this.currentIndex);
    });
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          const index = this.cards.indexOf(entry.target);
          if (index !== -1 && index !== this.currentIndex) {
            this.currentIndex = index;
            this.updateControls();
          }
        }
      });
    }, {
      root: this.container,
      threshold: [0.55]
    });

    this.cards.forEach(card => observer.observe(card));
  }
}
