import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { QRModal } from './components/QRModal';
import { Museo } from './views/Museo';
import { Trivia } from './views/Trivia';
import { MapaInteractivo } from './views/MapaInteractivo';
import { PruebaConocimientos } from './views/PruebaConocimientos';
import {
  EscudoNacionalIcon,
  GuardabarrancoIcon,
  SacuanjocheIcon,
  SandinoSiluetaIcon,
  BanderaNicaraguaBadge
} from './components/NicaraguaSymbols';


// 1. Lista de imágenes de fondo (ajústalas a las rutas reales en tu carpeta public/assets)
const IMAGENES_FONDO = [
  '../public/assets/images/img1.jpg',
  '../public/assets/images/img2.jpg',
  '../public/assets/images/img3.jpg',
  '../public/assets/images/img4.jpg'
];

export function App() {
  const [vistaActual, setVistaActual] = useState('mapa'); // 'museo' | 'mapa' | 'trivia' | 'prueba'
  const [modalQRAbierto, setModalQRAbierto] = useState(false);
  const [indiceFondo, setIndiceFondo] = useState(0);

  const [ipInfo, setIpInfo] = useState({
    ip_local: '127.0.0.1',
    puerto: 5000,
    url_acceso: 'http://localhost:5000',
    qr_base64: null
  });

  // Obtener información de red local
  useEffect(() => {
    fetch('/api/info-red')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) setIpInfo(data);
      })
      .catch(() => {});
  }, []);

  // Temporizador para cambiar la imagen de fondo cada 8 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceFondo(prev => (prev + 1) % IMAGENES_FONDO.length);
    }, 8000);
    return () => clearInterval(intervalo);
  }, []);

  // Generación de 22 hojas/pétalos con propiedades aleatorias fijas en memoria
  const hojasCayendo = useMemo(() => {
    return Array.from({ length: 22 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${10 + Math.random() * 12}s`,
      size: 14 + Math.random() * 16,
      opacity: 0.25 + Math.random() * 0.45,
      // Alterna entre hojas verdes/doradas y pétalos de Sacuanjoche
      tipo: index % 3 === 0 ? 'flor' : index % 2 === 0 ? 'hojaVerde' : 'hojaDorada'
    }));
  }, []);

  return (
    <div className="min-h-screen bg-mesh-soberania flex flex-col font-sans text-white relative overflow-x-hidden mt-10">
      
      {/* Estilos CSS para la física de caída y balanceo de las hojas */}
      <style>{`
        @keyframes caidaLibre {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(0deg);
          }
          25% {
            transform: translate3d(35px, 25vh, 0) rotate(90deg);
          }
          50% {
            transform: translate3d(-25px, 55vh, 0) rotate(180deg);
          }
          75% {
            transform: translate3d(30px, 80vh, 0) rotate(270deg);
          }
          100% {
            transform: translate3d(-15px, 110vh, 0) rotate(360deg);
          }
        }
        .animacion-hoja {
          position: absolute;
          top: -10vh;
          animation-name: caidaLibre;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
      `}</style>

      {/* CAPA 1: Carrusel de Imágenes de Fondo con Transición Suave */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {IMAGENES_FONDO.map((imgUrl, idx) => (
          <div
            key={imgUrl}
            style={{ backgroundImage: `url('${imgUrl}')` }}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-in-out ${
              idx === indiceFondo ? 'opacity-25 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}
        {/* Velo degradado azul oscuro para garantizar que el texto siempre sea legible */}
        <div className="absolute inset-0 " />
      </div>

      {/* CAPA 2: Simulación de Hojas y Sacuanjoches Cayendo por Detrás */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {hojasCayendo.map(hoja => (
          <div
            key={hoja.id}
            className="animacion-hoja"
            style={{
              left: hoja.left,
              animationDelay: hoja.delay,
              animationDuration: hoja.duration,
              opacity: hoja.opacity
            }}
          >
            {hoja.tipo === 'flor' ? (
              /* Flor de Sacuanjoche estilizada */
              <svg width={hoja.size} height={hoja.size} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3.5" fill="#E5A823" />
                <ellipse cx="12" cy="5" rx="3" ry="5" fill="#FFFFFF" />
                <ellipse cx="12" cy="19" rx="3" ry="5" fill="#FFFFFF" />
                <ellipse cx="5" cy="12" rx="5" ry="3" fill="#FFFFFF" />
                <ellipse cx="19" cy="12" rx="5" ry="3" fill="#FFFFFF" />
              </svg>
            ) : (
              /* Hoja tropical estilizada (verde o dorada) */
              <svg
                width={hoja.size}
                height={hoja.size}
                viewBox="0 0 24 24"
                fill={hoja.tipo === 'hojaDorada' ? '#E5A823' : '#34D399'}
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* CAPA 3: Contenido de la Página (z-10 para estar por encima de las hojas y el fondo) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Barra de Navegación con Colorimetría Oficial de Nicaragua */}
        <Navbar
          vistaActual={vistaActual}
          setVistaActual={setVistaActual}
          abrirModalQR={() => setModalQRAbierto(true)}
          ipInfo={ipInfo}
        />

        {/* Contenido Principal con Vistas Dinámicas */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {vistaActual === 'museo' && (
            <Museo onIrATrivia={() => setVistaActual('trivia')} />
          )}

          {vistaActual === 'mapa' && (
            <MapaInteractivo />
          )}

          {vistaActual === 'trivia' && (
            <Trivia onVolverAlMuseo={() => setVistaActual('museo')} />
          )}

          {vistaActual === 'prueba' && (
            <PruebaConocimientos />
          )}
        </main>

        {/* Modal para conectar celulares mediante código QR */}
        <QRModal
          isOpen={modalQRAbierto}
          onClose={() => setModalQRAbierto(false)}
          ipInfo={ipInfo}
        />

        {/* Pie de Página Patriótico con la Franja Bandera de Nicaragua */}
{/* Pie de Página Institucional sincronizado con el diseño del Navbar */}
        <footer className="mt-auto bg-white border-t-2 border-[#0067C6] shadow-sm text-center font-sans text-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-2.5">
            
            {/* Íconos de Símbolos Patrios (tamaños compactos igual que en el Navbar) */}
            <div className="flex justify-center items-center gap-5 text-[#0067C6]">
              <SacuanjocheIcon className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
              <EscudoNacionalIcon className="w-8 h-8 hover:scale-110 transition-transform duration-200" />
              <GuardabarrancoIcon className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
              <SandinoSiluetaIcon className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </div>

            {/* Cita Histórica con la paleta y tipografía del Navbar */}
            <p className="font-serif italic text-slate-800 max-w-xl mx-auto text-xs sm:text-[13px] font-semibold leading-relaxed">
              “Nicaragua será libre mientras tenga hijos que la amen.”
              <span className="block text-[#0067C6] font-sans not-italic text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mt-1">
                — General de Hombres Libres Augusto C. Sandino
              </span>
            </p>

          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;