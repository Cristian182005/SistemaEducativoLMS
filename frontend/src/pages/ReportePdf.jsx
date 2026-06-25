import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaFilePdf, FaGraduationCap, FaBook, FaUsers, FaClipboardList } from "react-icons/fa";
import axios from "axios";

const API_PDF = "http://localhost:8081/api/pdf";
const API = "http://localhost:8081/api";

function ReportePdf() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [gradoSeccion, setGradoSeccion] = useState({ grado: "", seccion: "" });

  useEffect(() => {
    cargarEstudiantes();
    cargarCursos();
  }, []);

  const cargarEstudiantes = async () => {
    const response = await axios.get(`${API}/estudiantes`);
    setEstudiantes(response.data);
  };

  const cargarCursos = async () => {
    const response = await axios.get(`${API}/cursos`);
    setCursos(response.data);
  };

  const reportes = [
    {
      titulo: "Ficha de Matrícula",
      descripcion: "Documento oficial con datos del estudiante y su matrícula",
      icono: <FaGraduationCap />,
      color: "#28a745",
      endpoint: (id) => `${API_PDF}/matricula/${id}`,
      tipo: "estudiante"
    },
    {
      titulo: "Constancia de Matrícula",
      descripcion: "Certificado formal de matrícula para el año escolar",
      icono: <FaClipboardList />,
      color: "#17a2b8",
      endpoint: (id) => `${API_PDF}/constancia-matricula/${id}`,
      tipo: "estudiante"
    },
    {
      titulo: "Boleta de Calificaciones",
      descripcion: "Reporte detallado de notas por estudiante",
      icono: <FaBook />,
      color: "#fd7e14",
      endpoint: (id) => `${API_PDF}/boleta/${id}`,
      tipo: "estudiante"
    },
    {
      titulo: "Reporte General de Notas",
      descripcion: "Notas de todos los estudiantes por curso",
      icono: <FaUsers />,
      color: "#6f42c1",
      endpoint: (id) => `${API_PDF}/reporte-notas/${id}`,
      tipo: "curso"
    },
    {
      titulo: "Listado de Estudiantes",
      descripcion: "Listado completo filtrable por grado y sección",
      icono: <FaUsers />,
      color: "#e83e8c",
      endpoint: () => {
        const params = new URLSearchParams();
        if (gradoSeccion.grado) params.append("grado", gradoSeccion.grado);
        if (gradoSeccion.seccion) params.append("seccion", gradoSeccion.seccion);
        return `${API_PDF}/listado-estudiantes${params.toString() ? "?" + params.toString() : ""}`;
      },
      tipo: "listado"
    }
  ];

  return (
    <div style={{ display: "flex", background: "#f4f6f9", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: "270px", padding: "30px" }}>
        <div className="card shadow-lg border-0">
          <div className="card-header bg-danger text-white">
            <h3 className="mb-0">
              <FaFilePdf className="me-2" />
              Reportes PDF - C.E.P. La Sagrada Familia
            </h3>
          </div>
          <div className="card-body">
            <p className="text-muted mb-4">
              Selecciona un reporte para generar el PDF con el logo del colegio incluido.
            </p>

            {/* Filtro para listado */}
            <div className="card mb-4 border-info">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">Filtros para Listado de Estudiantes</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={gradoSeccion.grado}
                      onChange={(e) => setGradoSeccion({ ...gradoSeccion, grado: e.target.value })}
                    >
                      <option value="">Todos los grados</option>
                      <option value="1">1°</option>
                      <option value="2">2°</option>
                      <option value="3">3°</option>
                      <option value="4">4°</option>
                      <option value="5">5°</option>
                      <option value="6">6°</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sección (ej: A, B, C)"
                      value={gradoSeccion.seccion}
                      onChange={(e) => setGradoSeccion({ ...gradoSeccion, seccion: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reportes por estudiante */}
            <h4 className="mb-3">Reportes por Estudiante</h4>
            <div className="row mb-4">
              {estudiantes.map((est) => (
                <div key={est.idEstudiante} className="col-12 mb-3">
                  <div className="card border-left-4" style={{ borderLeftColor: "#007bff" }}>
                    <div className="card-body">
                      <h6 className="card-title">
                        {est.nombres} {est.apellidoPaterno} {est.apellidoMaterno}
                      </h6>
                      <small className="text-muted">Código: {est.codigoEstudiante}</small>
                      <div className="mt-2">
                        {reportes.filter(r => r.tipo === "estudiante").map((reporte, idx) => (
                          <a
                            key={idx}
                            href={reporte.endpoint(est.idEstudiante)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm me-2 mb-2"
                            style={{ backgroundColor: reporte.color, color: "white" }}
                          >
                            {reporte.icono} {reporte.titulo}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reportes por curso */}
            <h4 className="mb-3">Reportes por Curso</h4>
            <div className="row mb-4">
              {cursos.map((curso) => (
                <div key={curso.idCurso || curso.id} className="col-md-4 mb-3">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <h6 className="card-title">{curso.nombre}</h6>
                      <a
                        href={`${API_PDF}/reporte-notas/${curso.idCurso || curso.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm"
                        style={{ backgroundColor: "#6f42c1", color: "white" }}
                      >
                        <FaBook /> Reporte de Notas
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Listado general */}
            <h4 className="mb-3">Listado General</h4>
            <a
              href={reportes.find(r => r.tipo === "listado").endpoint()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg"
              style={{ backgroundColor: "#e83e8c", color: "white" }}
            >
              <FaUsers /> Generar Listado de Estudiantes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportePdf;
