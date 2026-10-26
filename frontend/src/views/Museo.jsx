import React, { useState } from 'react';
import { TRAYECTOS_HISTORICOS } from '../data/trayectosData';
import { ImagePlaceholder, EscudoNacionalIcon, SandinoSiluetaIcon, GuardabarrancoIcon, SacuanjocheIcon, VolcanMomotomboIcon } from '../components/NicaraguaSymbols';

export const Museo = ({ onIrATrivia }) => {
  const [trayectoActivoId, setTrayectoActivoId] = useState(TRAYECTOS_HISTORICOS[0].id);

  const trayectoActual = TRAYECTOS_HISTORICOS.find(t => t.id === trayectoActivoId) || TRAYECTOS_HISTORICOS[0];

  const renderIconoPestaña = (id) => {
    switch (id) {
      case 'raices': return <EscudoNacionalIcon className="w-5 h-5" />;
      case 'antiimperialismo': return <SandinoSiluetaIcon className="w-5 h-5" />;
      case 'revolucion': return <SacuanjocheIcon className="w-5 h-5" />;
      case 'caribe': return <GuardabarrancoIcon className="w-5 h-5" />;
      default: return <VolcanMomotomboIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-700">
      
      {/* Banner Principal - Monocromático Suave (Translúcido) */}
      <section className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md border border-slate-200 p-6 sm:p-10 shadow-sm">
        {/* Franja decorativa sutil en azul acero */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-700/80"></div>

        {/* Marca de agua del Escudo (Casi invisible) */}
        <div className="absolute -right-10 -bottom-10 opacity-[0.02] pointer-events-none">
          <EscudoNacionalIcon className="w-80 h-80 text-sky-900" />
        </div>

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-md bg-slate-100/80 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200">
              Pabellón de la Memoria Viva
            </span>
            <span className="px-3 py-1 rounded-md bg-sky-50/80 text-sky-800 border border-sky-100/50 text-xs font-bold tracking-wider">
              Historia y Soberanía
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-sky-900 leading-tight tracking-tight">
            Ecos de Soberanía
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-medium">
            Recorre los cuatro trayectos cardinales que forjaron la autodeterminación, la dignidad y el carácter multiétnico de Nicaragua. La historia no es un recuerdo estático: es la raíz activa de nuestro porvenir patrio.
          </p>
        </div>
      </section>

      {/* Selector de los 4 Trayectos Históricos */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="text-white">🧭</span> Trayectos Históricos
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline bg-white/50 px-2 py-1 rounded backdrop-blur-sm">Selecciona un eje temático</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {TRAYECTOS_HISTORICOS.map((t) => {
            const esActivo = t.id === trayectoActivoId;
            return (
              <button
                key={t.id}
                onClick={() => setTrayectoActivoId(t.id)}
                className={`flex flex-col items-start p-4 rounded-2xl transition-all duration-300 relative overflow-hidden group text-left w-full ${
                  esActivo
                    ? 'bg-white/95 backdrop-blur-md border-2 border-sky-700 shadow-md scale-[1.02] z-10'
                    : 'bg-white/50 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md hover:bg-white/80 hover:border-sky-300'
                }`}
              >
                {/* Indicador de activo superior */}
                {esActivo && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-sky-700"></div>
                )}

                <div className="flex items-center justify-between w-full mb-2.5">
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                    esActivo 
                      ? 'bg-sky-800 text-white' 
                      : 'bg-slate-200/50 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-800'
                  }`}>
                    Trayecto {t.numero}
                  </span>
                  <div className={`transition-transform duration-300 ${esActivo ? 'scale-110 text-sky-800' : 'text-slate-400 group-hover:text-sky-700 group-hover:scale-110'}`}>
                    {renderIconoPestaña(t.id)}
                  </div>
                </div>

                <h3 className={`text-sm sm:text-base font-extrabold leading-snug line-clamp-2 transition-colors ${
                  esActivo ? 'text-sky-900' : 'text-slate-700 group-hover:text-sky-800'
                }`}>
                  {t.nombre}
                </h3>
                
                <p className={`text-[10px] sm:text-[11px] font-mono mt-1 font-semibold transition-colors ${
                  esActivo ? 'text-sky-700' : 'text-slate-500'
                }`}>
                  {t.periodo}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Contenido Inmersivo del Trayecto Activo */}
      <section className="bg-white/90 backdrop-blur-md border-t-4 border-t-sky-800 border-x border-b border-slate-200 rounded-b-3xl p-6 sm:p-10 space-y-8 shadow-sm relative overflow-hidden">
        
        {/* Cabecera del Trayecto */}
        <div className="border-b border-slate-200 pb-6 space-y-2 mt-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-sky-50 text-sky-800 text-xs font-mono font-bold border border-sky-100">
              Periodo {trayectoActual.periodo}
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
              Trayecto {trayectoActual.numero}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-sky-900">
            {trayectoActual.nombre}
          </h2>
          <p className="text-base text-slate-600 font-medium">
            {trayectoActual.subtitulo}
          </p>
        </div>

        {/* Cita Textual de Época (Toque académico con borde azul acero) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border-l-4 border-sky-700 shadow-sm relative ">
          <span className="text-5xl text-slate-200 font-serif absolute top-2 right-4 leading-none">“</span>
          <p className="text-base sm:text-lg italic font-serif leading-relaxed font-medium relative z-10 text-slate-700">
            "{trayectoActual.citaHistorica.texto}"
          </p>
          <div className="mt-4 flex items-center justify-between text-xs font-bold pt-3 border-t border-slate-200/60">
            <span className="text-sky-900 font-black">— {trayectoActual.citaHistorica.autor}</span>
            <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500 shadow-sm">{trayectoActual.citaHistorica.año}</span>
          </div>
        </div>

        {/* Descripción Histórica */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-sky-900 flex items-center gap-2">
            <span className="text-xl">📖</span> Contexto y Significado Histórico
          </h3>
          <p className="leading-relaxed text-sm sm:text-base font-sans bg-slate-50/50 p-5 rounded-2xl border border-slate-100 shadow-sm bg-sky-900 text-white">
            {trayectoActual.descripcionLarga}
          </p>
        </div>

        {/* Galería de Imágenes */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-black text-sky-900 flex items-center gap-2">
              <span className="text-xl text-sky-700">🖼️</span> Galería y Evidencia
            </h3>
            <span className="text-[10px] text-slate-400 font-mono font-medium bg-white px-2.5 py-1 rounded border border-slate-100">
              Archivos en: /public/assets/images/
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trayectoActual.galeriaImagenes.map((img, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl p-1 bg-slate-50/50">
                <ImagePlaceholder
                  src={`/assets/images/${img.archivo}`}
                  alt={img.descripcion}
                  tipo={img.tipo}
                  titulo={img.titulo}
                  subtitulo={img.descripcion}
                  archivoEsperado={img.archivo}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Línea de Hitos Cronológicos */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-sky-900 flex items-center gap-2">
            <span className="text-xl text-sky-700">⏳</span> Hitos Trascendentales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trayectoActual.hitos.map((hito, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all space-y-2 group"
              >
                <span className="inline-block px-2.5 py-1 rounded bg-slate-50 text-[11px] font-mono font-black text-sky-800 border border-slate-200 group-hover:bg-sky-800 group-hover:text-white transition-colors">
                  {hito.año}
                </span>
                <h4 className="text-sm font-extrabold text-slate-800 leading-snug">{hito.titulo}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{hito.detalle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Llamado a la Acción hacia la Trivia (Tonos profundos invertidos) */}
        <div className="mt-8 p-6 rounded-2xl bg-sky-900 border border-sky-800 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md relative overflow-hidden">
          {/* Adorno de fondo oscuro y suave */}
          <div className="absolute -left-4 -top-4 w-24 h-24 bg-sky-700 rounded-full blur-2xl opacity-40"></div>
          
          <div className="space-y-1.5 text-center sm:text-left relative z-10">
            <h4 className="text-lg font-serif font-black text-sky-50">
              ¿Qué habrías decidido tú en estos momentos cruciales?
            </h4>
            <p className="text-xs sm:text-sm text-sky-200/80 font-medium">
              Ponte a prueba en la <strong className="text-white">Línea de Decisiones Soberanas</strong> y descubre tu nivel de apropiación patriótica.
            </p>
          </div>
          <button
            onClick={onIrATrivia}
            className="relative z-10 shrink-0 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-sky-900 font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Tomar Postura Histórica ➔
          </button>
        </div>

      </section>
    </div>
  );
};