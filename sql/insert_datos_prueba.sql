-- =============================================
-- DATOS DE PRUEBA - SISTEMA EDUCATIVO LMS
-- C.E.P. LA SAGRADA FAMILIA
-- =============================================

-- =============================================
-- MATRICULAS (12 estudiantes)
-- =============================================
INSERT INTO matriculas (nivel, grado, seccion, dni, celular, fecha_matricula) VALUES
('Primaria', '1', 'A', '70123456', '951123456', '2025-03-01'),
('Primaria', '1', 'B', '70123457', '951123457', '2025-03-01'),
('Primaria', '2', 'A', '70123458', '951123458', '2025-03-01'),
('Primaria', '2', 'B', '70123459', '951123459', '2025-03-01'),
('Primaria', '3', 'A', '70123460', '951123460', '2025-03-01'),
('Primaria', '3', 'B', '70123461', '951123461', '2025-03-01'),
('Secundaria', '1', 'A', '70123462', '951123462', '2025-03-01'),
('Secundaria', '1', 'B', '70123463', '951123463', '2025-03-01'),
('Secundaria', '2', 'A', '70123464', '951123464', '2025-03-01'),
('Secundaria', '2', 'B', '70123465', '951123465', '2025-03-01'),
('Secundaria', '3', 'A', '70123466', '951123466', '2025-03-01'),
('Secundaria', '3', 'B', '70123467', '951123467', '2025-03-01');

-- =============================================
-- ESTUDIANTES (2 por matricula)
-- =============================================
INSERT INTO estudiantes (codigo_estudiante, apellido_paterno, apellido_materno, nombres, fecha_nacimiento, provincia, departamento, distrito, sexo, edad, direccion, id_matricula) VALUES
-- 1ro Primaria A
('EST-2025-001', 'Sanchez', 'Garcia', 'Juan Carlos', '2018-04-15', 'Lima', 'Lima', 'San Juan de Lurigancho', 'Masculino', 7, 'Av. Los Olivos 123', 1),
('EST-2025-002', 'Sanchez', 'Garcia', 'Maria Fernanda', '2018-04-15', 'Lima', 'Lima', 'San Juan de Lurigancho', 'Femenino', 7, 'Av. Los Olivos 123', 1),
-- 1ro Primaria B
('EST-2025-003', 'Fernandez', 'Diaz', 'Carlos Andres', '2018-06-20', 'Lima', 'Lima', 'Ate', 'Masculino', 7, 'Jr. Lima 456', 2),
('EST-2025-004', 'Fernandez', 'Diaz', 'Ana Lucia', '2018-06-20', 'Lima', 'Lima', 'Ate', 'Femenino', 7, 'Jr. Lima 456', 2),
-- 2do Primaria A
('EST-2025-005', 'Morales', 'Castro', 'Luis Miguel', '2017-02-10', 'Lima', 'Lima', 'San Martin de Porres', 'Masculino', 8, 'Calle Los Pinos 789', 3),
('EST-2025-006', 'Morales', 'Castro', 'Sofia Valentina', '2017-02-10', 'Lima', 'Lima', 'San Martin de Porres', 'Femenino', 8, 'Calle Los Pinos 789', 3),
-- 2do Primaria B
('EST-2025-007', 'Vargas', 'Luna', 'Diego Armando', '2017-08-05', 'Lima', 'Lima', 'Comas', 'Masculino', 8, 'Av. Brasil 321', 4),
('EST-2025-008', 'Vargas', 'Luna', 'Camila Andrea', '2017-08-05', 'Lima', 'Lima', 'Comas', 'Femenino', 8, 'Av. Brasil 321', 4),
-- 3ro Primaria A
('EST-2025-009', 'Ramos', 'Torres', 'Sebastian', '2016-11-25', 'Lima', 'Lima', 'Villa El Salvador', 'Masculino', 9, 'Calle Progreso 654', 5),
('EST-2025-010', 'Ramos', 'Torres', 'Isabella', '2016-11-25', 'Lima', 'Lima', 'Villa El Salvador', 'Femenino', 9, 'Calle Progreso 654', 5),
-- 3ro Primaria B
('EST-2025-011', 'Cruz', 'Mendoza', 'Mateo Alejandro', '2016-07-30', 'Lima', 'Lima', 'San Juan de Miraflores', 'Masculino', 9, 'Jr. Union 987', 6),
('EST-2025-012', 'Cruz', 'Mendoza', 'Valeria', '2016-07-30', 'Lima', 'Lima', 'San Juan de Miraflores', 'Femenino', 9, 'Jr. Union 987', 6),
-- 1ro Secundaria A
('EST-2025-013', 'Lopez', 'Garcia', 'Andres Felipe', '2015-03-12', 'Lima', 'Lima', 'Surco', 'Masculino', 10, 'Av. Javier Prado 147', 7),
('EST-2025-014', 'Lopez', 'Garcia', 'Luciana', '2015-03-12', 'Lima', 'Lima', 'Surco', 'Femenino', 10, 'Av. Javier Prado 147', 7),
-- 1ro Secundaria B
('EST-2025-015', 'Ramirez', 'Torres', 'Daniel Enrique', '2015-09-18', 'Lima', 'Lima', 'San Isidro', 'Masculino', 10, 'Calle Los Frescos 258', 8),
('EST-2025-016', 'Ramirez', 'Torres', 'Mariana Jose', '2015-09-18', 'Lima', 'Lima', 'San Isidro', 'Femenino', 10, 'Calle Los Frescos 258', 8),
-- 2do Secundaria A
('EST-2025-017', 'Torres', 'Vega', 'Alejandro Martin', '2014-01-07', 'Lima', 'Lima', 'Miraflores', 'Masculino', 11, 'Av. La Marina 369', 9),
('EST-2025-018', 'Torres', 'Vega', 'Paula Andrea', '2014-01-07', 'Lima', 'Lima', 'Miraflores', 'Femenino', 11, 'Av. La Marina 369', 9),
-- 2do Secundaria B
('EST-2025-019', 'Herrera', 'Rios', 'Nicolas Esteban', '2014-05-22', 'Lima', 'Lima', 'Barranco', 'Masculino', 11, 'Jr. Bolognesi 741', 10),
('EST-2025-020', 'Herrera', 'Rios', 'Fernanda Isabel', '2014-05-22', 'Lima', 'Lima', 'Barranco', 'Femenino', 11, 'Jr. Bolognesi 741', 10),
-- 3ro Secundaria A
('EST-2025-021', 'Diaz', 'Vargas', 'Joel Sebastian', '2013-10-30', 'Lima', 'Lima', 'Lince', 'Masculino', 12, 'Calle Grimaldo 852', 11),
('EST-2025-022', 'Diaz', 'Vargas', 'Daniela Alejandra', '2013-10-30', 'Lima', 'Lima', 'Lince', 'Femenino', 12, 'Calle Grimaldo 852', 11),
-- 3ro Secundaria B
('EST-2025-023', 'Garcia', 'Ruiz', 'Emiliano Jose', '2013-12-15', 'Lima', 'Lima', 'Jesus Maria', 'Masculino', 12, 'Av. Salaverry 963', 12),
('EST-2025-024', 'Garcia', 'Ruiz', 'Mia Camila', '2013-12-15', 'Lima', 'Lima', 'Jesus Maria', 'Femenino', 12, 'Av. Salaverry 963', 12);

-- =============================================
-- PADRES (vinculados a usuarios 5-8)
-- =============================================
INSERT INTO padres (nombres, apellidos, dni, telefono, direccion, tipo, id_usuario) VALUES
('Pedro', 'Sanchez Rivera', '40123456', '951234567', 'Av. Los Olivos 123, SJL', 'Padre', 5),
('Laura', 'Fernandez Diaz', '40123457', '951234568', 'Jr. Lima 456, Ate', 'Madre', 6),
('Jorge', 'Morales Castro', '40123458', '951234569', 'Calle Los Pinos 789, SMP', 'Padre', 7),
('Carmen', 'Vargas Luna', '40123459', '951234570', 'Av. Brasil 321, Comas', 'Madre', 8);

-- =============================================
-- PADRE_ESTUDIANTE (relacion padres-hijos)
-- =============================================
INSERT INTO padre_estudiante (id_padre, id_estudiante) VALUES
(1, 1), (1, 2),   -- Pedro Sanchez -> Juan y Maria
(2, 3), (2, 4),   -- Laura Fernandez -> Carlos y Ana
(3, 5), (3, 6),   -- Jorge Morales -> Luis y Sofia
(4, 7), (4, 8);   -- Carmen Vargas -> Diego y Camila

-- =============================================
-- DOCENTES
-- =============================================
INSERT INTO docentes (nombres, apellidos, especialidad, correo, telefono, dni) VALUES
('Maria', 'Lopez Garcia', 'Matematicas', 'maria.lopez@sagradafamilia.edu.pe', '951123456', '30123456'),
('Carlos', 'Ramirez Torres', 'Comunicacion', 'carlos.ramirez@sagradafamilia.edu.pe', '951123457', '30123457'),
('Ana', 'Torres Vega', 'Ciencia y Tecnologia', 'ana.torres@sagradafamilia.edu.pe', '951123458', '30123458'),
('Ricardo', 'Mendoza Lopez', 'Historia', 'ricardo.mendoza@sagradafamilia.edu.pe', '951123459', '30123459'),
('Patricia', 'Garcia Ruiz', 'Ingles', 'patricia.garcia@sagradafamilia.edu.pe', '951123460', '30123460'),
('Fernando', 'Diaz Herrera', 'Educacion Fisica', 'fernando.diaz@sagradafamilia.edu.pe', '951123461', '30123461');

-- =============================================
-- CURSOS
-- =============================================
INSERT INTO cursos (nombre, descripcion) VALUES
('Matematicas', 'Curso de Matematicas para todos los grados'),
('Comunicacion', 'Curso de Comunicacion y Literatura'),
('Ciencia y Tecnologia', 'Curso de Ciencias Naturales y Tecnologia'),
('Historia del Peru', 'Historia del Peru y Geografia'),
('Ingles', 'Curso de Ingles como segunda lengua'),
('Educacion Fisica', 'Actividades fisicas y deportivas'),
('Arte', 'Expresion artistica y cultural'),
('Personal Social', 'Formacion ciudadana y valores');

-- =============================================
-- TAREAS (2 por curso)
-- =============================================
INSERT INTO tareas (id_curso, titulo, descripcion, fecha_entrega, puntaje_maximo, estado) VALUES
-- Matematicas
(1, 'Examen de Numeros Enteros', 'Evaluacion sobre operaciones con numeros enteros', '2025-04-15', 20, 'Examen'),
(1, 'Tarea: Fracciones', 'Ejercicios de fracciones y decimales', '2025-04-20', 10, 'Tarea'),
-- Comunicacion
(2, 'Examen de Comprension Lectora', 'Lectura comprensiva de textos', '2025-04-16', 20, 'Examen'),
(2, 'Tarea: Resumen', 'Elaborar resumen de un texto literario', '2025-04-22', 10, 'Tarea'),
-- Ciencia y Tecnologia
(3, 'Examen de Seres Vivos', 'Clasificacion de seres vivos', '2025-04-17', 20, 'Examen'),
(3, 'Tarea: Experimento', 'Reporte de experimento de germinacion', '2025-04-25', 10, 'Tarea'),
-- Historia
(4, 'Examen: Civilizaciones Andinas', 'Culturas preincaicas e incas', '2025-04-18', 20, 'Examen'),
(4, 'Tarea: Linea de Tiempo', 'Crear linea de tiempo de las civilizaciones', '2025-04-28', 10, 'Tarea'),
-- Ingles
(5, 'Examen: Verb to Be', 'Uso del verbo to be en oraciones', '2025-04-19', 20, 'Examen'),
(5, 'Tarea: Vocabulary', 'Ejercicios de vocabulario basico', '2025-04-23', 10, 'Tarea'),
-- Educacion Fisica
(6, 'Examen Teorico', 'Reglas deportivas y calentamiento', '2025-04-21', 20, 'Examen'),
(6, 'Tarea: Rutina Deportiva', 'Diseñar rutina de ejercicios', '2025-04-26', 10, 'Tarea');

-- =============================================
-- CALIFICACIONES (todas las tareas, todos los estudiantes)
-- =============================================
INSERT INTO calificaciones (id_estudiante, id_tarea, nota, observacion, fecha_registro) VALUES
-- Estudiantes 1-4, Tarea 1 (Examen Numeros Enteros - max 20)
(1, 1, 18, 'Excelente', '2025-04-16'),
(2, 1, 16, 'Muy bien', '2025-04-16'),
(3, 1, 15, 'Bien', '2025-04-16'),
(4, 1, 14, 'Bien', '2025-04-16'),
(5, 1, 19, 'Sobresaliente', '2025-04-16'),
(6, 1, 12, 'Regular', '2025-04-16'),
(7, 1, 17, 'Muy bien', '2025-04-16'),
(8, 1, 11, 'Regular', '2025-04-16'),
-- Estudiantes 1-8, Tarea 2 (Fracciones - max 10)
(1, 2, 9, 'Muy bien', '2025-04-21'),
(2, 2, 8, 'Bien', '2025-04-21'),
(3, 2, 7, 'Bien', '2025-04-21'),
(4, 2, 6, 'Regular', '2025-04-21'),
(5, 2, 10, 'Perfecto', '2025-04-21'),
(6, 2, 5, 'Necesita mejorar', '2025-04-21'),
(7, 2, 9, 'Muy bien', '2025-04-21'),
(8, 2, 4, 'Necesita mejorar', '2025-04-21'),
-- Estudiantes 9-12, Tarea 1
(9, 1, 17, 'Muy bien', '2025-04-16'),
(10, 1, 15, 'Bien', '2025-04-16'),
(11, 1, 13, 'Regular', '2025-04-16'),
(12, 1, 20, 'Sobresaliente', '2025-04-16'),
-- Estudiantes 9-12, Tarea 2
(9, 2, 8, 'Bien', '2025-04-21'),
(10, 2, 7, 'Bien', '2025-04-21'),
(11, 2, 6, 'Regular', '2025-04-21'),
(12, 2, 10, 'Perfecto', '2025-04-21'),
-- Estudiantes 13-16, Tarea 3 (Comunicacion - max 20)
(13, 3, 16, 'Muy bien', '2025-04-17'),
(14, 3, 18, 'Excelente', '2025-04-17'),
(15, 3, 14, 'Bien', '2025-04-17'),
(16, 3, 19, 'Sobresaliente', '2025-04-17'),
-- Estudiantes 13-16, Tarea 4 (Resumen - max 10)
(13, 4, 7, 'Bien', '2025-04-23'),
(14, 4, 9, 'Muy bien', '2025-04-23'),
(15, 4, 6, 'Regular', '2025-04-23'),
(16, 4, 8, 'Bien', '2025-04-23'),
-- Estudiantes 17-20, Tarea 3
(17, 3, 15, 'Bien', '2025-04-17'),
(18, 3, 17, 'Muy bien', '2025-04-17'),
(19, 3, 12, 'Regular', '2025-04-17'),
(20, 3, 20, 'Sobresaliente', '2025-04-17'),
-- Estudiantes 17-20, Tarea 4
(17, 4, 8, 'Bien', '2025-04-23'),
(18, 4, 10, 'Perfecto', '2025-04-23'),
(19, 4, 5, 'Necesita mejorar', '2025-04-23'),
(20, 4, 9, 'Muy bien', '2025-04-23'),
-- Estudiantes 13-16, Tarea 5 (Ciencia - max 20)
(13, 5, 14, 'Bien', '2025-04-18'),
(14, 5, 16, 'Muy bien', '2025-04-18'),
(15, 5, 18, 'Excelente', '2025-04-18'),
(16, 5, 12, 'Regular', '2025-04-18'),
-- Estudiantes 17-20, Tarea 5
(17, 5, 15, 'Bien', '2025-04-18'),
(18, 5, 19, 'Sobresaliente', '2025-04-18'),
(19, 5, 11, 'Regular', '2025-04-18'),
(20, 5, 17, 'Muy bien', '2025-04-18'),
-- Estudiantes 21-24, Tarea 7 (Historia - max 20)
(21, 7, 16, 'Muy bien', '2025-04-19'),
(22, 7, 18, 'Excelente', '2025-04-19'),
(23, 7, 13, 'Regular', '2025-04-19'),
(24, 7, 19, 'Sobresaliente', '2025-04-19'),
-- Estudiantes 21-24, Tarea 9 (Ingles - max 20)
(21, 9, 14, 'Bien', '2025-04-20'),
(22, 9, 17, 'Muy bien', '2025-04-20'),
(23, 9, 10, 'Regular', '2025-04-20'),
(24, 9, 15, 'Bien', '2025-04-20');

-- =============================================
-- MATERIALES (2 por curso)
-- =============================================
INSERT INTO materiales (id_curso, titulo, tipo, archivo, fecha_publicacion, descripcion) VALUES
(1, 'Tabla de Multiplicar', 'PDF', 'tabla_multiplicar.pdf', '2025-03-10', 'Tabla de multiplicar del 1 al 12'),
(1, 'Ejercicios de Fracciones', 'PDF', 'ejercicios_fracciones.pdf', '2025-03-15', 'Ejercicios Practice de fracciones'),
(2, 'Cuentos Peruanos', 'PDF', 'cuentos_peruanos.pdf', '2025-03-12', 'Antologia de cuentos del Peru'),
(2, 'Guia de Redaccion', 'PDF', 'guia_redaccion.pdf', '2025-03-18', 'Guia para escribir resumenes'),
(3, 'Tabla de Seres Vivos', 'PDF', 'seres_vivos.pdf', '2025-03-14', 'Clasificacion de seres vivos'),
(3, 'Guia de Experimentos', 'PDF', 'experimentos.pdf', '2025-03-20', 'Guias de experimentos para el aula'),
(4, 'Mapas del Peru', 'PDF', 'mapas_peru.pdf', '2025-03-11', 'Mapas historicos del Peru'),
(4, 'Linea del Tiempo', 'PPT', 'linea_tiempo.ppt', '2025-03-16', 'Presentacion de civilizaciones'),
(5, 'Vocabulario Basico', 'PDF', 'vocabulario_basico.pdf', '2025-03-13', 'Lista de vocabulario en ingles'),
(5, 'Verbos Irregulares', 'PDF', 'verbos_irregulares.pdf', '2025-03-19', 'Tabla de verbos irregulares'),
(6, 'Reglas Deportivas', 'PDF', 'reglas_deportivas.pdf', '2025-03-17', 'Reglas basicas de deportes'),
(6, 'Rutinas de Ejercicios', 'PDF', 'rutinas_ejercicios.pdf', '2025-03-22', 'Rutinas para realizar en casa');

-- =============================================
-- SOLICITUDES DE MATRICULA
-- =============================================
INSERT INTO solicitudes_matricula (fecha_solicitud, estado, observacion, id_padre, id_estudiante) VALUES
('2025-02-15', 'APROBADA', 'Solicitud de matricula para el año escolar 2025', 1, 1),
('2025-02-16', 'APROBADA', 'Hermanos solicitando matricula juntos', 1, 2),
('2025-02-20', 'PENDIENTE', 'Solicitud de transferencia desde otro colegio', 3, 5),
('2025-03-01', 'APROBADA', 'Matricula confirmada para 2do grado', 3, 6);
