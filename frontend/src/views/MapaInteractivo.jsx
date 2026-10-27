import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { DEPARTAMENTOS_DATA } from '../data/departamentosData';
import { ImagePlaceholder } from '../components/NicaraguaSymbols';

export const MapaInteractivo = () => {
  // Validación de seguridad por si DEPARTAMENTOS_DATA está vacío o no es un array
  const listaDeptos = Array.isArray(DEPARTAMENTOS_DATA) && DEPARTAMENTOS_DATA.length > 0 
    ? DEPARTAMENTOS_DATA 
    : [];

  const [deptoSeleccionadoId, setDeptoSeleccionadoId] = useState(listaDeptos[0]?.id || '');
  const [filtroRegion, setFiltroRegion] = useState('Todas');
  const [mostrarImagenGrande, setMostrarImagenGrande] = useState(false);
  const [posicionImagen, setPosicionImagen] = useState({ x: 0, y: 0 });

  // La imagen ampliada se coloca sobre la miniatura, no en el centro de la pantalla.
  // Se ajusta ligeramente la posición si es necesario para evitar que salga del viewport.
  const ampliarDesdeLaMiniatura = (evento) => {
    const rect = evento.currentTarget.getBoundingClientRect();
    const margen = 16;
    const anchoMaximo = Math.min(440, window.innerWidth - margen * 2);
    const altoMaximo = Math.min(320, window.innerHeight * 0.52) + 48;
    const limitar = (valor, minimo, maximo) => Math.max(minimo, Math.min(valor, maximo));

    setPosicionImagen({
      x: limitar(rect.left + rect.width / 2, margen + anchoMaximo / 2, window.innerWidth - margen - anchoMaximo / 2),
      y: limitar(rect.top + rect.height / 2, margen + altoMaximo / 2, window.innerHeight - margen - altoMaximo / 2),
    });
    setMostrarImagenGrande(true);
  };

  if (listaDeptos.length === 0) {
    return (
      <div className="p-8 text-center bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 text-slate-600">
        Cargando datos de los departamentos...
      </div>
    );
  }

  const deptoActivo = listaDeptos.find(d => d.id === deptoSeleccionadoId) || listaDeptos[0];
  // En aplicaciones React/Vite, los archivos dentro de /public se acceden desde /.
  const rutaImagen = deptoActivo?.imagen
    ? `/assets/images/Mapa/${deptoActivo.imagen}`
    : '';

  const deptosFiltrados = filtroRegion === 'Todas' 
    ? listaDeptos 
    : listaDeptos.filter(d => d.region === filtroRegion);

  const idTexto = String(deptoActivo?.id || '');
  const tipoImagen = idTexto.includes('segovia') || idTexto.includes('jinotega')
    ? 'sandino'
    : idTexto.includes('caribe')
    ? 'costa_caribe'
    : 'san_jacinto';

  return (
    <div className="space-y-8 animate-fadeIn text-slate-700">
      
      {/* Banner Principal del Mapa (Monocromático Suave) */}
      <section className="relative rounded-3xl overflow-hidden bg-white/80 backdrop-blur-md border border-slate-200 p-6 sm:p-10 shadow-sm">
        {/* Franja decorativa sutil */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-700/80"></div>
        
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-md bg-slate-100/80 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200">
              🗺️ Cartografía Soberana de Nicaragua
            </span>
            <span className="px-3 py-1 rounded-md bg-sky-50/80 text-sky-800 border border-sky-100/50 text-xs font-bold tracking-wider">
              15 Departamentos • 2 Regiones Autónomas
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-sky-900 leading-tight tracking-tight">
            Geografía de la Memoria y la Soberanía
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-medium">
            Toca o haz clic sobre cualquier departamento o región en el mapa para descubrir los acontecimientos históricos, las batallas patrióticas y los héroes que forjaron la identidad de esa tierra.
          </p>
        </div>
      </section>

      {/* Filtros por Macro-Región */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/60 backdrop-blur-sm p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Filtrar Región:</span>
          {['Todas', 'Pacífico', 'Norte y Central', 'Costa Caribe'].map(reg => (
            <button
              key={reg}
              onClick={() => setFiltroRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filtroRegion === reg
                  ? 'bg-sky-700 text-white shadow-md scale-105'
                  : 'text-slate-600 hover:bg-white/80 hover:text-sky-800 border border-transparent hover:border-slate-200'
              }`}
            >
              {reg} {reg === 'Todas' ? `(${listaDeptos.length})` : `(${listaDeptos.filter(d => d.region === reg).length})`}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline font-mono">
          Seleccionado: <strong className="text-sky-900">{deptoActivo?.nombre}</strong>
        </span>
      </div>

      {/* Grid: Mapa Interactivo a la Izquierda + Panel Histórico a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA MAPA (7 columnas en desktop) */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-4 mt-2">
            <h2 className="text-base font-extrabold text-sky-900 flex items-center gap-2">Mapa Interactivo
            </h2>
            <span className="text-[11px] text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md font-bold border border-sky-100">
              Toca un punto o nombre
            </span>
          </div>

          {/* Contenedor del Mapa con Pines Interactivos */}
          <div className="relative mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-slate-50/50 shadow-inner max-w-[550px]">
            <img 
              src="./assets/images/mapa_nicaragua.png" 
              onError={(e) => {
                if (!e.currentTarget.dataset.tried) {
                  e.currentTarget.dataset.tried = '1';
                  e.currentTarget.src = './assets/mapa_nicaragua.png';
                }
              }}
              alt="Mapa Departamental de Nicaragua" 
              className="w-full h-auto block select-none pointer-events-none opacity-90"
            />

            {/* Puntos y Pines Interactivos Superpuestos */}
            {listaDeptos.map(d => {
              const esActivo = d.id === deptoActivo?.id;
              const coincideFiltro = filtroRegion === 'Todas' || d.region === filtroRegion;

              return (
                <button
                  key={d.id}
                  onClick={() => setDeptoSeleccionadoId(d.id)}
                  title={`${d.nombre} (${d.cabecera})`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 group focus:outline-none ${
                    !coincideFiltro ? "opacity-30 scale-75" : "opacity-100"
                  }`}
                >
                  <span className="relative flex items-center justify-center">
                    {/* Anillo de pulso si está activo */}
                    {esActivo && (
                      <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-sky-400 opacity-60"></span>
                    )}

                    {/* Pin del departamento */}
                    <span
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-md transition-transform ${
                        esActivo
                          ? "bg-sky-700 text-white ring-4 ring-sky-200 scale-125 z-30"
                          : "bg-white text-slate-400 ring-2 ring-slate-200 hover:scale-110 hover:bg-sky-50 hover:text-sky-700"
                      }`}
                    >
                      ★
                    </span>
                  </span>

                  {/* Etiqueta flotante */}
                  <span
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-sm pointer-events-none transition-all ${
                      esActivo
                        ? "bg-sky-900 text-white opacity-100 scale-105 z-30 font-black"
                        : "bg-white/90 text-slate-600 opacity-0 group-hover:opacity-100 border border-slate-200"
                    }`}
                  >
                    {d.nombre}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carrusel / Botonera rápida de departamentos filtrados */}
          <div className="mt-5 pt-4 border-t border-slate-200/60">
            <p className="text-[10px] text-slate-500 mb-2 font-bold uppercase tracking-wider">
              Acceso Rápido:
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {deptosFiltrados.map(d => {
                const esActivo = d.id === deptoActivo?.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDeptoSeleccionadoId(d.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      esActivo
                        ? 'bg-sky-700 text-white shadow-sm scale-105'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
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
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-md border-t-4 border-t-sky-800 border-x border-b border-slate-200 rounded-b-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden space-y-6">
          
          {/* Encabezado del Departamento */}
          <div className="border-b border-slate-200 pb-4 mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[10px] font-mono font-bold border border-sky-100">
                {deptoActivo?.region}
              </span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                Cabecera: <strong className="text-slate-800">{deptoActivo?.cabecera}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-sky-900 mt-2">
              {deptoActivo?.nombre}
            </h2>
          </div>

          {/* Hito Histórico Principal */}
          <div className="bg-slate-50/80 p-4 rounded-xl border-l-4 border-sky-700 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-black text-sky-800 uppercase tracking-wider">
              <span> Hito de Soberanía</span>
              <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-mono">{deptoActivo?.año}</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
              {deptoActivo?.hitoPrincipal}
            </h3>
          </div>

          {/* Personajes y Sitio Emblemático */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-sky-700 font-bold block mb-0.5 text-[11px] uppercase">Protagonistas:</span>
              <p className="text-slate-700 font-medium">{deptoActivo?.personajes}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-sky-700 font-bold block mb-0.5 text-[11px] uppercase">Sitio:</span>
              <p className="text-slate-700 font-medium">{deptoActivo?.sitioEmblematico}</p>
            </div>
          </div>

          {/* Relato Histórico */}
          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-2">
            <h4 className="text-[11px] font-extrabold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">Memoria y Significado:
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
              {deptoActivo?.relato}
            </p>
          </div>

          {/* Cita Textual */}
          {deptoActivo?.cita && (
            <blockquote className="p-3.5 bg-slate-50 rounded-xl border-l-2 border-sky-400 text-xs italic text-slate-700 font-serif">
              "{deptoActivo.cita}"
            </blockquote>
          )}

          {/* Espacio para Imagen del Departamento */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-sky-900 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">Registro Gráfico
              </span>
              <span className="text-[9px] font-mono text-slate-400 font-normal">/assets/images/</span>
            </h4>
            {/* La imagen pequeña conserva el diseño original. */}
            <div
              className="relative cursor-zoom-in rounded-xl border border-slate-200 bg-slate-50/50 p-1"
              onMouseEnter={ampliarDesdeLaMiniatura}
              onMouseLeave={() => setMostrarImagenGrande(false)}
              title="Pasa el cursor para ampliar la fotografía"
            >
              <ImagePlaceholder
                src={rutaImagen}
                alt={`Fotografía histórica de ${deptoActivo?.nombre}`}
                tipo={tipoImagen}
                titulo={`Registro Histórico: ${deptoActivo?.nombre}`}
                subtitulo={deptoActivo?.sitioEmblematico}
                archivoEsperado={deptoActivo?.imagen}
                className="h-44"
              />
            </div>
          </div>

        </div>

      </div>

      {/*
        Vista ampliada junto a la miniatura, sin oscurecer el resto de la página.
        Se mantiene montada para que tanto la entrada como la salida tengan animación.
        El portal evita que los paneles con overflow-hidden recorten la ampliación.
      */}
      {rutaImagen && typeof document !== 'undefined' && createPortal(
        <div
          className="pointer-events-none fixed z-[9999]"
          style={{
            left: posicionImagen.x,
            top: posicionImagen.y,
            transform: 'translate(-50%, -50%)',
            visibility: !mostrarImagenGrande && posicionImagen.x === 0 ? 'hidden' : 'visible',
          }}
          aria-hidden="true"
        >
          <div
            className={`w-fit max-w-[calc(100vw-32px)] rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none sm:max-w-[440px] ${
              mostrarImagenGrande ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
          >
            <img
              src={rutaImagen}
              alt={`Fotografía ampliada de ${deptoActivo?.nombre}`}
              className="block h-auto max-h-[min(52vh,320px)] w-auto max-w-full rounded-xl object-contain"
            />
            <p className="px-2 pt-2 text-center text-xs font-semibold text-slate-700">
              {deptoActivo?.nombre}
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
