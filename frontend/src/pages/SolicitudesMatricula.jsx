import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

import {
  listarSolicitudes,
  registrarSolicitud,
  eliminarSolicitud,
  aprobarSolicitud,
  rechazarSolicitud,
  listarPadres,
  listarEstudiantes,
} from "../services/solicitudMatriculaService";

const ITEMS_POR_PAGINA = 5;

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);

  const [padres, setPadres] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [solicitudSeleccionada,
    setSolicitudSeleccionada] = useState(null);

  const [form, setForm] = useState({
    padre: {
      idPadre: "",
    },
    estudiante: {
      idEstudiante: "",
    },
    observacion: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const solicitudesFiltradas = solicitudes.filter((s) => {
    const valor = `${s.padre?.nombres || ""} ${s.padre?.apellidos || ""} ${s.estudiante?.nombres || ""} ${s.estado || ""}`.toLowerCase();
    return valor.includes(searchTerm.toLowerCase());
  });

  const totalPaginas = Math.ceil(solicitudesFiltradas.length / ITEMS_POR_PAGINA);
  const solicitudesPaginadas = solicitudesFiltradas.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA,
  );

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas || 1);
    }
  }, [paginaActual, totalPaginas]);

  const irAPagina = (n) => {
    if (n < 1 || n > totalPaginas) return;
    setPaginaActual(n);
  };

  const generarPaginas = () => {
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, inicio + 4);
    if (fin - inicio < 4) inicio = Math.max(1, fin - 4);
    const paginas = [];
    for (let i = inicio; i <= fin; i += 1) paginas.push(i);
    return paginas;
  };

  // ===========================
  // CARGAR DATOS
  // ===========================

  const cargarDatos = async () => {
    try {
      const [
        solicitudesRes,
        padresRes,
        estudiantesRes,
      ] = await Promise.all([
        listarSolicitudes(),
        listarPadres(),
        listarEstudiantes(),
      ]);

      setSolicitudes(solicitudesRes.data);
      setPadres(padresRes.data);
      setEstudiantes(estudiantesRes.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // ===========================
  // INPUTS
  // ===========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "idPadre") {

      setForm({
        ...form,
        padre: {
          idPadre: value,
        },
      });

    } else if (name === "idEstudiante") {

      setForm({
        ...form,
        estudiante: {
          idEstudiante: value,
        },
      });

    } else {

      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // ===========================
  // REGISTRAR
  // ===========================

  const guardarSolicitud = async (e) => {

    e.preventDefault();

    try {

      await registrarSolicitud(form);

      limpiarFormulario();

      setMostrarFormulario(false);

      cargarDatos();

    } catch (error) {

      console.error(error);
    }
  };

  // ===========================
  // APROBAR
  // ===========================

  const aprobar = async (id) => {

    try {

      await aprobarSolicitud(id);

      cargarDatos();

    } catch (error) {

      console.error(error);
    }
  };

  // ===========================
  // RECHAZAR
  // ===========================

  const rechazar = async (id) => {

    try {

      await rechazarSolicitud(id);

      cargarDatos();

    } catch (error) {

      console.error(error);
    }
  };

  // ===========================
  // ELIMINAR
  // ===========================

  const eliminar = async (id) => {

    if (
      window.confirm(
        "¿Deseas eliminar esta solicitud?"
      )
    ) {

      try {

        await eliminarSolicitud(id);

        cargarDatos();

      } catch (error) {

        console.error(error);
      }
    }
  };

  // ===========================
  // LIMPIAR
  // ===========================

  const limpiarFormulario = () => {

    setForm({
      padre: {
        idPadre: "",
      },
      estudiante: {
        idEstudiante: "",
      },
      observacion: "",
    });
  };
    return (
    <div style={{ display: "flex", background: "#f8f9fa", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, marginLeft: "270px", padding: "40px", minWidth: "0" }}>

        {/* CABECERA */}
        <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "16px", background: "linear-gradient(135deg,#115133 0%,#1a6b45 100%)", color: "#fff" }}>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <div className="flex-grow-1">
              <h2 className="fw-bold m-0" style={{ fontSize: "26px" }}>Solicitudes de Matrícula</h2>
              <p className="text-white-50 small m-0 mt-1">Gestión de solicitudes de matrícula.</p>
            </div>
            
            <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-center ms-lg-auto" style={{ minWidth: "260px" }}>
              <div className="input-group rounded-4 overflow-hidden" style={{ minWidth: "220px", maxWidth: "260px", width: "100%" }}>
                <span className="input-group-text bg-white border-0 px-3">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="search"
                  className="form-control border-0"
                  placeholder="Buscar solicitud..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPaginaActual(1);
                  }}
                  style={{ backgroundColor: "#eff2f7" }}
                />
              </div>

              <button
                className="btn btn-light fw-bold d-flex align-items-center gap-2"
                style={{ borderRadius: "12px" }}
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
              >
                {mostrarFormulario ? "✕ Cancelar" : <><FaPlus /> Nueva Solicitud</>}
              </button>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        {mostrarFormulario && (
          <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "20px" }}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div style={{ width: "42px", height: "42px", borderRadius: "14px", backgroundColor: "#eef7f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FaFileAlt style={{ color: "#115133" }} />
              </div>
              <div>
                <h5 className="fw-bold mb-0" style={{ color: "#115133" }}>Registrar Solicitud</h5>
                <p className="text-muted small mb-0">Completa los datos para nueva solicitud.</p>
              </div>
            </div>

            <form onSubmit={guardarSolicitud}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Padre</label>
                  <select className="form-select" name="idPadre" value={form.padre.idPadre} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    {padres.map((p) => (
                      <option key={p.idPadre} value={p.idPadre}>
                        {p.nombres} {p.apellidos}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">Estudiante</label>
                  <select className="form-select" name="idEstudiante" value={form.estudiante.idEstudiante} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    {estudiantes.map((e) => (
                      <option key={e.idEstudiante} value={e.idEstudiante}>
                        {e.nombres} {e.apellidoPaterno}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Observación</label>
                  <textarea className="form-control" rows="3" name="observacion" value={form.observacion} onChange={handleChange} />
                </div>
              </div>

              <div className="d-flex gap-2 mt-4 justify-content-end">
                <button type="button" className="btn btn-outline-secondary fw-bold" style={{ borderRadius: "10px" }} onClick={() => setMostrarFormulario(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn text-white fw-bold" style={{ backgroundColor: "#115133", borderRadius: "10px" }}>
                  Registrar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLA */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: "20px", overflow: "hidden", backgroundColor: "#fff" }}>
          <div className="p-4 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div>
              <h5 className="fw-bold m-0 text-dark" style={{ fontSize: "18px" }}>Solicitudes Registradas</h5>
              <p className="text-muted small mb-0">{solicitudesFiltradas.length} resultados de {solicitudes.length} solicitudes</p>
            </div>
            <span className="badge px-3 py-2 fw-bold" style={{ backgroundColor: "#eef7f2", color: "#115133", borderRadius: "8px" }}>
              Total: {solicitudes.length}
            </span>
          </div>

          <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
                <tr className="text-secondary uppercase small fw-bold" style={{ borderBottom: "2px solid #edf2f7" }}>
                  <th className="ps-4 py-3">ID</th>
                  <th>Padre</th>
                  <th>Estudiante</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudesPaginadas.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted fw-semibold">
                      No se encontraron solicitudes con ese filtro.
                    </td>
                  </tr>
                ) : (
                  solicitudesPaginadas.map((s) => (
                    <tr key={s.idSolicitud} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td className="ps-4 py-3">
                        <span className="fw-bold" style={{ color: "#115133" }}>SF-{s.idSolicitud}</span>
                      </td>
                      <td className="fw-semibold">{s.padre?.nombres} {s.padre?.apellidos}</td>
                      <td className="fw-semibold">{s.estudiante?.nombres} {s.estudiante?.apellidoPaterno}</td>
                      <td className="text-muted small">{s.fechaSolicitud}</td>
                      <td>
                        <span className="badge px-3 py-2 fw-bold" style={{
                          backgroundColor: s.estado === "APROBADA" ? "#d4edda" : s.estado === "RECHAZADA" ? "#f8d7da" : "#fff3cd",
                          color: s.estado === "APROBADA" ? "#155724" : s.estado === "RECHAZADA" ? "#721c24" : "#856404",
                          borderRadius: "8px"
                        }}>
                          {s.estado}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: "#d4edda", borderRadius: "10px", width: "44px", height: "44px", padding: "0", color: "#155724" }} title="Aprobar" onClick={() => aprobar(s.idSolicitud)}>
                            <FaCheckCircle />
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: "#fff3cd", borderRadius: "10px", width: "44px", height: "44px", padding: "0", color: "#856404" }} title="Rechazar" onClick={() => rechazar(s.idSolicitud)}>
                            <FaTimesCircle />
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: "#ffebee", borderRadius: "10px", width: "44px", height: "44px", padding: "0", color: "#7a1b1b" }} title="Eliminar" onClick={() => eliminar(s.idSolicitud)}>
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINACION */}
          {totalPaginas > 1 && (
            <div className="d-flex justify-content-between align-items-center px-4 py-3" style={{ borderTop: "1px solid #f1f5f9" }}>
              <span className="text-muted small fw-medium">
                Página {paginaActual} de {totalPaginas}
              </span>
              <div className="d-flex align-items-center gap-2">
                <button
                  onClick={() => irAPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: paginaActual === 1 ? "#f9fafb" : "#fff",
                    color: paginaActual === 1 ? "#d1d5db" : "#115133",
                    cursor: paginaActual === 1 ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FaChevronLeft size={12} />
                </button>
                {generarPaginas().map((n) => (
                  <button
                    key={n}
                    onClick={() => irAPagina(n)}
                    style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      border: n === paginaActual ? "none" : "1px solid #e5e7eb",
                      backgroundColor: n === paginaActual ? "#115133" : "#fff",
                      color: n === paginaActual ? "#fff" : "#374151",
                      fontWeight: n === paginaActual ? "700" : "500",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
                    }}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => irAPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                  style={{
                    width: "36px", height: "36px", borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    backgroundColor: paginaActual === totalPaginas ? "#f9fafb" : "#fff",
                    color: paginaActual === totalPaginas ? "#d1d5db" : "#115133",
                    cursor: paginaActual === totalPaginas ? "not-allowed" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Solicitudes;