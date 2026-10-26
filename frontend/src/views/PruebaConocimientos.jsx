import React, { useState } from "react";
import { Crucigrama } from "../components/actividades/Crucigrama";
import { VerdaderoFalso } from "../components/actividades/VerdaderoFalso";

export const PruebaConocimientos = () => {
  const [actividadActual, setActividadActual] = useState(null); // null | 'crucigrama' | 'vf' | 'frase'

  const tarjetas = [
    {
      id: "crucigrama",
      icon: "🧩",
      titulo: "Crucigrama Histórico",
      desc: "Pon a prueba tu vocabulario sobre la independencia y autonomía.",
    },
    {
      id: "vf",
      icon: "⚖️",
      titulo: "Verdadero o Falso",
      desc: "Evalúa tu conocimiento sobre los sucesos históricos de Nicaragua.",
    },
    {
      id: "frase",
      icon: "✍️",
      titulo: "Complete la Frase",
      desc: "Rellena los espacios en blanco de las citas y documentos históricos.",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-700">
      {/* Encabezado de la sección (Monocromático Suave) */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Franja decorativa sutil */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-sky-700/80"></div>

        <h2 className="text-3xl sm:text-4xl font-serif font-black text-sky-900 text-center tracking-tight">
          Prueba tus Conocimientos
        </h2>
        <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto font-medium">
          Selecciona una de las actividades interactivas para repasar los hitos
          históricos de nuestra soberanía.
        </p>
      </div>

      {/* Menú de selección o actividad activa */}
      {!actividadActual ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tarjetas.map((t) => (
            <button
              key={t.id}
              onClick={() => setActividadActual(t.id)}
              disabled={t.id === "frase"} // Deshabilitado temporalmente
              className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 shadow-sm border group
                ${
                  t.id === "frase"
                    ? "bg-slate-50/50 border-slate-200 opacity-60 cursor-not-allowed"
                    : "bg-white/60 backdrop-blur-sm border-slate-200 hover:bg-white/95 hover:border-sky-300 hover:shadow-md hover:-translate-y-1"
                }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                {t.icon}
              </div>
              <h3
                className={`text-xl font-extrabold mb-2 transition-colors ${t.id === "frase" ? "text-slate-500" : "text-sky-900"}`}
              >
                {t.titulo}
              </h3>
              <p className="text-sm text-slate-600 font-medium">{t.desc}</p>

              {/* Etiqueta de "Próximamente" con diseño neutral */}
              {t.id === "frase" && (
                <span className="absolute top-4 right-4 bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Próximamente
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 shadow-sm relative">
          <button
            onClick={() => setActividadActual(null)}
            className="mb-6 text-sky-700 hover:text-sky-900 font-extrabold flex items-center gap-1.5 transition-colors text-xs uppercase tracking-wider"
          >
            <span className="text-lg leading-none">←</span> Volver al menú
          </button>

          {/* Contenedores de las actividades */}
          <div className="min-h-[400px]">
            {actividadActual === "crucigrama" && <Crucigrama />}
            {actividadActual === "vf" && <VerdaderoFalso />}
          </div>
        </div>
      )}
    </div>
  );
};
