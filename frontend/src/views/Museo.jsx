import React, { useState } from 'react';
import { TRAYECTOS_HISTORICOS } from '../data/trayectosData';
import { ImagePlaceholder, EscudoNacionalIcon, SandinoSiluetaIcon, GuardabarrancoIcon, SacuanjocheIcon, VolcanMomotomboIcon, BanderaNicaraguaBadge } from '../components/NicaraguaSymbols';

export const Museo = ({ onIrATrivia }) => {
  const [trayectoActivoId, setTrayectoActivoId] = useState(TRAYECTOS_HISTORICOS[0].id);

  const trayectoActual = TRAYECTOS_HISTORICOS.find(t => t.id === trayectoActivoId) || TRAYECTOS_HISTORICOS[0];

  const renderIconoPestaña = (id) => {
    switch (id) {
      case 'raices': return <EscudoNacionalIcon className="w-5 h-5" />;
      case 'antiimperialismo': return <SandinoSiluetaIcon className="w-5 h-5 text-nica-gold" />;
      case 'revolucion': return <SacuanjocheIcon className="w-5 h-5" />;
      case 'caribe': return <GuardabarrancoIcon className="w-5 h-5" />;
      default: return <VolcanMomotomboIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner Principal con la Colorimetría de la Bandera de Nicaragua */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#004B91] via-[#0067C6] to-[#003B77] border-2 border-white/40 p-6 sm:p-10 shadow-2xl">
        {/* Franja decorativa tricolor */}
        <div className="absolute top-0 left-0 right-0 franja-nicaragua"></div>

        <div className="absolute -right-10 -bottom-10 opacity-15 pointer-events-none">
          <EscudoNacionalIcon className="w-80 h-80" />
        </div>

        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white text-[#0067C6] text-xs font-black uppercase tracking-wider shadow">
              🇳🇮 Pabellón de la Memoria Viva
            </span>
            <span className="px-3 py-1 rounded-full bg-[#E5A823] text-[#002B59] text-xs font-black tracking-wider shadow">
              Azul y Blanco Soberano
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight drop-shadow-md">
            Ecos de Soberanía
          </h1>

          <p className="text-base sm:text-lg text-blue-50 leading-relaxed font-sans">
            Recorre los cuatro trayectos cardinales que forjaron la autodeterminación, la dignidad y el carácter multiétnico de Nicaragua. La historia no es un recuerdo estático: es la raíz activa de nuestro porvenir patrio.
          </p>
        </div>
      </section>

      {/* Selector de los 4 Trayectos Históricos */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#E5A823] flex items-center gap-2">
            <span>🧭</span> Trayectos Históricos del Museo
          </h2>
          <span className="text-xs text-blue-200">Selecciona un eje temático</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRAYECTOS_HISTORICOS.map((t) => {
            const esActivo = t.id === trayectoActivoId;
            return (
              <button
                key={t.id}
                onClick={() => setTrayectoActivoId(t.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group shadow-md ${
                  esActivo
                    ? 'bg-white text-[#003B77] border-[#E5A823] shadow-gold-glow scale-[1.02]'
                    : 'bg-[#002D5E] text-white border-white/20 hover:border-white hover:bg-[#003C7A]'
                }`}
              >
                {/* Franja superior en la tarjeta activa */}
                {esActivo && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0067C6]"></div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-serif font-black px-2 py-0.5 rounded ${
                    esActivo ? 'bg-[#0067C6] text-white' : 'bg-white/15 text-blue-100'
                  }`}>
                    Trayecto {t.numero}
                  </span>
                  <div className="group-hover:scale-110 transition-transform">
                    {renderIconoPestaña(t.id)}
                  </div>
                </div>

                <h3 className={`text-sm sm:text-base font-bold leading-snug line-clamp-2 ${
                  esActivo ? 'text-[#002B59]' : 'text-white'
                }`}>
                  {t.nombre}
                </h3>
                <p className={`text-[11px] font-mono mt-1 font-bold ${
                  esActivo ? 'text-[#0067C6]' : 'text-blue-300'
                }`}>
                  {t.periodo}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Contenido Inmersivo del Trayecto Activo */}
      <section className="bg-gradient-to-b from-[#00366F] to-[#001F42] border-2 border-[#0067C6] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Franja de la bandera */}
        <div className="absolute top-0 left-0 right-0 franja-nicaragua"></div>

        {/* Cabecera del Trayecto */}
        <div className="border-b border-white/20 pb-6 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#E5A823] text-[#002B59] text-xs font-mono font-black">
              Periodo {trayectoActual.periodo}
            </span>
            <span className="text-xs text-blue-200 uppercase tracking-widest font-bold">
              Trayecto {trayectoActual.numero}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
            {trayectoActual.nombre}
          </h2>
          <p className="text-base text-blue-200 font-semibold">
            {trayectoActual.subtitulo}
          </p>
        </div>

        {/* Cita Textual de Época */}
        <div className="p-5 rounded-2xl bg-white text-[#002B59] border-l-8 border-[#0067C6] shadow-xl relative">
          <span className="text-5xl text-[#0067C6]/20 font-serif absolute top-1 right-4">“</span>
          <p className="text-base sm:text-lg italic font-serif leading-relaxed font-semibold">
            "{trayectoActual.citaHistorica.texto}"
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-[#004B91] font-bold border-t border-gray-200 pt-2">
            <span className="text-[#0067C6] font-black">— {trayectoActual.citaHistorica.autor}</span>
            <span className="bg-blue-100 px-2 py-0.5 rounded text-[#0067C6]">{trayectoActual.citaHistorica.año}</span>
          </div>
        </div>

        {/* Descripción Histórica */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>📖</span> Contexto y Significado Histórico
          </h3>
          <p className="text-blue-50 leading-relaxed text-sm sm:text-base font-sans bg-[#002852]/80 p-5 rounded-2xl border border-white/10">
            {trayectoActual.descripcionLarga}
          </p>
        </div>

        {/* Galería de Imágenes (Con placeholders temáticos para los archivos del usuario) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>🖼️</span> Galería y Evidencia Histórica
            </h3>
            <span className="text-xs text-[#E5A823] font-mono font-bold bg-[#002852] px-3 py-1 rounded-full border border-[#E5A823]/40">
              📸 Guarda tus imágenes en /public/assets/images/
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trayectoActual.galeriaImagenes.map((img, idx) => (
              <ImagePlaceholder
                key={idx}
                src={`/assets/images/${img.archivo}`}
                alt={img.descripcion}
                tipo={img.tipo}
                titulo={img.titulo}
                subtitulo={img.descripcion}
                archivoEsperado={img.archivo}
              />
            ))}
          </div>
        </div>

        {/* Línea de Hitos Cronológicos */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span>⏳</span> Hitos Trascendentales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trayectoActual.hitos.map((hito, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white text-[#002B59] border-2 border-[#0067C6] hover:shadow-lg transition-all space-y-1.5"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0067C6] text-xs font-mono font-black text-white">
                  {hito.año}
                </span>
                <h4 className="text-sm font-extrabold leading-snug">{hito.titulo}</h4>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">{hito.detalle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Llamado a la Acción hacia la Trivia */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0067C6] to-[#004B91] border-2 border-[#E5A823] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-serif font-black text-white">
              ¿Qué habrías decidido tú en estos momentos cruciales?
            </h4>
            <p className="text-xs text-blue-100 font-medium">
              Ponte a prueba en la <strong>Línea de Decisiones Soberanas</strong> y descubre tu nivel de apropiación patriótica.
            </p>
          </div>
          <button
            onClick={onIrATrivia}
            className="px-6 py-3 rounded-xl bg-[#E5A823] hover:bg-[#F59E0B] text-[#002B59] font-black text-sm tracking-wide shadow-gold-glow hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Tomar Postura Histórica ➔
          </button>
        </div>

      </section>
    </div>
  );
};
