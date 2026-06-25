-- =============================================
-- INSERT DE USUARIOS CON DISTINTOS ROLES
-- Sistema Educativo LMS
-- =============================================

-- ADMIN (accede al dashboard principal)
INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Administrador General', 'admin@sagradafamilia.edu.pe', 'admin123', 'ADMIN', 'ACTIVO');

-- DOCENTES
INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Maria Lopez Garcia', 'maria.lopez@sagradafamilia.edu.pe', 'docente123', 'DOCENTE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Carlos Ramirez Torres', 'carlos.ramirez@sagradafamilia.edu.pe', 'docente123', 'DOCENTE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Ana Torres Vega', 'ana.torres@sagradafamilia.edu.pe', 'docente123', 'DOCENTE', 'ACTIVO');

-- PADRES
INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Pedro Sanchez Rivera', 'pedro.sanchez@gmail.com', 'padre123', 'PADRE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Laura Fernandez Diaz', 'laura.fernandez@gmail.com', 'padre123', 'PADRE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Jorge Morales Castro', 'jorge.morales@gmail.com', 'padre123', 'PADRE', 'ACTIVO');

INSERT INTO usuarios (nombre, correo, password, rol, estado)
VALUES ('Carmen Vargas Luna', 'carmen.vargas@gmail.com', 'padre123', 'PADRE', 'ACTIVO');
