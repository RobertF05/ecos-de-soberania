import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { QRModal } from './components/QRModal';
import { Museo } from './views/Museo';
import { Trivia } from './views/Trivia';
import { MapaInteractivo } from './views/MapaInteractivo';
import { PruebaConocimientos } from './views/PruebaConocimientos';
import { EscudoNacionalIcon, GuardabarrancoIcon, SacuanjocheIcon, SandinoSiluetaIcon, BanderaNicaraguaBadge } from './components/NicaraguaSymbols';

export function App() {
  const [vistaActual, setVistaActual] = useState('mapa'); // 'museo' | 'mapa' | 'trivia'
  const [modalQRAbierto, setModalQRAbierto] = useState(false);
  const [ipInfo, setIpInfo] = useState({
    ip_local: '127.0.0.1',
    puerto: 5000,
    url_acceso: 'http://localhost:5000',
    qr_base64: null
  });

  useEffect(() => {
    fetch('/api/info-red')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setIpInfo(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-mesh-soberania flex flex-col font-sans text-white">
      
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
      <footer className="mt-auto bg-[#001D3D] border-t-2 border-[#0067C6] text-center text-xs text-blue-100 relative">
        <div className="franja-nicaragua"></div>

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
          <div className="flex justify-center items-center gap-6">
            <SacuanjocheIcon className="w-7 h-7 hover:scale-110 transition-transform" />
            <EscudoNacionalIcon className="w-9 h-9 hover:scale-110 transition-transform" />
            <GuardabarrancoIcon className="w-7 h-7 hover:scale-110 transition-transform" />
            <SandinoSiluetaIcon className="w-7 h-7 hover:scale-110 transition-transform" />
          </div>

          <p className="font-serif italic text-white max-w-xl mx-auto text-sm">
            “Nicaragua será libre mientras tenga hijos que la amen.”
            <span className="block text-[#E5A823] font-sans not-italic text-xs font-bold mt-1">
              — General de Hombres Libres Augusto C. Sandino
            </span>
          </p>

          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <BanderaNicaraguaBadge />
              <span>🏛️ <strong>Ecos de Soberanía</strong> • Feria Universitaria</span>
            </div>
            <span className="text-blue-200">
              Modo Offline LAN Activo en: <code className="text-[#E5A823] font-mono font-bold">{ipInfo.url_acceso}</code>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;