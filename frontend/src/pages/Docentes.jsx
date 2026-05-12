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

  // LISTAR

  const obtenerDocentes = async () => {
    const response = await listarDocentes();

    setDocentes(response.data);
  };

  useEffect(() => {
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

  const registrarDocente = async (e) => {
    e.preventDefault();

    if (editando) {
      await actualizarDocente(idDocente, form);
    } else {
      await guardarDocente(form);
    }

    limpiarFormulario();

    obtenerDocentes();
  };

  // EDITAR

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
  };

  // ELIMINAR

  const eliminarRegistro = async (id) => {
    if (window.confirm("¿Eliminar docente?")) {
      await eliminarDocente(id);

      obtenerDocentes();
    }
  };

  // LIMPIAR

  const limpiarFormulario = () => {
    setForm({
      nombres: "",
      apellidos: "",
      dni: "",
      correo: "",
      especialidad: "",
      telefono: "",
    });

    setEditando(false);

    setIdDocente(null);
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
          <div className="card-header bg-success text-white">
            <h3 className="mb-0">Gestión de Docentes</h3>
          </div>

          <div className="card-body">
            <form
              onSubmit={registrarDocente}
              className="card p-4 shadow-sm mb-4 border-0"
            >
              <div className="row">
                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="nombres"
                    className="form-control"
                    placeholder="Nombres"
                    value={form.nombres}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control"
                    placeholder="Apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="dni"
                    className="form-control"
                    placeholder="DNI"
                    value={form.dni}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    placeholder="Correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="especialidad"
                    className="form-control"
                    placeholder="Especialidad"
                    value={form.especialidad}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  className={`btn ${
                    editando ? "btn-warning" : "btn-success"
                  }`}
                >
                  {editando
                    ? "Actualizar Docente"
                    : "Registrar Docente"}
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
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>DNI</th>
                  <th>Correo</th>
                  <th>Especialidad</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {docentes.map((docente) => (
                  <tr key={docente.idDocente}>
                    <td>{docente.idDocente}</td>
                    <td>{docente.nombres}</td>
                    <td>{docente.apellidos}</td>
                    <td>{docente.dni}</td>
                    <td>{docente.correo}</td>
                    <td>{docente.especialidad}</td>
                    <td>{docente.telefono}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editarDocente(docente)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          eliminarRegistro(docente.idDocente)
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

export default Docentes;