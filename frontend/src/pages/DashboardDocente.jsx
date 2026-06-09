import { useState } from "react";
import {
  FaChalkboardTeacher,
  FaRegCalendarAlt,
  FaPlus,
  FaUpload,
  FaCheckCircle,
  FaBookOpen,
  FaClock,
  FaTimes,
  FaSave,
  FaFolder,
  FaFilePdf,
  FaTrashAlt,
  FaUserCheck,
  FaUserMinus,
  FaExclamationTriangle,
  FaBullhorn,
  FaSearch,
  FaCheck,
  FaEye
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SidebarDocente from "../components/SidebarDocente";
import "./DashboardDocente.css";

function DashboardDocente() {
  const navigate = useNavigate();
  const [fechaActual] = useState(new Date());
  
  // ESTADOS DEL PANEL
  const [vistaActiva, setVistaActiva] = useState("cursos");
  const [modalAbierto, setModalAbierto] = useState(false);

  // ESTADOS DEL FORMULARIO DE NUEVA TAREA
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [tipoActividad, setTipoActividad] = useState("Tarea");
  const [puntajeMaximo, setPuntajeMaximo] = useState(20);
  const [tituloTarea, setTituloTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");

  // ESTADOS MAQUETA: CONTENIDO
  const [archivos, setArchivos] = useState([
    { id: 1, nombre: "Silabo_Matematicas_3ro.pdf", tamaño: "1.2 MB", Bimestre: "I Bimestre" },
    { id: 2, nombre: "Semana_01_Ecuaciones.pdf", tamaño: "3.4 MB", Bimestre: "I Bimestre" },
    { id: 3, nombre: "Ficha_Trabajo_Polinomios.pdf", tamaño: "850 KB", Bimestre: "II Bimestre" },
  ]);

  // ESTADOS MAQUETA: CALIFICACIONES
  const [alumnosNotas, setAlumnosNotas] = useState([
    { id: 101, nombre: "Clemente, Deyvi", n1: 18, n2: 16, n3: 20, promedio: 18 },
    { id: 102, nombre: "Salcedo, Adrian", n1: 15, n2: 14, n3: 16, promedio: 15 },
    { id: 103, nombre: "Mendoza, María", n1: 12, n2: 11, n3: 14, promedio: 12 },
    { id: 104, nombre: "Quispe, Juan", n1: 08, n2: 10, n3: 11, promedio: 10 },
  ]);

  // ESTADOS MAQUETA: ASISTENCIA
  const [asistenciaAlumnos, setAsistenciaAlumnos] = useState([
    { id: 101, nombre: "Clemente, Deyvi", estado: "asistio" },
    { id: 102, nombre: "Salcedo, Adrian", estado: "asistio" },
    { id: 103, nombre: "Mendoza, María", estado: "tardanza" },
    { id: 104, nombre: "Quispe, Juan", estado: "falta" },
  ]);

  // ESTADOS MAQUETA: COMUNICADOS
  const [comunicados, setComunicados] = useState([
    { id: 1, titulo: "Reunión de Entrega de Libretas", fecha: "08/06/2026", prioridad: "Alta", desc: "Estimados docentes, la junta con los padres de familia será el viernes a las 4:00 pm." },
    { id: 2, titulo: "Mantenimiento de la Plataforma LMS", fecha: "05/06/2026", prioridad: "Media", desc: "El sistema entrará en mantenimiento este sábado de 11 pm a 2 am." }
  ]);

  // Recuperación segura de sesión
  const obtenerUsuario = () => {
    try {
      return JSON.parse(localStorage.getItem("usuario")) || { nombre: "Docente" };
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
  const nombreMes = fechaActual.toLocaleString('es-ES', { month: 'long' });

  const manejarNavegacion = (seccion) => {
    setVistaActiva(seccion);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const manejarGuardarTarea = (e) => {
    e.preventDefault();
    console.log("Nueva actividad publicada en Spring Boot:", {
      cursoSeleccionado,
      tipoActividad,
      maxPuntaje: puntajeMaximo,
      titulo: tituloTarea,
      descripcion: descripcionTarea,
      limite: fechaLimite
    });
    setModalAbierto(false); 
  };

  // Manejador interactivo para cambiar asistencia localmente
  const cambiarAsistencia = (id, nuevoEstado) => {
    setAsistenciaAlumnos(prev => prev.map(al => al.id === id ? { ...al, estado: nuevoEstado } : al));
  };

  return (
    <div className="dashboard-docente-layout" style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", position: "relative" }}>
      
      {/* SIDEBAR INSTITUCIONAL */}
      <SidebarDocente onNavigate={manejarNavegacion} onLogout={cerrarSesion} />

      {/* CONTENEDOR DE CONTENIDO DINÁMICO */}
      <main className="dashboard-docente-main" style={{ padding: "30px", width: "100%", flex: 1, boxSizing: "border-box" }}>
        
        {/* ========================================== */}
        {/* VISTA 1: MIS CURSOS (PANEL PRINCIPAL)      */}
        {/* ========================================== */}
        {vistaActiva === "cursos" && (
          <>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px", textAlign: "left" }}>
              Portal docente &nbsp;/&nbsp; <span style={{ color: "#115133", fontWeight: "600" }}>Mis cursos</span>
            </div>

            <section style={{ background: "linear-gradient(135deg, #115133 0%, #1a6b45 100%)", borderRadius: "20px", padding: "35px", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 10px 25px rgba(17, 81, 51, 0.12)", marginBottom: "30px" }}>
              <div style={{ textAlign: "left", zIndex: 2 }}>
                <span style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", padding: "4px 12px", borderRadius: "30px", fontSize: "12px", fontWeight: "600" }}>Sin curso activo</span>
                <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "12px 0 6px 0", fontFamily: "'Poppins', sans-serif", color: "#ffffff" }}>Mis cursos</h1>
                <p style={{ color: "#a3d9b1", fontSize: "15px", margin: 0 }}>Bienvenido, {usuario.nombre}. Aún no tienes cursos asignados en este bloque.</p>
              </div>

              <div style={{ display: "flex", gap: "15px", zIndex: 2 }}>
                <button onClick={() => setVistaActiva("contenido")} style={{ backgroundColor: "rgba(255, 255, 255, 0.12)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.25)", padding: "12px 24px", borderRadius: "12px", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <FaUpload /> Subir contenido
                </button>
                <button onClick={() => setVistaActiva("tareas-evaluaciones")} style={{ backgroundColor: "#ffffff", color: "#115133", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: "700", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", cursor: "pointer" }}>
                  <FaPlus style={{ color: "#D4AF37" }} /> Nueva tarea
                </button>
              </div>
            </section>

            {/* SECCIÓN DOS COLUMNAS */}
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "start", width: "100%" }}>
              <div style={{ flex: 3, display: "flex", flexDirection: "column", gap: "24px", minWidth: "320px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", width: "100%" }}>
                  <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "15px", textAlign: "left" }}>
                    <div style={{ width: "45px", height: "45px", borderRadius: "12px", backgroundColor: "rgba(17, 81, 51, 0.08)", color: "#115133", display: "flex", alignItems: "center", justifyContent: "center" }}><FaChalkboardTeacher /></div>
                    <div><span style={{ color: "#64748b", fontSize: "13px", display: "block" }}>Mis cursos</span><strong style={{ fontSize: "20px", color: "#1e293b" }}>—</strong></div>
                  </div>
                  <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "15px", textAlign: "left" }}>
                    <div style={{ width: "45px", height: "45px", borderRadius: "12px", backgroundColor: "rgba(17, 81, 51, 0.08)", color: "#115133", display: "flex", alignItems: "center", justifyContent: "center" }}><FaBookOpen /></div>
                    <div><span style={{ color: "#64748b", fontSize: "13px", display: "block" }}>Estudiantes</span><strong style={{ fontSize: "20px", color: "#1e293b" }}>—</strong></div>
                  </div>
                  <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "15px", textAlign: "left" }}>
                    <div style={{ width: "45px", height: "45px", borderRadius: "12px", backgroundColor: "rgba(17, 81, 51, 0.08)", color: "#115133", display: "flex", alignItems: "center", justifyContent: "center" }}><FaClock /></div>
                    <div><span style={{ color: "#64748b", fontSize: "13px", display: "block" }}>Tareas activas</span><strong style={{ fontSize: "20px", color: "#1e293b" }}>—</strong></div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg, #166534 0%, #115133 100%)", padding: "20px", borderRadius: "16px", color: "#ffffff", display: "flex", alignItems: "center", gap: "15px", textAlign: "left" }}>
                    <div style={{ width: "45px", height: "45px", borderRadius: "12px", backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}><FaCheckCircle /></div>
                    <div><span style={{ color: "#bbf7d0", fontSize: "13px", display: "block" }}>Por calificar</span><strong style={{ fontSize: "20px" }}>—</strong></div>
                  </div>
                </div>

                <section style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "30px", border: "1px solid #e2e8f0", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px", marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "18px", color: "#115133", fontWeight: "700", margin: 0 }}>Tareas y evaluaciones</h2>
                    <span onClick={() => setVistaActiva("tareas-evaluaciones")} style={{ color: "#1a6b45", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>Ver todas</span>
                  </div>
                  <div style={{ padding: "40px 0", color: "#94a3b8", textAlign: "center" }}>Cargando tareas...</div>
                </section>
              </div>

              {/* COLUMNA CALENDARIO */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", minWidth: "270px" }}>
                <section style={{ backgroundColor: "#ffffff", borderRadius: "20px", padding: "20px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>
                    <FaRegCalendarAlt style={{ color: "#115133" }} />
                    <h3 style={{ fontSize: "14px", fontWeight: "700", textTransform: "capitalize", margin: 0 }}>{nombreMes} {fechaActual.getFullYear()}</h3>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", fontSize: "10px", fontWeight: "700", color: "#64748b", textAlign: "center" }}>
                    <div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sá</div><div>Do</div>
                    {diasCalendario.map((dia, index) => {
                      const esHoy = dia === fechaActual.getDate();
                      return (
                        <div key={index} style={{ padding: "6px 0", borderRadius: "8px", fontSize: "11px", backgroundColor: esHoy ? "#115133" : "transparent", color: esHoy ? "#ffffff" : dia ? "#334155" : "transparent" }}>
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
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px", textAlign: "left" }}>
              Portal docente &nbsp;/&nbsp; <span style={{ color: "#115133", fontWeight: "600" }}>Tareas y Evaluaciones</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <div style={{ textAlign: "left" }}>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Tareas y evaluaciones</h1>
                <p style={{ color: "#64748b", margin: "5px 0 0 0", fontSize: "14px" }}>Crea y administra tareas, evaluaciones y exámenes para tus cursos</p>
              </div>
              <button onClick={() => setModalAbierto(true)} style={{ backgroundColor: "#115133", color: "#fff", border: "none", padding: "12px 22px", borderRadius: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", boxShadow: "0 4px 12px rgba(17, 81, 51, 0.15)" }}>
                <FaPlus /> Nueva tarea
              </button>
            </div>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "50px", border: "1px solid #e2e8f0", color: "#94a3b8", textAlign: "center" }}>
              Cargando lista de tareas...
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VISTA 3: MÓDULO CONTENIDO (NUEVO!)        */}
        {/* ========================================== */}
        {vistaActiva === "contenido" && (
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal docente &nbsp;/&nbsp; <span style={{ color: "#115133", fontWeight: "600" }}>Gestión de Contenidos</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Estructura Didáctica de Contenidos</h1>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>Sube separatas, sílabos o material complementario organizado por carpetas bimestrales.</p>
              </div>
              <button style={{ backgroundColor: "#115133", color: "#fff", border: "none", padding: "12px 22px", borderRadius: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <FaUpload /> Subir Archivo Nuevo
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
              {/* Estructura de Bloques */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["I Bimestre", "II Bimestre", "III Bimestre", "IV Bimestre"].map((bim, index) => (
                  <div key={index} style={{ backgroundColor: index === 0 ? "#eefbf3" : "#fff", border: index === 0 ? "1px solid #115133" : "1px solid #e2e8f0", padding: "16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer" }}>
                    <FaFolder style={{ color: index === 0 ? "#115133" : "#cbd5e1", fontSize: "24px" }} />
                    <div>
                      <h4 style={{ margin: 0, color: "#1e293b", fontWeight: "600" }}>{bim}</h4>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>{index === 0 ? "2 archivos públicos" : "0 archivos"}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lista de archivos en la carpeta */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
                <h3 style={{ fontSize: "16px", color: "#115133", marginBottom: "15px", fontWeight: "700" }}>Archivos en I Bimestre</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {archivos.map(file => (
                    <div key={file.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <FaFilePdf style={{ color: "#ef4444", fontSize: "20px" }} />
                        <div>
                          <span style={{ fontWeight: "600", fontSize: "14px", color: "#334155", display: "block" }}>{file.nombre}</span>
                          <span style={{ fontSize: "12px", color: "#94a3b8" }}>{file.tamaño}</span>
                        </div>
                      </div>
                      <button style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }} onMouseEnter={(e) => e.target.style.color="#ef4444"} onMouseLeave={(e) => e.target.style.color="#94a3b8"}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))}
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
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal docente &nbsp;/&nbsp; <span style={{ color: "#115133", fontWeight: "600" }}>Registro de Notas</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Registro Oficial de Calificaciones</h1>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>Matemáticas I - 3ro Secundaria Sección A</p>
              </div>
              <button style={{ backgroundColor: "#115133", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <FaSave style={{ color: "#D4AF37" }} /> Guardar Registro Local
              </button>
            </div>

            {/* Tabla de Calificaciones Estilo Ejecutivo */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#115133", color: "#ffffff" }}>
                    <th style={{ padding: "14px 20px", textAlign: "left" }}>Estudiante</th>
                    <th style={{ padding: "14px 10px", textAlign: "center" }}>Práctica 01</th>
                    <th style={{ padding: "14px 10px", textAlign: "center" }}>Práctica 02</th>
                    <th style={{ padding: "14px 10px", textAlign: "center" }}>Examen Parcial</th>
                    <th style={{ padding: "14px 20px", textAlign: "center", backgroundColor: "#0f432a" }}>Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnosNotas.map((alumno, idx) => (
                    <tr key={alumno.id} style={{ borderBottom: "1px solid #e2e8f0", backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                      <td style={{ padding: "14px 20px", fontWeight: "600", color: "#334155" }}>{alumno.nombre}</td>
                      <td style={{ padding: "14px 10px", textAlign: "center" }}>
                        <input type="number" defaultValue={alumno.n1} style={{ width: "55px", padding: "6px", textAlign: "center", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "center" }}>
                        <input type="number" defaultValue={alumno.n2} style={{ width: "55px", padding: "6px", textAlign: "center", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                      </td>
                      <td style={{ padding: "14px 10px", textAlign: "center" }}>
                        <input type="number" defaultValue={alumno.n3} style={{ width: "55px", padding: "6px", textAlign: "center", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                      </td>
                      <td style={{ padding: "14px 20px", textAlign: "center", fontWeight: "700", color: alumno.promedio >= 11 ? "#115133" : "#ef4444", backgroundColor: idx % 2 === 0 ? "#f1fdf5" : "#e6f9ed" }}>
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
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal docente &nbsp;/&nbsp; <span style={{ color: "#115133", fontWeight: "600" }}>Control de Asistencia</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Control de Asistencia Diario</h1>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>Fecha seleccionada: <strong style={{ color: "#115133" }}>{fechaActual.toLocaleDateString("es-PE")}</strong></p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={{ backgroundColor: "#f1f5f9", color: "#475569", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "600" }}>Marcar todos Asistió</button>
                <button style={{ backgroundColor: "#115133", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600" }}>Enviar Parte Diario</button>
              </div>
            </div>

            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {asistenciaAlumnos.map((al, idx) => (
                <div key={al.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: idx === asistenciaAlumnos.length - 1 ? "none" : "1px solid #e2e8f0", backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                  <span style={{ fontWeight: "600", color: "#334155", fontSize: "15px" }}>{al.nombre}</span>
                  
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => cambiarAsistencia(al.id, "asistio")} style={{ display: "flex", alignItems: "center", gap: "6px", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", backgroundColor: al.estado === "asistio" ? "#dcfce7" : "#f1f5f9", color: al.estado === "asistio" ? "#166534" : "#64748b" }}>
                      <FaUserCheck /> Asistió
                    </button>
                    <button onClick={() => cambiarAsistencia(al.id, "tardanza")} style={{ display: "flex", alignItems: "center", gap: "6px", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", backgroundColor: al.estado === "tardanza" ? "#fef9c3" : "#f1f5f9", color: al.estado === "tardanza" ? "#854d0e" : "#64748b" }}>
                      <FaExclamationTriangle /> Tardanza
                    </button>
                    <button onClick={() => cambiarAsistencia(al.id, "falta")} style={{ display: "flex", alignItems: "center", gap: "6px", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", backgroundColor: al.estado === "falta" ? "#fee2e2" : "#f1f5f9", color: al.estado === "falta" ? "#991b1b" : "#64748b" }}>
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
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "15px" }}>
              Portal docente &nbsp;/&nbsp; <span style={{ color: "#115133", fontWeight: "600" }}>Muro de Comunicados</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", margin: 0 }}>Muro de Avisos e Información</h1>
                <p style={{ color: "#64748b", fontSize: "14px", margin: "5px 0 0 0" }}>Publica notificaciones directas para los padres de familia y el alumnado.</p>
              </div>
              <button style={{ backgroundColor: "#115133", color: "#fff", border: "none", padding: "12px 22px", borderRadius: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                <FaBullhorn style={{ color: "#D4AF37" }} /> Emitir Comunicado
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {comunicados.map(com => (
                <div key={com.id} style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", borderLeft: com.prioridad === "Alta" ? "6px solid #ef4444" : "6px solid #eab308", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
                    <div>
                      <span style={{ backgroundColor: com.prioridad === "Alta" ? "#fee2e2" : "#fef9c3", color: com.prioridad === "Alta" ? "#991b1b" : "#854d0e", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "30px", textTransform: "uppercase", display: "inline-block", marginBottom: "8px" }}>
                        Prioridad {com.prioridad}
                      </span>
                      <h3 style={{ margin: 0, fontSize: "18px", color: "#1e293b", fontWeight: "700" }}>{com.titulo}</h3>
                    </div>
                    <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "500" }}>{com.fecha}</span>
                  </div>
                  <p style={{ color: "#475569", fontSize: "14px", margin: 0, lineHeight: "1.6" }}>{com.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* FORMULARIO MODAL INTERNO: REGISTRO DE NUEVA TAREA */}
      {modalAbierto && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "20px", boxSizing: "border-box" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "550px", borderRadius: "20px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", overflow: "hidden", textAlign: "left" }}>
            <div style={{ backgroundColor: "#115133", padding: "20px 24px", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ display: "inline-block", width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#D4AF37" }}></span>
                  Programar Nueva Actividad
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#a3d9b1" }}>Define los parámetros, plazos y escala de calificación</p>
              </div>
              <button onClick={() => setModalAbierto(false)} style={{ background: "none", border: "none", color: "#ffffff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={manejarGuardarTarea} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Asignar al Curso o Grado:</label>
                <select required value={cursoSeleccionado} onChange={(e) => setCursoSeleccionado(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#334155", outline: "none", backgroundColor: "#f8fafc" }}>
                  <option value="">-- Seleccionar curso disponible --</option>
                  <option value="mat-3a">3ro A - Matemáticas I</option>
                  <option value="com-3b">3ro B - Comunicación</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Tipo de Evaluación:</label>
                  <select value={tipoActividad} onChange={(e) => setTipoActividad(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#334155", outline: "none" }}>
                    <option value="Tarea">Práctica / Tarea</option>
                    <option value="Examen">Examen Parcial</option>
                    <option value="Proyecto">Proyecto Modular</option>
                  </select>
                </div>
                <div style={{ width: "130px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Puntaje Máx:</label>
                  <input type="number" min="1" max="100" value={puntajeMaximo} onChange={(e) => setPuntajeMaximo(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#334155", outline: "none", textAlign: "center" }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Título de la Actividad / Tema:</label>
                <input type="text" required placeholder="Ej. Práctica Calificada 03: Ecuaciones Lineales" value={tituloTarea} onChange={(e) => setTituloTarea(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#334155", outline: "none" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Indicaciones o Descripción de la Entrega:</label>
                <textarea rows="3" required placeholder="Escribe las directrices..." value={descripcionTarea} onChange={(e) => setDescripcionTarea(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#334155", outline: "none", resize: "none", fontFamily: "inherit" }}></textarea>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Fecha y Hora Límite de Recepción:</label>
                <input type="datetime-local" required value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", color: "#334155", outline: "none" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                <button type="button" onClick={() => setModalAbierto(false)} style={{ backgroundColor: "#f1f5f9", color: "#64748b", border: "none", padding: "10px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Cancelar</button>
                <button type="submit" style={{ backgroundColor: "#115133", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <FaSave style={{ color: "#D4AF37" }} /> Publicar actividad
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