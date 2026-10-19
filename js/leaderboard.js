/**
 * ==============================================================================
 * Ecos de Soberanía - Módulo de Persistencia y Leaderboard Local (ES6)
 * ==============================================================================
 * Diseñado para la feria universitaria en el stand de Ingeniería de Sistemas - UNI.
 * Almacena los puntajes localmente en el dispositivo (stand) mediante localStorage.
 */

const STORAGE_KEY = 'ecos_soberania_leaderboard_v1';
const MAX_LEADERBOARD_ENTRIES = 10;

export class LeaderboardManager {
  /**
   * Obtiene todos los puntajes guardados ordenados de mayor a menor puntuación.
   * @returns {Array<Object>} Lista de participantes
   */
  static getScores() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('[Leaderboard] Error al leer puntuaciones:', err);
      return [];
    }
  }

  /**
   * Guarda un nuevo participante y mantiene el Top N del stand.
   * @param {Object} entry - { name, score, totalQuestions, totalPoints, timestamp }
   * @returns {Object} { rank: number, entry: Object }
   */
  static saveScore({ name, score, totalQuestions, totalPoints }) {
    const safeName = (name && name.trim().length > 0) 
      ? name.trim().slice(0, 24) 
      : 'Visitante Patriota';

    const newRecord = {
      id: `vis-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: safeName,
      score: Number(score) || 0,
      totalQuestions: Number(totalQuestions) || 5,
      totalPoints: Math.round(Number(totalPoints) || 0),
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const scores = this.getScores();
    scores.push(newRecord);

    // Ordenar de mayor a menor puntaje; desempate por orden cronológico inverso
    scores.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return b.score - a.score;
    });

    // Conservar solo el Top N para no saturar memoria
    const trimmedScores = scores.slice(0, 50);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedScores));
    } catch (err) {
      console.error('[Leaderboard] Error al guardar en localStorage:', err);
    }

    const rank = trimmedScores.findIndex(s => s.id === newRecord.id) + 1;
    return { rank, entry: newRecord };
  }

  /**
   * Limpia el registro local (utilidad para reinicio de stand de feria).
   */
  static clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Renderiza el componente HTML de la tabla de posiciones en el contenedor dado.
   * @param {HTMLElement} containerElement
   * @param {string} highlightId - ID del registro recién creado para resaltarlo
   */
  static render(containerElement, highlightId = null) {
    if (!containerElement) return;

    const scores = this.getScores().slice(0, MAX_LEADERBOARD_ENTRIES);

    if (scores.length === 0) {
      containerElement.innerHTML = `
        <div class="leaderboard-empty">
          <p>¡Sé el primer participante en registrar su nombre en el podio del stand!</p>
        </div>
      `;
      return;
    }

    const rowsHtml = scores.map((item, index) => {
      const rank = index + 1;
      let badge = `${rank}º`;
      let rankClass = 'rank-regular';

      if (rank === 1) {
        badge = '🥇 1º';
        rankClass = 'rank-gold';
      } else if (rank === 2) {
        badge = '🥈 2º';
        rankClass = 'rank-silver';
      } else if (rank === 3) {
        badge = '🥉 3º';
        rankClass = 'rank-bronze';
      }

      const isCurrent = item.id === highlightId ? 'current-player-row' : '';

      return `
        <tr class="leaderboard-row ${rankClass} ${isCurrent}">
          <td class="col-rank">${badge}</td>
          <td class="col-name">
            <strong>${this.escapeHtml(item.name)}</strong>
            ${isCurrent ? '<span class="you-tag">(¡Tú!)</span>' : ''}
          </td>
          <td class="col-answers">${item.score}/${item.totalQuestions}</td>
          <td class="col-points">${item.totalPoints} pts</td>
        </tr>
      `;
    }).join('');

    containerElement.innerHTML = `
      <div class="leaderboard-card">
        <div class="leaderboard-header">
          <div class="leaderboard-icon">🏆</div>
          <div>
            <h3 class="leaderboard-title">Tabla de Posiciones - Stand UNI</h3>
            <p class="leaderboard-subtitle">Top ${MAX_LEADERBOARD_ENTRIES} Defensores de la Memoria Histórica</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th>Lugar</th>
                <th>Participante</th>
                <th>Aciertos</th>
                <th>Puntaje Total</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  static escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
