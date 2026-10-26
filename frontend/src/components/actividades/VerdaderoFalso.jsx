import React, { useState } from 'react';

const preguntas = [
  {
    pregunta: "La firma del Acta de Independencia de Centroamérica, el 15 de septiembre de 1821 en Guatemala, supuso la inmediata consolidación de repúblicas soberanas sin posteriores intentos de anexión externa.",
    respuesta: false,
    explicacion: "Pocos meses después de declarar la independencia de España, las provincias del Reino de Guatemala decidieron anexarse al Primer Imperio Mexicano de Agustín de Iturbide en 1822; fue hasta julio de 1823 cuando se declaró la independencia absoluta."
  },
  {
    pregunta: "El Acta de los Nublados, redactada en León, Nicaragua, reflejó una postura de cautela y rechazo inicial a las disposiciones del Acta de Independencia firmada en Guatemala en septiembre de 1821.",
    respuesta: true,
    explicacion: "La Junta Provincial de León emitió el «Acta de los Nublados» el 28 de septiembre de 1821, manifestando no reconocer lo actuado en Guatemala «hasta tanto que se aclaren los nublados del día»."
  },
  {
    pregunta: "Antes de la firma del Tratado Managua de 1860, el territorio de la Costa de Mosquitia gozaba de la protección y presencia formal del Imperio británico.",
    respuesta: true,
    explicacion: "Gran Bretaña mantuvo un protectorado sobre el Reino Misquito a lo largo de los siglos XVIII y XIX, el cual comenzó a disolverse formalmente con el Tratado de Managua de 1860."
  },
  {
    pregunta: "La llamada «Reincorporación de la Mosquitia» ocurrida en 1894 fue llevada a cabo de forma pacífica y mediante consenso unánime entre el gobierno de José Santos Zelaya y las comunidades indígenas costeñas.",
    respuesta: false,
    explicacion: "La reincorporación militar encabezada por el general Rigoberto Cabezas en 1894 se impuso por la fuerza frente a la autoridad del cacique Robert Henry Clarence y generó fuertes resistencias."
  },
  {
    pregunta: "El Estatuto de Autonomía de las Regiones de la Costa Atlántica de Nicaragua fue formalmente institucionalizado a través de la Ley 28 en el año 1987.",
    respuesta: true,
    explicacion: "En septiembre de 1987, la Asamblea Nacional de Nicaragua aprobó la Ley N° 28 («Estatuto de la Autonomía de las Regiones de la Costa Atlántica de Nicaragua»)."
  },
  {
    pregunta: "La Ley 28 reconoció exclusivamente los derechos colectivos territoriales del pueblo Miskitu, omitiendo a las demás identidades étnicas y lingüísticas como los Creoles, Mayangnas y Ramas.",
    respuesta: false,
    explicacion: "El Estatuto de Autonomía reconoció explícitamente el carácter pluriétnico y multilingüe de la región, garantizando los derechos de los pueblos miskitu, mayangna, rama, creole, garífuna y mestizo."
  },
  {
    pregunta: "La muerte del periodista Pedro Joaquín Chamorro Cardenal en enero de 1978 fue un catalizador clave que unificó a amplios sectores sociales y económicos en contra del régimen de Anastasio Somoza Debayle.",
    respuesta: true,
    explicacion: "El asesinato del director del diario La Prensa provocó un paro patronal generalizado, movilizaciones masivas y el estrechamiento de alianzas entre la oposición civil y la empresa privada."
  },
  {
    pregunta: "La Cruzada Nacional de Alfabetización impulsada por la Junta de Gobierno de Reconstrucción Nacional inició a mediados de 1984, tras culminar los primeros comicios generales posrevolucionarios.",
    respuesta: false,
    explicacion: "La Cruzada Nacional de Alfabetización se llevó a cabo del 23 de marzo al 23 de agosto de 1980, logrando reducir el índice de analfabetismo a pocos meses del triunfo revolucionario."
  },
  {
    pregunta: "El FSLN se organizó originalmente a inicios de los años sesenta bajo la influencia de tres tendencias internas formales que operaron separadas desde su fundación hasta 1979.",
    respuesta: false,
    explicacion: "El FSLN fue fundado en 1961 de manera unitaria; la división en tres tendencias surgió a mediados de la década de 1970 y se reunificó formalmente en marzo de 1979."
  },
  {
    pregunta: "El proceso de negociación y los Acuerdos de Esquipulas II (1987) establecieron las bases para el cese al fuego y la salida electoral pacífica que concluyó con los comicios de febrero de 1990.",
    respuesta: true,
    explicacion: "Los Acuerdos de Esquipulas II, sumados a los Acuerdos de Sapoá (1988), fijaron la ruta de desmovilización, diálogo nacional y garantías para las elecciones generales de 1990."
  }
];

export const VerdaderoFalso = () => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntaje, setPuntaje] = useState(0);

  const preguntaActual = preguntas[indiceActual];

  const handleRespuesta = (valor) => {
    if (mostrarResultado) return;
    setSeleccion(valor);
    setMostrarResultado(true);
    if (valor === preguntaActual.respuesta) {
      setPuntaje(puntaje + 1);
    }
  };

  const siguientePregunta = () => {
    if (indiceActual < preguntas.length - 1) {
      setIndiceActual(indiceActual + 1);
      setSeleccion(null);
      setMostrarResultado(false);
    } else {
      // Fin del juego
      setIndiceActual(-1); 
    }
  };

  if (indiceActual === -1) {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-5xl mb-4 drop-shadow-sm">📜</div>
        <h3 className="text-2xl font-black text-sky-900 mb-2">Evaluación Completada</h3>
        <p className="text-lg text-slate-600 mb-8 font-medium">
          Tu puntaje de precisión histórica: <span className="font-black text-xl text-sky-700">{puntaje}</span> de {preguntas.length}
        </p>
        <button 
          onClick={() => { setIndiceActual(0); setPuntaje(0); setSeleccion(null); setMostrarResultado(false); }} 
          className="bg-sky-700 hover:bg-sky-800 text-white font-extrabold py-3 px-8 rounded-xl transition-all shadow-sm active:scale-95"
        >
          🔄 Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-slate-800">
      
      {/* Encabezado de Progreso */}
      <div className="flex justify-between items-center mb-6 px-1">
        <span className="text-xs font-extrabold text-sky-700 uppercase tracking-wider">
          Pregunta {indiceActual + 1} de {preguntas.length}
        </span>
        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          Aciertos: <strong className="text-sky-800">{puntaje}</strong>
        </span>
      </div>

      {/* Tarjeta de la Pregunta */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-700"></div>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-serif font-medium pl-2">
          {preguntaActual.pregunta}
        </p>
      </div>

      {/* Botones de Selección */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleRespuesta(true)}
          disabled={mostrarResultado}
          className={`flex-1 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all border-2 shadow-sm
            ${mostrarResultado 
              ? (preguntaActual.respuesta === true 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 scale-[1.02]' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed') 
              : 'bg-white border-slate-300 text-slate-700 hover:border-sky-500 hover:text-sky-800 hover:bg-sky-50 active:scale-[0.98]'}`}
        >
          Verdadero
        </button>
        <button
          onClick={() => handleRespuesta(false)}
          disabled={mostrarResultado}
          className={`flex-1 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all border-2 shadow-sm
            ${mostrarResultado 
              ? (preguntaActual.respuesta === false 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 scale-[1.02]' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed') 
              : 'bg-white border-slate-300 text-slate-700 hover:border-sky-500 hover:text-sky-800 hover:bg-sky-50 active:scale-[0.98]'}`}
        >
          Falso
        </button>
      </div>

      {/* Retroalimentación y Explicación */}
      {mostrarResultado && (
        <div className={`p-5 rounded-2xl border-l-4 mb-8 shadow-sm animate-fade-in
          ${seleccion === preguntaActual.respuesta 
            ? 'bg-emerald-50 border-emerald-500' 
            : 'bg-red-50 border-red-500'}`}
        >
          <p className={`font-black mb-2 flex items-center gap-2 text-sm uppercase tracking-wider
            ${seleccion === preguntaActual.respuesta ? 'text-emerald-800' : 'text-red-800'}`}
          >
            {seleccion === preguntaActual.respuesta ? '✅ Respuesta Correcta' : '❌ Respuesta Incorrecta'}
          </p>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            {preguntaActual.explicacion}
          </p>
        </div>
      )}

      {/* Botón de Continuar */}
      {mostrarResultado && (
        <button 
          onClick={siguientePregunta} 
          className="w-full bg-sky-800 hover:bg-sky-900 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98] text-sm uppercase tracking-wider"
        >
          {indiceActual === preguntas.length - 1 ? 'Ver Resultados Finales ➔' : 'Siguiente Pregunta ➔'}
        </button>
      )}
    </div>
  );
};