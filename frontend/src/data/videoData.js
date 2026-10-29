/**
 * Catálogo de Videos Históricos y Documentales
 * Basado en los guiones de la Guerra Nacional Antifilibustera (1856)
 */

export const VIDEOS_DATA = {
  video1: {
    id: "video-san-jacinto",
    numero: 1,
    categoria: "Guerra Nacional • Campaña de 1856",
    periodo: "14 de Septiembre de 1856",
    titulo: "La Batalla de la Hacienda San Jacinto",
    subtitulo: "El Pacto Providencial, la resistencia en el corral de madera y la maniobra envolvente de la yeguada.",
    urlVideo: "/assets/video1.mp4",
    poster: "/assets/images/san_jacinto_batalla.jpg",
    duracion: "04:00 hrs de combate (7:00 a.m. – 11:00 a.m.)",
    ubicacion: "Hacienda San Jacinto, Tipitapa (42 km al noreste de Managua)",
    protagonistas: "Cnel. José Dolores Estrada, Sgto. Andrés Castro, Cap. Francisco Sacasa, Indios Flecheros de Matagalpa y Faustino Salmerón",
    descripcion:
      "Tras la firma del Pacto Providencial el 12 de septiembre de 1856, William Walker envía a Byron Cole con 300 mercenarios armados con rifles modernos y revólveres Colt contra la Hacienda San Jacinto. El coronel José Dolores Estrada defiende la posición con 160 patriotas —incluidos 60 indios flecheros llegados desde Matagalpa—, armados con arcos, machetes y viejos fusiles de chispa 'guatuseros'. Tras resistir cuerpo a cuerpo en el corral de madera y ejecutar una genial emboscada por la retaguardia con la yeguada de la hacienda, las fuerzas patriotas provocan la desbandada filibustera, demostrando que Walker no era invencible.",
    puntosClave: [
      "Rechazo a tiro corto de la primera oleada de 300 filibusteros a las 7:00 a.m. en los tres flancos.",
      "Defensa heroica del Corral de Madera (8:30 a.m.) y la histórica pedrada del sargento Andrés Castro.",
      "Maniobra envolvente por el zanjón natural (10:00 a.m.) arreando la yeguada contra la retaguardia invasora.",
      "Desbandada hacia Tipitapa (11:00 a.m.) y caída del cabecilla Byron Cole en San Rafael ante Faustino Salmerón."
    ],
    escenas: [
      {
        numero: "Escena 1",
        hora: "12 – 14 Sep",
        titulo: "El Pacto Providencial y el Cerco sobre el Llano",
        resumen: "Unión de liberales y conservadores. Llegada de los 60 indios flecheros desde Matagalpa y despliegue de 160 patriotas frente a 300 mercenarios de Byron Cole."
      },
      {
        numero: "Escena 2",
        hora: "7:00 – 8:30 a.m.",
        titulo: "Primera y Segunda Oleada: El Corral de Madera",
        resumen: "Rechazo del asalto inicial. A las 8:30 a.m. los filibusteros rompen el flanco izquierdo; cae el capitán Francisco Sacasa y Andrés Castro derriba a un invasor de una certera pedrada."
      },
      {
        numero: "Escena 3",
        hora: "10:00 a.m.",
        titulo: "El Punto de Quiebre y la Estampida de la Yeguada",
        resumen: "Patricio Centeno, Bartolomé Sandoval y José Siero salen por el zanjón trasero y arrean a las bestias al grito de '¡Viva Nicaragua!', sembrando el pánico en las filas enemigas."
      },
      {
        numero: "Escena 4",
        hora: "11:00 a.m.",
        titulo: "Desbandada, Caza de Byron Cole y Victoria",
        resumen: "Huida filibustera y voladura del puente de Tipitapa. Byron Cole es abatido en San Rafael por el campesino Faustino Salmerón."
      }
    ],
    bajas: {
      filibusteros: "27 a 37 muertos en combate, 18 capturados y decenas de heridos en la huida.",
      patriotas: "10 a 12 muertos y entre 15 y 18 heridos."
    },
    cita: {
      texto: "¡Viva Nicaragua! — El grito patriota que acompañó el tropel de la yeguada y quebró la moral del invasor.",
      autor: "Crónica de la Batalla de San Jacinto (14 de septiembre de 1856)"
    }
  },

  video2: {
    id: "video-segunda-batalla-rivas",
    numero: 2,
    categoria: "Guerra Centroamericana de Liberación",
    periodo: "11 de Abril de 1856",
    titulo: "La Segunda Batalla de Rivas",
    subtitulo: "El ataque sorpresa de Walker, el asedio de los francotiradores en el Mesón de Guerra y la tea incendiaria.",
    urlVideo: "/assets/videos/video_segunda_batalla_rivas.mp4",
    poster: "/assets/images/mongalo_rivas.jpg",
    duracion: "Combate diurno y repliegue nocturno",
    ubicacion: "Ciudad de Rivas (Cuello de botella de la Ruta del Tránsito)",
    protagonistas: "Juan Rafael Mora Porras, Gral. José María Cañas, Luis Pacheco Bertora, Joaquín Rosales y Juan Santamaría",
    descripcion:
      "En abril de 1856, la lucha contra el plan esclavista de William Walker se convierte en una Guerra Centroamericana de Liberación. Con más de 2,000 soldados en Rivas para cortar la Ruta del Tránsito, las fuerzas aliadas enfrentan un ataque sorpresa de Walker al amanecer del 11 de abril. Los filibusteros toman la iglesia, el Cabildo y el Mesón de Guerra, desde donde sus francotiradores con rifles Sharps dominan la plaza hasta que la quema del Mesón obliga a Walker a huir amparado por la oscuridad.",
    puntosClave: [
      "Marcha secreta de Walker desde Granada y asalto simultáneo por el norte y noreste a las 8:00 a.m.",
      "Estancamiento urbano al mediodía por el fuego cruzado de francotiradores con rifles Sharps desde el Mesón.",
      "Intentos heroicos del cartaginés Luis Pacheco Bertora y del nicaragüense Joaquín Rosales bajo fuego enemigo.",
      "Incendio del Mesón de Guerra por Juan Santamaría y retirada nocturna de las columnas de Walker hacia Granada."
    ],
    escenas: [
      {
        numero: "Escena 1",
        hora: "8:00 a.m.",
        titulo: "El Ataque Sorpresa de Walker",
        resumen: "Para no perder el control de la Ruta del Tránsito, Walker marcha en secreto desde Granada y ataca sorpresivamente Rivas por el norte y noreste."
      },
      {
        numero: "Escena 2",
        hora: "12:00 p.m.",
        titulo: "Francotiradores en el Mesón de Guerra",
        resumen: "El general Cañas sostiene el cuartel general, pero los francotiradores filibusteros con rifles Sharps y revólveres Colt convierten la plaza en una zona mortal desde el Mesón."
      },
      {
        numero: "Escena 3",
        hora: "Tarde",
        titulo: "La Tea Incendiaria sobre el Mesón",
        resumen: "Tras caer heridos Luis Pacheco Bertora y el nicaragüense Joaquín Rosales, el joven alajuelense Juan Santamaría logra incendiar el techo de paja y tejas del Mesón de Guerra."
      },
      {
        numero: "Escena 4",
        hora: "Noche",
        titulo: "Huida Nocturna y el Precio de la Victoria",
        resumen: "Sin su posición dominante y rodeado por las llamas, Walker huye de noche hacia Granada, deteniéndose definitivamente su avance hacia el sur."
      }
    ],
    bajas: {
      filibusteros: "Cerca de 236 bajas entre muertos y heridos.",
      patriotas: "140 muertos y 231 heridos en combate."
    },
    cita: {
      texto: "En las calles ardientes de Rivas quedó detenido el avance filibustero sobre Centroamérica.",
      autor: "Memoria de la Campaña Nacional de 1856"
    }
  }
};

export const LISTA_VIDEOS = [VIDEOS_DATA.video1, VIDEOS_DATA.video2];