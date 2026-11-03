import React, { useState } from 'react';
import { EscudoNacionalIcon, SacuanjocheIcon } from './NicaraguaSymbols';

export const Navbar = ({ vistaActual, setVistaActual, abrirModalQR, ipInfo }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const enlaces = [
    { id: 'museo', label: 'MUSEO VIRTUAL', labelCorto: 'MUSEO' },
    { id: 'mapa', label: 'MAPA INTERACTIVO', labelCorto: 'MAPA' },
    { id: 'video1', label: 'VIDEO SAN JACINTO', labelCorto: 'VIDEO I' },
    // { id: 'video2', label: 'VIDEO II: SOBERANÍA', labelCorto: 'VIDEO II' },
    // { id: 'trivia', label: 'LÍNEA DE DECISIONES', labelCorto: 'DECISIONES' },
    { id: 'prueba', label: 'PRUEBA TUS CONOCIMIENTOS', labelCorto: 'PRUEBA' }
  ];

  const seleccionarVista = (id) => {
    setVistaActual(id);
    setMenuAbierto(false);
  };

  return (
    <header className="w-full fixed top-0 z-40 bg-white border-b-2 border-[#0067C6] shadow-sm font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Altura reducida a h-14 (56px) en móvil y h-16 (64px) en escritorio */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          
          {/* Bloque Izquierdo: Doble Logo Institucional Compacto */}
          <div 
            onClick={() => seleccionarVista('museo')}
            className="flex items-center gap-2.5 sm:gap-4 cursor-pointer group shrink-0"
          >
            {/* Sub-bloque 1: Identidad Institucional */}
            <div className="flex items-center gap-2 pr-2.5 sm:pr-4 border-r border-slate-200">
              <div className="p-0.5 rounded-lg bg-white group-hover:scale-105 transition-transform duration-300">
                <EscudoNacionalIcon className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <div className="hidden xl:flex flex-col justify-center leading-tight">
                <span className="text-[10px] font-extrabold text-[#0072CE] tracking-tight">
                  Digitalizando la Memoria
                </span>
                <span className="text-[10px] font-extrabold text-[#0072CE] tracking-tight">
                  y la Identidad Nacional
                </span>
                <span className="text-[10px] font-serif italic font-bold text-[#E6007E]">
                  ¡Feria Universitaria!
                </span>
              </div>
            </div>
          </div>

          {/* Menú de Navegación Desktop */}
          <nav className="hidden lg:flex flex-1 items-center">
            
            {/* Contenedor de enlaces centrado con mx-auto */}
            <div className="mx-auto flex items-center gap-3 xl:gap-5">
              {enlaces.map((item) => {
                const activo = vistaActual === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => seleccionarVista(item.id)}
                    className={`relative py-1.5 text-[11px] xl:text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                      activo
                        ? 'text-[#0067C6]'
                        : 'text-slate-800 hover:text-[#0067C6]'
                    }`}
                  >
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="xl:hidden">{item.labelCorto}</span>
                    
                    {/* Indicador inferior en Azul Bandera de Nicaragua */}
                    {activo && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0067C6] rounded-full animate-fadeIn" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Controles Móviles (Botón Hamburguesa) */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir menú de navegación"
              className="p-1.5 rounded-lg text-[#0067C6] hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {menuAbierto ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Menú Desplegable Móvil / Tablet (con Azul Bandera activo) */}
      {menuAbierto && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-xl">
          {enlaces.map((item) => {
            const activo = vistaActual === item.id;
            return (
              <button
                key={item.id}
                onClick={() => seleccionarVista(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-between transition-colors ${
                  activo
                    ? 'bg-blue-50 text-[#0067C6] border-l-4 border-[#0067C6]'
                    : 'text-slate-800 hover:bg-slate-50 hover:text-[#0067C6]'
                }`}
              >
                <span>{item.label}</span>
                {activo && <span className="h-2 w-2 rounded-full bg-[#0067C6]" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};