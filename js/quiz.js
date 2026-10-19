/**
 * ==============================================================================
 * Ecos de Soberanía - Trivia: "Línea de Decisiones Soberanas" (ES6 Module)
 * ==============================================================================
 * Arquitectura: State Machine Pattern (FSM)
 * Características:
 * - Sin variables globales (Encapsulado en clase/módulo)
 * - Temporizador regresivo de 15s con barra visual dinámica
 * - Micro-animaciones: Sistema de partículas Canvas, screen-flashes y sacudida (shake)
 * - Síntesis de sonido offline mediante Web Audio API (sin dependencias externas)
 * - Integración con LeaderboardManager y persistencia en localStorage
 */

import { QUIZ_QUESTIONS } from './data.js';
import { LeaderboardManager } from './leaderboard.js';

// Estados posibles de la máquina de estados
export const QuizState = Object.freeze({
  IDLE: 'IDLE',
  QUESTION_ACTIVE: 'QUESTION_ACTIVE',
  ANSWER_REVIEW: 'ANSWER_REVIEW',
  FINISHED: 'FINISHED'
});

const QUESTION_DURATION_SECONDS = 15;
const BASE_POINTS_PER_CORRECT = 1000;

export class QuizController {
  constructor(containerElement) {
    if (!containerElement) {
      throw new Error('[QuizController] Se requiere un contenedor DOM válido.');
    }

    this.container = containerElement;
    this.state = QuizState.IDLE;
    
    // Preguntas y progreso
    this.questions = [...QUIZ_QUESTIONS];
    this.currentIndex = 0;
    this.correctCount = 0;
    this.totalPoints = 0;
    this.historyLog = []; // { questionId, selectedIndex, isCorrect, timeRemaining }

    // Temporizador
    this.timerInterval = null;
    this.timeRemaining = QUESTION_DURATION_SECONDS;
    this.timerStartTime = 0;

    // Web Audio Context (Lazy init para cumplir políticas de autoplay de navegadores)
    this.audioCtx = null;

    // Inicializar Canvas de partículas
    this.particleCanvas = null;
    this.particleCtx = null;
    this.particles = [];
    this.animationFrameId = null;

    this.initCanvas();
    this.render();
  }

  // ============================================================================
  // GESTOR DE AUDIO OFFLINE (Web Audio API Synthesizer)
  // ============================================================================
  initAudio() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playAudioFeedback(type) {
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (type === 'correct') {
        // Tono armónico ascendente patriótico (D5 -> A5)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.25); // A5

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(739.99, now); // F#5
        osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
      } else if (type === 'incorrect' || type === 'timeout') {
        // Zumbido grave descendente
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.3);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'tick') {
        // Tick sutil para los últimos 3 segundos
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      console.warn('[Audio] Error al sintetizar sonido:', e);
    }
  }

  // ============================================================================
  // SISTEMA DE MICRO-ANIMACIONES Y PARTÍCULAS (Canvas 2D)
  // ============================================================================
  initCanvas() {
    let canvas = document.getElementById('quiz-particle-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'quiz-particle-canvas';
      canvas.className = 'quiz-canvas-overlay';
      document.body.appendChild(canvas);
    }
    this.particleCanvas = canvas;
    this.particleCtx = canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.particleCanvas) return;
    this.particleCanvas.width = window.innerWidth;
    this.particleCanvas.height = window.innerHeight;
  }

  triggerConfettiBurst(originX, originY) {
    const colors = ['#00d4ff', '#ffd700', '#ffffff', '#0047ba', '#ff4d4d'];
    const count = 65;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const velocity = 3 + Math.random() * 8;
      this.particles.push({
        x: originX || window.innerWidth / 2,
        y: originY || window.innerHeight / 2,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        size: 5 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        life: 0.95 + Math.random() * 0.04
      });
    }

    if (!this.animationFrameId) {
      this.runParticleLoop();
    }
  }

  runParticleLoop() {
    if (!this.particleCtx) return;
    this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // Gravedad
      p.rotation += p.rotationSpeed;
      p.alpha *= p.life;

      this.particleCtx.save();
      this.particleCtx.translate(p.x, p.y);
      this.particleCtx.rotate((p.rotation * Math.PI) / 180);
      this.particleCtx.globalAlpha = p.alpha;
      this.particleCtx.fillStyle = p.color;
      this.particleCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.particleCtx.restore();

      if (p.alpha <= 0.01 || p.y > this.particleCanvas.height + 50) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animationFrameId = requestAnimationFrame(() => this.runParticleLoop());
    } else {
      this.animationFrameId = null;
      this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
    }
  }

  triggerScreenEffect(type) {
    const card = this.container.querySelector('.quiz-card');
    if (!card) return;

    if (type === 'correct') {
      card.classList.add('flash-correct');
      setTimeout(() => card.classList.remove('flash-correct'), 800);
    } else {
      card.classList.add('flash-incorrect', 'shake-animation');
      setTimeout(() => card.classList.remove('flash-incorrect', 'shake-animation'), 800);
    }
  }

  // ============================================================================
  // GESTIÓN DEL TEMPORIZADOR (15s GAMIFICADO)
  // ============================================================================
  startTimer() {
    this.stopTimer();
    this.timeRemaining = QUESTION_DURATION_SECONDS;
    this.updateTimerDisplay();

    const timerBar = this.container.querySelector('.quiz-timer-fill');
    if (timerBar) {
      timerBar.style.transition = 'none';
      timerBar.style.width = '100%';
      // Forzar reflujo para reiniciar transición CSS
      void timerBar.offsetWidth;
      timerBar.style.transition = `width ${QUESTION_DURATION_SECONDS}s linear, background-color 0.5s ease`;
      timerBar.style.width = '0%';
    }

    this.timerInterval = setInterval(() => {
      this.timeRemaining -= 1;
      this.updateTimerDisplay();

      if (this.timeRemaining <= 3 && this.timeRemaining > 0) {
        this.playAudioFeedback('tick');
      }

      if (this.timeRemaining <= 0) {
        this.handleTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const timerText = this.container.querySelector('.quiz-timer-text');
    const timerBar = this.container.querySelector('.quiz-timer-fill');

    if (timerText) {
      timerText.textContent = `${Math.max(0, this.timeRemaining)}s`;
    }

    if (timerBar) {
      if (this.timeRemaining <= 5) {
        timerBar.classList.add('timer-danger');
        timerBar.classList.remove('timer-warning');
      } else if (this.timeRemaining <= 9) {
        timerBar.classList.add('timer-warning');
        timerBar.classList.remove('timer-danger');
      } else {
        timerBar.classList.remove('timer-warning', 'timer-danger');
      }
    }
  }

  // ============================================================================
  // TRANSICIONES DE LA MÁQUINA DE ESTADOS
  // ============================================================================
  transitionTo(newState) {
    this.state = newState;
    this.render();
  }

  startQuiz() {
    this.initAudio();
    this.currentIndex = 0;
    this.correctCount = 0;
    this.totalPoints = 0;
    this.historyLog = [];
    this.transitionTo(QuizState.QUESTION_ACTIVE);
  }

  handleAnswerSelect(selectedIndex) {
    if (this.state !== QuizState.QUESTION_ACTIVE) return;
    this.stopTimer();

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.correctAnswer;
    const timeBonus = isCorrect ? Math.round((this.timeRemaining / QUESTION_DURATION_SECONDS) * 500) : 0;
    const earnedPoints = isCorrect ? BASE_POINTS_PER_CORRECT + timeBonus : 0;

    if (isCorrect) {
      this.correctCount++;
      this.totalPoints += earnedPoints;
      this.playAudioFeedback('correct');
      this.triggerScreenEffect('correct');
      this.triggerConfettiBurst();
    } else {
      this.playAudioFeedback('incorrect');
      this.triggerScreenEffect('incorrect');
    }

    this.historyLog.push({
      questionId: currentQ.id,
      selectedIndex,
      isCorrect,
      timeRemaining: this.timeRemaining,
      earnedPoints
    });

    this.transitionTo(QuizState.ANSWER_REVIEW);
  }

  handleTimeout() {
    if (this.state !== QuizState.QUESTION_ACTIVE) return;
    this.stopTimer();

    const currentQ = this.questions[this.currentIndex];
    this.playAudioFeedback('timeout');
    this.triggerScreenEffect('incorrect');

    this.historyLog.push({
      questionId: currentQ.id,
      selectedIndex: null,
      isCorrect: false,
      timeRemaining: 0,
      earnedPoints: 0
    });

    this.transitionTo(QuizState.ANSWER_REVIEW);
  }

  nextQuestion() {
    if (this.currentIndex + 1 < this.questions.length) {
      this.currentIndex++;
      this.transitionTo(QuizState.QUESTION_ACTIVE);
    } else {
      this.transitionTo(QuizState.FINISHED);
    }
  }

  resetQuiz() {
    this.stopTimer();
    this.transitionTo(QuizState.IDLE);
  }

  // ============================================================================
  // RENDERIZADO REACTIVO DEL COMPONENTE
  // ============================================================================
  render() {
    switch (this.state) {
      case QuizState.IDLE:
        this.renderIdle();
        break;
      case QuizState.QUESTION_ACTIVE:
        this.renderQuestionActive();
        this.startTimer();
        break;
      case QuizState.ANSWER_REVIEW:
        this.renderAnswerReview();
        break;
      case QuizState.FINISHED:
        this.renderFinished();
        break;
    }
  }

  renderIdle() {
    this.container.innerHTML = `
      <div class="quiz-card idle-view animate-fade-in">
        <div class="quiz-badge">Desafío Histórico</div>
        <h2 class="quiz-title">Línea de Decisiones Soberanas</h2>
        <p class="quiz-description">
          Pon a prueba tus conocimientos sobre las grandes gestas y decisiones patrióticas 
          que forjaron la soberanía de Nicaragua.
        </p>
        <div class="quiz-rules">
          <div class="rule-item">
            <span class="rule-icon">⏱️</span>
            <span><strong>15 segundos</strong> por pregunta</span>
          </div>
          <div class="rule-item">
            <span class="rule-icon">⚡</span>
            <span>Bonificación de puntos por velocidad</span>
          </div>
          <div class="rule-item">
            <span class="rule-icon">🏆</span>
            <span>Clasificación directa al Leaderboard del stand</span>
          </div>
        </div>
        <button id="btn-start-quiz" class="btn btn-primary btn-pulse">
          Comenzar Desafío
        </button>
      </div>
    `;

    const startBtn = this.container.querySelector('#btn-start-quiz');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startQuiz());
    }
  }

  renderQuestionActive() {
    const q = this.questions[this.currentIndex];
    const total = this.questions.length;
    const progressPercent = ((this.currentIndex + 1) / total) * 100;

    const optionsHtml = q.options.map((opt, idx) => `
      <button class="quiz-option-btn" data-index="${idx}">
        <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="option-text">${opt}</span>
      </button>
    `).join('');

    this.container.innerHTML = `
      <div class="quiz-card active-question-view animate-scale-up">
        <!-- Barra de tiempo -->
        <div class="quiz-timer-container">
          <div class="quiz-timer-bar">
            <div class="quiz-timer-fill"></div>
          </div>
          <div class="quiz-timer-header">
            <span class="quiz-progress-text">Pregunta ${this.currentIndex + 1} de ${total}</span>
            <span class="quiz-timer-text">${this.timeRemaining}s</span>
          </div>
        </div>

        <h3 class="quiz-question-text">${q.question}</h3>

        <div class="quiz-options-grid">
          ${optionsHtml}
        </div>

        <div class="quiz-footer-status">
          <span>Puntos acumulados: <strong>${this.totalPoints} pts</strong></span>
        </div>
      </div>
    `;

    // Vincular clics en opciones
    const optionButtons = this.container.querySelectorAll('.quiz-option-btn');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.getAttribute('data-index'), 10);
        this.handleAnswerSelect(index);
      });
    });
  }

  renderAnswerReview() {
    const q = this.questions[this.currentIndex];
    const lastLog = this.historyLog[this.historyLog.length - 1];
    const total = this.questions.length;
    const isTimeout = lastLog.selectedIndex === null;

    const optionsHtml = q.options.map((opt, idx) => {
      let statusClass = '';
      let badge = '';

      if (idx === q.correctAnswer) {
        statusClass = 'option-correct';
        badge = '<span class="status-icon">✓ Correcto</span>';
      } else if (idx === lastLog.selectedIndex) {
        statusClass = 'option-wrong';
        badge = '<span class="status-icon">✗ Tu respuesta</span>';
      }

      return `
        <div class="quiz-option-btn ${statusClass} option-disabled">
          <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
          <span class="option-text">${opt}</span>
          ${badge}
        </div>
      `;
    }).join('');

    const feedbackBanner = lastLog.isCorrect
      ? `<div class="feedback-banner feedback-success animate-bounce">
           <span class="banner-icon">🎯</span>
           <div>
             <strong>¡Excelente acierto patriótico!</strong>
             <span>+${lastLog.earnedPoints} pts (incluye bono de velocidad)</span>
           </div>
         </div>`
      : isTimeout
      ? `<div class="feedback-banner feedback-warning">
           <span class="banner-icon">⏰</span>
           <div>
             <strong>¡Tiempo agotado!</strong>
             <span>La rapidez también es clave en la toma de decisiones.</span>
           </div>
         </div>`
      : `<div class="feedback-banner feedback-danger">
           <span class="banner-icon">⚠️</span>
           <div>
             <strong>Respuesta Incorrecta</strong>
             <span>Revisa la explicación histórica abajo.</span>
           </div>
         </div>`;

    this.container.innerHTML = `
      <div class="quiz-card review-view animate-fade-in">
        ${feedbackBanner}

        <h3 class="quiz-question-text">${q.question}</h3>

        <div class="quiz-options-grid">
          ${optionsHtml}
        </div>

        <div class="quiz-explanation-box">
          <div class="explanation-title">📖 Contexto Histórico:</div>
          <p class="explanation-content">${q.explanation}</p>
        </div>

        <div class="quiz-action-bar">
          <button id="btn-next-question" class="btn btn-primary">
            ${this.currentIndex + 1 < total ? 'Siguiente Pregunta →' : 'Ver Resultados y Leaderboard →'}
          </button>
        </div>
      </div>
    `;

    const nextBtn = this.container.querySelector('#btn-next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextQuestion());
      nextBtn.focus();
    }
  }

  renderFinished() {
    const total = this.questions.length;
    const percentage = Math.round((this.correctCount / total) * 100);

    let rankTitle = 'Guardián de la Soberanía';
    let medalEmoji = '🥇';

    if (percentage < 40) {
      rankTitle = 'Aprendiz de la Historia';
      medalEmoji = '📜';
    } else if (percentage < 80) {
      rankTitle = 'Defensor Patriótico';
      medalEmoji = '🥈';
    }

    this.container.innerHTML = `
      <div class="quiz-card finished-view animate-scale-up">
        <div class="medal-display">${medalEmoji}</div>
        <h2 class="quiz-title">¡Desafío Completado!</h2>
        <div class="rank-badge">${rankTitle}</div>

        <div class="score-summary-grid">
          <div class="score-item">
            <span class="score-label">Aciertos</span>
            <span class="score-number">${this.correctCount} / ${total}</span>
          </div>
          <div class="score-item">
            <span class="score-label">Efectividad</span>
            <span class="score-number">${percentage}%</span>
          </div>
          <div class="score-item highlight-item">
            <span class="score-label">Puntaje Final</span>
            <span class="score-number">${this.totalPoints} pts</span>
          </div>
        </div>

        <!-- Formulario de registro en Leaderboard -->
        <div id="leaderboard-form-container" class="leaderboard-register-box">
          <label for="visitor-name-input" class="register-label">
            Inscribe tu nombre o apodo en el Leaderboard del Stand UNI:
          </label>
          <div class="input-action-group">
            <input 
              type="text" 
              id="visitor-name-input" 
              class="form-input" 
              placeholder="Ej. Ing. Carlos Robleto" 
              maxlength="24"
              autocomplete="off"
            />
            <button id="btn-save-score" class="btn btn-accent">
              Guardar Puntaje 🏆
            </button>
          </div>
        </div>

        <!-- Contenedor dinámico del Leaderboard -->
        <div id="stand-leaderboard-container" class="mt-4"></div>

        <div class="quiz-action-bar mt-4">
          <button id="btn-restart-quiz" class="btn btn-secondary">
            🔄 Jugar Nuevamente
          </button>
        </div>
      </div>
    `;

    const leaderboardContainer = this.container.querySelector('#stand-leaderboard-container');
    const formBox = this.container.querySelector('#leaderboard-form-container');
    const nameInput = this.container.querySelector('#visitor-name-input');
    const saveBtn = this.container.querySelector('#btn-save-score');
    const restartBtn = this.container.querySelector('#btn-restart-quiz');

    // Renderizar leaderboard existente
    LeaderboardManager.render(leaderboardContainer);

    // Guardar puntaje
    saveBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const result = LeaderboardManager.saveScore({
        name,
        score: this.correctCount,
        totalQuestions: total,
        totalPoints: this.totalPoints
      });

      // Feedback visual y refresco de leaderboard
      formBox.innerHTML = `
        <div class="save-success-banner animate-fade-in">
          ✓ ¡Registrado con éxito en la posición #${result.rank} del stand!
        </div>
      `;
      LeaderboardManager.render(leaderboardContainer, result.entry.id);
      this.triggerConfettiBurst();
    });

    // Permitir enviar con Enter
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveBtn.click();
    });

    restartBtn.addEventListener('click', () => this.resetQuiz());
  }
}
