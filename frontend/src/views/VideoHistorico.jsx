import React, { useState, useEffect, useRef } from 'react';
import { VIDEOS_DATA, LISTA_VIDEOS } from '../data/videoData';

export const VideoHistorico = ({ videoData = null, mostrarSelector = true }) => {
  const [videoActivo, setVideoActivo] = useState(videoData || VIDEOS_DATA.video1);
  const [luzAmbienteActiva, setLuzAmbienteActiva] = useState(true);
  const [errorVideo, setErrorVideo] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animacionRef = useRef(null);

  useEffect(() => {
    if (videoData) {
      setVideoActivo(videoData);
      setErrorVideo(false);
    }
  }, [videoData]);

  // Efecto Ambient Mode (Iluminación difuminada en los bordes estilo YouTube)
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });

    const pintarFotograma = () => {
      if (!video.paused && !video.ended && luzAmbienteActiva) {
        try {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } catch {
          // Ignorar errores de CORS si se usa un video externo
        }
        animacionRef.current = requestAnimationFrame(pintarFotograma);
      }
    };

    const alReproducir = () => {
      if (luzAmbienteActiva) {
        animacionRef.current = requestAnimationFrame(pintarFotograma);
      }
    };

    const alPausarOSaltar = () => {
      cancelAnimationFrame(animacionRef.current);
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch {}
    };

    video.addEventListener('play', alReproducir);
    video.addEventListener('pause', alPausarOSaltar);
    video.addEventListener('seeked', alPausarOSaltar);
    video.addEventListener('loadeddata', alPausarOSaltar);

    return () => {
      cancelAnimationFrame(animacionRef.current);
      video.removeEventListener('play', alReproducir);
      video.removeEventListener('pause', alPausarOSaltar);
      video.removeEventListener('seeked', alPausarOSaltar);
      video.removeEventListener('loadeddata', alPausarOSaltar);
    };
  }, [videoActivo, luzAmbienteActiva]);

  const cambiarVideo = (nuevoVideo) => {
    setVideoActivo(nuevoVideo);
    setErrorVideo(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn text-slate-700 py-2">
      
      {/* Encabezado Compacto + Selector opcional entre los 2 videos */}
      <section className="bg-white/85 backdrop-blur-md border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-700/80"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100 text-[11px] font-extrabold uppercase tracking-wider">
                {videoActivo.categoria}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-mono font-bold">
                {videoActivo.periodo}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-sky-900 tracking-tight">
              {videoActivo.titulo}
            </h1>
          </div>

          {mostrarSelector && (
            <div className="flex items-center gap-2 self-start md:self-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
              {LISTA_VIDEOS.map((vid) => {
                const activo = vid.id === videoActivo.id;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => cambiarVideo(vid)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                      activo
                        ? 'bg-sky-800 text-white shadow-sm'
                        : 'text-slate-600 hover:text-sky-800 hover:bg-white/60'
                    }`}
                  >
                    Video {vid.numero}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =================================================================
          ZONA CENTRAL DEL REPRODUCTOR CON BORDES DIFUMINADOS (AMBIENT MODE)
         ================================================================= */}
      <section className="relative py-4 sm:py-6 px-2 sm:px-6">
        <div className="relative max-w-4xl mx-auto">
          
          {luzAmbienteActiva && (
            <div
              aria-hidden="true"
              className="absolute -inset-3 sm:-inset-6 rounded-[2.5rem] bg-gradient-to-r from-sky-500/35 via-blue-600/30 to-amber-500/30 blur-3xl opacity-80 pointer-events-none transition-opacity duration-700"
            />
          )}

          <canvas
            ref={canvasRef}
            width={64}
            height={36}
            aria-hidden="true"
            className={`absolute -inset-4 sm:-inset-8 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] h-[calc(100%+2rem)] sm:h-[calc(100%+4rem)] rounded-[3rem] blur-[65px] saturate-200 pointer-events-none transition-opacity duration-700 ${
              luzAmbienteActiva && !errorVideo ? 'opacity-85' : 'opacity-0'
            }`}
          />

          <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-white/30 shadow-2xl aspect-video">
            {!errorVideo ? (
              <video
                key={videoActivo.urlVideo}
                ref={videoRef}
                src={videoActivo.urlVideo}
                poster={videoActivo.poster}
                controls
                playsInline
                onError={() => setErrorVideo(true)}
                className="w-full h-full object-contain bg-slate-950"
              >
                Tu navegador no soporta la reproducción de video.
              </video>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-3 text-sky-300">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                  {videoActivo.titulo}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  {videoActivo.subtitulo}
                </p>
                <div className="mt-4 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[11px] font-mono text-sky-200">
                  Ruta esperada: <strong>/public{videoActivo.urlVideo}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Barra inferior del reproductor corregida */}
          <div className="relative z-10 mt-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
            <span className="text-slate-500 font-medium bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
              Ubicación: <strong className="text-sky-900">{videoActivo.ubicacion}</strong> • Cronología: <strong className="text-sky-900">{videoActivo.duracion}</strong>
            </span>

            <button
              type="button"
              onClick={() => setLuzAmbienteActiva(!luzAmbienteActiva)}
              className="px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-sky-900 font-bold border border-slate-200 shadow-sm transition-all"
            >
              {luzAmbienteActiva ? 'Luz ambiental: Activada' : 'Luz ambiental: Desactivada'}
            </button>
          </div>

        </div>
      </section>

      {/* =================================================================
          SECCIÓN INFERIOR: RESEÑA, ESCENAS DEL GUION Y BALANCE DE BAJAS
         ================================================================= */}
      <section className="bg-white/90 backdrop-blur-md border-t-4 border-t-sky-800 border-x border-b border-slate-200 rounded-b-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Subtítulo y Protagonistas */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 block">
              Síntesis Táctica y Documental
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-black text-sky-900 leading-snug">
              {videoActivo.subtitulo}
            </h2>
          </div>

          <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-xs lg:max-w-sm">
            <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">
              Protagonistas Históricos
            </span>
            <strong className="text-slate-700 font-bold leading-snug block">
              {videoActivo.protagonistas}
            </strong>
          </div>
        </div>

        {/* Grid principal: Descripción e Hitos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Columna Izquierda: Relato general y Cita */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans font-medium bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
              {videoActivo.descripcion}
            </p>

            {videoActivo.cita && (
              <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-sky-700 border border-slate-200/80 shadow-sm">
                <p className="text-xs sm:text-sm italic font-serif text-slate-700">
                  “{videoActivo.cita.texto}”
                </p>
                <footer className="text-[11px] font-extrabold text-sky-800 uppercase tracking-wider mt-1.5">
                  — {videoActivo.cita.autor}
                </footer>
              </blockquote>
            )}
          </div>

          {/* Columna Derecha: Puntos Clave + Cuadro de Bajas Estimadas */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-sky-900 border-b border-slate-200 pb-2">
                Momentos Clave de la Batalla
              </h3>
              <ul className="space-y-2.5">
                {videoActivo.puntosClave.map((punto, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-medium leading-snug">
                    <span className="w-5 h-5 rounded-md bg-sky-800 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuadro Estadístico de Bajas del Guion */}
            {videoActivo.bajas && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Balance Histórico de Bajas Estimadas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-extrabold text-sky-900 block mb-0.5">
                      Fuerzas Patriotas
                    </span>
                    <span className="text-slate-600 font-medium leading-snug block">
                      {videoActivo.bajas.patriotas}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-extrabold text-slate-800 block mb-0.5">
                      Filibusteros
                    </span>
                    <span className="text-slate-600 font-medium leading-snug block">
                      {videoActivo.bajas.filibusteros}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Desglose de las 4 Escenas del Guion */}
        {videoActivo.escenas && (
          <div className="pt-2 border-t border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-sky-900">
                Desarrollo Cronológico por Escenas
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Estructura narrativa del documental
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {videoActivo.escenas.map((esc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-sky-300 transition-all shadow-sm flex flex-col justify-between space-y-2"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-800 text-white text-[10px] font-extrabold uppercase tracking-wider">
                        {esc.numero}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {esc.hora}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug pt-0.5">
                      {esc.titulo}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {esc.resumen}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

    </div>
  );
};