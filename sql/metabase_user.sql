-- =============================================
-- USUARIO READ-ONLY PARA METABASE
-- Ejecutar como superuser en PostgreSQL
-- =============================================

-- Crear usuario solo lectura para Metabase
CREATE USER metabase_reader WITH PASSWORD 'metabase123';

-- Otorgar conexión a la base de datos
GRANT CONNECT ON DATABASE "LMS_matricula" TO metabase_reader;

-- Otorgar permisos de uso del schema público
GRANT USAGE ON SCHEMA public TO metabase_reader;

-- Otorgar permisos SELECT en todas las tablas existentes
GRANT SELECT ON ALL TABLES IN SCHEMA public TO metabase_reader;

-- Otorgar permisos SELECT en futuras tablas (ALTER DEFAULT)
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO metabase_reader;

-- Otorgar permisos de ejecución de funciones (necesario para algunas vistas)
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO metabase_reader;
