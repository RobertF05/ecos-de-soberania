import React, { useState, useEffect, useRef } from 'react';

const BANCO_FRASES = {
  basico: [
    {
      id: 1,
      autor: "General Augusto C. Sandino (1927)",
      contexto: "Lema patriótico del Ejército Defensor de la Soberanía Nacional",
      antes: "“Nicaragua será libre mientras tenga hijos que la ",
      despues: ".”",
      respuesta: "AMEN",
      aceptadas: ["AMEN", "QUIERAN"],
      bancoPalabras: ["OLVIDEN", "AMEN", "TEMAN", "GOBIERNEN"],
      pista: "Es el sentimiento de afecto profundo y entrega incondicional hacia la patria."
    },
    {
      id: 2,
      autor: "Batalla de la Hacienda San Jacinto (14 de septiembre de 1856)",
      contexto: "Defensa heroica frente a los filibusteros de William Walker",
      antes: "“Cuando a Andrés Castro se le agotaron las municiones, derribó al invasor lanzándole una certera ",
      despues: " en las trincheras del corral.”",
      respuesta: "PIEDRA",
      aceptadas: ["PIEDRA", "PEDRADA", "ROCA"],
      bancoPalabras: ["LANZA", "ESPADA", "PIEDRA", "GRANADA"],
      pista: "Es un elemento natural muy pesado que tomó directamente del cerco de la hacienda."
    },
    {
      id: 3,
      autor: "Símbolos Patrios de Nicaragua",
      contexto: "Identidad natural y cultural de la nación",
      antes: "“El ave nacional de Nicaragua, reconocida por el plumaje turquesa de su cola en forma de raqueta, es el ",
      despues: ".”",
      respuesta: "GUARDABARRANCO",
      aceptadas: ["GUARDABARRANCO"],
      bancoPalabras: ["QUETZAL", "GUARDABARRANCO", "ZANATE", "CHOCOYO"],
      pista: "Su nombre compuesto une la acción de 'cuidar' con un precipicio o ladera de tierra."
    },
    {
      id: 4,
      autor: "Gran Cruzada Nacional de Alfabetización (1980)",
      contexto: "Movilización educativa en el campo y la montaña",
      antes: "“En 1980, decenas de miles de jóvenes brigadistas se movilizaron por todo el país para enseñar a ",
      despues: " y escribir a la población.”",
      respuesta: "LEER",
      aceptadas: ["LEER"],
      bancoPalabras: ["CANTAR", "COMERCIAR", "LEER", "NAVEGAR"],
      pista: "Es la habilidad fundamental para comprender libros, periódicos y textos escritos."
    },
    {
      id: 5,
      autor: "Rubén Darío (Príncipe de las Letras Castellanas)",
      contexto: "Verso inmortal dedicado a su tierra natal",
      antes: "“Si pequeña es la Patria, uno grande la ",
      despues: ".”",
      respuesta: "SUEÑA",
      aceptadas: ["SUEÑA", "SUENA"],
      bancoPalabras: ["SUEÑA", "DIBUJA", "CAMINA", "COMPRA"],
      pista: "Es lo que hacemos con la imaginación cuando dormimos o cuando anhelamos un gran ideal."
    }
  ],
  avanzado: [
    {
      id: 101,
      autor: "Junta Provincial de León (28 de septiembre de 1821)",
      contexto: "Documento emitido tras conocerse la proclamación de Independencia de Guatemala",
      antes: "“En la historia patria se conoce como el Acta de los ",
      despues: " al documento que pidió esperar hasta que se aclararan las circunstancias políticas del día.”",
      respuesta: "NUBLADOS",
      aceptadas: ["NUBLADOS"],
      pista: "Hace referencia metafórica a un cielo cubierto de nubes densas que impiden ver el sol con claridad."
    },
    {
      id: 102,
      autor: "General Benjamín Zeledón (Octubre de 1912)",
      contexto: "Último bastión de resistencia frente a la intervención militar extranjera",
      antes: "“El General Benjamín Zeledón defendió con su vida la soberanía nacional desde las alturas del cerro ",
      despues: ", entre Masaya y Niquinohomo.”",
      respuesta: "COYOTEPE",
      aceptadas: ["COYOTEPE"],
      pista: "Es una colina histórica de Masaya cuyo nombre de raíz indígena alude al 'cerro de los coyotes'."
    },
    {
      id: 103,
      autor: "Manifiesto de San Albino (1 de julio de 1927)",
      contexto: "Rechazo a la entrega de las armas en Tipitapa",
      antes: "“El General Augusto C. Sandino fue el único jefe que rechazó la rendición impuesta en el Pacto del ",
      despues: " Negro.”",
      respuesta: "ESPINO",
      aceptadas: ["ESPINO"],
      pista: "Es el nombre del árbol con ramas espinosas bajo cuya sombra se reunieron los enviados en Tipitapa."
    },
    {
      id: 104,
      autor: "Asamblea Nacional de Nicaragua (Septiembre de 1987)",
      contexto: "Reconocimiento histórico a los pueblos originarios y afrodescendientes",
      antes: "“A través de la Ley 28 se promulgó el Estatuto de ",
      despues: " de las Regiones de la Costa Caribe de Nicaragua.”",
      respuesta: "AUTONOMIA",
      aceptadas: ["AUTONOMIA"],
      pista: "Es la facultad legal de una región o comunidad para regirse mediante sus propias normas y autoridades."
    },
    {
      id: 105,
      autor: "General José Dolores Estrada (1856)",
      contexto: "Cuerpo patriota clave en la victoria de la Hacienda San Jacinto",
      antes: "“En la defensa de San Jacinto fue decisivo el coraje de la compañía de indios ",
      despues: " provenientes de las montañas de Yucul, Matagalpa.”",
      respuesta: "FLECHEROS",
      aceptadas: ["FLECHEROS"],
      pista: "Reciben este nombre por el proyectil tradicional que disparaban utilizando sus arcos."
    }
  ]
};

const TIEMPO_POR_NIVEL = { basico: 25, avanzado: 30 };
const PUNTOS_BASE = 100;
const COSTO_PISTA = 30;
const MULTIPLICADOR_TIEMPO = 3; // +3 puntos por cada segundo sobrante

export const CompleteFrase = () => {
  const [nivel, setNivel] = useState(null); // null | 'basico' | 'avanzado'
  const [indice, setIndice] = useState(0);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [pistaUsada, setPistaUsada] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(25);
  const [estadoPregunta, setEstadoPregunta] = useState("jugando"); // 'jugando' | 'correcto' | 'incorrecto' | 'tiempo_agotado'
  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const [historial, setHistorial] = useState([]);
  const [notificacion, setNotificacion] = useState(null);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const timeoutSaltoRef = useRef(null);

  const preguntasActuales = nivel ? BANCO_FRASES[nivel] : [];
  const preguntaActual = preguntasActuales[indice];
  const tiempoMaximo = nivel ? TIEMPO_POR_NIVEL[nivel] : 25;

  const normalizar = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();

  // Temporizador por pregunta
  useEffect(() => {
    if (!nivel || estadoPregunta !== "jugando" || juegoTerminado) return;

    if (tiempoRestante <= 0) {
      manejarTiempoAgotado();
      return;
    }

    const timer = setInterval(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [tiempoRestante, nivel, estadoPregunta, juegoTerminado]);

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (timeoutSaltoRef.current) clearTimeout(timeoutSaltoRef.current);
    };
  }, []);

  const iniciarJuego = (nivelElegido) => {
    setNivel(nivelElegido);
    setIndice(0);
    setRespuestaUsuario("");
    setPistaUsada(false);
    setTiempoRestante(TIEMPO_POR_NIVEL[nivelElegido]);
    setEstadoPregunta("jugando");
    setPuntajeTotal(0);
    setHistorial([]);
    setNotificacion(null);
    setJuegoTerminado(false);
  };

  const solicitarPista = () => {
    if (pistaUsada || estadoPregunta !== "jugando") return;
    setPistaUsada(true);
    setNotificacion({
      tipo: "pista",
      texto: `Pista activada: Se restarán ${COSTO_PISTA} pts del valor de esta frase.`
    });
  };

  const manejarTiempoAgotado = () => {
    setEstadoPregunta("tiempo_agotado");
    setNotificacion({
      tipo: "error",
      texto: "¡Se acabó el tiempo! Perdiste los puntos de esta pregunta. Saltando a la siguiente..."
    });

    registrarEnHistorial("tiempo_agotado", 0, 0);

    timeoutSaltoRef.current = setTimeout(() => {
      avanzarSiguiente(nivel, indice);
    }, 3200);
  };

  const registrarEnHistorial = (estado, puntosGanados, bonoTiempo) => {
    setHistorial((prev) => [
      ...prev,
      {
        id: preguntaActual.id,
        fraseCompleta: `${preguntaActual.antes}${preguntaActual.respuesta}${preguntaActual.despues}`,
        respuestaCorrecta: preguntaActual.respuesta,
        respuestaDada: respuestaUsuario || "(Sin responder)",
        estado,
        pistaUsada,
        bonoTiempo,
        puntosGanados
      }
    ]);
  };

  const evaluarRespuesta = (valorManual) => {
    if (estadoPregunta !== "jugando") return;

    const textoEvaluar = valorManual !== undefined ? valorManual : respuestaUsuario;
    if (!textoEvaluar.trim()) return;

    const normalizada = normalizar(textoEvaluar);
    const esCorrecta = preguntaActual.aceptadas.some(
      (valida) => normalizar(valida) === normalizada
    );

    if (esCorrecta) {
      const bonoRapidez = tiempoRestante * MULTIPLICADOR_TIEMPO;
      const descuentoPista = pistaUsada ? COSTO_PISTA : 0;
      const puntosObtenidos = Math.max(10, PUNTOS_BASE + bonoRapidez - descuentoPista);

      setPuntajeTotal((prev) => prev + puntosObtenidos);
      setEstadoPregunta("correcto");
      setNotificacion({
        tipo: "exito",
        texto: `¡Excelente! +${PUNTOS_BASE} pts base | +${bonoRapidez} pts por rapidez${
          pistaUsada ? ` | -${COSTO_PISTA} pts por pista` : ""
        } = +${puntosObtenidos} pts`
      });
      registrarEnHistorial("correcto", puntosObtenidos, bonoRapidez);
    } else {
      setEstadoPregunta("incorrecto");
      setNotificacion({
        tipo: "error",
        texto: `Respuesta incorrecta. La palabra correcta era "${preguntaActual.respuesta}". (0 pts)`
      });
      registrarEnHistorial("incorrecto", 0, 0);
    }
  };

  const avanzarSiguiente = (nivelRef = nivel, indiceRef = indice) => {
    if (timeoutSaltoRef.current) clearTimeout(timeoutSaltoRef.current);

    const lista = BANCO_FRASES[nivelRef];
    if (indiceRef + 1 < lista.length) {
      setIndice(indiceRef + 1);
      setRespuestaUsuario("");
      setPistaUsada(false);
      setTiempoRestante(TIEMPO_POR_NIVEL[nivelRef]);
      setEstadoPregunta("jugando");
      setNotificacion(null);
    } else {
      setJuegoTerminado(true);
    }
  };

  // ==========================================
  // 1. PANTALLA DE SELECCIÓN DE NIVEL
  // ==========================================
  if (!nivel) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-slate-700">
        {/* Reglas claras a primera vista */}
        <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-lg sm:text-xl font-serif font-black text-sky-900">
              Complete la Frase Histórica
            </h3>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 px-3 py-1 rounded-full border border-sky-200">
              Reglas de Puntuación
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <strong className="text-sky-900 block mb-0.5">Bono de Velocidad</strong>
              <span className="text-slate-600">
                Ganas <strong>{PUNTOS_BASE} pts</strong> por acierto más <strong>+{MULTIPLICADOR_TIEMPO} pts</strong> por cada segundo que te sobre en el reloj.
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <strong className="text-amber-800 block mb-0.5">Uso de Pistas (-{COSTO_PISTA} pts)</strong>
              <span className="text-slate-600">
                Puedes pedir una pista contextual por pregunta, pero restará <strong>{COSTO_PISTA} puntos</strong> si aciertas.
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
              <strong className="text-red-800 block mb-0.5">Límite de Tiempo</strong>
              <span className="text-slate-600">
                Si el reloj llega a 0s, <strong>pierdes los puntos de esa pregunta</strong> y saltarás a la siguiente.
              </span>
            </div>
          </div>
        </div>

        {/* Tarjetas de Nivel de Dificultad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nivel Explorador */}
          <button
            onClick={() => iniciarJuego("basico")}
            className="text-left bg-white hover:bg-sky-50/40 border-2 border-slate-200 hover:border-sky-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-md bg-sky-50 text-sky-800 font-extrabold text-xs uppercase tracking-wider border border-sky-200">
                  Nivel 1 • Explorador
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">25s por frase</span>
              </div>
              <h4 className="text-xl font-serif font-black text-sky-900 group-hover:text-sky-700 transition-colors">
                Ideal para principiantes y visitantes
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                ¿No conoces muchos detalles históricos? Este modo incluye un <strong>banco de palabras sugeridas</strong> para que puedas elegir o escribir con facilidad.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-sky-700">
              <span>5 frases fundamentales</span>
              <span className="group-hover:translate-x-1 transition-transform">Comenzar Nivel Explorador →</span>
            </div>
          </button>

          {/* Nivel Historiador */}
          <button
            onClick={() => iniciarJuego("avanzado")}
            className="text-left bg-white hover:bg-sky-50/40 border-2 border-slate-200 hover:border-sky-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-md bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider">
                  Nivel 2 • Historiador
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">30s por frase</span>
              </div>
              <h4 className="text-xl font-serif font-black text-sky-900 group-hover:text-sky-700 transition-colors">
                Para conocedores de la historia patria
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Completa los documentos y acontecimientos escribiendo la palabra clave directamente desde tu memoria, con indicador de longitud de letras.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-sky-800">
              <span>5 desafíos históricos</span>
              <span className="group-hover:translate-x-1 transition-transform">Comenzar Nivel Historiador →</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. PANTALLA DE RESULTADOS FINALES
  // ==========================================
  if (juegoTerminado) {
    const aciertos = historial.filter((h) => h.estado === "correcto").length;
    const buenDesempeno = aciertos >= 3;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in text-slate-700 py-2">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-700"></div>

          <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
            buenDesempeno
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}>
            {buenDesempeno ? "¡Excelente Desempeño Histórico!" : "Buen Intento • Sigue Practicando"}
          </span>

          <h3 className="text-2xl sm:text-3xl font-serif font-black text-sky-900 mt-3">
            {buenDesempeno
              ? "¡Lo hiciste muy bien!"
              : "Puedes mejorar tu marca histórica"}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Acertaste <strong>{aciertos}</strong> de <strong>{preguntasActuales.length}</strong> frases en el modo{" "}
            <strong className="uppercase text-sky-800">{nivel === "basico" ? "Explorador" : "Historiador"}</strong>
          </p>

          {/* Caja de Puntaje Total Acumulado */}
          <div className="my-6 inline-block bg-slate-50 border border-slate-200 rounded-2xl px-8 py-4 shadow-inner">
            <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Puntaje Total Acumulado
            </span>
            <span className="text-4xl sm:text-5xl font-serif font-black text-sky-800">
              {puntajeTotal} <span className="text-lg font-sans font-bold text-slate-500">pts</span>
            </span>
          </div>

          {/* Desglose pregunta por pregunta */}
          <div className="text-left space-y-2.5 mt-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-1">
              Resumen de tus respuestas:
            </h4>
            {historial.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  item.estado === "correcto"
                    ? "bg-emerald-50/50 border-emerald-200"
                    : "bg-red-50/50 border-red-200"
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2 font-bold">
                    <span className={item.estado === "correcto" ? "text-emerald-800" : "text-red-800"}>
                      {item.estado === "correcto"
                        ? "Correcto"
                        : item.estado === "tiempo_agotado"
                        ? "Tiempo Agotado"
                        : "Incorrecto"}
                    </span>
                    <span className="text-slate-700">
                      • Palabra clave: <strong className="text-sky-900 underline">{item.respuestaCorrecta}</strong>
                    </span>
                    {item.pistaUsada && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                        Pista (-{COSTO_PISTA} pts)
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 italic line-clamp-1">{item.fraseCompleta}</p>
                </div>

                <div className="shrink-0 font-mono font-black text-sm text-right">
                  {item.puntosGanados > 0 ? (
                    <span className="text-emerald-700">+{item.puntosGanados} pts</span>
                  ) : (
                    <span className="text-red-600">0 pts</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => iniciarJuego(nivel)}
              className="px-5 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm"
            >
              Jugar de nuevo este nivel
            </button>
            <button
              onClick={() => setNivel(null)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm transition-all border border-slate-200"
            >
              Cambiar dificultad
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. PANTALLA DE JUEGO ACTIVO
  // ==========================================
  const porcentajeTiempo = Math.max(0, (tiempoRestante / tiempoMaximo) * 100);
  const bonoActualEstimado = tiempoRestante * MULTIPLICADOR_TIEMPO;

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-fade-in text-slate-700">
      
      {/* Barra Superior: Nivel, Reloj, Bono de Rapidez y Puntaje Acumulado */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNivel(null)}
              className="text-xs font-bold text-slate-500 hover:text-sky-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
              title="Cambiar nivel de dificultad"
            >
              ← Nivel: <strong className="text-sky-800 uppercase">{nivel === "basico" ? "Explorador" : "Historiador"}</strong>
            </button>
            <span className="text-xs font-extrabold text-slate-600">
              Frase {indice + 1} de {preguntasActuales.length}
            </span>
          </div>

          {/* Indicadores de Tiempo y Puntos */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black border transition-colors ${
                tiempoRestante <= 6
                  ? "bg-red-50 text-red-700 border-red-300 animate-pulse"
                  : "bg-white text-sky-900 border-slate-200"
              }`}
            >
              <span>Tiempo: {tiempoRestante}s</span>
              <span className="text-[10px] font-sans font-bold text-sky-700 hidden sm:inline">
                (Bono: +{bonoActualEstimado} pts)
              </span>
            </div>

            <div className="bg-sky-900 text-white px-3.5 py-1 rounded-full text-xs font-mono font-black shadow-sm">
              Puntaje: {puntajeTotal} pts
            </div>
          </div>
        </div>

        {/* Barra de progreso visual del tiempo */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              tiempoRestante <= 6 ? "bg-red-500" : "bg-sky-700"
            }`}
            style={{ width: `${porcentajeTiempo}%` }}
          />
        </div>
      </div>

      {/* Tarjeta Principal de la Frase */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
        
        {/* Cabecera del Documento + Botón de Pista */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 block">
              {preguntaActual.contexto}
            </span>
            <h4 className="text-sm font-serif font-bold text-slate-800 mt-0.5">
              — {preguntaActual.autor}
            </h4>
          </div>

          {/* Único ícono SVG limpio para solicitar una pista */}
          <button
            type="button"
            onClick={solicitarPista}
            disabled={pistaUsada || estadoPregunta !== "jugando"}
            title="Solicitar una pista contextual (Resta 30 puntos)"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
              pistaUsada
                ? "bg-amber-50 text-amber-800 border-amber-200 cursor-default"
                : "bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border-slate-200 hover:border-amber-300 shadow-sm active:scale-95"
            }`}
          >
            <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>{pistaUsada ? `Pista usada (-${COSTO_PISTA} pts)` : `Pedir Pista (-${COSTO_PISTA} pts)`}</span>
          </button>
        </div>

        {/* Cita con el Espacio en Blanco Integrado */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border-l-4 border-sky-700 text-base sm:text-xl font-serif leading-relaxed text-slate-800">
          <span>{preguntaActual.antes}</span>
          <span
            className={`inline-block mx-1.5 px-3 py-0.5 rounded-lg border-b-2 font-mono font-black text-base sm:text-lg tracking-wider transition-all ${
              estadoPregunta === "correcto"
                ? "bg-emerald-100 border-emerald-600 text-emerald-900"
                : estadoPregunta === "incorrecto" || estadoPregunta === "tiempo_agotado"
                ? "bg-red-100 border-red-600 text-red-900"
                : respuestaUsuario
                ? "bg-sky-100 border-sky-700 text-sky-900"
                : "bg-white border-sky-400 text-slate-400"
            }`}
          >
            {estadoPregunta === "incorrecto" || estadoPregunta === "tiempo_agotado"
              ? preguntaActual.respuesta
              : respuestaUsuario || "_".repeat(preguntaActual.respuesta.length)}
          </span>
          <span>{preguntaActual.despues}</span>
        </div>

        {/* Caja de Pista Desplegada */}
        {pistaUsada && (
          <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-900 animate-fade-in">
            <strong className="font-extrabold block text-amber-800 mb-0.5">
              Pista Histórica (-{COSTO_PISTA} puntos aplicados):
            </strong>
            <span>{preguntaActual.pista}</span>
          </div>
        )}

        {/* Controles de Respuesta (Según Nivel) */}
        {estadoPregunta === "jugando" && (
          <div className="space-y-4">
            {/* Si es Nivel Explorador, mostrar botones de sugerencias */}
            {nivel === "basico" && preguntaActual.bancoPalabras && (
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  Opciones rápidas (Haz clic en una palabra o escríbela abajo):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {preguntaActual.bancoPalabras.map((palabra) => (
                    <button
                      key={palabra}
                      type="button"
                      onClick={() => {
                        setRespuestaUsuario(palabra);
                        evaluarRespuesta(palabra);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-sky-700 text-slate-700 hover:text-white font-mono font-extrabold text-xs sm:text-sm border border-slate-200 hover:border-sky-700 transition-all shadow-sm active:scale-95"
                    >
                      {palabra}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input de escritura para ambos niveles */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                evaluarRespuesta();
              }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  autoFocus
                  value={respuestaUsuario}
                  onChange={(e) => setRespuestaUsuario(e.target.value.toUpperCase())}
                  placeholder={`Escribe la palabra (${preguntaActual.respuesta.length} letras)...`}
                  className="w-full bg-slate-50 focus:bg-white border-2 border-slate-300 focus:border-sky-700 rounded-xl px-4 py-3 text-slate-800 font-mono font-bold uppercase tracking-wider text-sm outline-none transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-400">
                  {respuestaUsuario.length}/{preguntaActual.respuesta.length}
                </span>
              </div>

              <button
                type="submit"
                disabled={!respuestaUsuario.trim()}
                className={`px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm ${
                  respuestaUsuario.trim()
                    ? "bg-sky-800 hover:bg-sky-900 text-white active:scale-95"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Comprobar Respuesta
              </button>
            </form>
          </div>
        )}

        {/* Notificaciones de Puntos / Tiempo Agotado / Resultado */}
        {notificacion && (
          <div
            className={`p-4 rounded-2xl border-l-4 text-xs sm:text-sm font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in ${
              notificacion.tipo === "exito"
                ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                : notificacion.tipo === "pista"
                ? "bg-amber-50 border-amber-500 text-amber-900"
                : "bg-red-50 border-red-500 text-red-900"
            }`}
          >
            <span>{notificacion.texto}</span>

            {estadoPregunta !== "jugando" && (
              <button
                type="button"
                onClick={() => avanzarSiguiente(nivel, indice)}
                className="shrink-0 px-4 py-2 rounded-xl bg-sky-800 hover:bg-sky-900 text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
              >
                {indice + 1 < preguntasActuales.length ? "Siguiente Frase →" : "Ver Puntaje Final →"}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};