import React, { useState } from 'react';
import { DEPARTAMENTOS_DATA } from '../data/departamentosData';
import { ImagePlaceholder, EscudoNacionalIcon } from '../components/NicaraguaSymbols';

export const MapaInteractivo = () => {
  const [deptoSeleccionadoId, setDeptoSeleccionadoId] = useState(DEPARTAMENTOS_DATA[0].id);
  const [filtroRegion, setFiltroRegion] = useState('Todas'); // 'Todas', 'Pacífico', 'Norte y Central', 'Costa Caribe'

  const deptoActivo = DEPARTAMENTOS_DATA.find(d => d.id === deptoSeleccionadoId) || DEPARTAMENTOS_DATA[0];

  const deptosFiltrados = filtroRegion === 'Todas' 
    ? DEPARTAMENTOS_DATA 
    : DEPARTAMENTOS_DATA.filter(d => d.region === filtroRegion);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner Principal del Mapa */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#004B91] via-[#0067C6] to-[#003B77] border-2 border-white/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 left-0 right-0 franja-nicaragua"></div>
        
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#0067C6] text-xs font-black uppercase tracking-wider shadow">
              🗺️ Cartografía Soberana de Nicaragua
            </span>
            <span className="px-3 py-1 rounded-full bg-[#E5A823] text-[#002B59] text-xs font-black tracking-wider shadow">
              15 Departamentos • 2 Regiones Autónomas
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight drop-shadow-md">
            Geografía de la Memoria y la Soberanía
          </h1>

          <p className="text-base sm:text-lg text-blue-50 leading-relaxed font-sans">
            Toca o haz clic sobre cualquier departamento o región en el mapa para descubrir los acontecimientos históricos, las batallas patrióticas y los héroes que forjaron la identidad de esa tierra.
          </p>
        </div>
      </section>

      {/* Filtros por Macro-Región */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#002D5E] p-3.5 rounded-2xl border-2 border-[#0067C6] shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#E5A823] uppercase tracking-wider">Filtrar Región:</span>
          {['Todas', 'Pacífico', 'Norte y Central', 'Costa Caribe'].map(reg => (
            <button
              key={reg}
              onClick={() => setFiltroRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filtroRegion === reg
                  ? 'bg-white text-[#0067C6] shadow-md scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {reg} {reg === 'Todas' ? `(${DEPARTAMENTOS_DATA.length})` : `(${DEPARTAMENTOS_DATA.filter(d => d.region === reg).length})`}
            </button>
          ))}
        </div>

        <span className="text-xs text-blue-200 hidden sm:inline font-mono">
          Seleccionado: <strong className="text-white">{deptoActivo.nombre}</strong>
        </span>
      </div>

      {/* Grid: Mapa Interactivo a la Izquierda + Panel Histórico a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA MAPA (7 columnas en desktop) */}
        <div className="lg:col-span-7 bg-[#002D5E] border-2 border-[#0067C6] rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="franja-nicaragua" style="position: absolute; top: 0; left: 0; right: 0;"></div>
          
          <div className="flex items-center justify-between mb-4 mt-2">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>📍</span> Mapa Interactivo de Nicaragua
            </h2>
            <span className="text-[11px] text-[#E5A823] bg-[#001D3D] px-2.5 py-1 rounded-full font-bold border border-[#E5A823]/40">
              Toca un punto o nombre
            </span>
          </div>

          {/* Contenedor del Mapa con Pines Interactivos */}
          <div className="relative mx-auto rounded-2xl overflow-hidden border-2 border-white/20 bg-[#001F42] shadow-inner max-w-[550px]">
            <img 
              src="./assets/images/mapa_nicaragua.png" 
              onError={(e) => {
                if (!e.target.dataset.tried) {
                  e.target.dataset.tried = '1';
                  e.target.src = './assets/mapa_nicaragua.png';
                }
              }}
              alt="Mapa Departamental de Nicaragua" 
              className="w-full h-auto block select-none pointer-events-none"
            />

            {/* Puntos y Pines Interactivos Superpuestos */}
            {DEPARTAMENTOS_DATA.map(d => {
              const esActivo = d.id === deptoSeleccionadoId;
              const coincideFiltro = filtroRegion === 'Todas' || d.region === filtroRegion;

              return (
                <button
                  key={d.id}
                  onClick={() => setDeptoSeleccionadoId(d.id)}
                  title={`${d.nombre} (${d.cabecera})`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 group focus:outline-none ${
                    !coincideFiltro ? 'opacity-30 scale-75' : 'opacity-100'
                  }`}
                >
                  <span className="relative flex items-center justify-center">
                    {/* Anillo de pulso si está activo */}
                    {esActivo && (
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#E5A823] opacity-75"></span>
                    )}

                    {/* Pin del departamento */}
                    <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg transition-transform ${
                      esActivo
                        ? 'bg-[#E5A823] text-[#002B59] ring-4 ring-white scale-125 z-30'
                        : 'bg-[#0067C6] text-white ring-2 ring-white hover:scale-110 hover:bg-[#E5A823] hover:text-[#002B59]'
                    }`}>
                      ★
                    </span>
                  </span>

                  {/* Etiqueta flotante */}
                  <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                    esActivo
                      ? 'bg-white text-[#002B59] opacity-100 scale-105 z-30 font-black'
                      : 'bg-[#002B59]/90 text-white opacity-0 group-hover:opacity-100'
                  }`}>
                    {d.nombre}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carrusel / Botonera rápida de departamentos filtrados */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <p className="text-xs text-blue-200 mb-2 font-bold uppercase tracking-wider">
              Acceso Rápido por Departamento:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {deptosFiltrados.map(d => {
                const esActivo = d.id === deptoSeleccionadoId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDeptoSeleccionadoId(d.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      esActivo
                        ? 'bg-[#E5A823] text-[#002B59] shadow-md scale-105'
                        : 'bg-[#001D3D] text-white hover:bg-white/15 border border-white/10'
                    }`}
                  >
                    {d.nombre}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMNA PANEL DE INFORMACIÓN HISTÓRICA (5 columnas en desktop) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#003B77] to-[#00224A] border-2 border-[#0067C6] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden space-y-6">
          <div className="franja-nicaragua" style="position: absolute; top: 0; left: 0; right: 0;"></div>

          {/* Encabezado del Departamento */}
          <div className="border-b-2 border-white/20 pb-4 mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="px-3 py-0.5 rounded-full bg-[#E5A823] text-[#002B59] text-xs font-mono font-black">
                {deptoActivo.region}
              </span>
              <span className="text-xs text-blue-200 font-bold">
                Cabecera: <strong className="text-white">{deptoActivo.cabecera}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white mt-2">
              {deptoActivo.nombre}
            </h2>
          </div>

          {/* Hito Histórico Principal */}
          <div className="bg-white text-[#002B59] p-4 rounded-2xl border-l-8 border-[#0067C6] shadow-lg space-y-1">
            <div className="flex items-center justify-between text-xs font-black text-[#0067C6]">
              <span>⚔️ HITO DE SOBERANÍA</span>
              <span className="bg-blue-100 px-2 py-0.5 rounded font-mono">{deptoActivo.año}</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold leading-snug">
              {deptoActivo.hitoPrincipal}
            </h3>
          </div>

          {/* Personajes y Sitio Emblemático */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#002B59] p-3 rounded-xl border border-white/10">
              <span className="text-[#E5A823] font-bold block mb-0.5">👤 Héroes y Protagonistas:</span>
              <p className="text-white font-medium">{deptoActivo.personajes}</p>
            </div>
            <div className="bg-[#002B59] p-3 rounded-xl border border-white/10">
              <span className="text-cyan-300 font-bold block mb-0.5">🏛️ Sitio Emblemático:</span>
              <p className="text-white font-medium">{deptoActivo.sitioEmblematico}</p>
            </div>
          </div>

          {/* Relato Histórico */}
          <div className="bg-[#002852]/80 p-4 rounded-2xl border border-white/10 space-y-2">
            <h4 className="text-xs font-extrabold text-[#E5A823] uppercase tracking-wider">
              📖 Memoria y Significado Histórico:
            </h4>
            <p className="text-xs sm:text-sm text-blue-50 leading-relaxed font-sans font-medium">
              {deptoActivo.relato}
            </p>
          </div>

          {/* Cita Textual */}
          {deptoActivo.cita && (
            <blockquote className="p-3 bg-white/10 rounded-xl border-l-4 border-[#E5A823] text-xs italic text-blue-100 font-serif">
              {deptoActivo.cita}
            </blockquote>
          )}

          {/* Espacio para Imagen del Departamento */}
          <div>
            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
              <span>🖼️</span> Registro Gráfico de {deptoActivo.nombre}:
            </h4>
            <ImagePlaceholder
              src={`/assets/images/${deptoActivo.imagen}`}
              alt={`Fotografía histórica de ${deptoActivo.nombre}`}
              tipo={deptoActivo.id.includes('segovia') || deptoActivo.id.includes('jinotega') ? 'sandino' : deptoActivo.id.includes('caribe') ? 'costa_caribe' : 'san_jacinto'}
              titulo={`Registro Histórico: ${deptoActivo.nombre}`}
              subtitulo={deptoActivo.sitioEmblematico}
              archivoEsperado={deptoActivo.imagen}
              className="h-44"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
