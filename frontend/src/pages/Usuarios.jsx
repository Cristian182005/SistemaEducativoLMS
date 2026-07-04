import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaCheckCircle, FaTimesCircle, FaUserShield, FaUserTie, FaUsers, FaPen, FaTrashAlt, FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import {
  listarUsuarios,
  guardarUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuarioService";

const ITEMS_POR_PAGINA = 5;

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    rol: "PADRE",
    estado: "ACTIVO",
  });

  const [editando, setEditando] = useState(false);

  const [idUsuario, setIdUsuario] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const valor = `${usuario.nombre} ${usuario.correo}`.toLowerCase();
    return valor.includes(searchTerm.toLowerCase());
  });

  const totalPaginas = Math.ceil(usuariosFiltrados.length / ITEMS_POR_PAGINA);

  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  const inicioDe = usuariosFiltrados.length === 0 ? 0 : (paginaActual - 1) * ITEMS_POR_PAGINA + 1;
  const finDe = Math.min(paginaActual * ITEMS_POR_PAGINA, usuariosFiltrados.length);

  const totalUsuarios = usuarios.length;
  const usuariosActivos = usuarios.filter((u) => u.estado === "ACTIVO").length;
  const usuariosInactivos = usuarios.filter((u) => u.estado !== "ACTIVO").length;
  const docentes = usuarios.filter((u) => u.rol === "DOCENTE").length;
  const padres = usuarios.filter((u) => u.rol === "PADRE").length;

  // ============================
  // LISTAR
  // ============================

  const obtenerUsuarios = async () => {
    try {
      const response = await listarUsuarios();

      if (response && response.data) {
        setUsuarios(response.data);
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    let activo = true;

    const cargarDatosIniciales = async () => {
      try {
        const response = await listarUsuarios();

        if (activo && response && response.data) {
          setUsuarios(response.data);
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

  // Reset pagina al buscar
  useEffect(() => {
    setPaginaActual(1);
  }, [searchTerm]);

  // ============================
  // PAGINACION
  // ============================

  const irAPagina = (n) => {
    if (n < 1 || n > totalPaginas) return;
    setPaginaActual(n);
  };

  const generarPaginas = () => {
    let inicio = Math.max(1, paginaActual - 2);
    let fin = Math.min(totalPaginas, inicio + 4);
    if (fin - inicio < 4) inicio = Math.max(1, fin - 4);
    const paginas = [];
    for (let i = inicio; i <= fin; i++) paginas.push(i);
    return paginas;
  };

  // ============================
  // INPUTS
  // ============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // GUARDAR / ACTUALIZAR
  // ============================

  const registrarUsuario = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await actualizarUsuario(idUsuario, form);
      } else {
        await guardarUsuario(form);
      }

      limpiarFormulario();

      setMostrarFormulario(false);

      await obtenerUsuarios();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  // ============================
  // EDITAR
  // ============================

  const editarUsuario = (usuario) => {
    setForm({
      nombre: usuario.nombre || "",

      correo: usuario.correo || "",

      password: usuario.password || "",

      rol: usuario.rol || "PADRE",

      estado: usuario.estado || "ACTIVO",
    });

    setIdUsuario(usuario.idUsuario);

    setEditando(true);

    setMostrarFormulario(true);

    setUsuarioSeleccionado(null);
  };

  // ============================
  // ELIMINAR
  // ============================

  const eliminarRegistro = async (id) => {
    if (window.confirm("⚠️ ¿Seguro que deseas eliminar este usuario?")) {
      try {
        await eliminarUsuario(id);

        await obtenerUsuarios();

        if (usuarioSeleccionado && usuarioSeleccionado.idUsuario === id) {
          setUsuarioSeleccionado(null);
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
    setForm({
      nombre: "",
      correo: "",
      password: "",
      rol: "PADRE",
      estado: "ACTIVO",
    });

    setEditando(false);

    setIdUsuario(null);
  };

  // ============================
  // DETECTAR GÉNERO
  // ============================

  const esMujer = (nombre) => {
    if (!nombre) return false;

    const primerNombre = nombre.trim().split(" ")[0].toLowerCase();

    const excepcionesFemeninas = [
      "isabel",
      "beatriz",
      "carmen",
      "raquel",
      "ines",
      "rosario",
      "pilar",
      "luz",
      "mercedes",
      "rocio",
      "miriam",
      "ruth",
    ];

    const excepcionesMasculinas = ["luca", "lucas", "josue", "misael"];

    if (excepcionesFemeninas.includes(primerNombre)) return true;

    if (excepcionesMasculinas.includes(primerNombre)) return false;

    return primerNombre.endsWith("a");
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
          width: "calc(100vw - 270px)",
          overflowX: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ backgroundColor: "transparent", paddingLeft: 0 }}>
            <li className="breadcrumb-item"><a href="/" style={{ color: "#115133", textDecoration: "none" }}>Inicio</a></li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: "#115133" }}>Usuarios</li>
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
                Gestión de Usuarios
              </h2>
              <p className="text-white-50 small m-0 mt-2 fw-medium">
                Administra accesos, roles y estados del sistema.
              </p>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 align-items-stretch align-items-sm-center ms-lg-auto" style={{ minWidth: "260px" }}>
              <div className="input-group rounded-4 overflow-hidden" style={{ minWidth: "220px", maxWidth: "260px", width: "100%" }}>
                <span className="input-group-text bg-white border-0 px-3">
                  <FaSearch className="text-muted" />
                </span>
                <input
                  type="search"
                  className="form-control border-0"
                  placeholder="Buscar usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ backgroundColor: "#eff2f7" }}
                />
              </div>

              {!usuarioSeleccionado ? (
                <button
                  className="btn btn-light btn-md fw-bold shadow-sm text-success d-flex align-items-center gap-2"
                  style={{ borderRadius: "12px" }}
                  onClick={() => {
                    limpiarFormulario();
                    setEditando(false);
                    setMostrarFormulario(true);
                    setUsuarioSeleccionado(null);
                  }}
                >
                  <FaPlus />
                  Registrar Usuario
                </button>
              ) : (
                <button
                  className="btn btn-white btn-md fw-bold d-flex align-items-center gap-2"
                  style={{ borderRadius: "12px", color: "#115133", backgroundColor: "#f4f6f9" }}
                  onClick={() => setUsuarioSeleccionado(null)}
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
          <div className="col-sm-6 col-xl-2">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success p-3">
                    <FaUserShield />
                  </div>

                  <div>
                    <p className="text-uppercase text-muted small mb-1">Usuarios</p>
                    <h4 className="fw-bold mb-0">{totalUsuarios}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-2">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-3">
                    <FaCheckCircle />
                  </div>

                  <div>
                    <p className="text-uppercase text-muted small mb-1">Activos</p>
                    <h4 className="fw-bold mb-0">{usuariosActivos}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-2">
            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "20px" }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-3">
                    <FaTimesCircle />
                  </div>

                  <div>
                    <p className="text-uppercase text-muted small mb-1">Inactivos</p>
                    <h4 className="fw-bold mb-0">{usuariosInactivos}</h4>
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
                    <FaUserTie />
                  </div>

                  <div>
                    <p className="text-uppercase text-muted small mb-1">Docentes</p>
                    <h4 className="fw-bold mb-0">{docentes}</h4>
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
                    <FaUsers />
                  </div>

                  <div>
                    <p className="text-uppercase text-muted small mb-1">Padres</p>
                    <h4 className="fw-bold mb-0">{padres}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}

        {mostrarFormulario && !usuarioSeleccionado && (
          <>
            <div
              className="modal-backdrop fade show"
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.45)",
                zIndex: 1040,
              }}
              onClick={() => setMostrarFormulario(false)}
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
                          <FaUserShield className="fs-5" />
                        </div>
                        <div>
                          <h4 className="fw-bold mb-1" style={{ letterSpacing: "-0.5px" }}>
                            {editando ? "Actualizar Usuario" : "Registrar Usuario"}
                          </h4>
                          <p className="small mb-0" style={{ opacity: 0.9 }}>
                            Completa los datos para crear un nuevo usuario en el sistema.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Cerrar"
                        onClick={() => setMostrarFormulario(false)}
                        style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.35))" }}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-white">
                    <form onSubmit={registrarUsuario}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold">Nombre</label>
                          <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Correo</label>
                          <input
                            type="email"
                            name="correo"
                            className="form-control"
                            value={form.correo}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold">Contraseña</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-3">
                          <label className="form-label fw-bold">Rol</label>
                          <select
                            name="rol"
                            className="form-select"
                            value={form.rol}
                            onChange={handleChange}
                          >
                            <option value="DOCENTE">DOCENTE</option>
                            <option value="PADRE">PADRE</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <label className="form-label fw-bold">Estado</label>
                          <select
                            name="estado"
                            className="form-select"
                            value={form.estado}
                            onChange={handleChange}
                          >
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                          </select>
                        </div>
                      </div>

                      <div className="d-flex gap-2 mt-4 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-outline-secondary fw-bold"
                          style={{ minWidth: "110px" }}
                          onClick={() => setMostrarFormulario(false)}
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

        {/* AQUÍ CONTINÚA LA TABLA Y PERFIL */}
        {/* LISTADO DE USUARIOS */}

        {!usuarioSeleccionado && (
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
                  Usuarios del Sistema
                </h5>
                <p className="text-muted small mb-0">
                  {usuariosFiltrados.length} resultados de {usuarios.length} usuarios
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
                  Total: {usuarios.length}
                </span>
                <span
                  className="badge px-3 py-2 fw-bold"
                  style={{
                    backgroundColor: "#e6f7ff",
                    color: "#0c5460",
                    borderRadius: "8px",
                  }}
                >
                  Activos: {usuariosActivos}
                </span>
              </div>
            </div>

            <div
              className="table-responsive"
              style={{
                overflowX: "auto",
              }}
            >
              <table className="table align-middle mb-0" style={{ minWidth: "780px" }}>
                <thead
                  style={{
                    backgroundColor: "#f8f9fa",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <tr>
                    <th className="ps-4 py-3 text-secondary">Usuario</th>
                    <th className="text-secondary">Correo</th>
                    <th className="text-secondary">Rol</th>
                    <th className="text-secondary">Estado</th>
                    <th className="text-center text-secondary">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuariosPaginados.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5 text-muted fw-semibold"
                      >
                        No se encontraron usuarios con ese filtro.
                      </td>
                    </tr>
                  ) : (
                    usuariosPaginados.map((usuario) => (
                      <tr key={usuario.idUsuario} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <div
                              style={{
                                width: "45px",

                                height: "45px",

                                backgroundColor: esMujer(usuario.nombre)
                                  ? "#fceef3"
                                  : "#e1f7e7",

                                borderRadius: "50%",

                                display: "flex",

                                justifyContent: "center",

                                alignItems: "center",

                                fontWeight: "bold",

                                color: "#115133",
                              }}
                            >
                              {usuario.nombre?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="ms-3">
                              <div className="fw-bold">{usuario.nombre}</div>

                              <small className="text-muted">
                                ID: {usuario.idUsuario}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>{usuario.correo}</td>

                        <td>
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                usuario.rol === "DOCENTE"
                                  ? "#d1ecf1"
                                  : "#fff3cd",

                              color: "#000",
                            }}
                          >
                            {usuario.rol}
                          </span>
                        </td>

                        <td>
                          <span
                            className="badge"
                            style={{
                              backgroundColor:
                                usuario.estado === "ACTIVO"
                                  ? "#d4edda"
                                  : "#f8d7da",

                              color:
                                usuario.estado === "ACTIVO"
                                  ? "#155724"
                                  : "#721c24",
                            }}
                          >
                            {usuario.estado}
                          </span>
                        </td>

                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2 flex-wrap">
                            <button
                              className="btn btn-sm btn-success d-flex align-items-center justify-content-center gap-2"
                              style={{
                                borderRadius: "10px",
                                minWidth: "100px",
                                padding: "8px 12px",
                              }}
                              onClick={() => setUsuarioSeleccionado(usuario)}
                            >
                              <FaUserShield />
                              Perfil
                            </button>

                            <button
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: "#fff3e0",
                                borderRadius: "10px",
                                width: "44px",
                                height: "44px",
                                padding: "0",
                              }}
                              onClick={() => editarUsuario(usuario)}
                            >
                              <FaPen />
                            </button>

                            <button
                              className="btn btn-sm d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: "#ffebee",
                                borderRadius: "10px",
                                width: "44px",
                                height: "44px",
                                padding: "0",
                              }}
                              onClick={() => eliminarRegistro(usuario.idUsuario)}
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
                    style={{ width: "36px", height: "36px", borderRadius: "10px", border: "1px solid #e5e7eb", backgroundColor: paginaActual === 1 ? "#f9fafb" : "#fff", color: paginaActual === 1 ? "#d1d5db" : "#115133", cursor: paginaActual === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  {generarPaginas().map((n) => (
                    <button
                      key={n}
                      onClick={() => irAPagina(n)}
                      style={{ width: "36px", height: "36px", borderRadius: "10px", border: n === paginaActual ? "none" : "1px solid #e5e7eb", backgroundColor: n === paginaActual ? "#115133" : "#fff", color: n === paginaActual ? "#fff" : "#374151", fontWeight: n === paginaActual ? "700" : "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => irAPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    style={{ width: "36px", height: "36px", borderRadius: "10px", border: "1px solid #e5e7eb", backgroundColor: paginaActual === totalPaginas ? "#f9fafb" : "#fff", color: paginaActual === totalPaginas ? "#d1d5db" : "#115133", cursor: paginaActual === totalPaginas ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* PERFIL DEL USUARIO */}

        {usuarioSeleccionado && (
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
                    backgroundColor: esMujer(usuarioSeleccionado.nombre)
                      ? "#fceef3"
                      : "#e1f7e7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: "#115133",
                    boxShadow: "0 20px 50px rgba(17, 85, 61, .08)",
                  }}
                >
                  {usuarioSeleccionado.nombre?.charAt(0)?.toUpperCase()}
                </div>

                <h3
                  className="fw-bold mt-3 mb-1"
                  style={{
                    fontSize: "22px",
                  }}
                >
                  {usuarioSeleccionado.nombre}
                </h3>

                <p className="small fw-bold text-secondary mb-4">
                  Rol: 
                  <span
                    style={{
                      color: "#115133",
                    }}
                  >
                    {usuarioSeleccionado.rol}
                  </span>
                </p>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-danger fw-bold w-50 py-2"
                    style={{
                      borderRadius: "8px",
                    }}
                    onClick={() =>
                      eliminarRegistro(usuarioSeleccionado.idUsuario)
                    }
                  >
                    🗑️ Eliminar
                  </button>

                  <button
                    className="btn btn-sm text-white fw-bold w-50 py-2"
                    style={{
                      backgroundColor: "#115133",
                      borderRadius: "8px",
                    }}
                    onClick={() => editarUsuario(usuarioSeleccionado)}
                  >
                    ✏️ Editar
                  </button>
                </div>
              </div>

              {/* LADO DERECHO */}

              <div className="col-md-8 px-4">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                  <h5
                    className="fw-bold m-0"
                    style={{
                      color: "#115133",
                    }}
                  >
                    Información del Usuario
                  </h5>

                  <span
                    className="badge"
                    style={{
                      backgroundColor:
                        usuarioSeleccionado.estado === "ACTIVO"
                          ? "#d4edda"
                          : "#f8d7da",

                      color:
                        usuarioSeleccionado.estado === "ACTIVO"
                          ? "#155724"
                          : "#721c24",
                    }}
                  >
                    {usuarioSeleccionado.estado}
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
                      Nombre
                    </div>

                    <div className="col-sm-8 fw-semibold">
                      : {usuarioSeleccionado.nombre}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      Correo Electrónico
                    </div>

                    <div className="col-sm-8 fw-semibold">
                      :{" "}
                      <a
                        href={`mailto:${usuarioSeleccionado.correo}`}
                        style={{
                          textDecoration: "none",
                          color: "#115133",
                        }}
                      >
                        {usuarioSeleccionado.correo}
                      </a>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">Rol</div>

                    <div className="col-sm-8 fw-semibold">
                      : {usuarioSeleccionado.rol}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      Estado
                    </div>

                    <div className="col-sm-8 fw-semibold">
                      : {usuarioSeleccionado.estado}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 fw-bold text-secondary">
                      Identificador
                    </div>

                    <div className="col-sm-8 fw-semibold">
                      : SF-U-
                      {usuarioSeleccionado.idUsuario}
                    </div>
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

export default Usuarios;