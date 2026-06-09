import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaBullhorn,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFilePdf,
  FaFolder,
  FaPlus,
  FaRegCalendarAlt,
  FaSave,
  FaTimes,
  FaTrashAlt,
  FaUpload,
  FaUserCheck,
  FaUserMinus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SidebarDocente from "../components/SidebarDocente";
import { listarCursos } from "../services/cursoService";
import { obtenerResumen } from "../services/dashboardService";
import {
  eliminarMaterial,
  guardarMaterial,
  listarMateriales,
} from "../services/materialService";
import { guardarTarea, listarTareas } from "../services/tareaService";
import "./DashboardDocente.css";

const CURSOS_DEMO = [
  {
    idCurso: 1,
    nombre: "3ro A - Matemáticas I",
    descripcion: "Curso de referencia",
  },
  {
    idCurso: 2,
    nombre: "3ro B - Comunicación",
    descripcion: "Curso de referencia",
  },
];

const TAREAS_DEMO = [
  {
    id: 1,
    titulo: "Práctica Calificada 03: Ecuaciones Lineales",
    descripcion: "Resolver ejercicios aplicando despeje de variables.",
    fechaEntrega: "2026-06-15",
    puntajeMaximo: 20,
    estado: "Tarea",
    cursoId: 1,
  },
  {
    id: 2,
    titulo: "Examen Parcial de Álgebra",
    descripcion: "Evaluación del primer bimestre.",
    fechaEntrega: "2026-06-20",
    puntajeMaximo: 20,
    estado: "Examen",
    cursoId: 1,
  },
];

const MATERIALES_DEMO = [
  {
    id: 1,
    nombre: "Sílabo_Matematicas_3ro.pdf",
    archivo: "silabo_matematicas_3ro.pdf",
    tipo: "PDF",
    descripcion: "Sílabo de referencia para el primer bimestre.",
    fechaPublicacion: "2026-06-01",
    cursoId: 1,
  },
  {
    id: 2,
    nombre: "Semana_01_Ecuaciones.pdf",
    archivo: "semana_01_ecuaciones.pdf",
    tipo: "PDF",
    descripcion: "Guía de trabajo inicial.",
    fechaPublicacion: "2026-06-02",
    cursoId: 1,
  },
];

const NOTAS_DEMO = [
  { id: 101, nombre: "Clemente, Deyvi", n1: 18, n2: 16, n3: 20, promedio: 18 },
  { id: 102, nombre: "Salcedo, Adrian", n1: 15, n2: 14, n3: 16, promedio: 15 },
  { id: 103, nombre: "Mendoza, María", n1: 12, n2: 11, n3: 14, promedio: 12 },
  { id: 104, nombre: "Quispe, Juan", n1: 8, n2: 10, n3: 11, promedio: 10 },
];

const ASISTENCIA_DEMO = [
  { id: 101, nombre: "Clemente, Deyvi", estado: "asistio" },
  { id: 102, nombre: "Salcedo, Adrian", estado: "asistio" },
  { id: 103, nombre: "Mendoza, María", estado: "tardanza" },
  { id: 104, nombre: "Quispe, Juan", estado: "falta" },
];

const COMUNICADOS_DEMO = [
  {
    id: 1,
    titulo: "Reunión de Entrega de Libretas",
    fecha: "08/06/2026",
    prioridad: "Alta",
    desc: "Estimados docentes, la junta con los padres de familia será el viernes a las 4:00 pm.",
  },
  {
    id: 2,
    titulo: "Mantenimiento de la Plataforma LMS",
    fecha: "05/06/2026",
    prioridad: "Media",
    desc: "El sistema entrará en mantenimiento este sábado de 11 pm a 2 am.",
  },
];

const formatearFechaCorta = (valor) => {
  if (!valor) {
    return "";
  }

  const fecha =
    valor instanceof Date
      ? valor
      : new Date(
          typeof valor === "string" && !valor.includes("T")
            ? `${valor}T00:00:00`
            : valor,
        );

  if (Number.isNaN(fecha.getTime())) {
    return String(valor);
  }

  return fecha.toLocaleDateString("es-PE");
};

const normalizarCurso = (curso) => ({
  idCurso: curso.idCurso,
  nombre: curso.nombre,
  descripcion: curso.descripcion ?? "",
});

const normalizarTarea = (tarea) => ({
  id: tarea.idTarea ?? tarea.id,
  titulo: tarea.titulo ?? "Sin título",
  descripcion: tarea.descripcion ?? "",
  fechaEntrega: tarea.fechaEntrega ?? "",
  fechaTexto: formatearFechaCorta(tarea.fechaEntrega),
  puntajeMaximo: tarea.puntajeMaximo ?? "",
  estado: tarea.estado ?? "Tarea",
  cursoId: tarea.idCurso ?? null,
});

const normalizarMaterial = (material) => ({
  id: material.idMaterial ?? material.id,
  nombre: material.titulo ?? "Sin título",
  archivo: material.archivo ?? "Sin archivo",
  tipo: material.tipo ?? "Archivo",
  descripcion: material.descripcion ?? "",
  fechaPublicacion: material.fechaPublicacion ?? "",
  fechaTexto: formatearFechaCorta(material.fechaPublicacion),
  cursoId: material.idCurso ?? null,
});

function DashboardDocente() {
  const navigate = useNavigate();
  const [fechaActual] = useState(new Date());

  // ESTADOS DEL PANEL
  const [vistaActiva, setVistaActiva] = useState("cursos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalMaterialAbierto, setModalMaterialAbierto] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [errorBackend, setErrorBackend] = useState("");
  const [resumen, setResumen] = useState({
    estudiantes: 0,
    docentes: 0,
    cursos: 0,
    matriculas: 0,
    padres: 0,
    usuarios: 0,
  });
  const [cursos, setCursos] = useState([]);
  const [tareas, setTareas] = useState(TAREAS_DEMO);

  // ESTADOS DEL FORMULARIO DE NUEVA TAREA
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [tipoActividad, setTipoActividad] = useState("Tarea");
  const [puntajeMaximo, setPuntajeMaximo] = useState(20);
  const [tituloTarea, setTituloTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [materialSeleccionadoCurso, setMaterialSeleccionadoCurso] =
    useState("");
  const [tipoMaterial, setTipoMaterial] = useState("PDF");
  const [tituloMaterial, setTituloMaterial] = useState("");
  const [archivoMaterial, setArchivoMaterial] = useState("");
  const [descripcionMaterial, setDescripcionMaterial] = useState("");

  // ESTADOS MAQUETA: CALIFICACIONES
  const [alumnosNotas] = useState(NOTAS_DEMO);

  // ESTADOS MAQUETA: ASISTENCIA
  const [asistenciaAlumnos, setAsistenciaAlumnos] = useState(ASISTENCIA_DEMO);

  // ESTADOS MAQUETA: COMUNICADOS
  const [comunicados] = useState(COMUNICADOS_DEMO);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [
          resumenResponse,
          cursosResponse,
          tareasResponse,
          materialesResponse,
        ] = await Promise.all([
          obtenerResumen(),
          listarCursos(),
          listarTareas(),
          listarMateriales(),
        ]);

        setResumen(resumenResponse.data);
        setCursos((cursosResponse.data || []).map(normalizarCurso));
        setTareas((tareasResponse.data || []).map(normalizarTarea));
        setArchivosBackend(
          (materialesResponse.data || []).map(normalizarMaterial),
        );
        setErrorBackend("");
      } catch (error) {
        console.error("Error cargando datos del backend:", error);
        setErrorBackend(
          "No se pudo conectar al backend. Se muestran datos de referencia.",
        );
        setCursos(CURSOS_DEMO);
        setTareas(TAREAS_DEMO);
        setArchivosBackend(MATERIALES_DEMO);
        setResumen({
          estudiantes: 0,
          docentes: 0,
          cursos: CURSOS_DEMO.length,
          matriculas: 0,
          padres: 0,
          usuarios: 0,
        });
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarDatos();
  }, []);

  const [archivosBackend, setArchivosBackend] = useState(MATERIALES_DEMO);

  // Recuperación segura de sesión
  const obtenerUsuario = () => {
    try {
      return (
        JSON.parse(localStorage.getItem("usuario")) || { nombre: "Docente" }
      );
    } catch {
      return { nombre: "Docente" };
    }
  };
  const usuario = obtenerUsuario();

  // Generación manual de la malla de días del mini calendario
  const obtenerDiasCalendario = () => {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    const primerDiaMes = new Date(año, mes, 1).getDay();
    const totalDias = new Date(año, mes + 1, 0).getDate();

    const dias = [];
    const espaciosInicio = primerDiaMes === 0 ? 6 : primerDiaMes - 1;

    for (let i = 0; i < espaciosInicio; i++) {
      dias.push(null);
    }
    for (let i = 1; i <= totalDias; i++) {
      dias.push(i);
    }
    return dias;
  };
  const diasCalendario = obtenerDiasCalendario();
  const nombreMes = fechaActual.toLocaleString("es-ES", { month: "long" });

  const manejarNavegacion = (seccion) => {
    setVistaActiva(seccion);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const cursosDisponibles = cursos.length > 0 ? cursos : CURSOS_DEMO;
  const tareasVisibles = tareas;
  const archivosVisibles = archivosBackend;
  const tareasActivas = tareas.length;

  const limpiarFormularioTarea = () => {
    setCursoSeleccionado("");
    setTipoActividad("Tarea");
    setPuntajeMaximo(20);
    setTituloTarea("");
    setDescripcionTarea("");
    setFechaLimite("");
  };

  const limpiarFormularioMaterial = () => {
    setMaterialSeleccionadoCurso("");
    setTipoMaterial("PDF");
    setTituloMaterial("");
    setArchivoMaterial("");
    setDescripcionMaterial("");
  };

  const manejarGuardarTarea = async (e) => {
    e.preventDefault();

    try {
      await guardarTarea({
        idCurso: Number(cursoSeleccionado),
        titulo: tituloTarea,
        descripcion: descripcionTarea,
        fechaEntrega: fechaLimite ? fechaLimite.slice(0, 10) : null,
        puntajeMaximo: Number(puntajeMaximo),
        estado: tipoActividad,
      });

      await listarTareas().then((response) =>
        setTareas((response.data || []).map(normalizarTarea)),
      );
      limpiarFormularioTarea();
      setModalAbierto(false);
      setErrorBackend("");
    } catch (error) {
      console.error("Error guardando tarea:", error);
      setErrorBackend("No se pudo guardar la tarea en el backend.");
    }
  };

  const manejarGuardarMaterial = async (e) => {
    e.preventDefault();

    try {
      await guardarMaterial({
        idCurso: materialSeleccionadoCurso
          ? Number(materialSeleccionadoCurso)
          : null,
        titulo: tituloMaterial,
        tipo: tipoMaterial,
        archivo: archivoMaterial,
        descripcion: descripcionMaterial,
        fechaPublicacion: new Date().toISOString().slice(0, 10),
      });

      await listarMateriales().then((response) =>
        setArchivosBackend((response.data || []).map(normalizarMaterial)),
      );
      limpiarFormularioMaterial();
      setModalMaterialAbierto(false);
      setErrorBackend("");
    } catch (error) {
      console.error("Error guardando material:", error);
      setErrorBackend("No se pudo guardar el material en el backend.");
    }
  };

  const manejarEliminarMaterial = async (idMaterial) => {
    try {
      await eliminarMaterial(idMaterial);
      setArchivosBackend((prev) =>
        prev.filter((archivo) => archivo.id !== idMaterial),
      );
    } catch (error) {
      console.error("Error eliminando material:", error);
      setErrorBackend("No se pudo eliminar el material.");
    }
  };

  // Manejador interactivo para cambiar asistencia localmente
  const cambiarAsistencia = (id, nuevoEstado) => {
    setAsistenciaAlumnos((prev) =>
      prev.map((al) => (al.id === id ? { ...al, estado: nuevoEstado } : al)),
    );
  };

  return (
    <div
      className="dashboard-docente-layout"
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        position: "relative",
      }}
    >
      {/* SIDEBAR INSTITUCIONAL */}
      <SidebarDocente onNavigate={manejarNavegacion} onLogout={cerrarSesion} />

      {/* CONTENEDOR DE CONTENIDO DINÁMICO */}
      <main
        className="dashboard-docente-main"
        style={{
          padding: "30px",
          width: "100%",
          flex: 1,
          boxSizing: "border-box",
        }}
      >
        {errorBackend && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
              textAlign: "left",
            }}
          >
            {errorBackend}
          </div>
        )}

        {cargandoDatos && (
          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "12px",
              backgroundColor: "#ecfdf5",
              color: "#166534",
              border: "1px solid #bbf7d0",
              textAlign: "left",
            }}
          >
            Cargando datos desde el backend...
          </div>
        )}

        {/* ========================================== */}
        {/* VISTA 1: MIS CURSOS (PANEL PRINCIPAL)      */}
        {/* ========================================== */}
        {vistaActiva === "cursos" && (
          <>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              Portal docente &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>
                Mis cursos
              </span>
            </div>

            <section
              style={{
                background: "linear-gradient(135deg, #115133 0%, #1a6b45 100%)",
                borderRadius: "20px",
                padding: "35px",
                color: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 25px rgba(17, 81, 51, 0.12)",
                marginBottom: "30px",
              }}
            >
              <div style={{ textAlign: "left", zIndex: 2 }}>
                <span
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    padding: "4px 12px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {cursosDisponibles.length > 0
                    ? `${cursosDisponibles.length} curso${cursosDisponibles.length > 1 ? "s" : ""} disponible${cursosDisponibles.length > 1 ? "s" : ""}`
                    : "Sin curso activo"}
                </span>
                <h1
                  style={{
                    fontSize: "36px",
                    fontWeight: "800",
                    margin: "12px 0 6px 0",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#ffffff",
                  }}
                >
                  Mis cursos
                </h1>
                <p style={{ color: "#a3d9b1", fontSize: "15px", margin: 0 }}>
                  Bienvenido, {usuario.nombre}. Aún no tienes cursos asignados
                  en este bloque.
                </p>
              </div>

              <div style={{ display: "flex", gap: "15px", zIndex: 2 }}>
                <button
                  onClick={() => setVistaActiva("contenido")}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <FaUpload /> Subir contenido
                </button>
                <button
                  onClick={() => setVistaActiva("tareas-evaluaciones")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#115133",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                  }}
                >
                  <FaPlus style={{ color: "#D4AF37" }} /> Nueva tarea
                </button>
              </div>
            </section>

            {/* SECCIÓN DOS COLUMNAS */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                flexWrap: "wrap",
                alignItems: "start",
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  minWidth: "320px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "20px",
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(17, 81, 51, 0.08)",
                        color: "#115133",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaChalkboardTeacher />
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "13px",
                          display: "block",
                        }}
                      >
                        Mis cursos
                      </span>
                      <strong style={{ fontSize: "20px", color: "#1e293b" }}>
                        {resumen.cursos || cursosDisponibles.length}
                      </strong>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "20px",
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(17, 81, 51, 0.08)",
                        color: "#115133",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaBookOpen />
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "13px",
                          display: "block",
                        }}
                      >
                        Estudiantes
                      </span>
                      <strong style={{ fontSize: "20px", color: "#1e293b" }}>
                        {resumen.estudiantes}
                      </strong>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "20px",
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(17, 81, 51, 0.08)",
                        color: "#115133",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaClock />
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#64748b",
                          fontSize: "13px",
                          display: "block",
                        }}
                      >
                        Tareas activas
                      </span>
                      <strong style={{ fontSize: "20px", color: "#1e293b" }}>
                        {tareasActivas}
                      </strong>
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #166534 0%, #115133 100%)",
                      padding: "20px",
                      borderRadius: "16px",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaCheckCircle />
                    </div>
                    <div>
                      <span
                        style={{
                          color: "#bbf7d0",
                          fontSize: "13px",
                          display: "block",
                        }}
                      >
                        Por calificar
                      </span>
                      <strong style={{ fontSize: "20px" }}>
                        {Math.max(tareasActivas - 1, 0)}
                      </strong>
                    </div>
                  </div>
                </div>

                <section
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "30px",
                    border: "1px solid #e2e8f0",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #f1f5f9",
                      paddingBottom: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        color: "#115133",
                        fontWeight: "700",
                        margin: 0,
                      }}
                    >
                      Tareas y evaluaciones
                    </h2>
                    <span
                      onClick={() => setVistaActiva("tareas-evaluaciones")}
                      style={{
                        color: "#1a6b45",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Ver todas
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {tareasVisibles.length === 0 ? (
                      <div
                        style={{
                          padding: "40px 0",
                          color: "#94a3b8",
                          textAlign: "center",
                        }}
                      >
                        No hay tareas publicadas.
                      </div>
                    ) : (
                      tareasVisibles.slice(0, 3).map((tarea) => {
                        const cursoRelacionado = cursosDisponibles.find(
                          (curso) =>
                            String(curso.idCurso) === String(tarea.cursoId),
                        );

                        return (
                          <div
                            key={tarea.id}
                            style={{
                              padding: "16px",
                              border: "1px solid #e2e8f0",
                              borderRadius: "12px",
                              backgroundColor: "#f8fafc",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "12px",
                                alignItems: "start",
                              }}
                            >
                              <div>
                                <h4
                                  style={{
                                    margin: 0,
                                    color: "#1e293b",
                                    fontSize: "15px",
                                  }}
                                >
                                  {tarea.titulo}
                                </h4>
                                <p
                                  style={{
                                    margin: "6px 0 0 0",
                                    color: "#64748b",
                                    fontSize: "13px",
                                  }}
                                >
                                  {cursoRelacionado
                                    ? cursoRelacionado.nombre
                                    : "Sin curso asignado"}
                                </p>
                              </div>
                              <span
                                style={{
                                  color: "#115133",
                                  fontWeight: "700",
                                  fontSize: "13px",
                                }}
                              >
                                {tarea.fechaTexto}
                              </span>
                            </div>
                            <p
                              style={{
                                margin: "10px 0 0 0",
                                color: "#475569",
                                fontSize: "13px",
                              }}
                            >
                              {tarea.descripcion}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </section>
              </div>

              {/* COLUMNA CALENDARIO */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  minWidth: "270px",
                }}
              >
                <section
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "20px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "15px",
                      borderBottom: "1px solid #f1f5f9",
                      paddingBottom: "12px",
                    }}
                  >
                    <FaRegCalendarAlt style={{ color: "#115133" }} />
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        textTransform: "capitalize",
                        margin: 0,
                      }}
                    >
                      {nombreMes} {fechaActual.getFullYear()}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: "6px",
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#64748b",
                      textAlign: "center",
                    }}
                  >
                    <div>Lu</div>
                    <div>Ma</div>
                    <div>Mi</div>
                    <div>Ju</div>
                    <div>Vi</div>
                    <div>Sá</div>
                    <div>Do</div>
                    {diasCalendario.map((dia, index) => {
                      const esHoy = dia === fechaActual.getDate();
                      return (
                        <div
                          key={index}
                          style={{
                            padding: "6px 0",
                            borderRadius: "8px",
                            fontSize: "11px",
                            backgroundColor: esHoy ? "#115133" : "transparent",
                            color: esHoy
                              ? "#ffffff"
                              : dia
                                ? "#334155"
                                : "transparent",
                          }}
                        >
                          {dia || ""}
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </>
        )}

        {/* ========================================== */}
        {/* VISTA 2: TAREAS Y EVALUACIONES             */}
        {/* ========================================== */}
        {vistaActiva === "tareas-evaluaciones" && (
          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              Portal docente &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>
                Tareas y Evaluaciones
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Tareas y evaluaciones
                </h1>
                <p
                  style={{
                    color: "#64748b",
                    margin: "5px 0 0 0",
                    fontSize: "14px",
                  }}
                >
                  Crea y administra tareas, evaluaciones y exámenes para tus
                  cursos
                </p>
              </div>
              <button
                onClick={() => setModalAbierto(true)}
                style={{
                  backgroundColor: "#115133",
                  color: "#fff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(17, 81, 51, 0.15)",
                }}
              >
                <FaPlus /> Nueva tarea
              </button>
            </div>
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
              }}
            >
              {tareasVisibles.length === 0 ? (
                <div
                  style={{
                    padding: "50px",
                    color: "#94a3b8",
                    textAlign: "center",
                  }}
                >
                  No hay tareas registradas en el backend.
                </div>
              ) : (
                tareasVisibles.map((tarea, index) => {
                  const cursoRelacionado = cursosDisponibles.find(
                    (curso) => String(curso.idCurso) === String(tarea.cursoId),
                  );

                  return (
                    <div
                      key={tarea.id}
                      style={{
                        padding: "18px 22px",
                        borderBottom:
                          index === tareasVisibles.length - 1
                            ? "none"
                            : "1px solid #e2e8f0",
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f8fafc",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "18px",
                          alignItems: "start",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginBottom: "6px",
                            }}
                          >
                            <strong
                              style={{ fontSize: "15px", color: "#1e293b" }}
                            >
                              {tarea.titulo}
                            </strong>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                color: "#166534",
                                backgroundColor: "#dcfce7",
                                padding: "4px 8px",
                                borderRadius: "999px",
                              }}
                            >
                              {tarea.estado}
                            </span>
                          </div>
                          <div style={{ color: "#64748b", fontSize: "13px" }}>
                            {tarea.descripcion}
                          </div>
                          <div
                            style={{
                              color: "#94a3b8",
                              fontSize: "12px",
                              marginTop: "6px",
                            }}
                          >
                            {cursoRelacionado
                              ? cursoRelacionado.nombre
                              : "Sin curso asignado"}
                          </div>
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            color: "#115133",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                        >
                          {tarea.fechaTexto}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VISTA 3: MÓDULO CONTENIDO (NUEVO!)        */}
        {/* ========================================== */}
        {vistaActiva === "contenido" && (
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "15px",
              }}
            >
              Portal docente &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>
                Gestión de Contenidos
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Estructura Didáctica de Contenidos
                </h1>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "5px 0 0 0",
                  }}
                >
                  Sube separatas, sílabos o material complementario organizado
                  por carpetas bimestrales.
                </p>
              </div>
              <button
                onClick={() => setModalMaterialAbierto(true)}
                style={{
                  backgroundColor: "#115133",
                  color: "#fff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <FaUpload /> Subir Archivo Nuevo
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "24px",
              }}
            >
              {/* Estructura de Bloques */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "I Bimestre",
                  "II Bimestre",
                  "III Bimestre",
                  "IV Bimestre",
                ].map((bim, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: index === 0 ? "#eefbf3" : "#fff",
                      border:
                        index === 0 ? "1px solid #115133" : "1px solid #e2e8f0",
                      padding: "16px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <FaFolder
                      style={{
                        color: index === 0 ? "#115133" : "#cbd5e1",
                        fontSize: "24px",
                      }}
                    />
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          color: "#1e293b",
                          fontWeight: "600",
                        }}
                      >
                        {bim}
                      </h4>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>
                        {index === 0 ? "2 archivos públicos" : "0 archivos"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lista de archivos en la carpeta */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    color: "#115133",
                    marginBottom: "15px",
                    fontWeight: "700",
                  }}
                >
                  Archivos en I Bimestre
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {archivosVisibles.length === 0 ? (
                    <div
                      style={{
                        padding: "30px 0",
                        color: "#94a3b8",
                        textAlign: "center",
                      }}
                    >
                      No hay materiales publicados.
                    </div>
                  ) : (
                    archivosVisibles.map((file) => (
                      <div
                        key={file.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          backgroundColor: "#f8fafc",
                          borderRadius: "10px",
                          border: "1px solid #f1f5f9",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <FaFilePdf
                            style={{ color: "#ef4444", fontSize: "20px" }}
                          />
                          <div>
                            <span
                              style={{
                                fontWeight: "600",
                                fontSize: "14px",
                                color: "#334155",
                                display: "block",
                              }}
                            >
                              {file.nombre}
                            </span>
                            <span
                              style={{ fontSize: "12px", color: "#94a3b8" }}
                            >
                              {file.tipo}{" "}
                              {file.fechaTexto ? `• ${file.fechaTexto}` : ""}
                            </span>
                            {file.descripcion && (
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#64748b",
                                  display: "block",
                                  marginTop: "3px",
                                }}
                              >
                                {file.descripcion}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                          }}
                          onClick={() => manejarEliminarMaterial(file.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VISTA 4: MÓDULO CALIFICACIONES (NUEVO!)    */}
        {/* ========================================== */}
        {vistaActiva === "calificaciones" && (
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "15px",
              }}
            >
              Portal docente &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>
                Registro de Notas
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Registro Oficial de Calificaciones
                </h1>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "5px 0 0 0",
                  }}
                >
                  Matemáticas I - 3ro Secundaria Sección A
                </p>
              </div>
              <button
                style={{
                  backgroundColor: "#115133",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaSave style={{ color: "#D4AF37" }} /> Guardar Registro Local
              </button>
            </div>

            {/* Tabla de Calificaciones Estilo Ejecutivo */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#115133", color: "#ffffff" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>
                      Estudiante
                    </th>
                    <th style={{ padding: "14px 10px", textAlign: "center" }}>
                      Práctica 01
                    </th>
                    <th style={{ padding: "14px 10px", textAlign: "center" }}>
                      Práctica 02
                    </th>
                    <th style={{ padding: "14px 10px", textAlign: "center" }}>
                      Examen Parcial
                    </th>
                    <th
                      style={{
                        padding: "14px 20px",
                        textAlign: "center",
                        backgroundColor: "#0f432a",
                      }}
                    >
                      Promedio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alumnosNotas.map((alumno, idx) => (
                    <tr
                      key={alumno.id}
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                      }}
                    >
                      <td
                        style={{
                          padding: "14px 20px",
                          fontWeight: "600",
                          color: "#334155",
                        }}
                      >
                        {alumno.nombre}
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "center" }}>
                        <input
                          type="number"
                          defaultValue={alumno.n1}
                          style={{
                            width: "55px",
                            padding: "6px",
                            textAlign: "center",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "center" }}>
                        <input
                          type="number"
                          defaultValue={alumno.n2}
                          style={{
                            width: "55px",
                            padding: "6px",
                            textAlign: "center",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "center" }}>
                        <input
                          type="number"
                          defaultValue={alumno.n3}
                          style={{
                            width: "55px",
                            padding: "6px",
                            textAlign: "center",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "14px 20px",
                          textAlign: "center",
                          fontWeight: "700",
                          color: alumno.promedio >= 11 ? "#115133" : "#ef4444",
                          backgroundColor:
                            idx % 2 === 0 ? "#f1fdf5" : "#e6f9ed",
                        }}
                      >
                        {alumno.promedio}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VISTA 5: MÓDULO ASISTENCIA (NUEVO!)       */}
        {/* ========================================== */}
        {vistaActiva === "asistencia" && (
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "15px",
              }}
            >
              Portal docente &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>
                Control de Asistencia
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Control de Asistencia Diario
                </h1>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "5px 0 0 0",
                  }}
                >
                  Fecha seleccionada:{" "}
                  <strong style={{ color: "#115133" }}>
                    {fechaActual.toLocaleDateString("es-PE")}
                  </strong>
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  Marcar todos Asistió
                </button>
                <button
                  style={{
                    backgroundColor: "#115133",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "600",
                  }}
                >
                  Enviar Parte Diario
                </button>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
              }}
            >
              {asistenciaAlumnos.map((al, idx) => (
                <div
                  key={al.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    borderBottom:
                      idx === asistenciaAlumnos.length - 1
                        ? "none"
                        : "1px solid #e2e8f0",
                    backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f8fafc",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#334155",
                      fontSize: "15px",
                    }}
                  >
                    {al.nombre}
                  </span>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => cambiarAsistencia(al.id, "asistio")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                        backgroundColor:
                          al.estado === "asistio" ? "#dcfce7" : "#f1f5f9",
                        color: al.estado === "asistio" ? "#166534" : "#64748b",
                      }}
                    >
                      <FaUserCheck /> Asistió
                    </button>
                    <button
                      onClick={() => cambiarAsistencia(al.id, "tardanza")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                        backgroundColor:
                          al.estado === "tardanza" ? "#fef9c3" : "#f1f5f9",
                        color: al.estado === "tardanza" ? "#854d0e" : "#64748b",
                      }}
                    >
                      <FaExclamationTriangle /> Tardanza
                    </button>
                    <button
                      onClick={() => cambiarAsistencia(al.id, "falta")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                        backgroundColor:
                          al.estado === "falta" ? "#fee2e2" : "#f1f5f9",
                        color: al.estado === "falta" ? "#991b1b" : "#64748b",
                      }}
                    >
                      <FaUserMinus /> Falta
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VISTA 6: MÓDULO COMUNICADOS (NUEVO!)      */}
        {/* ========================================== */}
        {vistaActiva === "comunicados" && (
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "13px",
                color: "#64748b",
                marginBottom: "15px",
              }}
            >
              Portal docente &nbsp;/&nbsp;{" "}
              <span style={{ color: "#115133", fontWeight: "600" }}>
                Muro de Comunicados
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1e293b",
                    margin: 0,
                  }}
                >
                  Muro de Avisos e Información
                </h1>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    margin: "5px 0 0 0",
                  }}
                >
                  Publica notificaciones directas para los padres de familia y
                  el alumnado.
                </p>
              </div>
              <button
                style={{
                  backgroundColor: "#115133",
                  color: "#fff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaBullhorn style={{ color: "#D4AF37" }} /> Emitir Comunicado
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {comunicados.map((com) => (
                <div
                  key={com.id}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    borderLeft:
                      com.prioridad === "Alta"
                        ? "6px solid #ef4444"
                        : "6px solid #eab308",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          backgroundColor:
                            com.prioridad === "Alta" ? "#fee2e2" : "#fef9c3",
                          color:
                            com.prioridad === "Alta" ? "#991b1b" : "#854d0e",
                          fontSize: "11px",
                          fontWeight: "700",
                          padding: "4px 10px",
                          borderRadius: "30px",
                          textTransform: "uppercase",
                          display: "inline-block",
                          marginBottom: "8px",
                        }}
                      >
                        Prioridad {com.prioridad}
                      </span>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          color: "#1e293b",
                          fontWeight: "700",
                        }}
                      >
                        {com.titulo}
                      </h3>
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#94a3b8",
                        fontWeight: "500",
                      }}
                    >
                      {com.fecha}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "14px",
                      margin: 0,
                      lineHeight: "1.6",
                    }}
                  >
                    {com.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FORMULARIO MODAL INTERNO: REGISTRO DE NUEVA TAREA */}
      {modalAbierto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "550px",
              borderRadius: "20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
              textAlign: "left",
            }}
          >
            <div
              style={{
                backgroundColor: "#115133",
                padding: "20px 24px",
                color: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#D4AF37",
                    }}
                  ></span>
                  Programar Nueva Actividad
                </h3>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "12px",
                    color: "#a3d9b1",
                  }}
                >
                  Define los parámetros, plazos y escala de calificación
                </p>
              </div>
              <button
                onClick={() => setModalAbierto(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={manejarGuardarTarea}
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Asignar al Curso o Grado:
                </label>
                <select
                  required
                  value={cursoSeleccionado}
                  onChange={(e) => setCursoSeleccionado(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#334155",
                    outline: "none",
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <option value="">-- Seleccionar curso disponible --</option>
                  {cursosDisponibles.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {curso.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Tipo de Evaluación:
                  </label>
                  <select
                    value={tipoActividad}
                    onChange={(e) => setTipoActividad(e.target.value)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      color: "#334155",
                      outline: "none",
                    }}
                  >
                    <option value="Tarea">Práctica / Tarea</option>
                    <option value="Examen">Examen Parcial</option>
                    <option value="Proyecto">Proyecto Modular</option>
                  </select>
                </div>
                <div
                  style={{
                    width: "130px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Puntaje Máx:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={puntajeMaximo}
                    onChange={(e) => setPuntajeMaximo(e.target.value)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      color: "#334155",
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Título de la Actividad / Tema:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Práctica Calificada 03: Ecuaciones Lineales"
                  value={tituloTarea}
                  onChange={(e) => setTituloTarea(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#334155",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Indicaciones o Descripción de la Entrega:
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Escribe las directrices..."
                  value={descripcionTarea}
                  onChange={(e) => setDescripcionTarea(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#334155",
                    outline: "none",
                    resize: "none",
                    fontFamily: "inherit",
                  }}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Fecha y Hora Límite de Recepción:
                </label>
                <input
                  type="datetime-local"
                  required
                  value={fechaLimite}
                  onChange={(e) => setFechaLimite(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#334155",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "10px",
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "16px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#64748b",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#115133",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <FaSave style={{ color: "#D4AF37" }} /> Publicar actividad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalMaterialAbierto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "550px",
              borderRadius: "20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
              textAlign: "left",
            }}
          >
            <div
              style={{
                backgroundColor: "#115133",
                padding: "20px 24px",
                color: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#D4AF37",
                    }}
                  ></span>
                  Subir Material al Backend
                </h3>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "12px",
                    color: "#a3d9b1",
                  }}
                >
                  Registra archivos y separatas en la tabla de materiales
                </p>
              </div>
              <button
                onClick={() => setModalMaterialAbierto(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={manejarGuardarMaterial}
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Asignar al Curso o Grado:
                </label>
                <select
                  required
                  value={materialSeleccionadoCurso}
                  onChange={(e) => setMaterialSeleccionadoCurso(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#334155",
                    outline: "none",
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <option value="">-- Seleccionar curso disponible --</option>
                  {cursosDisponibles.map((curso) => (
                    <option key={curso.idCurso} value={curso.idCurso}>
                      {curso.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Tipo de Material:
                  </label>
                  <select
                    value={tipoMaterial}
                    onChange={(e) => setTipoMaterial(e.target.value)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      color: "#334155",
                      outline: "none",
                    }}
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="LINK">Enlace</option>
                    <option value="OTRO">Otro</option>
                  </select>
                </div>
                <div
                  style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#334155",
                    }}
                  >
                    Archivo / URL:
                  </label>
                  <input
                    type="text"
                    required
                    value={archivoMaterial}
                    onChange={(e) => setArchivoMaterial(e.target.value)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "14px",
                      color: "#334155",
                      outline: "none",
                    }}
                    placeholder="ruta o enlace"
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Título del Material:
                </label>
                <input
                  type="text"
                  required
                  value={tituloMaterial}
                  onChange={(e) => setTituloMaterial(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#334155",
                    outline: "none",
                  }}
                  placeholder="Ej. Semana 01 - Ecuaciones"
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  Descripción:
                </label>
                <textarea
                  rows="3"
                  required
                  value={descripcionMaterial}
                  onChange={(e) => setDescripcionMaterial(e.target.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "14px",
                    color: "#334155",
                    outline: "none",
                    resize: "none",
                    fontFamily: "inherit",
                  }}
                ></textarea>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "10px",
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "16px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setModalMaterialAbierto(false)}
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#64748b",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#115133",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <FaSave style={{ color: "#D4AF37" }} /> Publicar material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardDocente;
