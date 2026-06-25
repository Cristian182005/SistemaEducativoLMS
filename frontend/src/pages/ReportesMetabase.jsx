import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaSync, FaFilePdf, FaDatabase, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "./ReportesMetabase.css";

const METABASE_URL = "http://localhost:3000";
const API_METABASE = "http://localhost:8081/api/metabase";

const VISTAS_REPORTES = [
  { id: "vw_estudiantes_matricula", nombre: "Estudiantes con Matricula", icono: "👨‍🎓" },
  { id: "vw_calificaciones_detalle", nombre: "Calificaciones Detalladas", icono: "📝" },
  { id: "vw_promedio_estudiantes", nombre: "Promedio por Estudiante", icono: "📊" },
  { id: "vw_rendimiento_cursos", nombre: "Rendimiento por Curso", icono: "📈" },
  { id: "vw_matriculas_por_fecha", nombre: "Matriculas por Fecha", icono: "📅" },
  { id: "vw_distribucion_estudiantes", nombre: "Distribucion por Grado", icono: "🏫" },
  { id: "vw_tareas_por_curso", nombre: "Tareas por Curso", icono: "📋" },
  { id: "vw_solicitudes_matricula", nombre: "Solicitudes de Matricula", icono: "📄" },
  { id: "vw_ranking_estudiantes", nombre: "Ranking de Estudiantes", icono: "🏆" },
  { id: "vw_materiales_cursos", nombre: "Materiales por Curso", icono: "📚" },
];

function ReportesMetabase() {
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeError, setIframeError] = useState(false);
  const [conexionStatus, setConexionStatus] = useState(null);
  const [datosVista, setDatosVista] = useState(null);
  const [vistaSeleccionada, setVistaSeleccionada] = useState(null);
  const [cargando, setcargando] = useState(false);

  useEffect(() => {
    verificarConexion();
  }, []);

  const recargarIframe = () => {
    setIframeError(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  const verificarConexion = async () => {
    try {
      const response = await fetch(`${API_METABASE}/status`);
      const data = await response.json();
      setConexionStatus(data.conectado);
    } catch (error) {
      setConexionStatus(false);
    }
  };

  const cargarDatosVista = async (vistaId) => {
    setcargando(true);
    setVistaSeleccionada(vistaId);
    try {
      const response = await fetch(`${API_METABASE}/datos/${vistaId}`);
      const data = await response.json();
      setDatosVista(data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setDatosVista(null);
    }
    setcargando(false);
  };

  const generarPDF = (vistaId, titulo) => {
    window.open(`${API_METABASE}/pdf/${vistaId}?titulo=${encodeURIComponent(titulo)}`, '_blank');
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <div className="metabase-container">
          {/* Header */}
          <div className="metabase-header">
            <div className="metabase-header-left">
              <h2>Reportes con Metabase</h2>
              <p className="metabase-subtitle">
                Plataforma de Business Intelligence conectada a la base de datos del sistema
              </p>
            </div>
            <div className="metabase-header-actions">
              <button className="btn-metabase-refresh" onClick={recargarIframe}>
                <FaSync /> Actualizar
              </button>
              <a
                href={METABASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-metabase-external"
              >
                <FaExternalLinkAlt /> Abrir Metabase
              </a>
            </div>
          </div>

          {/* Estado de conexion */}
          <div className={`metabase-status ${conexionStatus ? 'conectado' : 'desconectado'}`}>
            {conexionStatus ? (
              <>
                <FaCheckCircle /> Conectado con Metabase
              </>
            ) : (
              <>
                <FaTimesCircle /> Sin conexion con Metabase
              </>
            )}
          </div>

          {/* Reportes PDF desde Metabase */}
          <div className="metabase-reports-section">
            <h3><FaFilePdf /> Generar Reportes PDF con Logo</h3>
            <p className="text-muted">
              Selecciona una vista de Metabase para generar el PDF con el logo del colegio
            </p>
            
            <div className="metabase-cards-grid">
              {VISTAS_REPORTES.map((vista) => (
                <div key={vista.id} className="metabase-card report-card">
                  <div className="metabase-card-icon">{vista.icono}</div>
                  <div className="metabase-card-info">
                    <h4>{vista.nombre}</h4>
                    <p>Vista: {vista.id}</p>
                  </div>
                  <div className="metabase-card-actions">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => cargarDatosVista(vista.id)}
                    >
                      <FaDatabase /> Ver Datos
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => generarPDF(vista.id, vista.nombre)}
                    >
                      <FaFilePdf /> PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vista previa de datos */}
          {vistaSeleccionada && (
            <div className="metabase-preview">
              <h3>Vista Previa: {vistaSeleccionada}</h3>
              {cargando ? (
                <p>Cargando datos...</p>
              ) : datosVista && datosVista.datos ? (
                <>
                  <p>Total de registros: {datosVista.totalFilas}</p>
                  <div className="table-responsive">
                    <table className="table table-striped table-sm">
                      <thead>
                        <tr>
                          {datosVista.columnas?.map((col, idx) => (
                            <th key={idx}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {datosVista.datos.slice(0, 10).map((fila, idx) => (
                          <tr key={idx}>
                            {datosVista.columnas?.map((col, colIdx) => (
                              <td key={colIdx}>{fila[col]}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {datosVista.totalFilas > 10 && (
                    <p className="text-muted">Mostrando 10 de {datosVista.totalFilas} registros</p>
                  )}
                </>
              ) : (
                <p>No hay datos disponibles</p>
              )}
            </div>
          )}

          {/* Instrucciones */}
          <div className="metabase-instructions">
            <h3>Primeros Pasos en Metabase</h3>
            <div className="metabase-steps">
              <div className="metabase-step">
                <span className="step-number">1</span>
                <div>
                  <strong>Accede a Metabase</strong>
                  <p>Haz clic en "Abrir Metabase" o ve a <code>http://localhost:3000</code></p>
                </div>
              </div>
              <div className="metabase-step">
                <span className="step-number">2</span>
                <div>
                  <strong>Crea tu cuenta de administrador</strong>
                  <p>En la primera ejecucion, Metabase te pedira configurar un usuario administrador</p>
                </div>
              </div>
              <div className="metabase-step">
                <span className="step-number">3</span>
                <div>
                  <strong>Conecta la base de datos</strong>
                  <p>Selecciona PostgreSQL y usa los datos de conexion de tu sistema (ya preconfigurados)</p>
                </div>
              </div>
              <div className="metabase-step">
                <span className="step-number">4</span>
                <div>
                  <strong>Explora las vistas</strong>
                  <p>Metabase detectara automaticamente las 12 vistas de reporting creadas para ti</p>
                </div>
              </div>
              <div className="metabase-step">
                <span className="step-number">5</span>
                <div>
                  <strong>Crea dashboards</strong>
                  <p>Combina preguntas y graficos para crear dashboards interactivos personalizados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Iframe embebido */}
          <div className="metabase-embed-section">
            <h3>Metabase Embebido</h3>
            {iframeError ? (
              <div className="metabase-error">
                <p>No se pudo conectar con Metabase. Asegurate de que este ejecutandose en <code>http://localhost:3000</code></p>
                <button className="btn-metabase-refresh" onClick={recargarIframe}>
                  <FaSync /> Reintentar
                </button>
              </div>
            ) : (
              <div className="metabase-iframe-container">
                <iframe
                  key={iframeKey}
                  src={METABASE_URL}
                  title="Metabase Reports"
                  className="metabase-iframe"
                  frameBorder="0"
                  allowTransparency
                  onError={handleIframeError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportesMetabase;
