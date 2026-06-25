@echo off
setlocal

set METABASE_JAR=metabase.jar

set MB_EMBEDDING_APP_ORIGIN=http://localhost:5173
set MB_ENABLE_EMBEDDING=true
set MB_EMBEDDING_SECRET_KEY=sistema-educativo-lms-secret-key-2025

echo.
echo ========================================
echo  INICIANDO METABASE
echo ========================================
echo  Embedding: http://localhost:5173
echo  Ctrl+C para detener
echo ========================================
echo.

java --add-opens java.base/java.nio=ALL-UNNAMED -jar %METABASE_JAR%
