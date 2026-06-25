import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaUserFriends,
  FaMale,
  FaFemale,
  FaPen,
  FaTrashAlt,
  FaArrowLeft,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaChild,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

import {
  listarPadres,
  guardarPadre,
  actualizarPadre,
  eliminarPadre,
} from "../services/padreService";

import { listarEstudiantes } from "../services/estudianteService";
import { listarVinculos } from "../services/padreEstudianteService";

function Padres() {
  const [padres, setPadres] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [vinculos, setVinculos] = useState([]);
  const [padreSeleccionado, setPadreSeleccionado] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    telefono: "",
    direccion: "",
    tipo: "",
    estudiante: {
      idEstudiante: "",
    },
  });

  const [editando, setEditando] = useState(false);
  const [idPadre, setIdPadre] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const padresFiltrados = padres.filter((padre) => {
    const estudiante = estudiantePorPadre[padre.idPadre];
    const valor = `${padre.nombres} ${padre.apellidos} ${padre.dni} ${estudiante?.nombres || ""} ${estudiante?.apellidoPaterno || ""}`.toLowerCase();
    return valor.includes(searchTerm.toLowerCase());
  });

  const totalPadres = padres.length;
  const totalMadres = padres.filter((p) => p.tipo === "Madre").length;
  const totalPadresVarones = padres.filter((p) => p.tipo === "Padre").length;

  // Mapa idPadre -> estudiante vinculado, construido a partir de la tabla de vínculos
  const estudiantePorPadre = vinculos.reduce((mapa, v) => {
    const id = v.padre?.idPadre;
    if (id) {
      mapa[id] = v.estudiante;
    }
    return mapa;
  }, {});

  const totalConVinculo = padres.filter((p) => estudiantePorPadre[p.idPadre]).length;

  // ============================
  // LISTAR
  // ============================

  const obtenerPadres = async () => {
    try {
      const response = await listarPadres();
      if (response && response.data) {
        setPadres(response.data);
      }
    } catch (error) {
      console.error("Error al obtener padres:", error);
    }
  };

  const obtenerVinculos = async () => {
    try {
      const response = await listarVinculos();
      if (response && response.data) {
        setVinculos(response.data);
      }
    } catch (error) {
      console.error("Error al obtener vínculos:", error);
    }
  };

  const obtenerEstudiantes = async () => {
    try {
      const response = await listarEstudiantes();
      if (response && response.data) {
        setEstudiantes(response.data);
      }
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  useEffect(() => {
    let activo = true;

    const cargarDatosIniciales = async () => {
      try {
        const [resPadres, resEstudiantes, resVinculos] = await Promise.all([
          listarPadres(),
          listarEstudiantes(),
          listarVinculos(),
        ]);

        if (activo) {
          if (resPadres && resPadres.data) setPadres(resPadres.data);
          if (resEstudiantes && resEstudiantes.data) setEstudiantes(resEstudiantes.data);
          if (resVinculos && resVinculos.data) setVinculos(resVinculos.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    cargarDatosIniciales();

    return () => {
      activo = false;
    };
  }, []);

  // ============================
  // INPUTS
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "idEstudiante") {
      setFormData({
        ...formData,
        estudiante: {
          idEstudiante: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // ============================
  // GUARDAR / ACTUALIZAR
  // ============================

  const registrarPadre = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await actualizarPadre(idPadre, formData);
      } else {
        await guardarPadre(formData);
      }

      limpiarFormulario();
      setMostrarFormulario(false);
      await obtenerPadres();
      await obtenerVinculos();
    } catch (error) {
      console.error("Error al guardar padre:", error);
    }
  };

  // ============================
  // EDITAR
  // ============================

  const editarPadre = (padre) => {
    const estudianteVinculado = estudiantePorPadre[padre.idPadre];

    setFormData({
      nombres: padre.nombres || "",
      apellidos: padre.apellidos || "",
      dni: padre.dni || "",
      telefono: padre.telefono || "",
      direccion: padre.direccion || "",
      tipo: padre.tipo || "",
      estudiante: {
        idEstudiante: estudianteVinculado?.idEstudiante || "",
      },
    });

    setIdPadre(padre.idPadre);
    setEditando(true);
    setMostrarFormulario(true);
    setPadreSeleccionado(null);
  };

  // ============================
  // ELIMINAR
  // ============================

  const eliminarRegistro = async (id) => {
    if (window.confirm("⚠️ ¿Seguro que deseas eliminar este registro?")) {
      try {
        await eliminarPadre(id);
        await obtenerPadres();
        await obtenerVinculos();

        if (padreSeleccionado && padreSeleccionado.idPadre === id) {
          setPadreSeleccionado(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ============================
  // LIMPIAR
  // ============================

  const limpiarFormulario = () => {
    setFormData({
      nombres: "",
      apellidos: "",
      dni: "",
      telefono: "",
      direccion: "",
      tipo: "",
      estudiante: {
        idEstudiante: "",
      },
    });

    setEditando(false);
    setIdPadre(null);
  };

  const cerrarFormulario = () => {
    limpiarFormulario();
    setMostrarFormulario(false);
  };

  const nombreEstudiante = (padre) => {
    const estudiante = estudiantePorPadre[padre.idPadre];
    if (estudiante?.nombres) {
      return `${estudiante.nombres} ${estudiante.apellidoPaterno || ""}`.trim();
    }
    return "Sin vincular";
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "270px",
          padding: "40px",
          minWidth: "0",
        }}
      >
        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ backgroundColor: "transparent", paddingLeft: 0 }}>
            <li className="breadcrumb-item">
              <a href="/" style={{ color: "#115133", textDecoration: "none" }}>
                Inicio
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: "#115133" }}>
              Padres
            </li>
          </ol>
        </nav>

        {/* CABECERA */}

        <div
          className="card border-0 shadow-sm p-4 mb-4"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg,#115133 0%,#1a6b45 100%)",
            color: "#fff",
          }}
        >
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <div className="flex-grow-1">
              <h2 className="fw-extrabold m-0" style={{ letterSpacing: "-0.5px", fontSize: "26px" }}>
                Gestión de Padres
              </h2>
              <p className="text-white-50 small m-0 mt-2 fw-medium">
                Administra los padres y madres de familia vinculados a los estudiantes.
              </p>
            </div>

            <div
              className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-center ms-lg-auto"
              style={{ minWidth: "260px" }}
            >
              <div
                className="input-group rounded-4 overflow-hidden"
                style={{ minWidth: "220px", maxWidth: "260px", width: "100%" }}
              >
                <span className="input-group-text bg-white border-0 px-3">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="search"
                  className="form-control border-0"
                  placeholder="Buscar padre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ backgroundColor: "#eff2f7" }}
                />
              </div>

              {!padreSeleccionado ? (
                <button
                  type="button"
                  className="btn btn-light btn-md fw-bold shadow-sm text-success d-flex align-items-center gap-2"
                  style={{ borderRadius: "12px" }}
                  onClick={() => {
                    limpiarFormulario();
                    setEditando(false);
                    setMostrarFormulario(true);
                    setPadreSeleccionado(null);
                  }}
                >
                  <FaPlus />
                  Registrar Padre
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-white btn-md fw-bold d-flex align-items-center gap-2"
                  style={{ borderRadius: "12px", color: "#115133", backgroundColor: "#f4f6f9" }}
                  onClick={() => setPadreSeleccionado(null)}
                >
                  <FaArrowLeft />
                  Regresar al listado
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MÉTRICAS */}

        <div className="row g-3 mb-4">
          <div className="col-sm-6 col-xl-3">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success p-3">
                    <FaUserFriends />
                  </div>
                  <div>
                    <p className="text-uppercase text-muted small mb-1">Total</p>
                    <h4 className="fw-bold mb-0">{totalPadres}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-info bg-opacity-10 text-info p-3">
                    <FaMale />
                  </div>
                  <div>
                    <p className="text-uppercase text-muted small mb-1">Padres</p>
                    <h4 className="fw-bold mb-0">{totalPadresVarones}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-3">
                    <FaFemale />
                  </div>
                  <div>
                    <p className="text-uppercase text-muted small mb-1">Madres</p>
                    <h4 className="fw-bold mb-0">{totalMadres}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-warning bg-opacity-10 text-warning p-3">
                    <FaChild />
                  </div>
                  <div>
                    <p className="text-uppercase text-muted small mb-1">Vinculados</p>
                    <h4 className="fw-bold mb-0">{totalConVinculo}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO (MODAL) */}

        {mostrarFormulario && !padreSeleccionado && (
          <>
            <div
              className="modal-backdrop fade show"
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.45)",
                zIndex: 1040,
              }}
              onClick={cerrarFormulario}
            />

            <div
              className="modal d-block"
              tabIndex={-1}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflowY: "auto",
                zIndex: 1050,
                padding: "3.5rem 1rem",
              }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg mx-auto" style={{ maxWidth: "760px" }}>
                <div
                  className="modal-content rounded-4 overflow-hidden"
                  style={{
                    borderRadius: "24px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.16)",
                    border: "1px solid rgba(17, 85, 51, 0.08)",
                  }}
                >
                  <div
                    className="p-4"
                    style={{
                      background: "linear-gradient(135deg,#115133 0%,#1a6b45 100%)",
                      color: "#fff",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "14px",
                            backgroundColor: "rgba(255,255,255,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaUserFriends className="fs-5" />
                        </div>
                        <div>
                          <h4 className="fw-bold mb-1" style={{ letterSpacing: "-0.5px" }}>
                            {editando ? "Actualizar Padre" : "Registrar Padre"}
                          </h4>
                          <p className="small mb-0" style={{ opacity: 0.9 }}>
                            Completa los datos del padre o madre de familia.
                          </p>
                        </div>
                      </div>

                              <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Cerrar"
                        onClick={cerrarFormulario}
                        style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.35))" }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <form onSubmit={registrarPadre}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Estudiante</label>
                          <select
                            name="idEstudiante"
                            className="form-select"
                            value={formData.estudiante.idEstudiante}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Seleccione estudiante</option>
                            {estudiantes.map((estudiante) => (
                              <option key={estudiante.idEstudiante} value={estudiante.idEstudiante}>
                                {estudiante.nombres} {estudiante.apellidoPaterno}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Tipo</label>
                          <select
                            name="tipo"
                            className="form-select"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Seleccione tipo</option>
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Nombres</label>
                          <input
                            type="text"
                            name="nombres"
                            className="form-control"
                            value={formData.nombres}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Apellidos</label>
                          <input
                            type="text"
                            name="apellidos"
                            className="form-control"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">DNI</label>
                          <input
                            type="text"
                            name="dni"
                            className="form-control"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Teléfono</label>
                          <input
                            type="text"
                            name="telefono"
                            className="form-control"
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-12">
                          <label className="form-label fw-bold">Dirección</label>
                          <input
                            type="text"
                            name="direccion"
                            className="form-control"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex gap-2 mt-4 justify-content-end">
                              <button
                          type="button"
                          className="btn btn-outline-secondary fw-bold"
                          style={{ minWidth: "110px" }}
                          onClick={cerrarFormulario}
                        >
                          Cancelar
                        </button>

                        <button
                          type="submit"
                          className="btn text-white fw-bold"
                          style={{
                            backgroundColor: editando ? "#7a1b1b" : "#115133",
                            minWidth: "130px",
                          }}
                        >
                          {editando ? "Guardar Cambios" : "Registrar"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* LISTADO DE PADRES */}

        {!padreSeleccionado && (
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <div
              className="p-4 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
              style={{
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div>
                <h5 className="fw-bold m-0 text-dark" style={{ fontSize: "18px" }}>
                  Padres y Madres de Familia
                </h5>
                <p className="text-muted small mb-0">
                  {padresFiltrados.length} resultados de {padres.length} registros
                </p>
              </div>

              <div className="d-flex flex-wrap gap-2 align-items-center">
                <span
                  className="badge px-3 py-2 fw-bold"
                  style={{
                    backgroundColor: "#eef7f2",
                    color: "#115133",
                    borderRadius: "8px",
                  }}
                >
                  Total: {padres.length}
                </span>
                <span
                  className="badge px-3 py-2 fw-bold"
                  style={{
                    backgroundColor: "#e6f7ff",
                    color: "#0c5460",
                    borderRadius: "8px",
                  }}
                >
                  Vinculados: {totalConVinculo}
                </span>
              </div>
            </div>

            <div
              className="table-responsive"
              style={{
                maxHeight: "520px",
                overflowY: "auto",
              }}
            >
              <table className="table table-hover align-middle mb-0" style={{ minWidth: "900px" }}>
                <thead
                  style={{
                    backgroundColor: "#f8f9fa",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th className="ps-4 py-3 text-secondary">Padre / Madre</th>
                    <th className="text-secondary">Estudiante</th>
                    <th className="text-secondary">Tipo</th>
                    <th className="text-secondary">DNI</th>
                    <th className="text-secondary">Teléfono</th>
                    <th className="text-secondary">Dirección</th>
                    <th className="text-center text-secondary">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {padresFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted fw-semibold">
                        No se encontraron registros con ese filtro.
                      </td>
                    </tr>
                  ) : (
                    padresFiltrados.map((padre) => (
                      <tr key={padre.idPadre} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <div
                              style={{
                                width: "45px",
                                height: "45px",
                                backgroundColor: padre.tipo === "Madre" ? "#fceef3" : "#e1f7e7",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "bold",
                                color: "#115133",
                              }}
                            >
                              {padre.nombres?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="ms-3">
                              <div className="fw-bold">
                                {padre.nombres} {padre.apellidos}
                              </div>
                              <small className="text-muted">ID: {padre.idPadre}</small>
                            </div>
                          </div>
                        </td>

                        <td>{nombreEstudiante(padre)}</td>

                        <td>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: padre.tipo === "Madre" ? "#fde2ec" : "#d1ecf1",
                              color: "#000",
                            }}
                          >
                            {padre.tipo}
                          </span>
                        </td>

                        <td>{padre.dni}</td>
                        <td>{padre.telefono}</td>
                        <td>{padre.direccion}</td>

                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2 flex-wrap">
                            <button
                              type="button"
                              className="btn btn-sm btn-success d-flex align-items-center justify-content-center gap-2"
                              style={{
                                borderRadius: "10px",
                                minWidth: "100px",
                                padding: "8px 12px",
                              }}
                              onClick={() => setPadreSeleccionado(padre)}
                            >
                              <FaUserFriends />
                              Perfil
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: "#fff3e0",
                                borderRadius: "10px",
                                width: "44px",
                                height: "44px",
                                padding: "0",
                              }}
                              onClick={() => editarPadre(padre)}
                            >
                              <FaPen />
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: "#ffebee",
                                borderRadius: "10px",
                                width: "44px",
                                height: "44px",
                                padding: "0",
                              }}
                              onClick={() => eliminarRegistro(padre.idPadre)}
                            >
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
          </div>
        )}

        {/* PERFIL DEL PADRE */}

        {padreSeleccionado && (
          <div
            className="card border-0 shadow-sm p-4 mb-4"
            style={{
              borderRadius: "20px",
              backgroundColor: "#fff",
            }}
          >
            <div className="row g-4">
              {/* LADO IZQUIERDO */}

              <div
                className="col-md-4 text-center border-end"
                style={{
                  borderColor: "#edf2f7",
                }}
              >
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "50%",
                    margin: "0 auto",
                    backgroundColor: padreSeleccionado.tipo === "Madre" ? "#fceef3" : "#e1f7e7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: "#115133",
                    boxShadow: "0 20px 50px rgba(17, 85, 61, .08)",
                  }}
                >
                  {padreSeleccionado.nombres?.charAt(0)?.toUpperCase()}
                </div>

                <h3 className="fw-bold mt-3 mb-1" style={{ fontSize: "22px" }}>
                  {padreSeleccionado.nombres} {padreSeleccionado.apellidos}
                </h3>

                <p className="small fw-bold text-secondary mb-4">
                  Tipo: <span style={{ color: "#115133" }}>{padreSeleccionado.tipo}</span>
                </p>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-danger fw-bold w-50 py-2"
                    style={{ borderRadius: "8px" }}
                    onClick={() => eliminarRegistro(padreSeleccionado.idPadre)}
                  >
                    🗑️ Eliminar
                  </button>

                  <button
                    className="btn btn-sm text-white fw-bold w-50 py-2"
                    style={{ backgroundColor: "#115133", borderRadius: "8px" }}
                    onClick={() => editarPadre(padreSeleccionado)}
                  >
                    ✏️ Editar
                  </button>
                </div>
              </div>

              {/* LADO DERECHO */}

              <div className="col-md-8 px-4">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                  <h5 className="fw-bold m-0" style={{ color: "#115133" }}>
                    Información del Padre / Madre
                  </h5>

                  <span
                    className="badge"
                    style={{
                      backgroundColor: padreSeleccionado.tipo === "Madre" ? "#fde2ec" : "#d1ecf1",
                      color: "#000",
                    }}
                  >
                    {padreSeleccionado.tipo}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      <FaUserFriends className="me-2" />
                      Nombre completo
                    </div>
                    <div className="col-sm-8 fw-semibold">
                      : {padreSeleccionado.nombres} {padreSeleccionado.apellidos}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      <FaIdCard className="me-2" />
                      DNI
                    </div>
                    <div className="col-sm-8 fw-semibold">: {padreSeleccionado.dni}</div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      <FaPhone className="me-2" />
                      Teléfono
                    </div>
                    <div className="col-sm-8 fw-semibold">: {padreSeleccionado.telefono}</div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      <FaMapMarkerAlt className="me-2" />
                      Dirección
                    </div>
                    <div className="col-sm-8 fw-semibold">: {padreSeleccionado.direccion}</div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      <FaChild className="me-2" />
                      Estudiante vinculado
                    </div>
                    <div className="col-sm-8 fw-semibold">: {nombreEstudiante(padreSeleccionado)}</div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">Identificador</div>
                    <div className="col-sm-8 fw-semibold">: SF-P-{padreSeleccionado.idPadre}</div>
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

export default Padres;