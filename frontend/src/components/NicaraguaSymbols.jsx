import React, { useState } from 'react';

/**
 * Símbolos Patrios e Iconografía Oficial de Nicaragua en SVG de alta fidelidad.
 * Basado en la colorimetría exacta de la Bandera Nacional:
 * - Azul Cobalto Oficial: #0067C6 (RGB: 0, 103, 198)
 * - Blanco Puro: #FFFFFF
 * - Oro del Escudo: #E5A823
 * - Verde de los cinco volcanes: #3E8926
 * - Rojo del gorro frigio: #D32F2F
 */

export const EscudoNacionalIcon = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Triángulo Equilátero Dorado */}
    <polygon points="50,14 88,80 12,80" stroke="#E5A823" strokeWidth="3.5" fill="#002D5E" strokeLinejoin="round" />
    
    {/* Cielo celeste dentro del triángulo */}
    <polygon points="50,17 85,78 15,78" fill="#5BB4E5" opacity="0.35" />

    {/* Rayos dorados de libertad */}
    <line x1="50" y1="44" x2="50" y2="24" stroke="#FFD54F" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="50" y1="44" x2="38" y2="28" stroke="#FFD54F" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="50" y1="44" x2="62" y2="28" stroke="#FFD54F" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="50" y1="44" x2="30" y2="38" stroke="#FFD54F" strokeWidth="1" strokeLinecap="round" />
    <line x1="50" y1="44" x2="70" y2="38" stroke="#FFD54F" strokeWidth="1" strokeLinecap="round" />

    {/* Arcoíris de la paz */}
    <path d="M26 50 A24 24 0 0 1 74 50" stroke="#E53935" strokeWidth="1.5" fill="none" opacity="0.9" />
    <path d="M28 50 A22 22 0 0 1 72 50" stroke="#FB8C00" strokeWidth="1.5" fill="none" opacity="0.9" />
    <path d="M30 50 A20 20 0 0 1 70 50" stroke="#FDD835" strokeWidth="1.5" fill="none" opacity="0.9" />
    <path d="M32 50 A18 18 0 0 1 68 50" stroke="#43A047" strokeWidth="1.5" fill="none" opacity="0.9" />
    <path d="M34 50 A16 16 0 0 1 66 50" stroke="#0067C6" strokeWidth="1.5" fill="none" opacity="0.9" />

    {/* Océanos de Nicaragua en Azul Bandera #0067C6 */}
    <path d="M14 78 Q50 72 86 78 L86 80 L14 80 Z" fill="#0067C6" />
    <path d="M14 76 Q30 74 50 76 Q70 74 86 76" stroke="#FFFFFF" strokeWidth="0.8" fill="none" opacity="0.8" />

    {/* Cinco Volcanes Hermanados en verde vibrante */}
    <polygon points="18,77 28,58 38,77" fill="#3E8926" />
    <polygon points="30,77 40,54 50,77" fill="#2E6B1B" />
    <polygon points="42,77 50,48 58,77" fill="#4E9F31" />
    <polygon points="50,77 60,54 70,77" fill="#2E6B1B" />
    <polygon points="62,77 72,60 82,77" fill="#3E8926" />

    {/* Gorro Frigio Rojo de la Libertad */}
    <circle cx="50" cy="44" r="4.5" fill="#D32F2F" />
    <path d="M47 43 Q50 36 53 41" stroke="#D32F2F" strokeWidth="2.5" fill="none" />
  </svg>
);

export const GuardabarrancoIcon = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 46 C24 44 42 42 58 40" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    <circle cx="18" cy="42" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="38" r="3" fill="#FFFFFF" />
    <path d="M22 28 C26 22 36 20 40 24 C44 28 42 38 34 42 C26 44 20 36 22 28 Z" fill="#3E8926" />
    <path d="M28 26 C32 25 36 27 35 34 C33 37 29 38 27 34 Z" fill="#B45309" />
    <circle cx="38" cy="22" r="7" fill="#0067C6" />
    <path d="M34 22 L45 22" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
    <polygon points="44,20 54,23 44,25" fill="#1E293B" />
    <path d="M25 42 L18 56" stroke="#0067C6" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="17" cy="58" r="3" fill="#0067C6" />
    <path d="M28 42 L22 58" stroke="#3E8926" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="21" cy="60" r="3" fill="#3E8926" />
  </svg>
);

export const SacuanjocheIcon = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(32,32)">
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <path
          key={idx}
          d="M0 0 C-6 -14 -4 -26 0 -28 C4 -26 6 -14 0 0"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="0.8"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle cx="0" cy="0" r="7" fill="#FBBF24" opacity="0.95" />
      <circle cx="0" cy="0" r="4" fill="#E5A823" />
    </g>
  </svg>
);

export const SandinoSiluetaIcon = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 28 C20 22 44 22 52 28 C44 26 20 26 12 28 Z" fill="#E5A823" />
    <path d="M25 26 C26 14 38 14 39 26 Z" fill="#E5A823" />
    <circle cx="32" cy="31" r="5" fill="#E5A823" />
    <polygon points="28,36 36,36 32,41" fill="#D32F2F" />
    <path d="M22 42 C26 38 38 38 42 42 L45 60 L19 60 Z" fill="#E5A823" />
  </svg>
);

export const VolcanMomotomboIcon = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 50 C24 48 40 48 58 50 L58 58 L6 58 Z" fill="#0067C6" />
    <path d="M12 53 C26 51 38 55 52 53" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
    <polygon points="12,50 32,22 52,50" fill="#3E8926" />
    <polygon points="26,50 32,22 42,50" fill="#2E6B1B" />
    <path d="M32 20 C30 16 35 14 34 10 C33 7 36 6 38 4" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="2 3" />
  </svg>
);

export const BanderaNicaraguaBadge = () => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-sky-900 shadow-sm border border-slate-200 text-xs font-bold">
    {/* Mini Bandera de Nicaragua con sus 3 franjas y escudo central */}
    <div className="flex flex-col w-6 h-4 rounded overflow-hidden border border-slate-300 shadow-sm shrink-0">
      <div className="h-[33.3%] bg-[#0067C6]"></div>
      <div className="h-[33.4%] bg-[#FFFFFF] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#E5A823]"></div>
      </div>
      <div className="h-[33.3%] bg-[#0067C6]"></div>
    </div>
    <span className="tracking-wide text-sky-800 font-extrabold uppercase text-[11px]">NICARAGUA</span>
  </div>
);

export const ImagePlaceholder = ({ 
  src, 
  alt, 
  tipo = "sandino", 
  titulo = "Registro Histórico",
  subtitulo = "Fotografía o documento de época",
  archivoEsperado = "imagen.jpg",
  className = "h-56"
}) => {
  const [errorCarga, setErrorCarga] = useState(false);

  const renderIcono = () => {
    switch(tipo) {
      case "sandino": return <SandinoSiluetaIcon className="w-12 h-12 opacity-80" />;
      case "independencia": 
      case "san_jacinto": return <EscudoNacionalIcon className="w-12 h-12 opacity-80" />;
      case "costa_caribe": return <GuardabarrancoIcon className="w-12 h-12 opacity-80" />;
      case "revolucion": return <SacuanjocheIcon className="w-12 h-12 opacity-80" />;
      default: return <VolcanMomotomboIcon className="w-12 h-12 opacity-80" />;
    }
  };

  if (src && !errorCarga) {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm group ${className}`}>
        <img 
          src={src} 
          alt={alt} 
          onError={() => setErrorCarga(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Velo oscuro monocromático para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/50 to-transparent opacity-90"></div>
        <div className="absolute bottom-2 left-3 right-3 text-left">
          <p className="text-xs font-bold text-sky-100 uppercase tracking-wider">{titulo}</p>
          <p className="text-[11px] text-slate-200 line-clamp-1">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-4 flex flex-col items-center justify-center text-center group hover:border-sky-300 hover:bg-slate-100/50 transition-all duration-300 shadow-sm ${className}`}>
      
      {/* Círculo contenedor del icono */}
      <div className="mb-2 p-3 rounded-full bg-white border border-slate-200 shadow-sm transition-transform group-hover:scale-110">
        {renderIcono()}
      </div>

      <h4 className="text-sm font-extrabold text-sky-900 tracking-wide">{titulo}</h4>
      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 font-medium">{subtitulo}</p>

      {/* Etiqueta de ruta de archivo */}
      <div className="mt-3 px-3 py-1.5 rounded-lg bg-white text-slate-600 text-[10px] font-mono font-bold shadow-sm border border-slate-200 flex items-center gap-1.5">
        <span>📸 Archivo:</span>
        <code className="text-sky-700 font-extrabold">{archivoEsperado}</code>
      </div>
      
      <span className="text-[9px] text-slate-400 mt-1.5 font-medium uppercase tracking-wider">
        Coloca tu archivo en public/assets/images/
      </span>
    </div>
  );
};