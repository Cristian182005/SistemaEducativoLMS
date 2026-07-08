import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  listarCursos,
  guardarCurso,
  actualizarCurso,
  eliminarCurso,
} from "../services/cursoService";
import { listarDocentes } from "../services/docenteService";
import "./cursos.css";

// ── Ícono visual del curso basado en la inicial del nombre ──
const CursoIcono = ({ nombre }) => {
  const emojis = ["📚", "🎨", "🔬", "🧮", "🌍", "🎵", "💻", "⚽", "🏛️", "✏️"];
  const idx = nombre ? nombre.charCodeAt(0) % emojis.length : 0;
  return <span>{emojis[idx]}</span>;
};

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [vista, setVista] = useState("listado");
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [idCurso, setIdCurso] = useState(null);
  const [buscar, setBuscar] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    docente: { idDocente: "" },
  });

  // ── Estadísticas derivadas ──
  const totalCursos   = cursos.length;
  const cursosFiltrados = cursos.filter((c) => {
    const texto = `${c.nombre} ${c.descripcion} ${c.docente?.nombres || ""} ${c.docente?.apellidos || ""}`.toLowerCase();
    return texto.includes(buscar.toLowerCase());
  });
  const totalConDocente = cursos.filter((c) => c.docente?.idDocente).length;
  const totalSinDocente = cursos.filter((c) => !c.docente?.idDocente).length;

  // ── Paginación ──
  const ITEMS_POR_PAGINA = 10;
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = Math.ceil(cursosFiltrados.length / ITEMS_POR_PAGINA);
  const cursosPaginados = cursosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  // ── Carga inicial ──
  useEffect(() => {
    cargarDatos();
  }, []);

  // Reset página al buscar
  useEffect(() => {
    setPaginaActual(1);
  }, [buscar]);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [resCursos, resDocentes] = await Promise.all([
        listarCursos(),
        listarDocentes(),
      ]);
      setCursos(resCursos.data);
      setDocentes(resDocentes.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setCargando(false);
    }
  };

  // ── Inputs ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idDocente") {
      setForm({ ...form, docente: { idDocente: Number(value) } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ── Guardar / Actualizar (lógica original intacta) ──
  const registrarCurso = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarCurso(idCurso, form);
      } else {
        await guardarCurso(form);
      }
      limpiarFormulario();
      setVista("listado");
      await cargarDatos();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // ── Editar ──
  const editarCurso = (curso) => {
    setForm({
      nombre: curso.nombre || "",
      descripcion: curso.descripcion || "",
      docente: { idDocente: curso.docente?.idDocente || "" },
    });
    setIdCurso(curso.idCurso);
    setEditando(true);
    setVista("formulario");
  };

  // ── Ver perfil ──
  const verPerfil = (curso) => {
    setCursoSeleccionado(curso);
    setVista("perfil");
  };

  // ── Eliminar (lógica original intacta) ──
  const eliminarRegistro = async (id) => {
    if (!window.confirm("¿Eliminar este curso?")) return;
    try {
      await eliminarCurso(id);
      if (cursoSeleccionado?.idCurso === id) {
        setCursoSeleccionado(null);
        setVista("listado");
      }
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // ── Limpiar ──
  const limpiarFormulario = () => {
    setForm({ nombre: "", descripcion: "", docente: { idDocente: "" } });
    setEditando(false);
    setIdCurso(null);
  };

  const irAFormulario = () => {
    limpiarFormulario();
    setVista("formulario");
  };

  // ── Nombre completo del docente ──
  const nombreDocente = (curso) => {
    if (!curso.docente) return "Sin asignar";
    return `${curso.docente.nombres || ""} ${curso.docente.apellidos || ""}`.trim() || "Sin asignar";
  };

  return (
    <div className="cursos-container">
      <Sidebar />

      <div className="cursos-main">
        {/* ── HEADER ── */}
        <div className="cursos-header">
          <div className="cursos-header-info">
            <h2>Módulo de Cursos</h2>
            <p>Gestión Académica — C.E.P. La Sagrada Familia</p>
          </div>
          <div className="cursos-header-btn">
            {vista === "listado" && (
              <button className="btn-cursos-primary" onClick={irAFormulario}>
                + Registrar Nuevo Curso
              </button>
            )}
            {vista === "formulario" && (
              <button
                className="btn-cursos-cancel"
                onClick={() => { limpiarFormulario(); setVista("listado"); }}
              >
                Cancelar y Volver
              </button>
            )}
            {vista === "perfil" && (
              <button
                className="btn-cursos-back"
                onClick={() => { setCursoSeleccionado(null); setVista("listado"); }}
              >
                Regresar al Listado
              </button>
            )}
          </div>
        </div>

        {/* ── ESTADÍSTICAS ── */}
        <div className="cursos-stats-grid">
          <div className="cursos-stat-card">
            <div className="cursos-stat-icon green">📚</div>
            <div className="cursos-stat-info">
              <p>Total Cursos</p>
              <h3>{totalCursos}</h3>
            </div>
          </div>
          <div className="cursos-stat-card">
            <div className="cursos-stat-icon blue">👨‍🏫</div>
            <div className="cursos-stat-info">
              <p>Con Docente</p>
              <h3>{totalConDocente}</h3>
            </div>
          </div>
          <div className="cursos-stat-card">
            <div className="cursos-stat-icon red">⚠️</div>
            <div className="cursos-stat-info">
              <p>Sin Docente</p>
              <h3>{totalSinDocente}</h3>
            </div>
          </div>
          <div className="cursos-stat-card">
            <div className="cursos-stat-icon yellow">🏫</div>
            <div className="cursos-stat-info">
              <p>Docentes Activos</p>
              <h3>{docentes.length}</h3>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            VISTA 1: LISTADO
        ═══════════════════════════════════════ */}
        {vista === "listado" && (
          <div className="cursos-card">
            <div className="cursos-card-header">
              <h5>Lista de Cursos</h5>
              <span className="cursos-badge">Total: {totalCursos} Cursos</span>
            </div>

            {/* Buscador */}
            <div className="cursos-search">
              <input
                type="text"
                placeholder="Buscar por nombre, descripción o docente..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setPaginaActual(1)}
              />
              <button className="btn-cursos-search" onClick={() => setPaginaActual(1)}>
                Buscar
              </button>
              {buscar && (
                <button className="btn-cursos-clear" onClick={() => setBuscar("")}>
                  Limpiar
                </button>
              )}
            </div>

            {/* Contenido */}
            {cargando ? (
              <div className="cursos-loading">
                <div className="cursos-loading-spinner" />
                <p>Cargando cursos...</p>
              </div>
            ) : cursosFiltrados.length === 0 ? (
              <div className="cursos-empty">
                <div className="cursos-empty-icon">📭</div>
                <h5>No se encontraron cursos</h5>
                <p>{buscar ? "Intenta con otros términos de búsqueda" : "Registra el primer curso"}</p>
              </div>
            ) : (
              <>
                <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
                  <table className="cursos-table">
                    <thead>
                      <tr>
                        <th>Curso</th>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Docente</th>
                        <th style={{ textAlign: "center" }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cursosPaginados.map((curso) => (
                        <tr key={curso.idCurso}>
                          {/* Nombre del curso con ícono */}
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div className="curso-icon">
                                <CursoIcono nombre={curso.nombre} />
                              </div>
                              <div>
                                <p style={{ margin: 0, fontWeight: 600, color: "#0f172a", fontSize: "14px" }}>
                                  {curso.nombre}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* ID */}
                          <td>
                            <span className="badge-curso-id">#{curso.idCurso}</span>
                          </td>

                          {/* Descripción */}
                          <td>
                            <span style={{ color: "#64748b", fontSize: "13px" }}>
                              {curso.descripcion || "—"}
                            </span>
                          </td>

                          {/* Docente */}
                          <td>
                            <span className="badge-docente">{nombreDocente(curso)}</span>
                          </td>

                          {/* Acciones */}
                          <td>
                            <div className="cursos-acciones-btn">
                              <button
                                className="btn-curso-profile"
                                onClick={() => verPerfil(curso)}
                              >
                                Ver Detalle
                              </button>
                              <button
                                className="btn-curso-edit"
                                onClick={() => editarCurso(curso)}
                                title="Editar"
                              >
                                Editar
                              </button>
                              <button
                                className="btn-curso-delete"
                                onClick={() => eliminarRegistro(curso.idCurso)}
                                title="Eliminar"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPaginas > 1 && (
                  <div className="cursos-pagination">
                    <span className="cursos-pagination-info">
                      Página {paginaActual} de {totalPaginas}
                    </span>
                    <div className="cursos-pagination-btns">
                      <button
                        className="btn-cursos-page"
                        disabled={paginaActual === 1}
                        onClick={() => setPaginaActual(1)}
                      >
                        Primera
                      </button>
                      <button
                        className="btn-cursos-page"
                        disabled={paginaActual === 1}
                        onClick={() => setPaginaActual(paginaActual - 1)}
                      >
                        Anterior
                      </button>
                      {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                        let pagina;
                        if (totalPaginas <= 5) {
                          pagina = i + 1;
                        } else if (paginaActual < 3) {
                          pagina = i + 1;
                        } else if (paginaActual >= totalPaginas - 2) {
                          pagina = totalPaginas - 4 + i;
                        } else {
                          pagina = paginaActual - 2 + i;
                        }
                        return (
                          <button
                            key={pagina}
                            className={`btn-cursos-page ${paginaActual === pagina ? "active" : ""}`}
                            onClick={() => setPaginaActual(pagina)}
                          >
                            {pagina}
                          </button>
                        );
                      })}
                      <button
                        className="btn-cursos-page"
                        disabled={paginaActual === totalPaginas}
                        onClick={() => setPaginaActual(paginaActual + 1)}
                      >
                        Siguiente
                      </button>
                      <button
                        className="btn-cursos-page"
                        disabled={paginaActual === totalPaginas}
                        onClick={() => setPaginaActual(totalPaginas)}
                      >
                        Última
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════
            VISTA 2: FORMULARIO
        ═══════════════════════════════════════ */}
        {vista === "formulario" && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cursos-form-card">
                <div className={`cursos-form-accent ${editando ? "editing" : ""}`} />
                <div className="cursos-form-body">
                  <h4 className="cursos-form-title">
                    {editando ? "Actualizar Datos del Curso" : "Registrar Nuevo Curso"}
                  </h4>

                  <form onSubmit={registrarCurso}>
                    <div className="row g-3">
                      {/* Docente */}
                      <div className="col-md-6">
                        <label className="cursos-form-label">Docente</label>
                        <select
                          name="idDocente"
                          className="cursos-form-select"
                          value={form.docente.idDocente}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione un docente</option>
                          {docentes.map((docente) => (
                            <option key={docente.idDocente} value={docente.idDocente}>
                              {docente.nombres} {docente.apellidos}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Nombre del curso */}
                      <div className="col-md-6">
                        <label className="cursos-form-label">Nombre del Curso</label>
                        <input
                          type="text"
                          name="nombre"
                          className="cursos-form-input"
                          placeholder="Ej: Matemáticas, Comunicación..."
                          value={form.nombre}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Descripción */}
                      <div className="col-md-12">
                        <label className="cursos-form-label">Descripción</label>
                        <textarea
                          name="descripcion"
                          className="cursos-form-textarea"
                          placeholder="Descripción del curso..."
                          value={form.descripcion}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="cursos-form-actions">
                      <button type="button" className="btn-cursos-form-clear" onClick={limpiarFormulario}>
                        Limpiar
                      </button>
                      <button type="submit" className={`btn-cursos-form-submit ${editando ? "editing" : ""}`}>
                        {editando ? "Guardar Cambios" : "Confirmar Registro"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════
            VISTA 3: PERFIL / DETALLE
        ═══════════════════════════════════════ */}
        {vista === "perfil" && cursoSeleccionado && (
          <div className="cursos-profile-card">
            <div className="row g-0">
              {/* Lado izquierdo */}
              <div className="col-md-4 border-end" style={{ borderColor: "#f1f5f9" }}>
                <div className="cursos-profile-header">
                  <div className="cursos-profile-icon">
                    <CursoIcono nombre={cursoSeleccionado.nombre} />
                  </div>
                  <h3 className="cursos-profile-name">{cursoSeleccionado.nombre}</h3>
                  <p className="cursos-profile-id">ID: #{cursoSeleccionado.idCurso}</p>
                  <p className="cursos-profile-docente">
                    Docente: {nombreDocente(cursoSeleccionado)}
                  </p>
                  <div className="cursos-profile-actions">
                    <button
                      className="btn-cursos-profile-edit"
                      onClick={() => editarCurso(cursoSeleccionado)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-cursos-profile-delete"
                      onClick={() => eliminarRegistro(cursoSeleccionado.idCurso)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>

              {/* Lado derecho */}
              <div className="col-md-8">
                <div className="cursos-profile-body">
                  {/* Información del curso */}
                  <div className="cursos-profile-section">
                    <h5 className="cursos-profile-section-title">Información del Curso</h5>
                    <div className="cursos-profile-row">
                      <span className="cursos-profile-label">Nombre</span>
                      <span className="cursos-profile-value">: {cursoSeleccionado.nombre}</span>
                    </div>
                    <div className="cursos-profile-row">
                      <span className="cursos-profile-label">Descripción</span>
                      <span className="cursos-profile-value">: {cursoSeleccionado.descripcion || "No registrada"}</span>
                    </div>
                    <div className="cursos-profile-row">
                      <span className="cursos-profile-label">Identificador</span>
                      <span className="cursos-profile-value">: #{cursoSeleccionado.idCurso}</span>
                    </div>
                  </div>

                  {/* Información del docente */}
                  <div className="cursos-profile-section">
                    <h5 className="cursos-profile-section-title">Docente Asignado</h5>
                    {cursoSeleccionado.docente ? (
                      <>
                        <div className="cursos-profile-row">
                          <span className="cursos-profile-label">Nombres</span>
                          <span className="cursos-profile-value">: {cursoSeleccionado.docente.nombres}</span>
                        </div>
                        <div className="cursos-profile-row">
                          <span className="cursos-profile-label">Apellidos</span>
                          <span className="cursos-profile-value">: {cursoSeleccionado.docente.apellidos}</span>
                        </div>
                        <div className="cursos-profile-row">
                          <span className="cursos-profile-label">ID Docente</span>
                          <span className="cursos-profile-value">: #{cursoSeleccionado.docente.idDocente}</span>
                        </div>
                      </>
                    ) : (
                      <p style={{ color: "#94a3b8", fontSize: "14px", fontStyle: "italic" }}>
                        No hay docente asignado a este curso.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cursos;