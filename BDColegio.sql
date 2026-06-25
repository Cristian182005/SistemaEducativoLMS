-- =============================================
-- BASE DE DATOS - SISTEMA EDUCATIVO LMS
-- C.E.P. LA SAGRADA FAMILIA
-- =============================================

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    rol VARCHAR(20),
    estado VARCHAR(20) DEFAULT 'ACTIVO'
);

CREATE TABLE matriculas (
    id_matricula SERIAL PRIMARY KEY,
    nivel VARCHAR(50),
    grado VARCHAR(20),
    seccion VARCHAR(10),
    dni VARCHAR(20),
    celular VARCHAR(20),
    fecha_matricula DATE DEFAULT CURRENT_DATE
);

CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    codigo_estudiante VARCHAR(20) UNIQUE,
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    nombres VARCHAR(100),
    fecha_nacimiento DATE,
    provincia VARCHAR(100),
    departamento VARCHAR(100),
    distrito VARCHAR(100),
    sexo VARCHAR(20),
    edad INT,
    direccion VARCHAR(200),
    id_matricula INT,
    CONSTRAINT fk_matricula
        FOREIGN KEY (id_matricula)
        REFERENCES matriculas(id_matricula)
);

CREATE TABLE padres (
    id_padre SERIAL PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    dni VARCHAR(20) UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(200),
    tipo VARCHAR(20),
    id_usuario INT UNIQUE,
    CONSTRAINT fk_padre_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    especialidad VARCHAR(100),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    dni VARCHAR(20)
);

CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion VARCHAR(200)
);

CREATE TABLE padre_estudiante (
    id_padre_estudiante SERIAL PRIMARY KEY,
    id_padre INT NOT NULL,
    id_estudiante INT NOT NULL,
    CONSTRAINT fk_padre
        FOREIGN KEY (id_padre)
        REFERENCES padres(id_padre),
    CONSTRAINT fk_estudiante
        FOREIGN KEY (id_estudiante)
        REFERENCES estudiantes(id_estudiante)
);

CREATE TABLE solicitudes_matricula (
    id_solicitud SERIAL PRIMARY KEY,
    fecha_solicitud DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    observacion VARCHAR(300),
    id_padre INT,
    id_estudiante INT,
    CONSTRAINT fk_solicitud_padre
        FOREIGN KEY (id_padre)
        REFERENCES padres(id_padre),
    CONSTRAINT fk_solicitud_estudiante
        FOREIGN KEY (id_estudiante)
        REFERENCES estudiantes(id_estudiante)
);
