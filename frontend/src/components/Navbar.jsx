import React from 'react';
import { EscudoNacionalIcon, BanderaNicaraguaBadge } from './NicaraguaSymbols';

export const Navbar = ({ vistaActual, setVistaActual, abrirModalQR, ipInfo }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0067C6] border-b-2 border-white/30 shadow-lg">
      {/* Franja Bandera Superior (Azul - Blanco - Azul) */}
      <div className="franja-nicaragua"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo e Identidad Nacional */}
          <div 
            onClick={() => setVistaActual('museo')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="p-1.5 rounded-xl bg-white shadow-md border-2 border-nica-gold group-hover:scale-105 transition-transform duration-300">
              <EscudoNacionalIcon className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white drop-shadow">
                  Ecos de Soberanía
                </span>
                <span className="hidden md:inline-block">
                  <BanderaNicaraguaBadge />
                </span>
              </div>
              <p className="text-xs text-blue-100 tracking-wider uppercase font-semibold hidden sm:block">
                Digitalizando la Memoria y la Identidad Nacional de Nicaragua
              </p>
            </div>
          </div>

          {/* Menú de Navegación Principal con las 3 Vistas */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setVistaActual('museo')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 ${
                vistaActual === 'museo'
                  ? 'bg-white text-[#0067C6] shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <span>🏛️</span>
              <span className="hidden sm:inline">Museo Virtual</span>
              <span className="sm:hidden">Museo</span>
            </button>

            <button
              onClick={() => setVistaActual('mapa')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 ${
                vistaActual === 'mapa'
                  ? 'bg-white text-[#0067C6] shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <span>🗺️</span>
              <span className="hidden sm:inline">Mapa Interactivo</span>
              <span className="sm:hidden">Mapa</span>
            </button>

            <button
              onClick={() => setVistaActual('trivia')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 ${
                vistaActual === 'trivia'
                  ? 'bg-white text-[#0067C6] shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <span>⚖️</span>
              <span className="hidden sm:inline">Línea de Decisiones</span>
              <span className="sm:hidden">Trivia</span>
            </button>

            <button
              onClick={() => setVistaActual('prueba')}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-1.5 ${
                vistaActual === 'prueba'
                  ? 'bg-white text-[#0067C6] shadow-md scale-105'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              <span>🧠</span>
              <span className="hidden sm:inline">Prueba tus Conocimientos</span>
              <span className="sm:hidden">Prueba</span>
            </button>

            {/* Botón QR en Dorado del Escudo Nacional */}
            <button
              onClick={abrirModalQR}
              title="Escanear para abrir en tu celular (Red Local Offline)"
              className="ml-1 sm:ml-2 px-3 py-2 rounded-xl bg-[#E5A823] hover:bg-[#F59E0B] text-[#002B59] font-black text-xs flex items-center gap-1.5 transition-all duration-300 shadow-md hover:scale-105"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#002B59]"></span>
              </span>
              <span>📱 Conectar</span>
              <span className="hidden lg:inline text-[10px] text-[#002B59]/80 font-mono">({ipInfo?.ip_local || 'LAN'})</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
