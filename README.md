<<<<<<< HEAD
# 🇳🇮 Ecos de Soberanía: Digitalizando la Memoria y la Identidad Nacional de Nicaragua

Plataforma educativa y museo digital interactivo diseñado para ejecutarse de forma **100% autónoma y offline** (red local LAN) en una laptop durante una feria universitaria, permitiendo además que los visitantes interactúen desde sus propios teléfonos móviles mediante un código QR sin consumir internet.

---

## 🏛️ 1. Módulos del Sistema

1. **Museo Virtual (4 Trayectos Históricos)**:
   - **Trayecto I**: *Raíces e Independencia (1821 – 1856)*: La ruptura colonial, la Batalla de San Jacinto y la pedrada inmortal de Andrés Castro contra el filibusterismo de William Walker.
   - **Trayecto II**: *Antiimperialismo y Dignidad (1912 – 1934)*: La resistencia de Benjamín Zeledón en Coyotepe y el Ejército Defensor de la Soberanía Nacional (EDSN) del General Sandino.
   - **Trayecto III**: *Resistencia y Revolución (1960s – 1980s)*: El Comandante Carlos Fonseca Amador, la alfabetización masiva (EPA) y la soberanía popular.
   - **Trayecto IV**: *Autonomía de la Costa Caribe (1987 – Presente)*: La Ley 28, el reconocimiento multiétnico y la protección comunal ancestral (Miskitu, Mayangna, Rama, Creoles, Garífunas, Mestizos).

2. **🗺️ Mapa Interactivo de Nicaragua (15 Departamentos y 2 Regiones Autónomas)**:
   - Mapa geográfico interactivo con pines táctiles en cada departamento.
   - Al tocar cualquier región, se despliega:
     - Cabecera y macro-región (*Pacífico*, *Norte y Central*, *Costa Caribe*).
     - **Hito Histórico Principal de Soberanía**.
     - **Héroes y Protagonistas Locales** (e.g. Andrés Castro, Sandino, Zeledón, Rafaela Herrera, Enmanuel Mongalo, Rigoberto López Pérez, Flecheros de Matagalpa).
     - **Sitio Emblemático**.
     - **Relato y Significado Histórico**.
     - **Fotografía de Época** con slots para tus imágenes.

3. **Línea de Decisiones Soberanas (Trivia Interactiva)**:
   - El participante asume dilemas críticos en encrucijadas históricas.
   - Envía las decisiones a la API local de Python.
   - SQLite almacena los resultados y calcula el **Nivel de Apropiación Soberana** (porcentaje, arquetipo patriótico, insignias del Guardabarranco y Sacuanjoche).

4. **Generador QR y Conectividad LAN Offline**:
   - Detecta la IP local de la laptop en la red WiFi (ej. `192.168.0.22`).
   - Genera el código QR en memoria (Base64) para que los jurados y estudiantes apunten la cámara de su celular y jueguen desde sus manos.

---

## 🚀 2. Ejecución Rápida para el Día de la Feria

### Opción A (1 Clic en Windows)
Simplemente haz doble clic sobre el archivo:
```text
run_fair.bat
```
El script activará el entorno de Python, iniciará el servidor en `0.0.0.0:5000` y abrirá el navegador automáticamente.

### Opción B (Comandos de Terminal PowerShell)
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python app.py
```

---

## 📸 3. ¿Cómo agregar las imágenes después?

El proyecto ya cuenta con **componentes de placeholder temáticos con ilustraciones vectoriales de Nicaragua**. 

Cuando tengas las fotos reales, simplemente colócalas en la carpeta:
```text
frontend/public/assets/images/
```
Con los nombres recomendados (e.g. `sandino_general.jpg`, `san_jacinto_batalla.jpg`, `castillo_inmaculada.jpg`, etc.).
=======
# ecos-de-soberania
Museo virtual sobre la historia nicaraguense y de centroamérica con actividades interactivas
>>>>>>> d0af95302f006c36e1448909396e4a8c8bea5b5c
