import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaIdCard,
  FaGraduationCap,
  FaPen,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

import {
  listarMatriculas,
  guardarMatricula,
  actualizarMatricula,
  eliminarMatricula
} from "../services/matriculaService";

const ITEMS_POR_PAGINA = 5;

function Matriculas() {

  const [matriculas, setMatriculas] = useState([]);

  const [formData, setFormData] = useState({
    nivel: "",
    grado: "",
    seccion: "",
    dni: "",
    celular: ""
  });

  const [editando, setEditando] = useState(false);

  const [idMatricula, setIdMatricula] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const matriculasFiltradas = matriculas.filter((matricula) => {
    const valor = `${matricula.nivel} ${matricula.grado} ${matricula.seccion} ${matricula.dni}`.toLowerCase();
    return valor.includes(searchTerm.toLowerCase());
  });

  const totalPaginas = Math.ceil(matriculasFiltradas.length / ITEMS_POR_PAGINA);
  const matriculasPaginadas = matriculasFiltradas.slice(
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

  useEffect(() => {
    obtenerMatriculas();
  }, []);

  // LISTAR

  const obtenerMatriculas = async () => {

    const response = await listarMatriculas();

    setMatriculas(response.data);
  };

  // INPUTS

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // GUARDAR

  const registrarMatricula = async (e) => {

    e.preventDefault();

    if (editando) {

      await actualizarMatricula(
        idMatricula,
        formData
      );

    } else {

      await guardarMatricula(formData);
    }

    obtenerMatriculas();

    limpiarFormulario();
  };

  // EDITAR

  const editarMatricula = (matricula) => {

    setFormData({
      nivel: matricula.nivel,
      grado: matricula.grado,
      seccion: matricula.seccion,
      dni: matricula.dni,
      celular: matricula.celular
    });

    setEditando(true);

    setIdMatricula(matricula.idMatricula);
  };

  // ELIMINAR

  const eliminarRegistro = async (id) => {

    if (window.confirm("¿Eliminar matrícula?")) {

      await eliminarMatricula(id);

      obtenerMatriculas();
    }
  };

  // LIMPIAR

  const limpiarFormulario = () => {

    setFormData({
      nivel: "",
      grado: "",
      seccion: "",
      dni: "",
      celular: ""
    });

    setEditando(false);

    setIdMatricula(null);
  };

  return (
    <div style={{ display: "flex", background: "#f8f9fa", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, marginLeft: "270px", padding: "40px", minWidth: "0" }}>
        
        {/* CABECERA */}
        <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #115133 0%, #1a6b45 100%)", color: "#fff" }}>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <div className="flex-grow-1">
              <h2 className="fw-bold m-0" style={{ fontSize: "26px" }}>Gestión de Matrículas</h2>
              <p className="text-white-50 small m-0 mt-1">Administra las matrículas de los estudiantes.</p>
            </div>
            
            <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-center ms-lg-auto" style={{ minWidth: "260px" }}>
              <div className="input-group rounded-4 overflow-hidden" style={{ minWidth: "220px", maxWidth: "260px", width: "100%" }}>
                <span className="input-group-text bg-white border-0 px-3">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="search"
                  className="form-control border-0"
                  placeholder="Buscar matrícula..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPaginaActual(1);
                  }}
                  style={{ backgroundColor: "#eff2f7" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "20px" }}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div style={{ width: "42px", height: "42px", borderRadius: "14px", backgroundColor: "#eef7f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaGraduationCap style={{ color: "#115133" }} />
            </div>
            <div>
              <h5 className="fw-bold mb-0" style={{ color: "#115133" }}>
                {editando ? "Actualizar Matrícula" : "Registrar Matrícula"}
              </h5>
              <p className="text-muted small mb-0">Completa los datos de la matrícula.</p>
            </div>
          </div>

          <form onSubmit={registrarMatricula}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Nivel</label>
                <select name="nivel" className="form-select" value={formData.nivel} onChange={handleChange} required>
                  <option value="">Seleccione nivel</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold">Grado</label>
                <input type="text" name="grado" placeholder="Grado" className="form-control" value={formData.grado} onChange={handleChange} required />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold">Sección</label>
                <input type="text" name="seccion" placeholder="Sección" className="form-control" value={formData.seccion} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">DNI</label>
                <input type="text" name="dni" placeholder="DNI" className="form-control" value={formData.dni} onChange={handleChange} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold">Celular</label>
                <input type="text" name="celular" placeholder="Celular" className="form-control" value={formData.celular} onChange={handleChange} required />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4 justify-content-end">
              <button type="button" className="btn btn-outline-secondary fw-bold" style={{ borderRadius: "10px", minWidth: "110px" }} onClick={limpiarFormulario}>
                Limpiar
              </button>
              <button type="submit" className={`btn text-white fw-bold ${editando ? "btn-warning" : "btn-success"}`} style={{ borderRadius: "10px", minWidth: "130px" }}>
                {editando ? "Actualizar" : "Registrar"}
              </button>
            </div>
          </form>
        </div>

        {/* TABLA */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: "20px", overflow: "hidden", backgroundColor: "#fff" }}>
          <div className="p-4 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div>
              <h5 className="fw-bold m-0 text-dark" style={{ fontSize: "18px" }}>Matrículas Registradas</h5>
              <p className="text-muted small mb-0">{matriculasFiltradas.length} resultados de {matriculas.length} matrículas</p>
            </div>
            <span className="badge px-3 py-2 fw-bold" style={{ backgroundColor: "#eef7f2", color: "#115133", borderRadius: "8px" }}>
              Total: {matriculas.length}
            </span>
          </div>

          <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
                <tr className="text-secondary uppercase small fw-bold" style={{ borderBottom: "2px solid #edf2f7" }}>
                  <th className="ps-4 py-3">ID</th>
                  <th>Nivel</th>
                  <th>Grado</th>
                  <th>Sección</th>
                  <th>DNI</th>
                  <th>Celular</th>
                  <th>Fecha</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {matriculasPaginadas.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted fw-semibold">
                      No se encontraron matrículas con ese filtro.
                    </td>
                  </tr>
                ) : (
                  matriculasPaginadas.map((matricula) => (
                    <tr key={matricula.idMatricula} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td className="ps-4 py-3">
                        <span className="fw-bold" style={{ color: "#115133" }}>SF-{matricula.idMatricula}</span>
                      </td>
                      <td>
                        <span className="badge px-3 py-2 fw-bold" style={{ backgroundColor: "#eef7f2", color: "#115133", borderRadius: "8px" }}>
                          {matricula.nivel}
                        </span>
                      </td>
                      <td className="fw-semibold">{matricula.grado}</td>
                      <td>{matricula.seccion}</td>
                      <td className="fw-semibold">{matricula.dni}</td>
                      <td>{matricula.celular}</td>
                      <td className="text-muted small">{matricula.fechaMatricula}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: "#fff3e0", borderRadius: "10px", width: "44px", height: "44px", padding: "0" }} onClick={() => editarMatricula(matricula)}>
                            <FaPen />
                          </button>
                          <button className="btn btn-sm d-flex align-items-center justify-content-center" style={{ backgroundColor: "#ffebee", borderRadius: "10px", width: "44px", height: "44px", padding: "0" }} onClick={() => eliminarRegistro(matricula.idMatricula)}>
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

export default Matriculas;