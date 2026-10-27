import React, { useState, useEffect } from 'react';
import { TRAYECTOS_HISTORICOS } from '../data/trayectosData';
import { ImagePlaceholder, EscudoNacionalIcon, SandinoSiluetaIcon, GuardabarrancoIcon, SacuanjocheIcon, VolcanMomotomboIcon } from '../components/NicaraguaSymbols';

export const Museo = ({ onIrATrivia }) => {
  const [trayectoActivoId, setTrayectoActivoId] = useState(TRAYECTOS_HISTORICOS[0].id);
  const [imagenModal, setImagenModal] = useState(null);

  const trayectoActual = TRAYECTOS_HISTORICOS.find(t => t.id === trayectoActivoId) || TRAYECTOS_HISTORICOS[0];

  // Permitir cerrar el modal con la tecla Escape
  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key === 'Escape') setImagenModal(null);
    };
    if (imagenModal) {
      window.addEventListener('keydown', manejarTecla);
    }
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [imagenModal]);

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
            Trayectos Históricos
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline bg-white/50 px-2 py-1 rounded backdrop-blur-sm">
            Selecciona un eje temático
          </span>
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
            Contexto y Significado Histórico
          </h3>
          <p className="leading-relaxed text-sm sm:text-base font-sans p-5 rounded-2xl border border-slate-100 shadow-sm bg-sky-900 text-white">
            {trayectoActual.descripcionLarga}
          </p>
        </div>

        {/* Galería de Imágenes (Con apertura en Modal al hacer clic) */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-black text-sky-900 flex items-center gap-2">
              Galería y Evidencia
            </h3>
            <span className="text-[11px] text-sky-700 font-semibold bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
              Haz clic en cualquier imagen para ampliarla
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trayectoActual.galeriaImagenes.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setImagenModal(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setImagenModal(img);
                }}
                className="group relative border border-slate-200 hover:border-sky-400 rounded-2xl p-1 bg-slate-50/50 cursor-pointer transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-700"
              >
                <ImagePlaceholder
                  src={`/assets/images/${img.archivo}`}
                  alt={img.descripcion}
                  tipo={img.tipo}
                  titulo={img.titulo}
                  subtitulo={img.descripcion}
                  archivoEsperado={img.archivo}
                />
                {/* Etiqueta flotante para indicar que se puede ampliar */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-sky-900 text-[10px] font-extrabold uppercase tracking-wider border border-slate-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Ampliar vista
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Línea de Hitos Cronológicos */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-sky-900 flex items-center gap-2">
            Hitos Trascendentales
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

      {/* =========================================================
          MODAL DE IMAGEN AMPLIADA
         ========================================================= */}
      {imagenModal && (
        <div
          onClick={() => setImagenModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Franja superior en azul acero */}
            <div className="h-1.5 bg-sky-700 w-full shrink-0"></div>

            {/* Cabecera del Modal con el título de la imagen seleccionada */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/70">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-sky-800 text-white text-[10px] font-bold uppercase tracking-wider">
                    Trayecto {trayectoActual.numero}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100 text-[10px] font-mono font-bold">
                    {trayectoActual.periodo}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-black text-sky-900">
                  {imagenModal.titulo}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {imagenModal.descripcion}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setImagenModal(null)}
                aria-label="Cerrar modal"
                className="shrink-0 w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-sky-900 border border-slate-200 flex items-center justify-center font-bold text-sm transition-colors shadow-sm"
              >
                ✕
              </button>
            </div>

            {/* Cuerpo del Modal (Imagen + Explicación directa un poco más grande) */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Vista ampliada de la imagen */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100/60">
                <ImagePlaceholder
                  src={`/assets/images/${imagenModal.archivo}`}
                  alt={imagenModal.descripcion}
                  tipo={imagenModal.tipo}
                  titulo={imagenModal.titulo}
                  subtitulo={imagenModal.descripcion}
                  archivoEsperado={imagenModal.archivo}
                  className="h-64 sm:h-96"
                />
              </div>

              {/* Explicación sin título, con letra ligeramente más grande */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-medium">
                  {trayectoActual.descripcionLarga}
                </p>
              </div>
            </div>

            {/* Pie del Modal sin texto de archivo en la esquina inferior izquierda */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setImagenModal(null)}
                className="px-5 py-2 rounded-xl bg-sky-800 hover:bg-sky-900 text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm"
              >
                Cerrar Vista
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};