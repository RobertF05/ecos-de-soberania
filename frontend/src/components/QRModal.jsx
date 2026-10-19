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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-gradient-to-b from-[#003B77] to-[#00224A] border-4 border-[#0067C6] rounded-3xl shadow-2xl p-6 text-center text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Franja Bandera Superior */}
        <div className="absolute top-0 left-0 right-0 franja-nicaragua"></div>

        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-4 text-white/80 hover:text-white text-xl p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="flex justify-center mb-3 mt-2">
          <div className="p-2 bg-white rounded-2xl border-2 border-[#E5A823] shadow-gold-glow">
            <EscudoNacionalIcon className="w-10 h-10" />
          </div>
        </div>

        <h3 className="text-xl font-serif font-black text-white">
          Conexión Local para Visitantes
        </h3>
        <p className="text-xs text-blue-200 mt-1 font-semibold">
          Feria Universitaria • Red Local Offline (LAN)
        </p>

        {/* Contenedor del Código QR */}
        <div className="my-5 p-4 bg-white rounded-2xl inline-block shadow-2xl mx-auto border-4 border-[#0067C6]">
          {ipInfo?.qr_base64 ? (
            <img 
              src={ipInfo.qr_base64} 
              alt="Código QR para acceso móvil" 
              className="w-52 h-52 object-contain mx-auto"
            />
          ) : (
            <div className="w-52 h-52 flex flex-col items-center justify-center text-[#002B59] font-sans p-2">
              <span className="text-3xl mb-2">📡</span>
              <p className="text-xs font-bold">Generando código QR...</p>
              <p className="text-[10px] text-gray-600 mt-1">Conecta a la red local</p>
            </div>
          )}
        </div>

        {/* Pasos para el visitante */}
        <div className="text-left bg-white text-[#002B59] rounded-2xl p-3.5 border border-white/20 text-xs space-y-1.5 shadow font-medium">
          <div className="flex items-start gap-2">
            <span className="font-black text-[#0067C6]">1.</span>
            <span>Conecta tu celular a la misma red Wi-Fi que esta laptop (sin internet).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-black text-[#0067C6]">2.</span>
            <span>Apunta la cámara de tu teléfono al código QR.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-black text-[#0067C6]">3.</span>
            <span>¡Navega el museo y responde la trivia desde tu mano!</span>
          </div>
        </div>

        {/* Enlace directo */}
        <div className="mt-4 flex items-center justify-between bg-[#001D3D] px-3 py-2 rounded-xl border border-white/20 text-xs">
          <span className="font-mono text-white truncate max-w-[240px] font-bold">{url}</span>
          <button
            onClick={copiarEnlace}
            className="px-2.5 py-1 rounded-lg bg-[#0067C6] hover:bg-[#3895EC] text-white text-[11px] font-black transition-colors"
          >
            {copiado ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-[#E5A823] hover:bg-[#F59E0B] text-[#002B59] font-black text-sm shadow-md transition-transform active:scale-95"
        >
          Entendido / Cerrar
        </button>
      </div>
    </div>
  );
};
