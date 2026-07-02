import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaClipboardList,
  FaBook,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaBullhorn,
  FaChartBar,
  FaFilePdf,
  FaChild,
  FaCalendarAlt,
} from "react-icons/fa";
import SidebarPadre from "../components/SidebarPadre";
import { obtenerHijos } from "../services/padreService";
import { listarSolicitudes } from "../services/solicitudMatriculaService";
import { obtenerResumen } from "../services/dashboardService";
import CalendarioDashboard from "../components/CalendarioDashboard";
import "./DashboardPadre.css";

function DashboardPadre() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const idUsuario = usuario?.idUsuario || usuario?.id || null;

  const [hijos, setHijos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [resumen, setResumen] = useState({
    estudiantes: 0,
    cursos: 0,
    matriculas: 0,
    padres: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const promesas = [obtenerResumen(), listarSolicitudes()];
      if (idUsuario) {
        promesas.push(obtenerHijos(idUsuario));
      }
      const resultados = await Promise.allSettled(promesas);

      const resResumen = resultados[0];
      if (resResumen.status === "fulfilled") {
        setResumen(resResumen.value.data);
      }

      const resSolicitudes = resultados[1];
      if (resSolicitudes.status === "fulfilled") {
        setSolicitudes(resSolicitudes.value.data);
      }

      if (resultados.length > 2) {
        const resHijos = resultados[2];
        if (resHijos.status === "fulfilled") {
          setHijos(resHijos.value.data);
        }
      }
    } catch (err) {
      console.log(err);
      setError("Error al cargar los datos del panel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const solicitudesPadre = solicitudes.filter(
    (s) => s.idPadre === idUsuario || s.padre?.idUsuario === idUsuario
  );
  const solicitudesPendientes = solicitudesPadre.filter(
    (s) => s.estado === "PENDIENTE"
  );
  const solicitudesAprobadas = solicitudesPadre.filter(
    (s) => s.estado === "APROBADA"
  );

  const fechaActual = new Date();
  const opcionesFecha = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fechaActual.toLocaleDateString("es-PE", opcionesFecha);

  return (
    <div className="dashboard-padre-layout">
      <SidebarPadre />

      <main className="dashboard-padre-main">
        <div className="dashboard-padre-breadcrumb">
          Portal padre /{" "}
          <span className="dashboard-padre-breadcrumb-active">Resumen</span>
        </div>

        <div className="dashboard-padre-hero">
          <div>
            <span className="dashboard-padre-hero-badge">
              Panel de Padre
            </span>
            <h1>
              Bienvenido, {usuario?.nombre || "Padre de Familia"}
            </h1>
            <p>
              Gestiona la información académica de tus hijos. Consulta notas,
              asistencia y solicitudes de matrícula desde un solo lugar.
            </p>
            <p style={{ marginTop: "10px", fontSize: "13px", opacity: 0.8 }}>
              <FaCalendarAlt style={{ marginRight: "6px" }} />
              {fechaFormateada}
            </p>
          </div>
          <div className="dashboard-padre-hero-icon">
            <FaChartBar />
          </div>
        </div>

        {error && <div className="dashboard-padre-error">{error}</div>}

        <div className="dashboard-padre-stats">
          <div className="dashboard-padre-stat dashboard-padre-stat--highlight">
            <div className="dashboard-padre-stat-icon">
              <FaChild />
            </div>
            <div>
              <span className="dashboard-padre-stat-label">Mis Hijos</span>
              <span className="dashboard-padre-stat-value">
                {loading ? "—" : hijos.length}
              </span>
            </div>
          </div>

          <div className="dashboard-padre-stat">
            <div className="dashboard-padre-stat-icon">
              <FaClipboardList />
            </div>
            <div>
              <span className="dashboard-padre-stat-label">Solicitudes Pendientes</span>
              <span className="dashboard-padre-stat-value">
                {loading ? "—" : solicitudesPendientes.length}
              </span>
            </div>
          </div>

          <div className="dashboard-padre-stat">
            <div className="dashboard-padre-stat-icon">
              <FaCheckCircle />
            </div>
            <div>
              <span className="dashboard-padre-stat-label">Matrículas Aprobadas</span>
              <span className="dashboard-padre-stat-value">
                {loading ? "—" : solicitudesAprobadas.length}
              </span>
            </div>
          </div>

          <div className="dashboard-padre-stat">
            <div className="dashboard-padre-stat-icon">
              <FaBook />
            </div>
            <div>
              <span className="dashboard-padre-stat-label">Cursos Activos</span>
              <span className="dashboard-padre-stat-value">
                {loading ? "—" : resumen.cursos || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-padre-sections">
          <div className="dashboard-padre-card" style={{ "--accent": "#115133" }}>
            <div className="dashboard-padre-card-header">
              <div className="dashboard-padre-card-icon">
                <FaChild />
              </div>
              <div>
                <h2>Mis Hijos</h2>
                <p>Estudiantes vinculados a tu cuenta</p>
              </div>
            </div>
            {hijos.length === 0 ? (
              <div className="dashboard-padre-empty">
                <div className="dashboard-padre-empty-icon">
                  <FaUserGraduate />
                </div>
                <p>No tienes hijos registrados todavía</p>
              </div>
            ) : (
              <ul className="dashboard-padre-lista">
                {hijos.map((hijo) => (
                  <li key={hijo.idEstudiante || hijo.id}>
                    <div className="dashboard-padre-hijo-avatar">
                      <FaUserGraduate />
                    </div>
                    <div className="dashboard-padre-hijo-info">
                      <span className="dashboard-padre-hijo-nombre">
                        {hijo.nombre} {hijo.apellido}
                      </span>
                      <span className="dashboard-padre-hijo-detalle">
                        {hijo.grado ? `Grado: ${hijo.grado}` : "Estudiante activo"}
                      </span>
                    </div>
                    <button
                      className="dashboard-padre-accion-btn"
                      style={{ fontSize: "12px" }}
                    >
                      <FaFilePdf style={{ color: "#D4AF37" }} /> Boleta
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dashboard-padre-card" style={{ "--accent": "#D4AF37" }}>
            <div className="dashboard-padre-card-header">
              <div className="dashboard-padre-card-icon">
                <FaClipboardList />
              </div>
              <div>
                <h2>Solicitudes de Matrícula</h2>
                <p>Estado de tus solicitudes</p>
              </div>
            </div>
            {solicitudesPadre.length === 0 ? (
              <div className="dashboard-padre-empty">
                <div className="dashboard-padre-empty-icon">
                  <FaClipboardList />
                </div>
                <p>No tienes solicitudes registradas</p>
              </div>
            ) : (
              <ul className="dashboard-padre-lista">
                {solicitudesPadre.slice(0, 5).map((sol) => (
                  <li key={sol.idSolicitud || sol.id}>
                    <div
                      className={`dashboard-padre-lista-icon ${
                        sol.estado === "APROBADA"
                          ? "dashboard-padre-lista-icon--green"
                          : sol.estado === "PENDIENTE"
                          ? "dashboard-padre-lista-icon--gold"
                          : "dashboard-padre-lista-icon--red"
                      }`}
                    >
                      {sol.estado === "APROBADA" ? (
                        <FaCheckCircle />
                      ) : sol.estado === "PENDIENTE" ? (
                        <FaClock />
                      ) : (
                        <FaExclamationTriangle />
                      )}
                    </div>
                    <div className="dashboard-padre-lista-text">
                      <span className="dashboard-padre-lista-title">
                        {sol.estudiante?.nombre ||
                          sol.nombreEstudiante ||
                          `Estudiante #${sol.idEstudiante || ""}`}
                      </span>
                      <span className="dashboard-padre-lista-sub">
                        {sol.fechaRegistro
                          ? new Date(sol.fechaRegistro).toLocaleDateString("es-PE")
                          : "Sin fecha"}
                      </span>
                    </div>
                    <span
                      className={`dashboard-padre-badge ${
                        sol.estado === "APROBADA"
                          ? "dashboard-padre-badge--green"
                          : sol.estado === "PENDIENTE"
                          ? "dashboard-padre-badge--yellow"
                          : "dashboard-padre-badge--red"
                      }`}
                    >
                      {sol.estado}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dashboard-padre-card" style={{ "--accent": "#7f1d1d" }}>
            <div className="dashboard-padre-card-header">
              <div className="dashboard-padre-card-icon">
                <FaBullhorn />
              </div>
              <div>
                <h2>Comunicados</h2>
                <p>Avisos y novedades del colegio</p>
              </div>
            </div>
            <div className="dashboard-padre-empty">
              <div className="dashboard-padre-empty-icon">
                <FaBullhorn />
              </div>
              <p>No hay comunicados disponibles</p>
            </div>
          </div>

          <div className="dashboard-padre-card">
            <CalendarioDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPadre;
