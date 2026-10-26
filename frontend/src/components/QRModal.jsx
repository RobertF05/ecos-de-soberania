import React, { useState } from 'react';
import { EscudoNacionalIcon } from './NicaraguaSymbols';

export const QRModal = ({ isOpen, onClose, ipInfo }) => {
  const [copiado, setCopiado] = useState(false);

  if (!isOpen) return null;

  const url = ipInfo?.url_acceso || 'http://localhost:5000';

  const copiarEnlace = () => {
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl shadow-xl p-6 text-center text-slate-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Franja Superior Suave */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-700/80"></div>

        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-400 hover:text-slate-700 text-xl p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="flex justify-center mb-3 mt-2">
          <div className="p-2 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm text-sky-800">
            <EscudoNacionalIcon className="w-10 h-10" />
          </div>
        </div>

        <h3 className="text-xl font-serif font-black text-sky-900">
          Conexión Local para Visitantes
        </h3>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Feria Universitaria • Red Local Offline (LAN)
        </p>

        {/* Contenedor del Código QR */}
        <div className="my-5 p-4 bg-white rounded-2xl inline-block shadow-sm mx-auto border-2 border-slate-200">
          {ipInfo?.qr_base64 ? (
            <img 
              src={ipInfo.qr_base64} 
              alt="Código QR para acceso móvil" 
              className="w-52 h-52 object-contain mx-auto"
            />
          ) : (
            <div className="w-52 h-52 flex flex-col items-center justify-center text-slate-500 font-sans p-2">
              <span className="text-3xl mb-2 opacity-80">📡</span>
              <p className="text-xs font-bold">Generando código QR...</p>
              <p className="text-[10px] text-slate-400 mt-1">Conecta a la red local</p>
            </div>
          )}
        </div>

        {/* Pasos para el visitante */}
        <div className="text-left bg-slate-50 text-slate-700 rounded-2xl p-4 border border-slate-200 text-xs space-y-2 shadow-sm font-medium">
          <div className="flex items-start gap-2">
            <span className="font-black text-sky-700">1.</span>
            <span>Conecta tu celular a la misma red Wi-Fi que esta computadora (sin internet).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-black text-sky-700">2.</span>
            <span>Apunta la cámara de tu teléfono al código QR.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-black text-sky-700">3.</span>
            <span>¡Navega el museo y responde la trivia desde tu mano!</span>
          </div>
        </div>

        {/* Enlace directo */}
        <div className="mt-5 flex items-center justify-between bg-slate-100 px-3 py-2.5 rounded-xl border border-slate-200 text-xs shadow-sm">
          <span className="font-mono text-slate-600 truncate max-w-[240px] font-bold">{url}</span>
          <button
            onClick={copiarEnlace}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black transition-colors border ${
              copiado 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:text-sky-700'
            }`}
          >
            {copiado ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-3 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-black text-sm shadow-sm transition-transform active:scale-95"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};