import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import {
  listarEstudiantes,
  guardarEstudiante,
  eliminarEstudiante,
  actualizarEstudiante,
} from "../services/estudianteService";

function Estudiantes() {

  // GENERAR CODIGO

  const generarCodigo = () => {

    const numero = Math.floor(
      100000 + Math.random() * 900000
    );

    return `SF${numero}`;
  };

  const [estudiantes, setEstudiantes] = useState([]);

  const [matriculas, setMatriculas] = useState([]);

  const [formulario, setFormulario] = useState({

    codigoEstudiante: generarCodigo(),

    apellidoPaterno: "",
    apellidoMaterno: "",
    nombres: "",

    fechaNacimiento: "",

    provincia: "",
    departamento: "",
    distrito: "",

    sexo: "",
    edad: "",
    direccion: "",

    matricula: {
      idMatricula: ""
    }

  });

  const [editando, setEditando] = useState(false);

  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {

    cargarEstudiantes();

    cargarMatriculas();

  }, []);

  // LISTAR ESTUDIANTES

  const cargarEstudiantes = async () => {

    const response = await listarEstudiantes();

    setEstudiantes(response.data);
  };

  // LISTAR MATRICULAS

  const cargarMatriculas = async () => {

    const response = await axios.get(
      "http://localhost:8081/api/matriculas"
    );

    setMatriculas(response.data);
  };

  // INPUTS

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "idMatricula") {

      setFormulario({
        ...formulario,
        matricula: {
          idMatricula: value
        }
      });

    } else {

      setFormulario({
        ...formulario,
        [name]: value,
      });
    }
  };

  // GUARDAR

  const guardar = async (e) => {

    e.preventDefault();

    if (editando) {

      await actualizarEstudiante(
        idEditar,
        formulario
      );

    } else {

      await guardarEstudiante(formulario);
    }

    limpiarFormulario();

    cargarEstudiantes();
  };

  // EDITAR

  const editar = (estudiante) => {

    setFormulario({

      codigoEstudiante:
        estudiante.codigoEstudiante,

      apellidoPaterno:
        estudiante.apellidoPaterno,

      apellidoMaterno:
        estudiante.apellidoMaterno,

      nombres:
        estudiante.nombres,

      fechaNacimiento:
        estudiante.fechaNacimiento,

      provincia:
        estudiante.provincia,

      departamento:
        estudiante.departamento,

      distrito:
        estudiante.distrito,

      sexo:
        estudiante.sexo,

      edad:
        estudiante.edad,

      direccion:
        estudiante.direccion,

      matricula: {
        idMatricula:
          estudiante.matricula?.idMatricula || ""
      }

    });

    setEditando(true);

    setIdEditar(estudiante.idEstudiante);
  };

  // ELIMINAR

  const eliminar = async (id) => {

    if (window.confirm(
      "¿Eliminar estudiante?"
    )) {

      await eliminarEstudiante(id);

      cargarEstudiantes();
    }
  };

  // LIMPIAR

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

      sexo: "",
      edad: "",
      direccion: "",

      matricula: {
        idMatricula: ""
      }

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
            <h3 className="mb-0">
              Gestión de Estudiantes
            </h3>
          </div>

          <div className="card-body">

            <form onSubmit={guardar}>

              <div className="row">

                {/* CODIGO */}

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    className="form-control"
                    value={formulario.codigoEstudiante}
                    readOnly
                  />

                </div>

                {/* NOMBRES */}

                <div className="col-md-4 mb-3">

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

                {/* APELLIDO PATERNO */}

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="apellidoPaterno"
                    className="form-control"
                    placeholder="Apellido paterno"
                    value={formulario.apellidoPaterno}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* APELLIDO MATERNO */}

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="apellidoMaterno"
                    className="form-control"
                    placeholder="Apellido materno"
                    value={formulario.apellidoMaterno}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* FECHA */}

                <div className="col-md-4 mb-3">

                  <input
                    type="date"
                    name="fechaNacimiento"
                    className="form-control"
                    value={formulario.fechaNacimiento}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* EDAD */}

                <div className="col-md-4 mb-3">

                  <input
                    type="number"
                    name="edad"
                    className="form-control"
                    placeholder="Edad"
                    value={formulario.edad}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* SEXO */}

                <div className="col-md-4 mb-3">

                  <select
                    name="sexo"
                    className="form-select"
                    value={formulario.sexo}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Seleccione sexo
                    </option>

                    <option value="Masculino">
                      Masculino
                    </option>

                    <option value="Femenino">
                      Femenino
                    </option>

                  </select>

                </div>

                {/* PROVINCIA */}

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="provincia"
                    className="form-control"
                    placeholder="Provincia"
                    value={formulario.provincia}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* DEPARTAMENTO */}

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="departamento"
                    className="form-control"
                    placeholder="Departamento"
                    value={formulario.departamento}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* DISTRITO */}

                <div className="col-md-4 mb-3">

                  <input
                    type="text"
                    name="distrito"
                    className="form-control"
                    placeholder="Distrito"
                    value={formulario.distrito}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* DIRECCION */}

                <div className="col-md-6 mb-3">

                  <input
                    type="text"
                    name="direccion"
                    className="form-control"
                    placeholder="Dirección"
                    value={formulario.direccion}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* MATRICULA */}

                <div className="col-md-6 mb-3">

                  <select
                    name="idMatricula"
                    className="form-select"
                    value={
                      formulario.matricula.idMatricula
                    }
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Seleccione matrícula
                    </option>

                    {matriculas.map((m) => (

                      <option
                        key={m.idMatricula}
                        value={m.idMatricula}
                      >

                        {m.nivel} - {m.grado} - {m.seccion}

                      </option>

                    ))}

                  </select>

                </div>

              </div>

              {/* BOTONES */}

              <button
                className={`btn ${
                  editando
                    ? "btn-warning"
                    : "btn-success"
                }`}
              >

                {editando
                  ? "Actualizar"
                  : "Guardar"}

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

            {/* TABLA */}

            <table className="table table-hover">

              <thead className="table-dark">

                <tr>

                  <th>ID</th>
                  <th>Código</th>
                  <th>Nombre Completo</th>
                  <th>Sexo</th>
                  <th>Edad</th>
                  <th>Matrícula</th>
                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {estudiantes.map((estudiante) => (

                  <tr key={estudiante.idEstudiante}>

                    <td>
                      {estudiante.idEstudiante}
                    </td>

                    <td>
                      {estudiante.codigoEstudiante}
                    </td>

                    <td>

                      {estudiante.nombres} {" "}
                      {estudiante.apellidoPaterno} {" "}
                      {estudiante.apellidoMaterno}

                    </td>

                    <td>{estudiante.sexo}</td>

                    <td>{estudiante.edad}</td>

                    <td>

                      {estudiante.matricula?.nivel}
                      {" - "}
                      {estudiante.matricula?.grado}
                      {" "}
                      {estudiante.matricula?.seccion}

                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          editar(estudiante)
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() =>
                          eliminar(
                            estudiante.idEstudiante
                          )
                        }
                      >
                        Eliminar
                      </button>

                      <a
                        href={`http://localhost:8081/api/pdf/constancia-matricula/${estudiante.idEstudiante}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-info btn-sm"
                      >
                        Constancia
                      </a>

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