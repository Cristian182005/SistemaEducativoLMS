-- =============================================
-- VISTAS DE REPORTES PARA METABASE
-- Ejecutar después de crear el usuario metabase_reader
-- =============================================

-- =============================================
-- 1. VISTA: Resumen General del Sistema
-- =============================================
CREATE OR REPLACE VIEW vw_resumen_sistema AS
SELECT
    (SELECT COUNT(*) FROM estudiantes) AS total_estudiantes,
    (SELECT COUNT(*) FROM docentes) AS total_docentes,
    (SELECT COUNT(*) FROM cursos) AS total_cursos,
    (SELECT COUNT(*) FROM matriculas) AS total_matriculas,
    (SELECT COUNT(*) FROM padres) AS total_padres,
    (SELECT COUNT(*) FROM usuarios WHERE estado = 'ACTIVO') AS total_usuarios,
    (SELECT COUNT(*) FROM tareas) AS total_tareas,
    (SELECT COUNT(*) FROM materiales) AS total_materiales,
    (SELECT COUNT(*) FROM calificaciones) AS total_calificaciones;

-- =============================================
-- 2. VISTA: Estudiantes con su Matrícula
-- =============================================
CREATE OR REPLACE VIEW vw_estudiantes_matricula AS
SELECT
    e.id_estudiante,
    e.codigo_estudiante,
    e.nombres,
    e.apellido_paterno,
    e.apellido_materno,
    e.sexo,
    e.edad,
    e.fecha_nacimiento,
    e.provincia,
    e.departamento,
    e.distrito,
    m.nivel,
    m.grado,
    m.seccion,
    m.fecha_matricula
FROM estudiantes e
LEFT JOIN matriculas m ON e.id_matricula = m.id_matricula;

-- =============================================
-- 3. VISTA: Calificaciones Detalladas
-- =============================================
CREATE OR REPLACE VIEW vw_calificaciones_detalle AS
SELECT
    c.id_calificacion,
    e.codigo_estudiante,
    CONCAT(e.apellido_paterno, ' ', e.apellido_materno, ', ', e.nombres) AS nombre_completo,
    cu.nombre AS nombre_curso,
    t.titulo AS nombre_tarea,
    CASE
        WHEN t.estado = 'Examen' THEN 'Examen'
        ELSE 'Tarea'
    END AS tipo_evaluacion,
    c.nota,
    t.puntaje_maximo,
    ROUND((c.nota / t.puntaje_maximo) * 100, 1) AS porcentaje,
    c.observacion,
    c.fecha_registro,
    m.grado,
    m.seccion
FROM calificaciones c
INNER JOIN estudiantes e ON c.id_estudiante = e.id_estudiante
INNER JOIN tareas t ON c.id_tarea = t.id_tarea
INNER JOIN cursos cu ON t.id_curso = cu.id_curso
LEFT JOIN matriculas m ON e.id_matricula = m.id_matricula;

-- =============================================
-- 4. VISTA: Promedio por Estudiante
-- =============================================
CREATE OR REPLACE VIEW vw_promedio_estudiantes AS
SELECT
    e.codigo_estudiante,
    CONCAT(e.apellido_paterno, ' ', e.apellido_materno, ', ', e.nombres) AS nombre_completo,
    cu.nombre AS nombre_curso,
    m.grado,
    m.seccion,
    ROUND(AVG(c.nota), 2) AS promedio_nota,
    COUNT(c.id_calificacion) AS total_evaluaciones,
    MIN(c.nota) AS nota_minima,
    MAX(c.nota) AS nota_maxima
FROM calificaciones c
INNER JOIN estudiantes e ON c.id_estudiante = e.id_estudiante
INNER JOIN tareas t ON c.id_tarea = t.id_tarea
INNER JOIN cursos cu ON t.id_curso = cu.id_curso
LEFT JOIN matriculas m ON e.id_matricula = m.id_matricula
GROUP BY e.codigo_estudiante, e.apellido_paterno, e.apellido_materno, e.nombres,
         cu.nombre, m.grado, m.seccion;

-- =============================================
-- 5. VISTA: Rendimiento por Curso
-- =============================================
CREATE OR REPLACE VIEW vw_rendimiento_cursos AS
SELECT
    cu.nombre AS nombre_curso,
    COUNT(DISTINCT c.id_estudiante) AS total_estudiantes,
    ROUND(AVG(c.nota), 2) AS promedio_general,
    MIN(c.nota) AS nota_minima,
    MAX(c.nota) AS nota_maxima,
    COUNT(c.id_calificacion) AS total_evaluaciones,
    SUM(CASE WHEN c.nota >= 11 THEN 1 ELSE 0 END) AS aprobados,
    SUM(CASE WHEN c.nota < 11 THEN 1 ELSE 0 END) AS desaprobados,
    ROUND(
        (SUM(CASE WHEN c.nota >= 11 THEN 1 ELSE 0 END)::DECIMAL /
         NULLIF(COUNT(c.id_calificacion), 0)) * 100, 1
    ) AS porcentaje_aprobacion
FROM calificaciones c
INNER JOIN tareas t ON c.id_tarea = t.id_tarea
INNER JOIN cursos cu ON t.id_curso = cu.id_curso
GROUP BY cu.nombre;

-- =============================================
-- 6. VISTA: Matrículas por Fecha
-- =============================================
CREATE OR REPLACE VIEW vw_matriculas_por_fecha AS
SELECT
    fecha_matricula,
    nivel,
    grado,
    seccion,
    COUNT(*) AS cantidad_matriculas
FROM matriculas
GROUP BY fecha_matricula, nivel, grado, seccion
ORDER BY fecha_matricula DESC;

-- =============================================
-- 7. VISTA: Distribución de Estudiantes por Grado/Sección
-- =============================================
CREATE OR REPLACE VIEW vw_distribucion_estudiantes AS
SELECT
    m.nivel,
    m.grado,
    m.seccion,
    COUNT(e.id_estudiante) AS total_estudiantes,
    SUM(CASE WHEN e.sexo = 'Masculino' THEN 1 ELSE 0 END) AS masculinos,
    SUM(CASE WHEN e.sexo = 'Femenino' THEN 1 ELSE 0 END) AS femeninos
FROM matriculas m
LEFT JOIN estudiantes e ON m.id_matricula = e.id_matricula
GROUP BY m.nivel, m.grado, m.seccion
ORDER BY m.nivel, m.grado, m.seccion;

-- =============================================
-- 8. VISTA: Tareas por Curso
-- =============================================
CREATE OR REPLACE VIEW vw_tareas_por_curso AS
SELECT
    cu.nombre AS nombre_curso,
    t.titulo AS nombre_tarea,
    CASE
        WHEN t.estado = 'Examen' THEN 'Examen'
        ELSE 'Tarea'
    END AS tipo,
    t.fecha_entrega,
    t.puntaje_maximo,
    t.estado,
    (SELECT COUNT(*) FROM calificaciones cal WHERE cal.id_tarea = t.id_tarea) AS calificaciones_registradas
FROM tareas t
INNER JOIN cursos cu ON t.id_curso = cu.id_curso
ORDER BY t.fecha_entrega DESC;

-- =============================================
-- 9. VISTA: Solicitudes de Matrícula
-- =============================================
CREATE OR REPLACE VIEW vw_solicitudes_matricula AS
SELECT
    s.id_solicitud,
    s.fecha_solicitud,
    s.estado,
    s.observacion,
    CONCAT(p.apellidos, ', ', p.nombres) AS nombre_padre,
    p.dni AS dni_padre,
    CONCAT(e.apellido_paterno, ' ', e.apellido_materno, ', ', e.nombres) AS nombre_estudiante,
    e.codigo_estudiante
FROM solicitudes_matricula s
INNER JOIN padres p ON s.id_padre = p.id_padre
INNER JOIN estudiantes e ON s.id_estudiante = e.id_estudiante
ORDER BY s.fecha_solicitud DESC;

-- =============================================
-- 10. VISTA: Docentes y sus Cursos
-- =============================================
CREATE OR REPLACE VIEW vw_docentes_cursos AS
SELECT
    d.id_docente,
    CONCAT(d.apellidos, ', ', d.nombres) AS nombre_completo,
    d.especialidad,
    d.correo,
    d.telefono
FROM docentes d;

-- =============================================
-- 11. VISTA: Ranking de Estudiantes
-- =============================================
CREATE OR REPLACE VIEW vw_ranking_estudiantes AS
SELECT
    e.codigo_estudiante,
    CONCAT(e.apellido_paterno, ' ', e.apellido_materno, ', ', e.nombres) AS nombre_completo,
    m.grado,
    m.seccion,
    ROUND(AVG(c.nota), 2) AS promedio_general,
    COUNT(c.id_calificacion) AS total_evaluaciones,
    RANK() OVER (ORDER BY AVG(c.nota) DESC) AS posicion_ranking
FROM calificaciones c
INNER JOIN estudiantes e ON c.id_estudiante = e.id_estudiante
LEFT JOIN matriculas m ON e.id_matricula = m.id_matricula
GROUP BY e.codigo_estudiante, e.apellido_paterno, e.apellido_materno, e.nombres,
         m.grado, m.seccion
ORDER BY promedio_general DESC;

-- =============================================
-- 12. VISTA: Materiales por Curso
-- =============================================
CREATE OR REPLACE VIEW vw_materiales_cursos AS
SELECT
    cu.nombre AS nombre_curso,
    mat.titulo AS titulo_material,
    mat.tipo,
    mat.fecha_publicacion,
    mat.descripcion
FROM materiales mat
INNER JOIN cursos cu ON mat.id_curso = cu.id_curso
ORDER BY mat.fecha_publicacion DESC;
