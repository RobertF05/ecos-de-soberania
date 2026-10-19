import os
import uuid
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from database import init_db, guardar_sesion, obtener_metricas
from preguntas_data import PREGUNTAS_DILEMAS, calcular_resultado
from qr_service import obtener_ip_local, generar_qr_base64

# Configuración de rutas estáticas apuntando a la compilación de React
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.join(BASE_DIR, "..", "frontend", "dist")
FRONTEND_PUBLIC = os.path.join(BASE_DIR, "..", "frontend", "public")

app = Flask(__name__, static_folder=FRONTEND_DIST, static_url_path="")
CORS(app)  # Permite peticiones locales entre desarrollo Vite y Flask

# Inicializar base de datos SQLite
init_db()

# ==========================================
# ENDPOINTS DE LA API REST
# ==========================================

@app.route("/api/info-red", methods=["GET"])
def info_red():
    """
    Retorna la dirección IP local de la laptop en la red LAN y el código QR
    generado en memoria para que los visitantes se conecten desde sus móviles.
    """
    ip_local = obtener_ip_local()
    puerto = 5000
    url_acceso = f"http://{ip_local}:{puerto}"
    qr_b64 = generar_qr_base64(url_acceso)
    
    return jsonify({
        "ip_local": ip_local,
        "puerto": puerto,
        "url_acceso": url_acceso,
        "qr_base64": qr_b64,
        "modo_offline": True,
        "nombre_evento": "Ecos de Soberanía - Feria Universitaria"
    })

@app.route("/api/preguntas", methods=["GET"])
def obtener_preguntas():
    """
    Entrega los 4 dilemas históricos de la 'Línea de Decisiones Soberanas'.
    """
    # Se filtran las reflexiones previas para que el usuario no vea la respuesta antes de elegir
    preguntas_para_cliente = []
    for p in PREGUNTAS_DILEMAS:
        preguntas_para_cliente.append({
            "id": p["id"],
            "trayecto": p["trayecto"],
            "titulo": p["titulo"],
            "personaje_clave": p["personaje_clave"],
            "contexto": p["contexto"],
            "dilema": p["dilema"],
            "opciones": [
                {"id": op["id"], "texto": op["texto"]} for op in p["opciones"]
            ]
        })
    return jsonify(preguntas_para_cliente)

@app.route("/api/respuestas", methods=["POST"])
def procesar_respuestas():
    """
    Recibe las decisiones tomadas por el usuario, calcula su nivel de apropiación,
    guarda en SQLite y retorna el arquetipo patriótico junto con estadísticas.
    """
    data = request.get_json() or {}
    respuestas_usuario = data.get("respuestas", [])
    dispositivo = data.get("dispositivo", "Navegador Web")
    ip_cliente = request.remote_addr

    if not respuestas_usuario:
        return jsonify({"error": "No se enviaron respuestas"}), 400

    # Calcular resultado pedagógico
    resultado = calcular_resultado(respuestas_usuario)
    sesion_id = str(uuid.uuid4())

    # Formatear detalle para persistencia en SQLite
    respuestas_db = []
    for det in resultado["detalles"]:
        respuestas_db.append({
            "pregunta_id": det["pregunta_id"],
            "opcion_id": det["opcion_elegida"],
            "ponderacion": det["ponderacion"]
        })

    # Guardar en SQLite
    guardar_sesion(
        sesion_id=sesion_id,
        puntuacion=resultado["porcentaje"],
        nivel_soberania=resultado["arquetipo"],
        dispositivo=dispositivo,
        ip_cliente=ip_cliente,
        respuestas=respuestas_db
    )

    metricas_globales = obtener_metricas()

    return jsonify({
        "sesion_id": sesion_id,
        "resultado": resultado,
        "metricas_globales": metricas_globales
    })

@app.route("/api/metricas", methods=["GET"])
def ver_metricas():
    """
    Retorna métricas globales de participación acumuladas en la feria.
    """
    return jsonify(obtener_metricas())

# ==========================================
# RUTAS DE SERVICIO DE ARCHIVOS ESTÁTICOS SPA
# ==========================================

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def servir_frontend(path):
    """
    Sirve los archivos estáticos de la SPA compilada en React y recursos de assets/images.
    Si no existe la ruta física, reenvía a index.html (soporte SPA routing).
    """
    # 1. Comprobar si existe directamente en FRONTEND_DIST
    if os.path.exists(FRONTEND_DIST):
        archivo_en_dist = os.path.join(FRONTEND_DIST, path)
        if path != "" and os.path.isfile(archivo_en_dist):
            return send_from_directory(FRONTEND_DIST, path)

    # 2. Comprobar si existe en FRONTEND_PUBLIC
    if os.path.exists(FRONTEND_PUBLIC):
        archivo_en_public = os.path.join(FRONTEND_PUBLIC, path)
        if path != "" and os.path.isfile(archivo_en_public):
            return send_from_directory(FRONTEND_PUBLIC, path)

    # 3. Búsqueda por nombre de archivo para imágenes (/assets/..., /images/...)
    extensiones_imagenes = ('.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico', '.gif')
    if path.lower().endswith(extensiones_imagenes):
        nombre_archivo = os.path.basename(path)
        # Buscar en varias carpetas comunes de assets
        carpetas_busqueda = [
            os.path.join(FRONTEND_DIST, "assets"),
            os.path.join(FRONTEND_DIST, "assets", "images"),
            os.path.join(FRONTEND_PUBLIC, "assets"),
            os.path.join(FRONTEND_PUBLIC, "assets", "images"),
        ]
        for c in carpetas_busqueda:
            candidato = os.path.join(c, nombre_archivo)
            if os.path.isfile(candidato):
                return send_from_directory(c, nombre_archivo)
        
        # Si es una petición de imagen que no existe, retornar 404 en vez de index.html
        return jsonify({"error": f"Imagen no encontrada: {nombre_archivo}"}), 404

    # 4. Para rutas SPA (navegación de la app), servir index.html
    if os.path.exists(FRONTEND_DIST) and os.path.exists(os.path.join(FRONTEND_DIST, "index.html")):
        return send_from_directory(FRONTEND_DIST, "index.html")
    else:
        # Mensaje informativo si la compilación no se ha realizado
        return """
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Ecos de Soberanía - Backend Listo</title>
            <style>
                body { font-family: system-ui, sans-serif; background: #0A2540; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
                .card { background: rgba(255,255,255,0.08); padding: 2.5rem; border-radius: 1rem; border: 1px solid rgba(255,255,255,0.2); max-width: 600px; }
                h1 { color: #60A5FA; margin-bottom: 0.5rem; }
                code { background: #1E3A8A; padding: 0.2rem 0.5rem; border-radius: 0.3rem; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>🇳🇮 Servidor Backend Activo</h1>
                <p>La API de <strong>Ecos de Soberanía</strong> está respondiendo en el puerto 5000.</p>
                <p>Para cargar la interfaz completa, compila React con <code>npm run build</code> o copia los archivos a <code>frontend/dist</code>.</p>
                <p><a href="/api/info-red" style="color: #FCD34D;">👉 Ver Información de Red y QR (/api/info-red)</a></p>
            </div>
        </body>
        </html>
        """, 200

# ==========================================
# ARRANQUE DEL SERVIDOR LOCAL
# ==========================================

if __name__ == "__main__":
    ip = obtener_ip_local()
    puerto = int(os.environ.get("PORT", 5000))

    print("\n" + "="*65)
    print(" 🏛️  ECOS DE SOBERANÍA: DIGITALIZANDO LA MEMORIA DE NICARAGUA")
    print(" 🇳🇮  Plataforma Educativa para Feria Universitaria (100% Offline)")
    print("="*65)
    print(f" -> Acceso Local (Laptop):   http://localhost:{puerto}")
    print(f" -> Acceso LAN (Móviles):   http://{ip}:{puerto}")
    print(f" -> Base de Datos SQLite:    {os.path.join(BASE_DIR, 'data', 'ecos_soberania.db')}")
    print("="*65)
    print(" Presiona Ctrl+C para detener el servidor.\n")

    app.run(host="0.0.0.0", port=puerto, debug=False)
