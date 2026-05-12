import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

import { obtenerResumen } from "../services/dashboardService";

function Dashboard() {
  const navigate = useNavigate();
  const [resumen, setResumen] = useState({
    estudiantes: 0,
    docentes: 0,
    cursos: 0,
    matriculas: 0,
  });
  useEffect(() => {
    cargarResumen();
  }, []);

  const cargarResumen = async () => {
    try {
      const response = await obtenerResumen();

      setResumen(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        background: "#f4f6f9",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENIDO */}

      <div
        style={{
          flex: 1,
          padding: "30px",
          marginLeft: "270px",
        }}
      >
        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1
              style={{
                fontWeight: "bold",
                color: "#1e293b",
              }}
            >
              Dashboard Administrativo
            </h1>

            <p
              style={{
                color: "gray",
              }}
            >
              Bienvenido al Sistema Educativo LMS
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "10px 20px",
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            👋 Admin
          </div>
        </div>

        {/* TARJETAS */}

        <div className="row">
          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Estudiantes"
              numero={resumen.estudiantes}
              color="#2563eb"
              icon={<FaUserGraduate />}
            />
          </div>

          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Docentes"
              numero={resumen.docentes}
              color="#16a34a"
              icon={<FaChalkboardTeacher />}
            />
          </div>

          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Cursos"
              numero={resumen.cursos}
              color="#f59e0b"
              icon={<FaBook />}
            />
          </div>

          <div className="col-md-3 mb-4">
            <CardDashboard
              titulo="Matrículas"
              numero="320"
              color="#dc2626"
              icon={<FaClipboardList />}
            />
          </div>
        </div>

        {/* TABLA */}

        <div
          className="card shadow border-0 mt-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="card-body">
            <h4
              className="mb-4"
              style={{
                fontWeight: "bold",
              }}
            >
              Últimos Estudiantes Registrados
            </h4>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Juan Pérez</td>
                  <td>juan@gmail.com</td>
                  <td>
                    <span className="badge bg-success">Activo</span>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>María López</td>
                  <td>maria@gmail.com</td>
                  <td>
                    <span className="badge bg-success">Activo</span>
                  </td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>Carlos Díaz</td>
                  <td>carlos@gmail.com</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      Pendiente
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTE MENU */

function MenuItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "15px 25px",
        cursor: "pointer",
        transition: "0.3s",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "16px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#374151")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {icon}
      {text}
    </div>
  );
}

/* COMPONENTE CARD */

function CardDashboard({ titulo, numero, color, icon }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: "20px",
        padding: "25px",
        color: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            {numero}
          </h2>

          <h5>{titulo}</h5>
        </div>

        <div
          style={{
            fontSize: "45px",
            opacity: 0.3,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
