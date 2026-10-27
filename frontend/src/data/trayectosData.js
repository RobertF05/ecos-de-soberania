/**
 * Datos y contenidos educativos para el Museo Digital:
 * "Ecos de Soberanía: Digitalizando la Memoria y la Identidad Nacional de Nicaragua"
 * 
 * Cada trayecto cuenta con:
 * - Metadatos históricos y periodo
 * - Citas textuales patrióticas
 * - Hitos clave
 * - Configuración de imágenes listas para que el usuario coloque sus archivos en:
 *   /public/assets/images/{archivo}
 */

export const TRAYECTOS_HISTORICOS = [
  {
    id: "raices",
    numero: "I",
    nombre: "Raíces e Independencia",
    periodo: "1821 – 1856",
    subtitulo: "La Ruptura Colonial y la Defensa de la Patria contra el Filibusterismo",
    colorTema: "from-blue-900 to-indigo-950",
    bordeTema: "border-blue-500/40",
    iconoTipo: "san_jacinto",
    lema: "¡La soberanía nacional nació en el corral de piedra!",
    citaHistorica: {
      texto: "Andrés Castro derribó de una certera pedrada a un filibustero armado con rifle de repetición, simbolizando el valor ancestral de un pueblo que no tolera cadenas.",
      autor: "Crónica de la Guerra Nacional de 1856",
      año: "14 de Septiembre de 1856"
    },
    descripcionLarga: "Desde la proclamación de la Independencia en 1821, Nicaragua enfrentó la ambición geopolítica de potencias que codiciaban su posición geográfica para una ruta interoceánica. En 1855, el filibustero esclavista William Walker intentó adueñarse de la nación, nombrandose presidente e instaurando el inglés y la esclavitud. La gloriosa Batalla de San Jacinto consolidó la primera gran victoria de dignidad nacional.",
    hitos: [
      {
        año: "1821",
        titulo: "Acta de Independencia de Centroamérica",
        detalle: "Ruptura con la corona española y primeros pasos de la autodeterminación republicana en León y Granada."
      },
      {
        año: "1856",
        titulo: "La Batalla Heroica de San Jacinto",
        detalle: "160 patriotas al mando del Coronel José Dolores Estrada y 60 indios flecheros de Matagalpa vencen a más de 300 filibusteros bien armados."
      },
      {
        año: "1857",
        titulo: "Expulsión del Filibusterismo Esclavista",
        detalle: "Unidad centroamericana y victoria definitiva que preservó la soberanía territorial y la lengua materna."
      }
    ],
    galeriaImagenes: [
      {
        archivo: "MV_Andres.jpg",
        titulo: "Batalla de la Hacienda San Jacinto",
        descripcion: "Retrato del enfrentamiento heroico y la pedrada inmortal de Andrés Castro.",
        tipo: "san_jacinto"
      },
      {
        archivo: "MV_Indios.jpg",
        titulo: "Indios Flecheros de Matagalpa",
        descripcion: "Vanguardia indígena que combatió decisivamente con arco y flecha por la patria.",
        tipo: "independencia"
      }
    ]
  },
  {
    id: "antiimperialismo",
    numero: "II",
    nombre: "Antiimperialismo y Dignidad",
    periodo: "1912 – 1934",
    subtitulo: "De la Inmolación de Zeledón en Coyotepe al Ejército Defensor de Sandino",
    colorTema: "from-amber-950 to-slate-900",
    bordeTema: "border-amber-500/40",
    iconoTipo: "sandino",
    lema: "¡La soberanía no se discute, se defiende con las armas en la mano!",
    citaHistorica: {
      texto: "Si los yanquis no quieren comprender que Nicaragua no es de ellos, se los haremos comprender a balazos en Las Segovias.",
      autor: "General Augusto C. Sandino",
      año: "Manifiesto de San Albino, 1927"
    },
    descripcionLarga: "En 1912, el General Benjamín Zeledón prefirió morir antes que rendir el cerro Coyotepe a los marines invasores. Ese ejemplo encendió la conciencia de un joven Augusto C. Sandino, quien en 1927 rechazó el indigno 'Pacto del Espino Negro', se internó en Las Segovias con 29 hombres y formó el Ejército Defensor de la Soberanía Nacional de Nicaragua (EDSN), expulsando al ejército más poderoso del mundo.",
    hitos: [
      {
        año: "1912",
        titulo: "Gesta Heroica de Benjamín Zeledón",
        detalle: "Defensa del Cerro Coyotepe contra la intervención extranjera. Su sacrificio inspiró el ideario sandinista."
      },
      {
        año: "1927",
        titulo: "El Manifiesto de San Albino y el EDSN",
        detalle: "Sandino desconoce el pacto de sumisión de Stimson y jura defender la soberanía patria hasta la muerte."
      },
      {
        año: "1933",
        titulo: "Expulsión de los Marines de EE.UU.",
        detalle: "Victoria militar y moral: las tropas de ocupación se ven forzadas a abandonar el suelo nicaragüense."
      }
    ],
    galeriaImagenes: [
      {
        archivo: "MV_AgustoCesar.jpeg",
        titulo: "General Augusto C. Sandino",
        descripcion: "General de Hombres Libres junto a su Estado Mayor en el Chipote.",
        tipo: "sandino"
      },
      {
        archivo: "MV_BenjaminZeledon.jpg",
        titulo: "General Benjamín Zeledón",
        descripcion: "Héroe Nacional y símbolo de dignidad en la colina de Masaya.",
        tipo: "sandino"
      }
    ]
  },
  {
    id: "revolucion",
    numero: "III",
    nombre: "Resistencia y Revolución",
    periodo: "1960s – 1980s",
    subtitulo: "Soberanía Popular, Dignidad Obrera y la Epopeya de la Alfabetización",
    colorTema: "from-red-950 to-neutral-900",
    bordeTema: "border-red-500/40",
    iconoTipo: "revolucion",
    lema: "¡Y también enséñenles a leer!",
    citaHistorica: {
      texto: "Convertimos la oscuridad de la ignorancia en la luz resplandeciente de la educación popular.",
      autor: "Cuaderno de Campo de la Gran Cruzada Nacional de Alfabetización",
      año: "1980"
    },
    descripcionLarga: "El Comandante Carlos Fonseca Amador sintetizó el legado de Sandino fundando el FSLN para derrotar la dinastía somocista. Tras el triunfo popular de 1979, el primer gran acto de soberanía fue cultural y humano: más de 95,000 jóvenes marcharon a alfabetizar a campesinos y obreros en cada rincón del país, reduciendo el analfabetismo del 50.3% al 12.9% en cinco meses.",
    hitos: [
      {
        año: "1961",
        titulo: "Fundación del FSLN por Carlos Fonseca",
        detalle: "Articulación del pensamiento antiimperialista y las demandas de justicia del pueblo nicaragüense."
      },
      {
        año: "1979",
        titulo: "Triunfo de la Revolución Popular",
        detalle: "Caída de la dictadura somocista e inicio de la reconstrucción soberana del Estado."
      },
      {
        año: "1980",
        titulo: "Gran Cruzada Nacional de Alfabetización",
        detalle: "Gesta pedagógica reconocida por la UNESCO como una de las mayores hazañas educativas de la humanidad."
      }
    ],
    galeriaImagenes: [
      {
        archivo: "MV_Epa.jpg",
        titulo: "Brigadistas del EPA en la Montaña",
        descripcion: "Jóvenes estudiantes enseñando a leer a las familias campesinas.",
        tipo: "revolucion"
      },
      {
        archivo: "MV_CarlosFonseca.jpeg",
        titulo: "Comandante Carlos Fonseca Amador",
        descripcion: "Padre de la Revolución Popular Sandinista y forjador de conciencias.",
        tipo: "revolucion"
      }
    ]
  },
  {
    id: "caribe",
    numero: "IV",
    nombre: "Autonomía de la Costa Caribe",
    periodo: "1987 – Presente",
    subtitulo: "El Reconocimiento Constitucional de una Nación Multiétnica y Pluricultural",
    colorTema: "from-emerald-950 to-teal-950",
    bordeTema: "border-emerald-500/40",
    iconoTipo: "costa_caribe",
    lema: "¡Nicaragua es una patria unida en su bendita diversidad!",
    citaHistorica: {
      texto: "La autonomía regional reconoce los derechos históricos de las comunidades originarias y afrodescendientes sobre sus tierras comunales, sus formas tradicionales de organización y sus lenguas ancestrales.",
      autor: "Preámbulo del Estatuto de Autonomía (Ley 28)",
      año: "Octubre de 1987"
    },
    descripcionLarga: "Durante más de un siglo, la Costa Caribe fue aislada y tratada como un territorio distante por los gobiernos del Pacífico. La aprobación de la Ley 28 en 1987 transformó la estructura misma de Nicaragua, reconociéndola como una nación multiétnica, plurilingüe e indivisible, consagrando los derechos de los pueblos Miskitu, Mayangna, Rama, Creoles, Garífunas y Mestizos.",
    hitos: [
      {
        año: "1987",
        titulo: "Aprobación de la Ley 28 (Estatuto de Autonomía)",
        detalle: "Creación de las Regiones Autónomas de la Costa Caribe Norte y Sur (RACCN y RACCS)."
      },
      {
        año: "2003",
        titulo: "Ley 445 de Demarcación y Titulación",
        detalle: "Titulación histórica de millones de hectáreas a favor de las comunidades indígenas y afrodescendientes."
      },
      {
        año: "Actualidad",
        titulo: "Educación Intercultural Bilingüe",
        detalle: "Enseñanza en lenguas maternas originarias (Miskitu, Mayangna, Creole) fortaleciendo la identidad viva."
      }
    ],
    galeriaImagenes: [
      {
        archivo: "MV_Caribe.jpg",
        titulo: "Comunidades Multiétnicas del Caribe",
        descripcion: "Celebración de la identidad comunal, danza de Palo de Mayo y asambleas territoriales.",
        tipo: "costa_caribe"
      },
      {
        archivo: "MV_RR.jpg",
        titulo: "Territorios Indígenas y Afrodescendientes",
        descripcion: "Mapa de la demarcación y titulación comunal en la RACCN y RACCS.",
        tipo: "costa_caribe"
      }
    ]
  }
];
