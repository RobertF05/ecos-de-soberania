@echo off
title Ecos de Soberania - Servidor de Feria Universitaria
color 0B

echo ========================================================================
echo  [NICARAGUA] ECOS DE SOBERANIA: MUSEO DIGITAL Y LINEA DE DECISIONES
echo  Servidor Local 100%% Offline para Feria Universitaria
echo ========================================================================
echo.

cd /d "%~dp0backend"

if not exist "venv\Scripts\python.exe" (
    echo [INFO] Creando entorno virtual de Python...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo [INFO] Instalando dependencias offline...
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

echo.
echo [OK] Iniciando servidor Flask en segundo plano...
start http://localhost:5000
python app.py

pause
