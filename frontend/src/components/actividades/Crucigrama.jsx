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
      <h4 className="font-bold text-[#E5A823] uppercase text-sm border-b border-[#0067C6]/50 pb-1 mb-2">{tipo}</h4>
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
            className={`w-full text-left p-1.5 rounded text-xs sm:text-sm transition-all flex gap-2
              ${isCompleted ? 'bg-green-900/40 text-green-200 opacity-60 line-through cursor-default'
              : isActive ? 'bg-[#0067C6] text-white ring-1 ring-white shadow-lg'
              : 'hover:bg-[#0067C6]/40 text-blue-100'}`}
          >
            <span className="font-bold min-w-[15px]">{p.num}.</span>
            <span>{p.pista}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[calc(100vh-200px)] min-h-[500px]">

      {/* PANEL IZQUIERDO: Pistas */}
      <div className="bg-[#001B3A] p-3 rounded-xl border border-[#0067C6]/30 overflow-y-auto custom-scrollbar h-full">
        {renderPistaList('H', 'Horizontal')}
        {renderPistaList('V', 'Vertical')}
      </div>

      {/* PANEL DERECHO: Input arriba + Tablero abajo */}
      <div className="lg:col-span-2 flex flex-col gap-4 h-full min-h-0">

        {/* CAJA DE ENTRADA */}
        <div className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center relative shadow-lg shrink-0
          ${pistaActiva ? 'bg-[#002B59] border-[#E5A823]' : 'bg-[#001B3A] border-[#0067C6]/30 border-dashed'}`}>

          {pistaActiva ? (
            <form onSubmit={verificarRespuesta} className="w-full animate-fade-in z-10">
              <p className="text-xs sm:text-sm text-center text-[#E5A823] font-bold mb-1">
                {pistaActiva.num}. {pistaActiva.pista}
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  autoFocus
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  maxLength={pistaActiva.resp.length}
                  placeholder="Escribe aquí..."
                  className={`flex-1 bg-[#001B3A] border-2 text-white px-3 py-1.5 rounded-lg outline-none font-mono uppercase tracking-widest transition-colors text-base
                    ${error ? 'border-red-500 animate-shake' : 'border-[#0067C6] focus:border-white'}`}
                />
                <button
                  type="button"
                  onClick={verificarRespuesta}
                  className="bg-[#0067C6] hover:bg-white hover:text-[#0067C6] text-white font-bold px-4 py-1 rounded-lg transition-colors text-sm"
                >
                  Validar
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-2">
              <p className="text-blue-200/60 font-medium text-xs sm:text-sm">Selecciona una pista para empezar.</p>
            </div>
          )}
        </div>

        {/* TABLERO DEL CRUCIGRAMA */}
        <div className="bg-[#001B3A]/80 p-2 sm:p-4 rounded-xl border border-[#0067C6]/50 flex-1 min-h-0 overflow-auto custom-scrollbar relative shadow-inner">

          {/* m-auto centra sin recortar el contenido cuando hay scroll */}
          <div className="m-auto w-max">
            <div
              className="inline-grid gap-[2px] bg-[#0067C6]/20 p-1 rounded"
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
                      className={`relative w-full h-full flex items-center justify-center border font-black text-xs sm:text-sm transition-all duration-200
                        ${esParteDePistaActiva ? 'border-[#E5A823] bg-[#003d7a] shadow-[0_0_8px_rgba(229,168,35,0.4)] text-white z-10'
                        : esParteDePistaCompletada ? 'border-green-500 bg-green-900/50 text-green-300'
                        : 'border-[#0067C6] bg-[#001B3A] text-white'}`}
                    >
                      {numeroInicio && (
                        <span className="absolute top-0 left-0.5 text-[7px] sm:text-[8px] font-bold text-[#E5A823] leading-none">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#002B59] border-2 border-[#E5A823] rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center animate-fade-in">
            <div className="text-5xl mb-2">🎉</div>
            <h3 className="text-[#E5A823] font-black text-xl mb-2">
              ¡Felicidades, lo has completado correctamente!
            </h3>
            <p className="text-blue-100 text-sm mb-5">
              Has resuelto todas las pistas del crucigrama.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setMostrarFelicitacion(false)}
                className="bg-[#0067C6] hover:bg-white hover:text-[#0067C6] text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Cerrar
              </button>
              <button
                onClick={reiniciar}
                className="border border-[#E5A823] text-[#E5A823] hover:bg-[#E5A823] hover:text-[#001B3A] font-bold px-4 py-2 rounded-lg transition-colors text-sm"
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