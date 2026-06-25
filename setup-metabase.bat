@echo off
REM =============================================
REM INSTALACION COMPLETA - METABASE (SIN DOCKER)
REM SistemaEducativoLMS
REM =============================================

echo.
echo ========================================
echo  INSTALACION DE METABASE PARA REPORTES
echo  Sistema Educativo LMS (sin Docker)
echo ========================================
echo.

REM Verificar que Java esta instalado
echo [1/5] Verificando Java...
java -version 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Java no esta instalado.
    echo Descarga Java 17+ desde: https://adoptium.net/
    pause
    exit /b 1
)
echo Java OK.

REM Crear usuario en PostgreSQL
echo.
echo [2/5] Creando usuario metabase_reader en PostgreSQL...
echo NOTA: Se te pedira la contrasena del usuario postgres (tu password actual).
echo.
psql -U postgres -d LMS_matricula -f sql\metabase_user.sql
echo ADVERTENCIA: Si el usuario ya existia, es normal. Continuando...

REM Crear vistas de reporting
echo.
echo [3/5] Creando vistas de reporting...
psql -U postgres -d LMS_matricula -f sql\drop_views.sql
psql -U postgres -d LMS_matricula -f sql\metabase_views.sql
echo Vistas creadas correctamente.

REM Verificar Metabase JAR
echo.
echo [4/5] Verificando Metabase JAR...
if exist metabase.jar (
    echo Metabase JAR encontrado.
    goto INICIAR
)
echo Descargando Metabase, puede tardar 2-5 minutos...
curl -L -o metabase.jar https://downloads.metabase.com/latest/metabase.jar
if %errorlevel% neq 0 (
    echo ERROR: No se pudo descargar Metabase.
    echo Descarga manualmente desde: https://www.metabase.com/start/oss/jar
    echo y colocalo como "metabase.jar" en la raiz del proyecto.
    pause
    exit /b 1
)
echo Descarga completada.

:INICIAR
REM Iniciar Metabase
echo.
echo [5/5] Iniciando Metabase...
echo.
echo ========================================
echo  INSTALACION COMPLETADA
echo ========================================
echo.
echo Metabase estara disponible en: http://localhost:3000
echo.
echo PASOS SIGUIENTES:
echo 1. Se abrira una ventana de comandos con Metabase
echo 2. Espera a que aparezca "Metabase initialization complete"
echo 3. Abre http://localhost:3000 en tu navegador
echo 4. Crea tu cuenta de administrador
echo 5. Cuando pregunte la BD, configura:
echo    - Tipo: PostgreSQL
echo    - Host: localhost
echo    - Port: 5432
echo    - Database: LMS_matricula
echo    - User: metabase_reader
echo    - Password: metabase123
echo 6. Metabase detectara las vistas de reporting
echo 7. En tu app, ve a Reportes y luego Reportes Metabase
echo.
echo Para iniciar Metabase despues: start-metabase.bat
echo.

REM Configurar embedding para iframe
set MB_EMBEDDING_APP_ORIGIN=http://localhost:5173
set MB_ENABLE_EMBEDDING=true
set MB_EMBEDDING_SECRET_KEY=sistema-educativo-lms-secret-key-2025

start "" java --add-opens java.base/java.nio=ALL-UNNAMED -jar metabase.jar
pause
