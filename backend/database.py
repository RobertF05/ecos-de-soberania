import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "data", "ecos_soberania.db")

def get_connection():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sesiones (
        id TEXT PRIMARY KEY,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        puntuacion INTEGER NOT NULL,
        nivel_soberania TEXT NOT NULL,
        dispositivo TEXT,
        ip_cliente TEXT
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS respuestas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sesion_id TEXT NOT NULL,
        pregunta_id INTEGER NOT NULL,
        opcion_id TEXT NOT NULL,
        ponderacion INTEGER NOT NULL,
        FOREIGN KEY (sesion_id) REFERENCES sesiones (id)
    );
    """)

    conn.commit()
    conn.close()

def guardar_sesion(sesion_id, puntuacion, nivel_soberania, dispositivo, ip_cliente, respuestas):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        INSERT INTO sesiones (id, puntuacion, nivel_soberania, dispositivo, ip_cliente)
        VALUES (?, ?, ?, ?, ?)
        """, (sesion_id, puntuacion, nivel_soberania, dispositivo, ip_cliente))

        for r in respuestas:
            cursor.execute("""
            INSERT INTO respuestas (sesion_id, pregunta_id, opcion_id, ponderacion)
            VALUES (?, ?, ?, ?)
            """, (sesion_id, r.get('pregunta_id'), r.get('opcion_id'), r.get('ponderacion', 0)))

        conn.commit()
        return True
    except Exception as e:
        conn.rollback()
        print(f"[Error SQLite] al guardar sesión: {e}")
        return False
    finally:
        conn.close()

def obtener_metricas():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) as total FROM sesiones")
    total_participantes = cursor.fetchone()['total']

    cursor.execute("SELECT AVG(puntuacion) as promedio FROM sesiones")
    promedio_row = cursor.fetchone()['promedio']
    promedio = round(promedio_row, 1) if promedio_row is not None else 0

    cursor.execute("""
    SELECT nivel_soberania, COUNT(*) as cantidad
    FROM sesiones
    GROUP BY nivel_soberania
    """)
    niveles = {row['nivel_soberania']: row['cantidad'] for row in cursor.fetchall()}

    cursor.execute("""
    SELECT pregunta_id, opcion_id, COUNT(*) as votos
    FROM respuestas
    GROUP BY pregunta_id, opcion_id
    """)
    distribucion_respuestas = [dict(row) for row in cursor.fetchall()]

    conn.close()
    return {
        "total_participantes": total_participantes,
        "promedio_soberania": promedio,
        "arquetipos": niveles,
        "distribucion_respuestas": distribucion_respuestas
    }
