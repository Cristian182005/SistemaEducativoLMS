import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  listarDocentes,
  guardarDocente,
  actualizarDocente,
  eliminarDocente,
} from "../services/docenteService";

function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    correo: "",
    especialidad: "",
    telefono: "",
  });

  const [editando, setEditando] = useState(false);
  const [idDocente, setIdDocente] = useState(null);

  // LISTAR DOCENTES
  const obtenerDocentes = async () => {
    try {
      const response = await listarDocentes();
      if (response && response.data) {
        setDocentes(response.data);
      }
    } catch (error) {
      console.error("Error al obtener los docentes:", error);
    }
  };

  useEffect(() => {
    let activo = true;

    const cargarDatosIniciales = async () => {
      try {
        const response = await listarDocentes();
        if (activo && response && response.data) {
          setDocentes(response.data);
        }
      } catch (error) {
        console.error("Error en la carga inicial:", error);
      }
    };

    cargarDatosIniciales();

    return () => {
      activo = false;
    };
  }, []);

  // INPUTS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // GUARDAR / ACTUALIZAR
  const registrarDocente = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await actualizarDocente(idDocente, form);
      } else {
        await guardarDocente(form);
      }
      limpiarFormulario();
      setMostrarFormulario(false);
      await obtenerDocentes();
    } catch (error) {
      console.error("Error al procesar el registro:", error);
    }
  };

  // RELLENAR PARA EDITAR
  const editarDocente = (docente) => {
    setForm({
      nombres: docente.nombres,
      apellidos: docente.apellidos,
      dni: docente.dni,
      correo: docente.correo,
      especialidad: docente.especialidad,
      telefono: docente.telefono,
    });
    setIdDocente(docente.idDocente);
    setEditando(true);
    setMostrarFormulario(true);
    setDocenteSeleccionado(null);
  };

  // ELIMINAR
  const eliminarRegistro = async (id) => {
    if (window.confirm("⚠️ ¿Seguro que deseas eliminar este registro de docente? Esta acción no se puede deshacer.")) {
      try {
        await eliminarDocente(id);
        await obtenerDocentes();
        if (docenteSeleccionado && docenteSeleccionado.idDocente === id) {
          setDocenteSeleccionado(null);
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  // LIMPIAR
  const limpiarFormulario = () => {
    setForm({ nombres: "", apellidos: "", dni: "", correo: "", especialidad: "", telefono: "" });
    setEditando(false);
    setIdDocente(null);
  };

  // FUNCIÓN PARA DETERMINAR SI ES MUJER U HOMBRE POR EL NOMBRE
  const esMujer = (nombre) => {
    if (!nombre) return false;
    const primerNombre = nombre.trim().split(" ")[0].toLowerCase();
    
    const excepcionesFemeninas = ["isabel", "beatriz", "carmen", "raquel", "ines", "rosario", "pilar", "luz", "mercedes", "rocio", "miriam", "ruth"];
    const excepcionesMasculinas = ["luca", "lucas", "marias", "josue", "misael"];

    if (excepcionesFemeninas.includes(primerNombre)) return true;
    if (excepcionesMasculinas.includes(primerNombre)) return false;

    return primerNombre.endsWith("a");
  };

  return (
    <div style={{ display: "flex", background: "#f8f9fa", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      {/* Barra Lateral */}
      <Sidebar />

      {/* Contenedor Principal */}
      <div style={{ flex: 1, marginLeft: "270px", padding: "40px", minWidth: "0" }}>
        
        {/* PANEL DE CONTROL - CABECERA CON COLORES DEL COLEGIO */}
        <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #115133 0%, #1a6b45 100%)", color: "#fff" }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2 className="fw-extrabold m-0" style={{ letterSpacing: "-0.5px", fontSize: "26px" }}>Módulo de Docentes</h2>
              <p className="text-white-50 small m-0 mt-1 fw-medium">Gestión Académica • C.E.P. La Sagrada Familia</p>
            </div>
            
            <div>
              {!docenteSeleccionado ? (
                <button 
                  className="btn btn-md fw-bold shadow-sm px-4 text-white"
                  style={{ 
                    borderRadius: "10px", 
                    backgroundColor: mostrarFormulario ? "#7a1b1b" : "#145c3a", 
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => {
                    if (mostrarFormulario) limpiarFormulario();
                    setMostrarFormulario(!mostrarFormulario);
                  }}
                >
                  {mostrarFormulario ? "✕ Cancelar y Volver" : "＋ Registrar Nuevo Docente"}
                </button>
              ) : (
                <button 
                  className="btn btn-light btn-md fw-bold shadow-sm px-4" 
                  style={{ borderRadius: "10px", color: "#115133" }} 
                  onClick={() => setDocenteSeleccionado(null)}
                >
                  ← Regresar al Listado
                </button>
              )}
            </div>
          </div>
        </div>

        {/* VISTA 1: FORMULARIO MODERNO EN DOS COLUMNAS */}
        {mostrarFormulario && !docenteSeleccionado && (
          <div className="row g-4 justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4 position-relative" style={{ borderRadius: "20px", backgroundColor: "#fff" }}>
                <div className="position-absolute top-0 start-0 w-100" style={{ height: "6px", backgroundColor: editando ? "#7a1b1b" : "#115133", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}></div>
                
                <h4 className="fw-bold mb-4 mt-2" style={{ letterSpacing: "-0.3px", color: "#115133" }}>
                  {editando ? "📝 Actualizar Credenciales del Docente" : "👨‍🏫 Registrar Nueva Alta de Docente"}
                </h4>
                
                <form onSubmit={registrarDocente}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label text-secondary small fw-bold">Nombres Completos</label>
                      <input type="text" name="nombres" className="form-control border-0 px-3 py-2-5 shadow-none" style={{ backgroundColor: "#f4f6f9", borderRadius: "10px", fontSize: "14px" }} value={form.nombres} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-secondary small fw-bold">Apellidos Paterno y Materno</label>
                      <input type="text" name="apellidos" className="form-control border-0 px-3 py-2-5 shadow-none" style={{ backgroundColor: "#f4f6f9", borderRadius: "10px", fontSize: "14px" }} value={form.apellidos} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-secondary small fw-bold">Número de DNI</label>
                      <input type="text" name="dni" className="form-control border-0 px-3 py-2-5 shadow-none" style={{ backgroundColor: "#f4f6f9", borderRadius: "10px", fontSize: "14px" }} value={form.dni} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-secondary small fw-bold">Correo Institucional</label>
                      <input type="email" name="correo" className="form-control border-0 px-3 py-2-5 shadow-none" style={{ backgroundColor: "#f4f6f9", borderRadius: "10px", fontSize: "14px" }} value={form.correo} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-secondary small fw-bold">Curso / Especialidad</label>
                      <input type="text" name="especialidad" className="form-control border-0 px-3 py-2-5 shadow-none" style={{ backgroundColor: "#f4f6f9", borderRadius: "10px", fontSize: "14px" }} value={form.especialidad} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-secondary small fw-bold">Número Telefónico</label>
                      <input type="text" name="telefono" className="form-control border-0 px-3 py-2-5 shadow-none" style={{ backgroundColor: "#f4f6f9", borderRadius: "10px", fontSize: "14px" }} value={form.telefono} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="d-flex gap-2 mt-4 justify-content-end">
                    <button type="button" className="btn btn-light fw-bold px-4" style={{ borderRadius: "10px", backgroundColor: "#e9ecef" }} onClick={limpiarFormulario}>
                      Limpiar
                    </button>
                    <button type="submit" className="btn text-white fw-bold px-4 shadow-sm" style={{ backgroundColor: editando ? "#7a1b1b" : "#115133", borderRadius: "10px" }}>
                      {editando ? "Guardar Cambios" : "Confirmar Registro"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: LISTADO DE DOCENTES (CON SCROLLBAR INTEGRADO) */}
        {!mostrarFormulario && !docenteSeleccionado && (
          <div className="card border-0 shadow-sm" style={{ borderRadius: "20px", overflow: "hidden", backgroundColor: "#fff" }}>
            <div className="p-4 bg-white d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid #f1f5f9" }}>
              <h5 className="fw-bold m-0 text-dark" style={{ fontSize: "18px" }}>Plana de Profesores Activos</h5>
              <span className="badge px-3 py-2 fw-bold" style={{ backgroundColor: "#eef7f2", color: "#115133", borderRadius: "8px", border: "1px solid #d1ebd9" }}>
                Total: {docentes.length} Docentes
              </span>
            </div>
            
            {/* Aquí agregamos la barra de desplazamiento interna con una altura máxima cómoda */}
            <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 1 }}>
                  <tr className="text-secondary uppercase small fw-bold" style={{ borderBottom: "2px solid #edf2f7", backgroundColor: "#f8f9fa" }}>
                    <th className="ps-4 py-3">Información del Docente</th>
                    <th>Documento</th>
                    <th>Especialidad</th>
                    <th>Contacto</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {docentes.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted fw-semibold">
                        📂 No hay docentes registrados en este momento.
                      </td>
                    </tr>
                  ) : (
                    docentes.map((docente) => (
                      <tr key={docente.idDocente} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            
                            <div style={{ 
                              width: "44px", 
                              height: "44px", 
                              backgroundColor: esMujer(docente.nombres) ? "#fceef3" : "#e1f7e7", 
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              flexShrink: 0
                            }}>
                              {esMujer(docente.nombres) ? (
                                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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
                              ) : (
                                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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
                              )}
                            </div>

                            <div className="ms-3">
                              <p className="fw-bold mb-0 text-dark" style={{ fontSize: "14.5px" }}>{docente.nombres} {docente.apellidos}</p>
                              <small className="text-muted" style={{ fontSize: "12px" }}>{docente.correo}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-dark fw-semibold" style={{ fontSize: "14px" }}>{docente.dni}</span>
                        </td>
                        <td>
                          <span className="badge px-3 py-2 fw-bold" style={{ backgroundColor: "#eef7f2", color: "#115133", borderRadius: "8px" }}>
                            {docente.especialidad}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary fw-medium" style={{ fontSize: "13px" }}>📞 {docente.telefono}</span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button className="btn btn-sm text-white fw-bold px-3 shadow-none" style={{ backgroundColor: "#115133", borderRadius: "8px", fontSize: "12px" }} onClick={() => setDocenteSeleccionado(docente)}>
                              Ver Perfil
                            </button>
                            <button className="btn btn-sm border-0 fw-bold shadow-none" style={{ backgroundColor: "#fff3e0", color: "#e65100", borderRadius: "8px" }} title="Editar" onClick={() => editarDocente(docente)}>
                              ✏️
                            </button>
                            <button className="btn btn-sm border-0 fw-bold shadow-none" style={{ backgroundColor: "#ffebee", color: "#7a1b1b", borderRadius: "8px" }} title="Eliminar" onClick={() => eliminarRegistro(docente.idDocente)}>
                              🗑️
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

        {/* VISTA 3: PERFIL DE DETALLES */}
        {docenteSeleccionado && (
          <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "20px", backgroundColor: "#fff" }}>
            <div className="row g-4">
              
              <div className="col-md-4 text-center border-end" style={{ borderColor: "#edf2f7" }}>
                <div className="position-relative d-inline-block mb-3">
                  
                  <div style={{
                    width: "130px",
                    height: "130px",
                    backgroundColor: esMujer(docenteSeleccionado.nombres) ? "#fceef3" : "#e1f7e7",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    margin: "0 auto"
                  }}>
                    {esMujer(docenteSeleccionado.nombres) ? (
                      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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
                    ) : (
                      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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
                    )}
                  </div>

                  <span className="position-absolute" style={{
                    top: "5px",
                    right: "5px",
                    width: "14px",
                    height: "14px",
                    backgroundColor: "#28a745",
                    border: "2px solid #fff",
                    borderRadius: "50%"
                  }}></span>
                </div>

                <h3 className="fw-bold text-dark mb-1" style={{ fontSize: "22px", letterSpacing: "-0.5px" }}>
                  {docenteSeleccionado.nombres} {docenteSeleccionado.apellidos}
                </h3>
                <p className="text-muted small mb-1 fw-semibold">ID: <span style={{ color: "#115133" }}>SF-{docenteSeleccionado.idDocente}</span></p>
                <p className="small fw-bold text-secondary mb-4">Materia: <span style={{ color: "#145c3a" }}>{docenteSeleccionado.especialidad}</span></p>
                
                <div className="d-flex justify-content-center gap-2 px-2">
                  <button className="btn btn-sm btn-outline-danger fw-bold w-50 py-2" style={{ borderRadius: "8px", borderColor: "#dc3545" }} onClick={() => eliminarRegistro(docenteSeleccionado.idDocente)}>
                    🗑️ Eliminar
                  </button>
                  <button className="btn btn-sm text-white fw-bold w-50 py-2" style={{ backgroundColor: "#115133", borderRadius: "8px", border: "none" }} onClick={() => editarDocente(docenteSeleccionado)}>
                    ✏️ Editar
                  </button>
                </div>
              </div>

              <div className="col-md-8 px-4">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                  <h5 className="fw-bold m-0" style={{ color: "#115133", fontSize: "18px" }}>Información Personal</h5>
                  <span className="badge px-2.5 py-1.5 bg-success text-success bg-opacity-10 fw-bold" style={{ borderRadius: "6px", fontSize: "12px" }}>
                    {esMujer(docenteSeleccionado.nombres) ? "Activa" : "Activo"}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="row text-start" style={{ fontSize: "15px" }}>
                    <div className="col-sm-4 fw-bold text-secondary">Nombres Completos</div>
                    <div className="col-sm-8 text-dark fw-semibold">: {docenteSeleccionado.nombres}</div>
                  </div>
                  
                  <div className="row text-start" style={{ fontSize: "15px" }}>
                    <div className="col-sm-4 fw-bold text-secondary">Apellidos Paterno/Materno</div>
                    <div className="col-sm-8 text-dark fw-semibold">: {docenteSeleccionado.apellidos}</div>
                  </div>

                  <div className="row text-start" style={{ fontSize: "15px" }}>
                    <div className="col-sm-4 fw-bold text-secondary">Documento de Identidad</div>
                    <div className="col-sm-8 text-dark fw-semibold">: {docenteSeleccionado.dni}</div>
                  </div>

                  <div className="row text-start" style={{ fontSize: "15px" }}>
                    <div className="col-sm-4 fw-bold text-secondary">Curso Asignado</div>
                    <div className="col-sm-8 text-dark fw-semibold">: {docenteSeleccionado.especialidad}</div>
                  </div>

                  <div className="row text-start" style={{ fontSize: "15px" }}>
                    <div className="col-sm-4 fw-bold text-secondary">Número de Teléfono</div>
                    <div className="col-sm-8 fw-bold" style={{ color: "#115133" }}>: {docenteSeleccionado.telefono}</div>
                  </div>

                  <div className="row text-start" style={{ fontSize: "15px" }}>
                    <div className="col-sm-4 fw-bold text-secondary">Email Institucional</div>
                    <div className="col-sm-8 fw-bold">
                      : <a href={`mailto:${docenteSeleccionado.correo}`} style={{ color: "#115133", textDecoration: "none" }}>
                        {docenteSeleccionado.correo}
                      </a>
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

export default Docentes;