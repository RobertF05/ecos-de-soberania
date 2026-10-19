import socket
import io
import base64

def obtener_ip_local():
    """
    Obtiene la dirección IP local de la laptop en la red LAN / Wi-Fi.
    Funciona 100% offline (sin conexión a internet).
    """
    ip = "127.0.0.1"
    try:
        # Crea un socket UDP sin enviar paquetes reales para consultar la tabla de enrutamiento local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.1)
        # 10.254.254.254 es una IP de prueba para forzar la selección de la tarjeta de red activa
        s.connect(('10.254.254.254', 1))
        ip = s.getsockname()[0]
        s.close()
    except Exception:
        try:
            # Método alternativo mediante resolución de hostname
            hostname = socket.gethostname()
            candidatos = socket.gethostbyname_ex(hostname)[2]
            for c in candidatos:
                if not c.startswith("127.") and not c.startswith("169.254."):
                    ip = c
                    break
        except Exception:
            ip = "127.0.0.1"
    return ip

def generar_qr_base64(url):
    """
    Genera un código QR en memoria y lo retorna como string Base64 (data:image/png;base64,...).
    Si la librería 'qrcode' no está instalada, retorna un placeholder en SVG para no interrumpir el flujo.
    """
    try:
        import qrcode
        from PIL import Image

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=3,
        )
        qr.add_data(url)
        qr.make(fit=True)

        # Genera imagen con colores alusivos: Azul Soberano (#0B2545) y fondo blanco
        img = qr.make_image(fill_color="#0A2540", back_color="#FFFFFF")
        
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
        return f"data:image/png;base64,{encoded}"
    except ImportError:
        # Fallback SVG elegante en caso de que qrcode no esté instalado aún
        svg_placeholder = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
            <rect width="200" height="200" fill="#0A2540" rx="15"/>
            <text x="100" y="90" fill="#FFFFFF" font-size="14" text-anchor="middle" font-family="sans-serif" font-weight="bold">CONECTAR POR LAN</text>
            <text x="100" y="115" fill="#60A5FA" font-size="12" text-anchor="middle" font-family="sans-serif">{url}</text>
            <text x="100" y="145" fill="#9CA3AF" font-size="10" text-anchor="middle" font-family="sans-serif">(Instalar 'qrcode' con pip)</text>
        </svg>"""
        encoded_svg = base64.b64encode(svg_placeholder.encode("utf-8")).decode("utf-8")
        return f"data:image/svg+xml;base64,{encoded_svg}"
    except Exception as e:
        print(f"[Aviso QR] {e}")
        return None
