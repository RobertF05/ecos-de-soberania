import React, { useState } from 'react';
import { Crucigrama } from '../components/actividades/Crucigrama';
import { VerdaderoFalso } from '../components/actividades/VerdaderoFalso';

export const PruebaConocimientos = () => {
  const [actividadActual, setActividadActual] = useState(null); // null | 'crucigrama' | 'vf' | 'frase'

  const tarjetas = [
    { id: 'crucigrama', icon: '🧩', titulo: 'Crucigrama Histórico', desc: 'Pon a prueba tu vocabulario sobre la independencia y autonomía.' },
    { id: 'vf', icon: '⚖️', titulo: 'Verdadero o Falso', desc: 'Evalúa tu conocimiento sobre los sucesos históricos de Nicaragua.' },
    { id: 'frase', icon: '✍️', titulo: 'Complete la Frase', desc: 'Rellena los espacios en blanco de las citas y documentos históricos.' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Encabezado de la sección */}
      <div className="bg-[#002B59]/80 backdrop-blur-md border border-[#0067C6] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="franja-nicaragua absolute top-0 left-0 w-full"></div>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-white drop-shadow-md text-center">
          Prueba tus Conocimientos
        </h2>
        <p className="text-center text-blue-200 mt-2 max-w-2xl mx-auto">
          Selecciona una de las actividades interactivas para repasar los hitos históricos de nuestra soberanía.
        </p>
      </div>

      {/* Menú de selección o actividad activa */}
      {!actividadActual ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tarjetas.map((t) => (
            <button
              key={t.id}
              onClick={() => setActividadActual(t.id)}
              disabled={t.id === 'frase'} // Deshabilitado temporalmente
              className={`bg-[#002B59]/60 border-2 border-[#0067C6]/50 rounded-2xl p-6 text-left transition-all duration-300 shadow-lg group relative overflow-hidden
                ${t.id === 'frase' ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#E5A823] hover:bg-[#003d7a]/80 hover:-translate-y-1'}`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{t.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{t.titulo}</h3>
              <p className="text-sm text-blue-200">{t.desc}</p>
              
              {t.id === 'frase' && (
                <span className="absolute top-4 right-4 bg-[#E5A823] text-[#002B59] text-xs font-bold px-2 py-1 rounded-full">
                  Próximamente
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-[#002B59]/60 border border-[#0067C6]/50 rounded-2xl p-6 shadow-xl relative">
          <button 
            onClick={() => setActividadActual(null)}
            className="mb-4 text-[#E5A823] hover:text-white font-bold flex items-center gap-2 transition-colors"
          >
            ← Volver al menú de pruebas
          </button>
          
          {actividadActual === 'crucigrama' && <Crucigrama />}
          {actividadActual === 'vf' && <VerdaderoFalso />}
        </div>
      )}
    </div>
  );
};