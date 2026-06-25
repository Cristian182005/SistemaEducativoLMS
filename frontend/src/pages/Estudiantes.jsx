import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import {
  listarEstudiantes,
  buscarEstudiantes,
  guardarEstudiante,
  obtenerEstudiante,
  obtenerPadresEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
} from "../services/estudianteService";
import { listarMatriculas } from "../services/matriculaService";
import "./Estudiantes.css";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [vista, setVista] = useState("listado");
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [padresEstudiante, setPadresEstudiante] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [buscar, setBuscar] = useState("");
  const [paginaActual, setPaginaActual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalElementos, setTotalElementos] = useState(0);
  const elementosPorPagina = 10;

  const generarCodigo = () => {
    const numero = Math.floor(100000 + Math.random() * 900000);
    return `SF${numero}`;
  };

  const [formulario, setFormulario] = useState({
    codigoEstudiante: generarCodigo(),
    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",
    fechaNacimiento: "",
    provincia: "",
    departamento: "",
    distrito: "",
    dni: "",
    sexo: "",
    edad: "",
    direccion: "",
    matricula: { idMatricula: "" },
  });

  const calcularEdad = useCallback((fechaNacimiento) => {
    if (!fechaNacimiento) return "";
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad >= 0 ? edad : "";
  }, []);

  useEffect(() => {
    cargarEstudiantes();
    cargarMatriculas();
  }, []);

  useEffect(() => {
    if (buscar.trim() === "") {
      cargarEstudiantes(paginaActual);
    } else {
      busquedaConPaginacion(buscar, paginaActual);
    }
  }, [paginaActual]);

  const cargarEstudiantes = async (pagina = 0) => {
    setCargando(true);
    try {
      const response = await listarEstudiantes(pagina, elementosPorPagina);
      setEstudiantes(response.data.content);
      setPaginaActual(response.data.number);
      setTotalPaginas(response.data.totalPages);
      setTotalElementos(response.data.totalElements);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
      Swal.fire("Error", "No se pudieron cargar los estudiantes", "error");
    } finally {
      setCargando(false);
    }
  };

  const cargarMatriculas = async () => {
    try {
      const response = await listarMatriculas();
      setMatriculas(response.data);
    } catch (error) {
      console.error("Error al cargar matrículas:", error);
    }
  };

  const busquedaConPaginacion = async (texto, pagina = 0) => {
    setCargando(true);
    try {
      const response = await buscarEstudiantes(texto, pagina, elementosPorPagina);
      setEstudiantes(response.data.content);
      setPaginaActual(response.data.number);
      setTotalPaginas(response.data.totalPages);
      setTotalElementos(response.data.totalElements);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleBuscar = () => {
    setPaginaActual(0);
    if (buscar.trim() === "") {
      cargarEstudiantes(0);
    } else {
      busquedaConPaginacion(buscar, 0);
    }
  };

  const handleBuscarEnter = (e) => {
    if (e.key === "Enter") handleBuscar();
  };

  const limpiarBusqueda = () => {
    setBuscar("");
    setPaginaActual(0);
    cargarEstudiantes(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "idMatricula") {
      setFormulario({ ...formulario, matricula: { idMatricula: value } });
    } else if (name === "fechaNacimiento") {
      const edad = calcularEdad(value);
      setFormulario({ ...formulario, fechaNacimiento: value, edad });
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarEstudiante(idEditar, formulario);
        Swal.fire("Actualizado", "Estudiante actualizado correctamente", "success");
      } else {
        await guardarEstudiante(formulario);
        Swal.fire("Registrado", "Estudiante registrado correctamente", "success");
      }
      limpiarFormulario();
      cargarEstudiantes(paginaActual);
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire("Error", "No se pudo guardar el estudiante", "error");
    }
  };

  const editar = (estudiante) => {
    setFormulario({
      codigoEstudiante: estudiante.codigoEstudiante,
      apellidoPaterno: estudiante.apellidoPaterno,
      apellidoMaterno: estudiante.apellidoMaterno,
      nombres: estudiante.nombres,
      fechaNacimiento: estudiante.fechaNacimiento,
      provincia: estudiante.provincia,
      departamento: estudiante.departamento,
      distrito: estudiante.distrito,
      dni: estudiante.dni || "",
      sexo: estudiante.sexo,
      edad: estudiante.edad,
      direccion: estudiante.direccion,
      matricula: { idMatricula: estudiante.matricula?.idMatricula || "" },
    });
    setEditando(true);
    setIdEditar(estudiante.idEstudiante);
    setVista("formulario");
  };

  const verPerfil = async (estudiante) => {
    setEstudianteSeleccionado(estudiante);
    try {
      const response = await obtenerPadresEstudiante(estudiante.idEstudiante);
      setPadresEstudiante(response.data);
    } catch (error) {
      console.error("Error al cargar padres:", error);
      setPadresEstudiante([]);
    }
    setVista("perfil");
  };

  const eliminar = async (id) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar estudiante?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7a1b1b",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (resultado.isConfirmed) {
      try {
        await eliminarEstudiante(id);
        Swal.fire("Eliminado", "Estudiante eliminado correctamente", "success");
        if (estudianteSeleccionado?.idEstudiante === id) {
          setEstudianteSeleccionado(null);
          setVista("listado");
        }
        cargarEstudiantes(paginaActual);
      } catch (error) {
        console.error("Error al eliminar:", error);
        Swal.fire("Error", "No se pudo eliminar el estudiante", "error");
      }
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      codigoEstudiante: generarCodigo(),
      apellidoPaterno: "",
      apellidoMaterno: "",
      nombres: "",
      fechaNacimiento: "",
      provincia: "",
      departamento: "",
      distrito: "",
      dni: "",
      sexo: "",
      edad: "",
      direccion: "",
      matricula: { idMatricula: "" },
    });
    setEditando(false);
    setIdEditar(null);
  };

  const irAFormulario = () => {
    limpiarFormulario();
    setVista("formulario");
  };

  const esFemenino = (sexo) => {
    return sexo && sexo.toLowerCase() === "femenino";
  };

  const AvatarSVG = ({ sexo, size = "100%" }) => {
    if (esFemenino(sexo)) {
      return (
        <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
          <path d="M30,35 C20,30 25,65 32,75 C35,65 30,45 35,35 Z" fill="#2b1a0a" />
          <path d="M70,35 C80,30 75,65 68,75 C65,65 70,45 65,35 Z" fill="#2b1a0a" />
          <circle cx="36" cy="46" r="4" fill="#f5c0a0" />
          <circle cx="64" cy="46" r="4" fill="#f5c0a0" />
          <path d="M37,36 Q37,26 50,26 Q63,26 63,36 L63,48 Q63,58 50,58 Q37,58 37,48 Z" fill="#fcd0b4" />
          <ellipse cx="44" cy="41" rx="1.5" ry="2.5" fill="#333" />
          <ellipse cx="56" cy="41" rx="1.5" ry="2.5" fill="#333" />
          <path d="M41,39 Q44,37 46,39" fill="none" stroke="#333" strokeWidth="1" />
          <path d="M54,39 Q56,37 59,39" fill="none" stroke="#333" strokeWidth="1" />
          <path d="M49,44 Q51,46 49,47" fill="none" stroke="#e59d7a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M46,51 Q50,55 54,51" fill="none" stroke="#b04040" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M36,36 Q50,20 64,36 Q64,26 50,22 Q36,26 36,36 Z" fill="#3d2512" />
          <path d="M36,34 Q33,42 37,46 Q39,38 38,34 Z" fill="#3d2512" />
          <path d="M64,34 Q67,42 63,46 Q61,38 62,34 Z" fill="#3d2512" />
          <path d="M46,56 L54,56 L54,64 L46,64 Z" fill="#fcd0b4" />
          <path d="M26,85 Q26,64 50,64 Q74,64 74,85 Z" fill="#a62649" />
          <path d="M42,64 L50,74 L58,64 Z" fill="#fff" />
          <path d="M45,64 L50,70 L55,64 Z" fill="#a62649" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
        <path d="M36,36 C30,25 45,10 65,13 C75,15 72,30 68,36 Z" fill="#4a3728" />
        <circle cx="37" cy="45" r="4" fill="#e0a080" />
        <circle cx="37" cy="45" r="2" fill="#c88868" />
        <circle cx="67" cy="44" r="4" fill="#e0a080" />
        <path d="M67,42 A2,2 0 0,1 69,44 A2,2 0 0,1 67,46" fill="none" stroke="#c88868" strokeWidth="0.8" />
        <path d="M38,36 Q38,26 52,26 Q66,26 66,36 L66,48 Q66,58 52,58 Q38,58 38,48 Z" fill="#f3be9f" />
        <ellipse cx="44" cy="40" rx="1.5" ry="3" fill="#333" />
        <ellipse cx="58" cy="40" rx="1.5" ry="3" fill="#333" />
        <path d="M51,43 Q53,46 51,47" fill="none" stroke="#d59273" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M47,50 Q52,54 56,50" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M37,35 Q44,18 56,20 Q66,16 67,28 Q67,34 66,36 Q60,30 52,32 Q42,32 37,35 Z" fill="#4a3728" />
        <path d="M37,35 Q35,42 38,44 Q40,38 39,35 Z" fill="#4a3728" />
        <path d="M47,56 L57,56 L57,64 L47,64 Z" fill="#e0a080" />
        <path d="M47,56 Q52,60 57,56" fill="none" stroke="#c88868" strokeWidth="1" />
        <path d="M26,85 Q26,64 52,64 Q78,64 78,85 Z" fill="#2d8a4e" />
        <path d="M44,64 Q52,72 60,64 Q52,67 44,64 Z" fill="#fff" />
        <path d="M42,72 L42,78" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
        <path d="M62,72 L62,78" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  };

  return (
    <div className="estudiantes-container">
      <Sidebar />

      <div className="estudiantes-main">
        {/* HEADER */}
        <div className="estudiantes-header">
          <div className="estudiantes-header-info">
            <h2>Modulo de Estudiantes</h2>
            <p>Gestion Academica - C.E.P. La Sagrada Familia</p>
          </div>
          <div className="estudiantes-header-btn">
            {vista === "listado" && (
              <button className="btn-header-primary" onClick={irAFormulario}>
                + Registrar Nuevo Estudiante
              </button>
            )}
            {vista === "formulario" && (
              <button className="btn-header-cancel" onClick={() => { limpiarFormulario(); setVista("listado"); }}>
                Cancelar y Volver
              </button>
            )}
            {vista === "perfil" && (
              <button className="btn-header-back" onClick={() => { setEstudianteSeleccionado(null); setVista("listado"); }}>
                Regresar al Listado
              </button>
            )}
          </div>
        </div>

        {/* VISTA 1: LISTADO */}
        {vista === "listado" && (
          <div className="estudiantes-card">
            <div className="estudiantes-card-header">
              <h5>Lista de Estudiantes</h5>
              <span className="estudiantes-badge">
                Total: {totalElementos} Estudiantes
              </span>
            </div>

            <div className="estudiantes-search">
              <input
                type="text"
                placeholder="Buscar por nombre, codigo o DNI..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                onKeyDown={handleBuscarEnter}
              />
              <button className="btn-search" onClick={handleBuscar}>
                Buscar
              </button>
              {buscar && (
                <button className="btn-clear-search" onClick={limpiarBusqueda}>
                  Limpiar
                </button>
              )}
            </div>

            {cargando ? (
              <div className="estudiantes-loading">
                <div className="estudiantes-loading-spinner"></div>
                <p>Cargando estudiantes...</p>
              </div>
            ) : estudiantes.length === 0 ? (
              <div className="estudiantes-empty">
                <div className="estudiantes-empty-icon">No hay estudiantes</div>
                <h5>No se encontraron estudiantes</h5>
                <p>{buscar ? "Intenta con otros terminos de busqueda" : "Registra el primer estudiante"}</p>
              </div>
            ) : (
              <>
                <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
                  <table className="estudiantes-table">
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        <th>Codigo</th>
                        <th>DNI</th>
                        <th>Sexo</th>
                        <th>Edad</th>
                        <th>Matricula</th>
                        <th style={{ textAlign: "center" }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estudiantes.map((estudiante) => (
                        <tr key={estudiante.idEstudiante}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <div
                                className={`estudiante-avatar ${esFemenino(estudiante.sexo) ? "femenino" : estudiante.sexo ? "masculino" : "sin-sexo"}`}
                              >
                                <AvatarSVG sexo={estudiante.sexo} />
                              </div>
                              <div>
                                <p style={{ margin: 0, fontWeight: 600, color: "#0f172a", fontSize: "14px" }}>
                                  {estudiante.nombres} {estudiante.apellidoPaterno} {estudiante.apellidoMaterno}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge-codigo">{estudiante.codigoEstudiante}</span>
                          </td>
                          <td>
                            <span style={{ fontWeight: 500 }}>{estudiante.dni || "-"}</span>
                          </td>
                          <td>
                            <span>{estudiante.sexo || "-"}</span>
                          </td>
                          <td>
                            <span>{estudiante.edad || "-"}</span>
                          </td>
                          <td>
                            <span className="badge-matricula">
                              {estudiante.matricula?.nivel} - {estudiante.matricula?.grado} {estudiante.matricula?.seccion}
                            </span>
                          </td>
                          <td>
                            <div className="acciones-btn">
                              <button
                                className="btn-action-profile"
                                onClick={() => verPerfil(estudiante)}
                              >
                                Ver Perfil
                              </button>
                              <button
                                className="btn-action-edit"
                                onClick={() => editar(estudiante)}
                                title="Editar"
                              >
                                Editar
                              </button>
                              <button
                                className="btn-action-delete"
                                onClick={() => eliminar(estudiante.idEstudiante)}
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

                {/* PAGINACION */}
                {totalPaginas > 1 && (
                  <div className="estudiantes-pagination">
                    <span className="estudiantes-pagination-info">
                      Pagina {paginaActual + 1} de {totalPaginas}
                    </span>
                    <div className="estudiantes-pagination-btns">
                      <button
                        className="btn-page"
                        disabled={paginaActual === 0}
                        onClick={() => setPaginaActual(0)}
                      >
                        Primera
                      </button>
                      <button
                        className="btn-page"
                        disabled={paginaActual === 0}
                        onClick={() => setPaginaActual(paginaActual - 1)}
                      >
                        Anterior
                      </button>
                      {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                        let pagina;
                        if (totalPaginas <= 5) {
                          pagina = i;
                        } else if (paginaActual < 3) {
                          pagina = i;
                        } else if (paginaActual >= totalPaginas - 3) {
                          pagina = totalPaginas - 5 + i;
                        } else {
                          pagina = paginaActual - 2 + i;
                        }
                        return (
                          <button
                            key={pagina}
                            className={`btn-page ${paginaActual === pagina ? "active" : ""}`}
                            onClick={() => setPaginaActual(pagina)}
                          >
                            {pagina + 1}
                          </button>
                        );
                      })}
                      <button
                        className="btn-page"
                        disabled={paginaActual === totalPaginas - 1}
                        onClick={() => setPaginaActual(paginaActual + 1)}
                      >
                        Siguiente
                      </button>
                      <button
                        className="btn-page"
                        disabled={paginaActual === totalPaginas - 1}
                        onClick={() => setPaginaActual(totalPaginas - 1)}
                      >
                        Ultima
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* VISTA 2: FORMULARIO */}
        {vista === "formulario" && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="estudiantes-form-card">
                <div className={`estudiantes-form-accent ${editando ? "editing" : ""}`}></div>
                <div className="estudiantes-form-body">
                  <h4 className="estudiantes-form-title">
                    {editando ? "Actualizar Datos del Estudiante" : "Registrar Nuevo Estudiante"}
                  </h4>

                  <form onSubmit={guardar}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="estudiantes-form-label">Codigo</label>
                        <input
                          type="text"
                          className="estudiantes-form-input"
                          value={formulario.codigoEstudiante}
                          readOnly
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="estudiantes-form-label">Nombres</label>
                        <input
                          type="text"
                          name="nombres"
                          className="estudiantes-form-input"
                          placeholder="Nombres completos"
                          value={formulario.nombres}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="estudiantes-form-label">Apellido Paterno</label>
                        <input
                          type="text"
                          name="apellidoPaterno"
                          className="estudiantes-form-input"
                          placeholder="Apellido paterno"
                          value={formulario.apellidoPaterno}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="estudiantes-form-label">Apellido Materno</label>
                        <input
                          type="text"
                          name="apellidoMaterno"
                          className="estudiantes-form-input"
                          placeholder="Apellido materno"
                          value={formulario.apellidoMaterno}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="estudiantes-form-label">DNI</label>
                        <input
                          type="text"
                          name="dni"
                          className="estudiantes-form-input"
                          placeholder="Numero de DNI"
                          value={formulario.dni}
                          onChange={handleChange}
                          maxLength="8"
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="estudiantes-form-label">Fecha de Nacimiento</label>
                        <input
                          type="date"
                          name="fechaNacimiento"
                          className="estudiantes-form-input"
                          value={formulario.fechaNacimiento}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="estudiantes-form-label">Edad</label>
                        <input
                          type="number"
                          name="edad"
                          className="estudiantes-form-input"
                          value={formulario.edad}
                          readOnly
                          placeholder="Auto"
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="estudiantes-form-label">Sexo</label>
                        <select
                          name="sexo"
                          className="estudiantes-form-select"
                          value={formulario.sexo}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="estudiantes-form-label">Departamento</label>
                        <input
                          type="text"
                          name="departamento"
                          className="estudiantes-form-input"
                          placeholder="Departamento"
                          value={formulario.departamento}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="estudiantes-form-label">Provincia</label>
                        <input
                          type="text"
                          name="provincia"
                          className="estudiantes-form-input"
                          placeholder="Provincia"
                          value={formulario.provincia}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="estudiantes-form-label">Distrito</label>
                        <input
                          type="text"
                          name="distrito"
                          className="estudiantes-form-input"
                          placeholder="Distrito"
                          value={formulario.distrito}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-8">
                        <label className="estudiantes-form-label">Direccion</label>
                        <input
                          type="text"
                          name="direccion"
                          className="estudiantes-form-input"
                          placeholder="Direccion completa"
                          value={formulario.direccion}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="estudiantes-form-label">Matricula</label>
                        <select
                          name="idMatricula"
                          className="estudiantes-form-select"
                          value={formulario.matricula.idMatricula}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione matricula</option>
                          {matriculas.map((m) => (
                            <option key={m.idMatricula} value={m.idMatricula}>
                              {m.nivel} - {m.grado} - {m.seccion}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="estudiantes-form-actions">
                      <button type="button" className="btn-form-clear" onClick={limpiarFormulario}>
                        Limpiar
                      </button>
                      <button type="submit" className={`btn-form-submit ${editando ? "editing" : ""}`}>
                        {editando ? "Guardar Cambios" : "Confirmar Registro"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 3: PERFIL */}
        {vista === "perfil" && estudianteSeleccionado && (
          <div className="estudiantes-profile-card">
            <div className="row g-0">
              <div className="col-md-4 border-end" style={{ borderColor: "#f1f5f9" }}>
                <div className="estudiantes-profile-header">
                  <div
                    className={`estudiantes-profile-avatar ${esFemenino(estudianteSeleccionado.sexo) ? "femenino" : estudianteSeleccionado.sexo ? "masculino" : "sin-sexo"}`}
                  >
                    <AvatarSVG sexo={estudianteSeleccionado.sexo} size="100%" />
                    <span className="estudiantes-profile-status"></span>
                  </div>
                  <h3 className="estudiantes-profile-name">
                    {estudianteSeleccionado.nombres} {estudianteSeleccionado.apellidoPaterno} {estudianteSeleccionado.apellidoMaterno}
                  </h3>
                  <p className="estudiantes-profile-code">
                    Codigo: {estudianteSeleccionado.codigoEstudiante}
                  </p>
                  <p className="estudiantes-profile-enrollment">
                    Matricula: {estudianteSeleccionado.matricula?.nivel} - {estudianteSeleccionado.matricula?.grado} {estudianteSeleccionado.matricula?.seccion}
                  </p>
                  <div className="estudiantes-profile-actions">
                    <button className="btn-profile-edit" onClick={() => editar(estudianteSeleccionado)}>
                      Editar
                    </button>
                    <button className="btn-profile-delete" onClick={() => eliminar(estudianteSeleccionado.idEstudiante)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="estudiantes-profile-body">
                  <div className="estudiantes-profile-section">
                    <h5 className="estudiantes-profile-section-title">Datos Personales</h5>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Nombres Completos</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.nombres}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Apellido Paterno</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.apellidoPaterno}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Apellido Materno</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.apellidoMaterno}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">DNI</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.dni || "No registrado"}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Fecha de Nacimiento</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.fechaNacimiento}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Edad</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.edad} anos</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Sexo</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.sexo}</span>
                    </div>
                  </div>

                  <div className="estudiantes-profile-section">
                    <h5 className="estudiantes-profile-section-title">Ubicacion</h5>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Departamento</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.departamento}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Provincia</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.provincia}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Distrito</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.distrito}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Direccion</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.direccion}</span>
                    </div>
                  </div>

                  <div className="estudiantes-profile-section">
                    <h5 className="estudiantes-profile-section-title">Matricula</h5>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Nivel</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.matricula?.nivel}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Grado</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.matricula?.grado}</span>
                    </div>
                    <div className="estudiantes-profile-row">
                      <span className="estudiantes-profile-label">Seccion</span>
                      <span className="estudiantes-profile-value">: {estudianteSeleccionado.matricula?.seccion}</span>
                    </div>
                  </div>

                  {padresEstudiante.length > 0 && (
                    <div className="estudiantes-profile-section">
                      <h5 className="estudiantes-profile-section-title">Padres / Apoderados</h5>
                      {padresEstudiante.map((pe, index) => (
                        <div key={index} style={{
                          background: "#f8fafc",
                          borderRadius: "12px",
                          padding: "15px",
                          marginBottom: "10px",
                          border: "1px solid #e2e8f0"
                        }}>
                          <div className="estudiantes-profile-row">
                            <span className="estudiantes-profile-label">Nombre</span>
                            <span className="estudiantes-profile-value">
                              : {pe.padre?.nombres} {pe.padre?.apellidos}
                            </span>
                          </div>
                          <div className="estudiantes-profile-row">
                            <span className="estudiantes-profile-label">DNI</span>
                            <span className="estudiantes-profile-value">: {pe.padre?.dni}</span>
                          </div>
                          <div className="estudiantes-profile-row">
                            <span className="estudiantes-profile-label">Telefono</span>
                            <span className="estudiantes-profile-value">: {pe.padre?.telefono}</span>
                          </div>
                          <div className="estudiantes-profile-row">
                            <span className="estudiantes-profile-label">Tipo</span>
                            <span className="estudiantes-profile-value">: {pe.padre?.tipo}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {padresEstudiante.length === 0 && (
                    <div className="estudiantes-profile-section">
                      <h5 className="estudiantes-profile-section-title">Padres / Apoderados</h5>
                      <p style={{ color: "#94a3b8", fontSize: "14px", fontStyle: "italic" }}>
                        No hay padres asociados a este estudiante
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Estudiantes;
