/**
 * ==============================================================================
 * Ecos de Soberanía - Base de Datos Histórica (Módulo ES6)
 * ==============================================================================
 * Contenido curado sobre la gesta heroica y memoria histórica de Nicaragua
 * para la Feria Universitaria de Ingeniería de Sistemas - UNI.
 */

export const HISTORICAL_MILESTONES = [
  {
    id: 'san-jacinto',
    title: 'Batalla de San Jacinto',
    year: '1856',
    date: '14 de Septiembre de 1856',
    protagonists: 'Coronel José Dolores Estrada, Sargento Primero Andrés Castro, Flecheros de Matagalpa',
    quote: '«¡Adelante, muchachos, que la patria es de los valientes!»',
    summary: 'Victoria moral y militar de 160 patriotas nicaragüenses y 60 indígenas flecheros frente a 300 filibusteros esclavistas liderados por William Walker.',
    fullDescription: `En la Hacienda San Jacinto, a 39 km al noreste de Managua, un contingente de 160 soldados del Ejército del Septentrión bajo el mando del Coronel José Dolores Estrada, junto con 60 bravos indígenas flecheros de Matagalpa, resistieron y derrotaron a las fuerzas filibusteras del esclavista norteamericano William Walker.

El sargento Andrés Castro pasó a la inmortalidad al derribar de una certera pedrada a un filibustero que intentaba saltar el corral de madera, convirtiéndose en el máximo símbolo de dignidad, patriotismo y soberanía nacional contra la invasión extranjera.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Batalla_de_San_Jacinto_%28Nicaragua%29.jpg/800px-Batalla_de_San_Jacinto_%28Nicaragua%29.jpg',
    tag: 'Dignidad Nacional'
  },
  {
    id: 'benjamin-zeledon',
    title: 'Gesta del General Benjamín Zeledón',
    year: '1912',
    date: '4 de Octubre de 1912',
    protagonists: 'General Benjamín Zeledón Rodríguez',
    quote: '«Si muero, moriré en mi puesto y cumpliendo con mi deber de nicaragüense y de patriota.»',
    summary: 'La resistencia heroica en los cerros Coyotepe y La Barranca en Masaya frente a la intervención armada estadounidense y las fuerzas entreguistas.',
    fullDescription: `El General Benjamín Zeledón, abogado, diplomático y militar patriota, lideró la rebelión armada contra la intromisión del gobierno de los Estados Unidos en la soberanía y economía de Nicaragua.

Atrincherado en los cerros de Coyotepe y La Barranca, en Masaya, rechazó tajantemente las intimaciones de rendición de las tropas invasoras norteamericanas. Tras una resistencia desigual y feroz, cayó en combate el 4 de octubre de 1912, día de su cumpleaños 33. Su cadáver fue paseado para intimidar a la población, pero encendió la llama libertaria en un joven de 17 años que lo vio pasar: Augusto C. Sandino.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Benjamin_Zeledon_1912.jpg/600px-Benjamin_Zeledon_1912.jpg',
    tag: 'Antimperialismo'
  },
  {
    id: 'augusto-sandino',
    title: 'General Augusto C. Sandino y el EDSN',
    year: '1927',
    date: '4 de Mayo de 1927 - 1934',
    protagonists: 'General Augusto C. Sandino, Ejército Defensor de la Soberanía Nacional (EDSN), Blanca Aráuz',
    quote: '«La soberanía de un pueblo no se discute, se defiende con las armas en la mano.»',
    summary: 'El inicio de la resistencia armada en Las Segovias contra la intervención militar estadounidense tras negarse a firmar el Pacto del Espino Negro.',
    fullDescription: `El 4 de mayo de 1927, día de la Dignidad Nacional, Sandino fue el único general nicaragüense que rechazó el entreguista 'Pacto del Espino Negro' pactado con el enviado estadounidense Henry L. Stimson.

Con solo 29 hombres y 40 rifles, organizó el Ejército Defensor de la Soberanía Nacional (EDSN) en las montañas de Las Segovias. Mediante tácticas guerrilleras innovadoras y el respaldo popular de campesinos y telegrafistas como Blanca Aráuz, expulsó a la marina de los Estados Unidos del suelo patrio en enero de 1933, consagrándose como el "General de Hombres Libres".`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Augusto_C_Sandino_portrait.jpg/600px-Augusto_C_Sandino_portrait.jpg',
    tag: 'Soberanía Popular'
  },
  {
    id: 'revolucion-alfabetizacion',
    title: 'Revolución Popular y Cruzada de Alfabetización',
    year: '1979',
    date: '19 de Julio de 1979 - 1980',
    protagonists: 'Pueblo Heroico de Nicaragua, Brigadistas de la Cruzada Nacional de Alfabetización',
    quote: '«Y también enséñenles a leer...» - Comandante Carlos Fonseca Amador',
    summary: 'Triunfo histórico sobre más de 40 años de dictadura somocista y la mayor epopeya educativa de América Latina.',
    fullDescription: `El 19 de julio de 1979 culminó victoriosamente la lucha insurreccional del pueblo nicaragüense contra la dictadura militar de la dinastía Somoza, instaurando un nuevo orden de justicia social y soberanía.

Apenas meses después, en marzo de 1980, dio inicio la Gran Cruzada Nacional de Alfabetización "Héroes y Mártires por la Liberación de Nicaragua". Más de 95,000 brigadistas y educadores se movilizaron por valles y montañas, logrando reducir el índice de analfabetismo del 50.35% al 12.96% en solo cinco meses, hazaña reconocida con la Medalla Nadezhda Krúpskaya de la UNESCO.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Plaza_de_la_Revolucion_Managua_1979.jpg/800px-Plaza_de_la_Revolucion_Managua_1979.jpg',
    tag: 'Transformación Social'
  },
  {
    id: 'autonomia-caribe',
    title: 'Estatuto de Autonomía de la Costa Caribe',
    year: '1987',
    date: '30 de Octubre de 1987',
    protagonists: 'Pueblos Originarios y Comunidades Étnicas (Miskitus, Mayangnas, Ramas, Creoles, Garífunas y Mestizos)',
    quote: '«Nicaragua es una nación multiétnica, pluricultural y multilingüe.»',
    summary: 'Aprobación de la Ley N° 28 (Estatuto de Autonomía), hito constitucional que consagró los derechos históricos y territoriales de la Costa Caribe.',
    fullDescription: `El 30 de octubre de 1987, la Asamblea Nacional aprobó la Ley N° 28, "Estatuto de Autonomía de las Regiones de la Costa Atlántica de Nicaragua". 

Este instrumento jurídico y político sin precedentes en el continente reconoció formalmente la propiedad comunal sobre la tierra ancestral, la administración de recursos naturales y el derecho de los pueblos originarios a preservar su lengua, cultura, formas de organización comunitaria y educación bilingüe intercultural, dando origen a las actuales Regiones Autónomas RACCN y RACCS.`,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Corn_Islands_Nicaragua.jpg/800px-Corn_Islands_Nicaragua.jpg',
    tag: 'Unidad Multiétnica'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    milestoneId: 'san-jacinto',
    question: 'En la Batalla de San Jacinto (1856), ¿cuál fue la acción heroica que inmortalizó al sargento Andrés Castro?',
    options: [
      'Disparar un cañón contra la caballería enemiga.',
      'Derribar de una certera pedrada a un filibustero que saltaba el corral.',
      'Comandar a los flecheros de Matagalpa en una emboscada.',
      'Interceptar una carta secreta de William Walker.'
    ],
    correctAnswer: 1,
    explanation: 'Andrés Castro, al quedarse sin municiones en su fusil de chispa, tomó una piedra del corral de la hacienda y derribó a un filibustero norteamericano, sellando un acto sublime de dignidad nacional.'
  },
  {
    id: 2,
    milestoneId: 'benjamin-zeledon',
    question: '¿En qué cerro de Masaya resistió el General Benjamín Zeledón en 1912 antes de ofrendar su vida por la patria?',
    options: [
      'Cerro Negro',
      'Cerro El Mogotón',
      'Cerro Coyotepe y La Barranca',
      'Cerro Tiscapa'
    ],
    correctAnswer: 2,
    explanation: 'El General Benjamín Zeledón lideró la resistencia desde la fortaleza del Coyotepe y La Barranca en Masaya contra las tropas invasoras norteamericanas, rechazando toda rendición.'
  },
  {
    id: 3,
    milestoneId: 'augusto-sandino',
    question: '¿Cómo denominó el General Augusto C. Sandino a su ejército que combatió a los marines invasores en Las Segovias?',
    options: [
      'Ejército Aliado Centroamericano',
      'Ejército Defensor de la Soberanía Nacional de Nicaragua (EDSN)',
      'Guardia Patriótica de Las Segovias',
      'Frente Soberano de Liberación'
    ],
    correctAnswer: 1,
    explanation: 'El General de Hombres Libres fundó el EDSN (Ejército Defensor de la Soberanía Nacional) tras su rechazo al Pacto del Espino Negro el 4 de mayo de 1927.'
  },
  {
    id: 4,
    milestoneId: 'revolucion-alfabetizacion',
    question: 'Durante la Gran Cruzada Nacional de Alfabetización (1980), ¿en cuánto se logró reducir el índice de analfabetismo?',
    options: [
      'Del 50.35% a aproximadamente el 12.96%',
      'Del 35% al 25%',
      'Del 80% al 45%',
      'Del 60% al 30%'
    ],
    correctAnswer: 0,
    explanation: 'Más de 95,000 brigadistas redujeron el analfabetismo del 50.35% al 12.96% en cinco meses de epopeya popular, mereciendo el reconocimiento mundial de la UNESCO.'
  },
  {
    id: 5,
    milestoneId: 'autonomia-caribe',
    question: '¿Qué ley histórica sancionada en 1987 consagró el régimen de Autonomía de las Regiones de la Costa Caribe nicaragüense?',
    options: [
      'Ley N° 100 de Reforma Agraria',
      'Ley N° 28 (Estatuto de Autonomía)',
      'Ley de Fronteras Patrias',
      'Ley N° 50 de Integración Regional'
    ],
    correctAnswer: 1,
    explanation: 'La Ley N° 28 garantizó los derechos históricos, lingüísticos, culturales y de propiedad comunal de los pueblos de la Costa Caribe de Nicaragua.'
  }
];
