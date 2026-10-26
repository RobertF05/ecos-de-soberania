import React, { useState, useEffect } from 'react';

// Coordenadas calculadas a partir de la imagen de referencia
// fila / col empiezan en 0. dir: 'H' = horizontal, 'V' = vertical
const palabrasData = [
  // HORIZONTALES
  { id: 'H6',  num: 6,  pista: "Nombre del estatuto (Ley 28) aprobado en 1987 que reconoce los derechos históricos de los pueblos costeños.", resp: "AUTONOMIA", fila: 3, col: 15, dir: 'H' },
  { id: 'H8',  num: 8,  pista: "Siglas del frente político-militar que lideró la lucha armada contra la Guardia Nacional.", resp: "FSLN", fila: 5, col: 4, dir: 'H' },
  { id: 'H10', num: 10, pista: "Ciudad donde se firmó el Acta de Independencia de Centroamérica en 1821.", resp: "GUATEMALA", fila: 6, col: 7, dir: 'H' },
  { id: 'H11', num: 11, pista: "Uno de los principales pueblos originarios que habitan mayoritariamente en la región norte del Caribe.", resp: "MISKITOS", fila: 6, col: 19, dir: 'H' },
  { id: 'H12', num: 12, pista: "Mes histórico en el que las columnas guerrilleras entraron triunfantes a Managua.", resp: "JULIO", fila: 8, col: 19, dir: 'H' },
  { id: 'H13', num: 13, pista: "Gran Cruzada Nacional realizada en 1980, donde miles de jóvenes enseñaron a leer y escribir.", resp: "ALFABETIZACION", fila: 12, col: 0, dir: 'H' },

  // VERTICALES
  { id: 'V1', num: 1, pista: "Mes en el que se conmemora la emancipación política de las provincias centroamericanas.", resp: "SEPTIEMBRE", fila: 0, col: 17, dir: 'V' },
  { id: 'V2', num: 2, pista: "Apellido de la familia que instauró la dictadura militar derrocada el 19 de julio de 1979.", resp: "SOMOZA", fila: 1, col: 13, dir: 'V' },
  { id: 'V3', num: 3, pista: "Pueblo indígena de la Costa Caribe Sur, cuyo nombre también lleva un municipio de la RACCS.", resp: "RAMA", fila: 1, col: 21, dir: 'V' },
  { id: 'V4', num: 4, pista: "Apellido del 'General de Hombres y Mujeres Libres' que inspiró ideológicamente el movimiento revolucionario.", resp: "SANDINO", fila: 2, col: 23, dir: 'V' },
  { id: 'V5', num: 5, pista: "Característica principal de la Costa Caribe por albergar a diversas comunidades.", resp: "MULTIETNICA", fila: 3, col: 10, dir: 'V' },
  { id: 'V6', num: 6, pista: "Documento oficial firmado el 15 de septiembre de 1821 que declaró la libertad de las provincias.", resp: "ACTA", fila: 3, col: 15, dir: 'V' },
  { id: 'V7', num: 7, pista: "Idioma introducido por los británicos que forma parte de la herencia bilingüe en la Costa Caribe.", resp: "INGLES", fila: 4, col: 7, dir: 'V' },
  { id: 'V9', num: 9, pista: "Imperio europeo del cual se independizaron las Provincias Unidas del Centro de América.", resp: "ESPANA", fila: 5, col: 26, dir: 'V' },
];

// Tamaño de la cuadrícula
const maxFilas = 14;
const maxCols = 27;

export const Crucigrama = () => {
  const [respuestasCorrectas, setRespuestasCorrectas] = useState({});
  const [pistaActiva, setPistaActiva] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [mostrarFelicitacion, setMostrarFelicitacion] = useState(false);

  // El crucigrama está completo cuando todas las palabras están resueltas
  const completado = palabrasData.every(p => respuestasCorrectas[p.id]);

  useEffect(() => {
    if (completado) setMostrarFelicitacion(true);
  }, [completado]);

  const reiniciar = () => {
    setRespuestasCorrectas({});
    setPistaActiva(null);
    setInputValue("");
    setError(false);
    setMostrarFelicitacion(false);
  };

  // Mapear las celdas
  const celdas = {};
  palabrasData.forEach(palabra => {
    for (let i = 0; i < palabra.resp.length; i++) {
      const f = palabra.dir === 'H' ? palabra.fila : palabra.fila + i;
      const c = palabra.dir === 'H' ? palabra.col + i : palabra.col;
      const key = `${f}-${c}`;

      if (!celdas[key]) celdas[key] = { letra: '', palabras: [] };

      // Detector de conflictos en los cruces (solo aparece en consola)
      if (celdas[key].letra && celdas[key].letra !== palabra.resp[i]) {
        console.warn(`Conflicto en ${key}: ${palabra.id} tiene "${palabra.resp[i]}" pero ya había "${celdas[key].letra}"`);
      }

      celdas[key].letra = palabra.resp[i];
      celdas[key].palabras.push(palabra);
    }
  });

  const normalizar = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();

  const verificarRespuesta = (e) => {
    if (e) e.preventDefault();
    if (!pistaActiva) return;

    if (normalizar(inputValue) === normalizar(pistaActiva.resp)) {
      const idCorrecto = pistaActiva.id;
      setRespuestasCorrectas(prev => ({ ...prev, [idCorrecto]: true }));
      setPistaActiva(null);
      setInputValue("");
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleInputChange = (e) => {
    if (!pistaActiva) return;
    const val = e.target.value.toUpperCase();
    setInputValue(val);

    if (normalizar(val) === normalizar(pistaActiva.resp)) {
      const idCorrecto = pistaActiva.id;
      setRespuestasCorrectas(prev => ({ ...prev, [idCorrecto]: true }));
      setTimeout(() => {
        setPistaActiva(null);
        setInputValue("");
      }, 500);
    }
  };

  const renderPistaList = (filtroDir, tipo) => (
    <div className="space-y-2 mb-6">
      <h4 className="font-extrabold text-sky-800 uppercase text-xs tracking-wider border-b border-slate-200 pb-1.5 mb-2.5 shadow-sm">
        {tipo}
      </h4>
      {palabrasData.filter(p => p.dir === filtroDir).sort((a, b) => a.num - b.num).map((p) => {
        const isCompleted = respuestasCorrectas[p.id];
        const isActive = pistaActiva?.id === p.id;
        return (
          <button
            key={p.id}
            onClick={() => {
              setPistaActiva(p);
              setInputValue(isCompleted ? p.resp : "");
              setError(false);
            }}
            disabled={isCompleted}
            className={`w-full text-left p-2 rounded-lg text-xs sm:text-sm transition-all duration-200 flex gap-2 border
              ${isCompleted 
                ? 'bg-emerald-50/50 border-emerald-100 text-emerald-700/60 line-through cursor-default'
                : isActive 
                  ? 'bg-white border-sky-400 text-sky-800 shadow-md scale-[1.02]'
                  : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:border-sky-300 text-slate-700'}`}
          >
            <span className={`font-black min-w-[15px] ${isCompleted ? 'text-emerald-700/60' : isActive ? 'text-sky-700' : 'text-slate-500'}`}>
              {p.num}.
            </span>
            <span className="font-medium leading-relaxed">{p.pista}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-auto lg:h-[calc(100vh-200px)] min-h-[500px] text-slate-800">

      {/* PANEL IZQUIERDO: Pistas */}
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200 overflow-y-auto custom-scrollbar h-full shadow-sm">
        {renderPistaList('H', 'Horizontal')}
        {renderPistaList('V', 'Vertical')}
      </div>

      {/* PANEL DERECHO: Input arriba + Tablero abajo */}
      <div className="lg:col-span-2 flex flex-col gap-5 h-full min-h-0">

        {/* CAJA DE ENTRADA */}
        <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-center relative shadow-sm shrink-0
          ${pistaActiva ? 'bg-white border-sky-400 shadow-md' : 'bg-white/60 backdrop-blur-sm border-slate-200 border-dashed'}`}>

          {pistaActiva ? (
            <form onSubmit={verificarRespuesta} className="w-full animate-fade-in z-10">
              <p className="text-xs sm:text-sm text-center text-sky-900 font-extrabold mb-2.5">
                {pistaActiva.num}. {pistaActiva.pista}
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  autoFocus
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  maxLength={pistaActiva.resp.length}
                  placeholder="Escribe la respuesta..."
                  className={`flex-1 bg-slate-50 border-2 text-slate-800 px-3 py-2 rounded-xl outline-none font-mono uppercase tracking-widest transition-colors text-base shadow-inner
                    ${error ? 'border-red-400 bg-red-50 text-red-700 animate-shake' : 'border-slate-300 focus:border-sky-600 focus:bg-white'}`}
                />
                <button
                  type="button"
                  onClick={verificarRespuesta}
                  className="bg-sky-700 hover:bg-sky-800 text-white font-extrabold px-5 py-2 rounded-xl transition-all shadow-sm active:scale-95 text-sm"
                >
                  Validar
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-500 font-medium text-xs sm:text-sm bg-slate-100/50 px-4 py-1.5 rounded-full inline-block border border-slate-200">
                Selecciona una pista de la izquierda para empezar a escribir.
              </p>
            </div>
          )}
        </div>

        {/* TABLERO DEL CRUCIGRAMA */}
        <div className="bg-white/95 backdrop-blur-md p-3 sm:p-5 rounded-2xl border border-slate-200 flex-1 min-h-0 overflow-auto custom-scrollbar relative shadow-sm">

          {/* m-auto centra sin recortar el contenido cuando hay scroll */}
          <div className="m-auto w-max">
            <div
              className="inline-grid gap-[1px] bg-slate-200 p-1.5 rounded-xl border border-slate-300"
              style={{
                gridTemplateColumns: `repeat(${maxCols}, 1.5rem)`,
                gridTemplateRows: `repeat(${maxFilas}, 1.5rem)`
              }}
            >
              {Array.from({ length: maxFilas }).map((_, f) =>
                Array.from({ length: maxCols }).map((_, c) => {
                  const cellData = celdas[`${f}-${c}`];

                  // Celda vacía (sin borde ni fondo)
                  if (!cellData) return <div key={`${f}-${c}`} />;

                  const esParteDePistaActiva = pistaActiva && cellData.palabras.some(p => p.id === pistaActiva.id);
                  const esParteDePistaCompletada = cellData.palabras.some(p => respuestasCorrectas[p.id]);

                  let letraMostrar = "";
                  if (esParteDePistaCompletada) {
                    letraMostrar = cellData.letra;
                  } else if (esParteDePistaActiva) {
                    const pista = cellData.palabras.find(p => p.id === pistaActiva.id);
                    const index = pista.dir === 'H' ? c - pista.col : f - pista.fila;
                    letraMostrar = inputValue[index] || "";
                  }

                  const numeroInicio = cellData.palabras.find(p => p.col === c && p.fila === f)?.num;

                  return (
                    <div
                      key={`${f}-${c}`}
                      className={`relative w-full h-full flex items-center justify-center border font-black text-xs sm:text-sm transition-all duration-200 rounded-[2px]
                        ${esParteDePistaActiva 
                          ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-[0_0_8px_rgba(14,165,233,0.4)] z-10'
                          : esParteDePistaCompletada 
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-slate-300 bg-white text-slate-800'}`}
                    >
                      {numeroInicio && (
                        <span className={`absolute top-0 left-[2px] text-[7px] sm:text-[8px] font-bold leading-none ${esParteDePistaActiva ? 'text-sky-700' : 'text-slate-400'}`}>
                          {numeroInicio}
                        </span>
                      )}
                      {letraMostrar}
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>

      {/* AVISO DE FELICITACIÓN */}
      {mostrarFelicitacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500"></div>
            
            <div className="text-5xl mb-3 drop-shadow-sm">🎉</div>
            <h3 className="text-sky-900 font-black text-2xl mb-3 leading-tight">
              ¡Felicidades, lo has completado!
            </h3>
            <p className="text-slate-600 font-medium text-sm mb-6">
              Has resuelto todas las pistas históricas del crucigrama de soberanía.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setMostrarFelicitacion(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
              >
                Cerrar
              </button>
              <button
                onClick={reiniciar}
                className="bg-sky-700 hover:bg-sky-800 text-white font-extrabold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
              >
                Jugar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};