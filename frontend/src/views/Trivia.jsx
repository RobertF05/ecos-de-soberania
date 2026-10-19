import React, { useState, useEffect } from 'react';
import { EscudoNacionalIcon, GuardabarrancoIcon, SacuanjocheIcon, VolcanMomotomboIcon, SandinoSiluetaIcon } from '../components/NicaraguaSymbols';

const PREGUNTAS_FALLBACK = [
  {
    id: 1,
    trayecto: "Raíces e Independencia (1856)",
    titulo: "El Asalto Filibustero a la Hacienda San Jacinto",
    personaje_clave: "Andrés Castro y el Coronel José Dolores Estrada",
    contexto: "Septiembre de 1856. William Walker ha proclamado la esclavitud y pretende anexar Centroamérica. Los filibusteros atacan San Jacinto con armamento superior. Se agotan las municiones.",
    dilema: "¿Cuál es tu postura ante la embestida filibustera cuando la munición escasea?",
    opciones: [
      { id: "A", texto: "Tomar las piedras del corral y repeler cuerpo a cuerpo al invasor con patriotismo indoblegable." },
      { id: "B", texto: "Pactar una tregua temporal con los oficiales de Walker esperando mediación diplomática foránea." },
      { id: "C", texto: "Retirarse ordenadamente hacia el norte para preservar vidas y reagruparse más tarde." }
    ]
  },
  {
    id: 2,
    trayecto: "Antiimperialismo y Dignidad (1912 - 1927)",
    titulo: "El Rechazo al Pacto del Espino Negro",
    personaje_clave: "General Augusto C. Sandino y General Benjamín Zeledón",
    contexto: "Mayo de 1927, Tipitapa. Henry L. Stimson ofrece dinero y cargos a los caudillos a cambio de entregar las armas bajo el árbol de Espino Negro.",
    dilema: "Sandino, con 29 hombres y 40 rifles, se niega. ¿Qué decisión asumes frente a la orden de desarme imperial?",
    opciones: [
      { id: "A", texto: "Marchar a Las Segovias, fundar el EDSN y resistir hasta expulsar a las tropas invasoras." },
      { id: "B", texto: "Aceptar las indemnizaciones económicas y esperar la próxima contienda electoral vigilada por marinos." },
      { id: "C", texto: "Exiliarse en el extranjero para escribir denuncias periodísticas sin tomar las armas." }
    ]
  },
  {
    id: 3,
    trayecto: "Resistencia y Revolución (1980)",
    titulo: "La Gran Cruzada Nacional de Alfabetización",
    personaje_clave: "Los Brigadistas del EPA y Carlos Fonseca",
    contexto: "1980. Más del 50% de la población no sabe leer ni escribir como herencia de la dictadura. Se convoca a 95,000 jóvenes a internarse en las montañas durante cinco meses.",
    dilema: "¿Cómo se consolida la soberanía y la autodeterminación popular tras una victoria revolucionaria?",
    opciones: [
      { id: "A", texto: "Erradicar el analfabetismo mediante el contacto directo pueblo-estudiantes, empoderando al campesinado." },
      { id: "B", texto: "Priorizar la industrialización urbana y delegar la educación a programas de radio de bajo costo." },
      { id: "C", texto: "Esperar financiamiento de organismos multilaterales antes de movilizar a la juventud." }
    ]
  },
  {
    id: 4,
    trayecto: "Autonomía de la Costa Caribe (1987)",
    titulo: "El Estatuto de Autonomía de las Regiones de la Costa Caribe",
    personaje_clave: "Pueblos Originarios Miskitu, Mayangna, Rama, Creoles, Garífunas y Mestizos",
    contexto: "Octubre de 1987. Históricamente la Costa Caribe fue excluida por el centralismo del Pacífico. Se debate la redacción de la Ley 28 en la Asamblea Nacional.",
    dilema: "¿Cómo debe concebirse la soberanía en un Estado multiétnico y pluricultural?",
    opciones: [
      { id: "A", texto: "Reconocer constitucionalmente la propiedad comunal de las tierras, educación bilingüe y autogobierno regional." },
      { id: "B", texto: "Centralizar todas las decisiones en el Pacífico para mantener una administración uniforme." },
      { id: "C", texto: "Permitir autonomía comercial a empresas extranjeras sin representación de los consejos regionales." }
    ]
  }
];

export const Trivia = ({ onVolverAlMuseo }) => {
  const [preguntas, setPreguntas] = useState(PREGUNTAS_FALLBACK);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [cargandoEnvio, setCargandoEnvio] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState(null);
  const [metricasFeria, setMetricasFeria] = useState(null);

  useEffect(() => {
    fetch('/api/preguntas')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) setPreguntas(data);
      })
      .catch(() => {});
  }, []);

  const pregunta = preguntas[indiceActual];
  const esUltima = indiceActual === preguntas.length - 1;

  const handleSeleccionarOpcion = (opcionId) => {
    setOpcionSeleccionada(opcionId);
  };

  const handleSiguiente = () => {
    if (!opcionSeleccionada) return;

    const nuevasRespuestas = [
      ...respuestasUsuario.filter(r => r.pregunta_id !== pregunta.id),
      { pregunta_id: pregunta.id, opcion_id: opcionSeleccionada }
    ];
    setRespuestasUsuario(nuevasRespuestas);

    if (esUltima) {
      enviarRespuestasAlBackend(nuevasRespuestas);
    } else {
      setIndiceActual(indiceActual + 1);
      const siguienteRespuesta = nuevasRespuestas.find(r => r.pregunta_id === preguntas[indiceActual + 1]?.id);
      setOpcionSeleccionada(siguienteRespuesta ? siguienteRespuesta.opcion_id : null);
    }
  };

  const handleAnterior = () => {
    if (indiceActual > 0) {
      setIndiceActual(indiceActual - 1);
      const prevRespuesta = respuestasUsuario.find(r => r.pregunta_id === preguntas[indiceActual - 1]?.id);
      setOpcionSeleccionada(prevRespuesta ? prevRespuesta.opcion_id : null);
    }
  };

  const enviarRespuestasAlBackend = async (respuestasAEnviar) => {
    setCargandoEnvio(true);
    try {
      const response = await fetch('/api/respuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respuestas: respuestasAEnviar,
          dispositivo: window.innerWidth < 768 ? 'Móvil Visitante' : 'Laptop Stand'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResultadoFinal(data.resultado);
        setMetricasFeria(data.metricas_globales);
      } else {
        generarResultadoOfflineLocal(respuestasAEnviar);
      }
    } catch {
      generarResultadoOfflineLocal(respuestasAEnviar);
    } finally {
      setCargandoEnvio(false);
    }
  };

  const generarResultadoOfflineLocal = (respuestas) => {
    let puntos = 0;
    respuestas.forEach(r => {
      if (r.opcion_id === 'A') puntos += 100;
      else if (r.opcion_id === 'C') puntos += 40;
      else puntos += 15;
    });
    const pct = Math.round(puntos / (preguntas.length * 100) * 100);

    setResultadoFinal({
      porcentaje: pct,
      arquetipo: pct >= 80 ? "Centinela de la Dignidad Nacional" : "Defensor de la Memoria Colectiva",
      subtitulo: "Conciencia Histórica Soberana Activa",
      descripcion: "Has tomado postura con firmeza patriótica frente a los dilemas que definieron la libertad de Nicaragua.",
      insignia: pct >= 80 ? "guardabarranco_oro" : "sacuanjoche_plata",
      detalles: []
    });
  };

  const reiniciarTrivia = () => {
    setIndiceActual(0);
    setRespuestasUsuario([]);
    setOpcionSeleccionada(null);
    setResultadoFinal(null);
  };

  // ==========================================
  // PANTALLA DE RESULTADOS
  // ==========================================
  if (resultadoFinal) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn py-4">
        <div className="bg-gradient-to-b from-[#003B77] to-[#00224A] border-4 border-[#0067C6] rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 franja-nicaragua"></div>

          <div className="flex justify-center mb-4 mt-2">
            <div className="p-4 rounded-full bg-white border-4 border-[#E5A823] shadow-gold-glow animate-pulse">
              {resultadoFinal.insignia === 'guardabarranco_oro' ? (
                <GuardabarrancoIcon className="w-20 h-20" />
              ) : resultadoFinal.insignia === 'sacuanjoche_plata' ? (
                <SacuanjocheIcon className="w-20 h-20" />
              ) : (
                <VolcanMomotomboIcon className="w-20 h-20" />
              )}
            </div>
          </div>

          <span className="inline-block px-4 py-1 rounded-full bg-white text-[#0067C6] text-xs font-black uppercase tracking-widest border-2 border-[#0067C6] shadow">
            Nivel de Apropiación Soberana
          </span>

          <div className="my-4">
            <span className="text-6xl sm:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E5A823] via-amber-200 to-white drop-shadow">
              {resultadoFinal.porcentaje}%
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
            {resultadoFinal.arquetipo}
          </h2>
          <p className="text-sm sm:text-base text-blue-200 font-semibold mt-1">
            {resultadoFinal.subtitulo}
          </p>

          <p className="mt-4 text-sm sm:text-base text-blue-50 max-w-2xl mx-auto leading-relaxed bg-[#002B59]/60 p-4 rounded-2xl border border-white/10">
            {resultadoFinal.descripcion}
          </p>

          {metricasFeria && metricasFeria.total_participantes > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-white text-[#002B59] inline-flex items-center gap-6 text-xs font-bold shadow-lg border-2 border-[#0067C6]">
              <div>
                <span className="text-[#0067C6] font-black text-xl block">{metricasFeria.total_participantes}</span>
                <span>Participantes en Feria</span>
              </div>
              <div className="h-8 w-0.5 bg-gray-300"></div>
              <div>
                <span className="text-[#E5A823] font-black text-xl block">{metricasFeria.promedio_soberania}%</span>
                <span>Promedio General</span>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={reiniciarTrivia}
              className="px-6 py-3 rounded-xl bg-white text-[#0067C6] text-sm font-extrabold hover:bg-blue-50 transition-all shadow-md"
            >
              🔄 Intentar Nuevamente
            </button>
            <button
              onClick={onVolverAlMuseo}
              className="px-6 py-3 rounded-xl bg-[#E5A823] hover:bg-[#F59E0B] text-[#002B59] text-sm font-black transition-all shadow-gold-glow"
            >
              🏛️ Regresar al Museo
            </button>
          </div>
        </div>

        {resultadoFinal.detalles && resultadoFinal.detalles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>📜</span> Lecciones y Reflexiones Históricas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resultadoFinal.detalles.map((det, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white text-[#002B59] border-2 border-[#0067C6] space-y-2 shadow-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#0067C6] font-black uppercase">{det.trayecto}</span>
                    <span className="font-mono bg-blue-100 text-[#0067C6] px-2 py-0.5 rounded font-black">{det.ponderacion} pts</span>
                  </div>
                  <p className="text-xs text-gray-800 font-medium">{det.reflexion}</p>
                  <blockquote className="text-[11px] italic text-[#004B91] border-l-4 border-[#E5A823] pl-2 font-semibold">
                    {det.cita}
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // PANTALLA DE PREGUNTAS / DILEMAS
  // ==========================================
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn py-2">
      
      {/* Barra de Progreso Superior en Colores Patrios */}
      <div className="bg-[#003B77] rounded-2xl p-4 border-2 border-[#0067C6] flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-serif font-black text-white">Dilema {indiceActual + 1} de {preguntas.length}</span>
          <span className="text-xs text-blue-200 font-bold">• {pregunta.trayecto}</span>
        </div>
        <div className="w-32 bg-white h-2.5 rounded-full overflow-hidden border border-white/30">
          <div 
            className="h-full bg-gradient-to-r from-[#0067C6] to-[#E5A823] transition-all duration-300"
            style={{ width: `${((indiceActual + 1) / preguntas.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Tarjeta del Dilema Histórico */}
      <div className="bg-gradient-to-b from-[#003B77] to-[#00224A] border-2 border-[#0067C6] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 franja-nicaragua"></div>

        <div className="flex items-center justify-between border-b border-white/20 pb-4 pt-2">
          <span className="text-xs font-mono font-extrabold text-[#E5A823] uppercase tracking-wider">
            👤 Protagonistas: {pregunta.personaje_clave}
          </span>
          <span className="text-lg">⚖️</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-serif font-black text-white leading-snug">
            {pregunta.titulo}
          </h2>
          <div className="p-4 rounded-2xl bg-white text-[#002B59] border-l-8 border-[#0067C6] text-xs sm:text-sm leading-relaxed font-sans shadow">
            <span className="text-[#0067C6] font-black block mb-1">Situación Crítica:</span>
            {pregunta.contexto}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0067C6] text-white text-center font-bold text-sm sm:text-base shadow">
          {pregunta.dilema}
        </div>

        {/* Opciones en Blanco con Bordes Azul Bandera */}
        <div className="space-y-3">
          {pregunta.opciones.map((op) => {
            const estaSeleccionada = opcionSeleccionada === op.id;
            return (
              <button
                key={op.id}
                onClick={() => handleSeleccionarOpcion(op.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-3.5 group shadow ${
                  estaSeleccionada
                    ? 'bg-white text-[#002B59] border-[#E5A823] shadow-gold-glow scale-[1.01]'
                    : 'bg-[#002B59] text-white border-white/20 hover:border-white hover:bg-[#003B77]'
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                  estaSeleccionada
                    ? 'bg-[#0067C6] text-white'
                    : 'bg-white/20 text-white group-hover:bg-[#0067C6]'
                }`}>
                  {op.id}
                </span>
                <span className={`text-xs sm:text-sm leading-relaxed font-medium ${
                  estaSeleccionada ? 'text-[#002B59] font-bold' : 'text-gray-100'
                }`}>
                  {op.texto}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <button
            onClick={handleAnterior}
            disabled={indiceActual === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              indiceActual === 0 
                ? 'opacity-30 cursor-not-allowed text-gray-400' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            ← Anterior
          </button>

          <button
            onClick={handleSiguiente}
            disabled={!opcionSeleccionada || cargandoEnvio}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all shadow-md ${
              opcionSeleccionada && !cargandoEnvio
                ? 'bg-[#E5A823] hover:bg-[#F59E0B] text-[#002B59] shadow-gold-glow scale-105'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
          >
            {cargandoEnvio 
              ? 'Evaluando...' 
              : esUltima 
                ? 'Finalizar y Descubrir Nivel ➔' 
                : 'Siguiente Dilema ➔'}
          </button>
        </div>

      </div>

    </div>
  );
};
