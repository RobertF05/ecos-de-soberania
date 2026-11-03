
import os
import uuid

from flask import Flask, jsonify, request
from flask_cors import CORS

from database import init_db, guardar_sesion, obtener_metricas
from preguntas_data import PREGUNTAS_DILEMAS, calcular_resultado


# ==========================================
# CONFIGURACIÓN DE FLASK
# ==========================================

app = Flask(__name__)

# Durante el despliegue configuraremos el dominio de Vercel
frontend_url = os.environ.get("FRONTEND_URL", "*")
CORS(app, resources={r"/api/*": {"origins": frontend_url}})

# Inicializar base de datos SQLite
init_db()


# ==========================================
# ENDPOINT DE COMPROBACIÓN
# ==========================================

@app.route("/", methods=["GET"])
def inicio():
    return jsonify({
        "estado": "activo",
        "proyecto": "Ecos de Soberanía",
        "mensaje": "Backend funcionando correctamente"
    })


# ==========================================
# ENDPOINTS DE LA API REST
# ==========================================

@app.route("/api/preguntas", methods=["GET"])
def obtener_preguntas():

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
                {
                    "id": op["id"],
                    "texto": op["texto"]
                }
                for op in p["opciones"]
            ]
        })

    return jsonify(preguntas_para_cliente)


@app.route("/api/respuestas", methods=["POST"])
def procesar_respuestas():

    data = request.get_json() or {}

    respuestas_usuario = data.get("respuestas", [])
    dispositivo = data.get("dispositivo", "Navegador Web")
    ip_cliente = request.remote_addr

    if not respuestas_usuario:
        return jsonify({
            "error": "No se enviaron respuestas"
        }), 400

    resultado = calcular_resultado(respuestas_usuario)

    sesion_id = str(uuid.uuid4())

    respuestas_db = []

    for det in resultado["detalles"]:
        respuestas_db.append({
            "pregunta_id": det["pregunta_id"],
            "opcion_id": det["opcion_elegida"],
            "ponderacion": det["ponderacion"]
        })

    guardado = guardar_sesion(
        sesion_id=sesion_id,
        puntuacion=resultado["porcentaje"],
        nivel_soberania=resultado["arquetipo"],
        dispositivo=dispositivo,
        ip_cliente=ip_cliente,
        respuestas=respuestas_db
    )

    if not guardado:
        return jsonify({
            "error": "No se pudo guardar la sesión"
        }), 500

    metricas_globales = obtener_metricas()

    return jsonify({
        "sesion_id": sesion_id,
        "resultado": resultado,
        "metricas_globales": metricas_globales
    })


@app.route("/api/metricas", methods=["GET"])
def ver_metricas():

    return jsonify(obtener_metricas())


# ==========================================
# EJECUCIÓN LOCAL
# ==========================================

if __name__ == "__main__":

    puerto = int(os.environ.get("PORT", 5000))

    print("=" * 60)
    print("ECOS DE SOBERANÍA")
    print("Backend Flask iniciado")
    print(f"Puerto: {puerto}")
    print("=" * 60)

    app.run(
        host="0.0.0.0",
        port=puerto,
        debug=False
    )
