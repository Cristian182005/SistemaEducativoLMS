import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  listarEstudiantes,
  guardarEstudiante,
  eliminarEstudiante,
  actualizarEstudiante,
} from "../services/estudianteService";

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);

  const [formulario, setFormulario] = useState({
    codigoEstudiante: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    grado: "",
    seccion: "",
    estado: "Activo",
  });

  const [editando, setEditando] = useState(false);

  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    const response = await listarEstudiantes();

    setEstudiantes(response.data);
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (editando) {
      await actualizarEstudiante(idEditar, formulario);
    } else {
      await guardarEstudiante(formulario);
    }

    limpiarFormulario();

    cargarEstudiantes();
  };

  const editar = (estudiante) => {
    setFormulario(estudiante);

    setEditando(true);

    setIdEditar(estudiante.idEstudiante);
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este estudiante?")) {
      await eliminarEstudiante(id);

      cargarEstudiantes();
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      codigoEstudiante: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      grado: "",
      seccion: "",
      estado: "Activo",
    });

    setEditando(false);

    setIdEditar(null);
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
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Gestión de Estudiantes</h3>
          </div>

          <div className="card-body">
            <form onSubmit={guardar}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="codigoEstudiante"
                    className="form-control"
                    placeholder="Código"
                    value={formulario.codigoEstudiante}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="nombres"
                    className="form-control"
                    placeholder="Nombres"
                    value={formulario.nombres}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    placeholder="Apellidos"
                    value={formulario.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="date"
                    name="fechaNacimiento"
                    className="form-control"
                    value={formulario.fechaNacimiento}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="grado"
                    className="form-control"
                    placeholder="Grado"
                    value={formulario.grado}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="seccion"
                    className="form-control"
                    placeholder="Sección"
                    value={formulario.seccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <select
                    name="estado"
                    className="form-control"
                    value={formulario.estado}
                    onChange={handleChange}
                  >
                    <option value="Activo">Activo</option>

                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className={`btn ${
                  editando ? "btn-warning" : "btn-success"
                }`}
              >
                {editando ? "Actualizar" : "Guardar"}
              </button>

              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={limpiarFormulario}
              >
                Limpiar
              </button>
            </form>

            <hr />

            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Código</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Grado</th>
                  <th>Sección</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.idEstudiante}>
                    <td>{estudiante.idEstudiante}</td>
                    <td>{estudiante.codigoEstudiante}</td>
                    <td>{estudiante.nombres}</td>
                    <td>{estudiante.apellidos}</td>
                    <td>{estudiante.grado}</td>
                    <td>{estudiante.seccion}</td>
                    <td>{estudiante.estado}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editar(estudiante)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          eliminar(estudiante.idEstudiante)
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

export default Estudiantes;