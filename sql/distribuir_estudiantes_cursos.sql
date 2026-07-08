-- ============================================
-- SCRIPT: Distribuir estudiantes en cursos
-- Objetivo: Al menos 30 estudiantes por curso
-- ============================================

-- PASO 1: Crear tareas para cursos 7-30 que no tienen
DO $$
DECLARE
    v_id INT;
    v_nombre VARCHAR;
BEGIN
    FOR v_id, v_nombre IN SELECT id_curso, nombre FROM cursos WHERE id_curso BETWEEN 7 AND 30
    LOOP
        IF NOT EXISTS (SELECT 1 FROM tareas WHERE id_curso = v_id) THEN
            INSERT INTO tareas (id_curso, titulo, descripcion, fecha_entrega, puntaje_maximo, estado)
            VALUES (v_id, 'Tarea ' || v_nombre, 'Actividad academica de ' || v_nombre, CURRENT_DATE + INTERVAL '14 days', 20, 'Tarea');
            INSERT INTO tareas (id_curso, titulo, descripcion, fecha_entrega, puntaje_maximo, estado)
            VALUES (v_id, 'Examen ' || v_nombre, 'Evaluacion de ' || v_nombre, CURRENT_DATE + INTERVAL '30 days', 20, 'Examen');
        END IF;
    END LOOP;
END $$;

-- PASO 2: Crear tareas para cursos 31-59 que no tienen
DO $$
DECLARE
    v_id INT;
    v_nombre VARCHAR;
BEGIN
    FOR v_id, v_nombre IN SELECT id_curso, nombre FROM cursos WHERE id_curso BETWEEN 31 AND 59
    LOOP
        IF NOT EXISTS (SELECT 1 FROM tareas WHERE id_curso = v_id) THEN
            INSERT INTO tareas (id_curso, titulo, descripcion, fecha_entrega, puntaje_maximo, estado)
            VALUES (v_id, 'Tarea ' || v_nombre, 'Actividad academica de ' || v_nombre, CURRENT_DATE + INTERVAL '14 days', 20, 'Tarea');
            INSERT INTO tareas (id_curso, titulo, descripcion, fecha_entrega, puntaje_maximo, estado)
            VALUES (v_id, 'Examen ' || v_nombre, 'Evaluacion de ' || v_nombre, CURRENT_DATE + INTERVAL '30 days', 20, 'Examen');
        END IF;
    END LOOP;
END $$;

-- PASO 3: Eliminar calificaciones existentes para rehacer la distribucion
TRUNCATE calificaciones CASCADE;

-- PASO 4: Insertar calificaciones - cada estudiante en cursos 1-20 (30+ estudiantes por curso)
INSERT INTO calificaciones (id_estudiante, id_tarea, nota, observacion, fecha_registro)
SELECT
    e.id_estudiante,
    t.id_tarea,
    (FLOOR(RANDOM() * 11) + 10)::DECIMAL,
    CASE
        WHEN RANDOM() < 0.3 THEN 'Buen desempeno'
        WHEN RANDOM() < 0.6 THEN 'Cumple con lo esperado'
        ELSE 'Mejorable'
    END,
    CURRENT_DATE - (FLOOR(RANDOM() * 30))::INT
FROM estudiantes e
CROSS JOIN tareas t
WHERE t.id_curso BETWEEN 1 AND 20
AND e.id_estudiante <= 31;

-- PASO 5: Insertar calificaciones - cada estudiante en cursos 21-40
INSERT INTO calificaciones (id_estudiante, id_tarea, nota, observacion, fecha_registro)
SELECT
    e.id_estudiante,
    t.id_tarea,
    (FLOOR(RANDOM() * 11) + 10)::DECIMAL,
    CASE
        WHEN RANDOM() < 0.3 THEN 'Buen desempeno'
        WHEN RANDOM() < 0.6 THEN 'Cumple con lo esperado'
        ELSE 'Mejorable'
    END,
    CURRENT_DATE - (FLOOR(RANDOM() * 30))::INT
FROM estudiantes e
CROSS JOIN tareas t
WHERE t.id_curso BETWEEN 21 AND 40
AND e.id_estudiante <= 31;

-- PASO 6: Insertar calificaciones - cada estudiante en cursos 41-59
INSERT INTO calificaciones (id_estudiante, id_tarea, nota, observacion, fecha_registro)
SELECT
    e.id_estudiante,
    t.id_tarea,
    (FLOOR(RANDOM() * 11) + 10)::DECIMAL,
    CASE
        WHEN RANDOM() < 0.3 THEN 'Buen desempeno'
        WHEN RANDOM() < 0.6 THEN 'Cumple con lo esperado'
        ELSE 'Mejorable'
    END,
    CURRENT_DATE - (FLOOR(RANDOM() * 30))::INT
FROM estudiantes e
CROSS JOIN tareas t
WHERE t.id_curso BETWEEN 41 AND 59
AND e.id_estudiante <= 31;
