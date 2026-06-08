import { useMemo } from "react";
import {
  FaBook,
  FaBullhorn,
  FaChalkboardTeacher,
  FaChartLine,
  FaClipboardCheck,
  FaRegCalendarAlt,
  FaTasks,
  FaUserCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SidebarDocente from "../components/SidebarDocente";

import "./DashboardDocente.css";

function DashboardDocente() {
  const navigate = useNavigate();

  const usuario = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("usuario")) || {};
    } catch {
      return {};
    }
  }, []);

  const secciones = [
    {
      id: "cursos",
      titulo: "Mis cursos",
      descripcion:
        "Acceso rápido a los cursos asignados, grados y grupos que atiendes.",
      icono: <FaChalkboardTeacher />,
      acento: "#0f766e",
      items: ["2° A - Matemática", "3° B - Comunicación", "4° A - Tutoría"],
    },
    {
      id: "contenido",
      titulo: "Contenido",
      descripcion:
        "Materiales, recursos y archivos para compartir con tus estudiantes.",
      icono: <FaBook />,
      acento: "#14532d",
      items: ["Guías PDF", "Presentaciones", "Videos y enlaces"],
    },
    {
      id: "tareas-evaluaciones",
      titulo: "Tareas y evaluaciones",
      descripcion:
        "Programación de actividades, fechas de entrega y evaluaciones pendientes.",
      icono: <FaTasks />,
      acento: "#7c2d12",
      items: ["Tarea de la semana", "Examen parcial", "Rúbricas de revisión"],
    },
    {
      id: "calificaciones",
      titulo: "Calificaciones",
      descripcion:
        "Registro y seguimiento del rendimiento académico por curso y estudiante.",
      icono: <FaChartLine />,
      acento: "#1d4ed8",
      items: ["Promedios", "Notas por competencia", "Alertas de riesgo"],
    },
    {
      id: "asistencia",
      titulo: "Asistencia",
      descripcion:
        "Control diario de asistencia, tardanzas y ausencias justificadas.",
      icono: <FaClipboardCheck />,
      acento: "#be123c",
      items: ["Registro diario", "Reporte semanal", "Incidencias"],
    },
    {
      id: "comunicados",
      titulo: "Comunicados",
      descripcion:
        "Mensajes institucionales, avisos y comunicación con familias.",
      icono: <FaBullhorn />,
      acento: "#b45309",
      items: ["Avisos institucionales", "Mensajes a padres", "Recordatorios"],
    },
  ];

  const resumen = [
    { label: "Cursos activos", value: "3", icon: <FaChalkboardTeacher /> },
    { label: "Tareas pendientes", value: "8", icon: <FaTasks /> },
    { label: "Evaluaciones", value: "5", icon: <FaChartLine /> },
    { label: "Asistencia hoy", value: "94%", icon: <FaUserCheck /> },
  ];

  const irASeccion = (id) => {
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <div className="dashboard-docente-layout">
      <SidebarDocente onNavigate={irASeccion} onLogout={cerrarSesion} />

      <main className="dashboard-docente-main">
        <section className="dashboard-docente-hero">
          <div>
            <p className="dashboard-docente-kicker">Bienvenido, docente</p>
            <h1>{usuario.nombre || "Panel docente"}</h1>
            <p>
              Centraliza aquí tus cursos, contenidos, tareas, calificaciones,
              asistencia y comunicados.
            </p>
          </div>

          <div className="dashboard-docente-hero-card">
            <FaRegCalendarAlt />
            <div>
              <span>Agenda de hoy</span>
              <strong>Revisión de tareas y registro de asistencia</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-docente-stats">
          {resumen.map((item) => (
            <article className="dashboard-docente-stat" key={item.label}>
              <div className="dashboard-docente-stat-icon">{item.icon}</div>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-docente-sections">
          {secciones.map((seccion) => (
            <article
              className="dashboard-docente-card"
              id={seccion.id}
              key={seccion.id}
              style={{ "--accent": seccion.acento }}
            >
              <div className="dashboard-docente-card-header">
                <div className="dashboard-docente-card-icon">
                  {seccion.icono}
                </div>
                <div>
                  <h2>{seccion.titulo}</h2>
                  <p>{seccion.descripcion}</p>
                </div>
              </div>

              <ul className="dashboard-docente-lista">
                {seccion.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default DashboardDocente;
