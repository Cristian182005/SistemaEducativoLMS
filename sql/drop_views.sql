-- =============================================
-- CORRECCIÓN DE VISTAS FALLIDAS
-- Eliminar vistas con errores y recrear todas
-- Ejecutar como superuser en PostgreSQL
-- =============================================

-- Eliminar vistas que fallaron por columnas 'estado' inexistentes
DROP VIEW IF EXISTS vw_resumen_sistema;
DROP VIEW IF EXISTS vw_estudiantes_matricula;
DROP VIEW IF EXISTS vw_matriculas_por_fecha;
DROP VIEW IF EXISTS vw_distribucion_estudiantes;
DROP VIEW IF EXISTS vw_docentes_cursos;

-- Eliminar vistas que existían correctamente (para recrearlas limpias)
DROP VIEW IF EXISTS vw_calificaciones_detalle;
DROP VIEW IF EXISTS vw_promedio_estudiantes;
DROP VIEW IF EXISTS vw_rendimiento_cursos;
DROP VIEW IF EXISTS vw_tareas_por_curso;
DROP VIEW IF EXISTS vw_solicitudes_matricula;
DROP VIEW IF EXISTS vw_ranking_estudiantes;
DROP VIEW IF EXISTS vw_materiales_cursos;
