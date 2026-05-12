import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  listarCursos,
  guardarCurso,
  actualizarCurso,
  eliminarCurso,
} from "../services/cursoService";

import { listarDocentes } from "../services/docenteService";

function Cursos() {
  const [cursos, setCursos] = useState([]);

  const [docentes, setDocentes] = useState([]);

  const [form, setForm] = useState({
    idDocente: "",
    nombre: "",
    descripcion: "",
    grado: "",
    seccion: "",
    estado: "ACTIVO",
  });

  const [editando, setEditando] = useState(false);

  const [idCurso, setIdCurso] = useState(null);

  // LISTAR CURSOS

  const obtenerCursos = async () => {
    const response = await listarCursos();

    setCursos(response.data);
  };

  // LISTAR DOCENTES

  const obtenerDocentes = async () => {
    const response = await listarDocentes();

    setDocentes(response.data);
  };

  useEffect(() => {
    obtenerCursos();

    obtenerDocentes();
  }, []);

  // INPUTS

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // GUARDAR

  const registrarCurso = async (e) => {
    e.preventDefault();

    if (editando) {
      await actualizarCurso(idCurso, form);
    } else {
      await guardarCurso(form);
    }

    limpiarFormulario();

    obtenerCursos();
  };

  // EDITAR

  const editarCurso = (curso) => {
    setForm({
      idDocente: curso.idDocente,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      grado: curso.grado,
      seccion: curso.seccion,
      estado: curso.estado,
    });

    setIdCurso(curso.idCurso);

    setEditando(true);
  };

  // ELIMINAR

  const eliminarRegistro = async (id) => {
    if (window.confirm("¿Eliminar curso?")) {
      await eliminarCurso(id);

      obtenerCursos();
    }
  };

  // LIMPIAR

  const limpiarFormulario = () => {
    setForm({
      idDocente: "",
      nombre: "",
      descripcion: "",
      grado: "",
      seccion: "",
      estado: "ACTIVO",
    });

    setEditando(false);

    setIdCurso(null);
  };

  // OBTENER DOCENTE

  const obtenerNombreDocente = (id) => {
    const docente = docentes.find(
      (d) => d.idDocente === id
    );

    return docente
      ? `${docente.nombres} ${docente.apellidos}`
      : "No encontrado";
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "270px",
          padding: "30px",
        }}
      >
        <div className="card shadow-lg border-0">
          <div className="card-header bg-warning">
            <h3 className="mb-0">Gestión de Cursos</h3>
          </div>

          <div className="card-body">
            <form
              onSubmit={registrarCurso}
              className="card p-4 shadow-sm mb-4 border-0"
            >
              <div className="row">
                {/* DOCENTE */}

                <div className="col-md-4 mb-3">
                  <select
                    name="idDocente"
                    className="form-select"
                    value={form.idDocente}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Seleccione docente
                    </option>

                    {docentes.map((docente) => (
                      <option
                        key={docente.idDocente}
                        value={docente.idDocente}
                      >
                        {docente.nombres} {docente.apellidos}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CURSO */}

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre del curso"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* DESCRIPCION */}

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="descripcion"
                    className="form-control"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* GRADO */}

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="grado"
                    className="form-control"
                    placeholder="Grado"
                    value={form.grado}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* SECCION */}

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="seccion"
                    className="form-control"
                    placeholder="Sección"
                    value={form.seccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ESTADO */}

                <div className="col-md-4 mb-3">
                  <select
                    name="estado"
                    className="form-select"
                    value={form.estado}
                    onChange={handleChange}
                  >
                    <option value="ACTIVO">
                      ACTIVO
                    </option>

                    <option value="INACTIVO">
                      INACTIVO
                    </option>
                  </select>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  className={`btn ${
                    editando ? "btn-warning" : "btn-primary"
                  }`}
                >
                  {editando
                    ? "Actualizar Curso"
                    : "Registrar Curso"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={limpiarFormulario}
                >
                  Limpiar
                </button>
              </div>
            </form>

            <table className="table table-hover table-bordered shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Curso</th>
                  <th>Descripción</th>
                  <th>ID Docente</th>
                  <th>Docente</th>
                  <th>Grado</th>
                  <th>Sección</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {cursos.map((curso) => (
                  <tr key={curso.idCurso}>
                    <td>{curso.idCurso}</td>

                    <td>{curso.nombre}</td>

                    <td>{curso.descripcion}</td>

                    <td>{curso.idDocente}</td>

                    <td>
                      {obtenerNombreDocente(
                        curso.idDocente
                      )}
                    </td>

                    <td>{curso.grado}</td>

                    <td>{curso.seccion}</td>

                    <td>
                      <span
                        className={`badge ${
                          curso.estado === "ACTIVO"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {curso.estado}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editarCurso(curso)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          eliminarRegistro(curso.idCurso)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cursos;