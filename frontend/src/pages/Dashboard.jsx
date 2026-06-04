import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaUserFriends,
  FaUserCog,
  FaHome,
  FaTachometerAlt,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { obtenerResumen } from "../services/dashboardService";
import CalendarioDashboard from "../components/CalendarioDashboard";
import "./Dashboard.css";

function Dashboard() {
  const [resumen, setResumen] = useState({
    estudiantes: 0,
    docentes: 0,
    cursos: 0,
    matriculas: 0,
    padres: 0,
    usuarios: 0,
  });

  useEffect(() => {
    cargarResumen();

    const intervalo = setInterval(() => {
      cargarResumen();
    }, 5000);

    return () => clearInterval(intervalo);
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
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div className="main-content">
        {/* HEADER */}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "25px",
            marginBottom: "30px",
            boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "15px",
                background: "#0d3b2e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "28px",
              }}
            >
              <FaTachometerAlt />
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontWeight: "700",
                  color: "#0f172a",
                }}
              >
                Admin
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "15px",
                }}
              >
                <FaHome /> Home &nbsp; &gt; &nbsp; Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* CARDS */}

        <div className="row">
          <div className="col-md-4 mb-4">
            <CardDashboard
              titulo="Estudiantes"
              numero={resumen.estudiantes}
              color="#0d3b2e"
              icon={<FaUserGraduate />}
            />
          </div>

          <div className="col-md-4 mb-4">
            <CardDashboard
              titulo="Docentes"
              numero={resumen.docentes}
              color="#14532d"
              icon={<FaChalkboardTeacher />}
            />
          </div>

          <div className="col-md-4 mb-4">
            <CardDashboard
              titulo="Cursos"
              numero={resumen.cursos}
              color="#7f1d1d"
              icon={<FaBook />}
            />
          </div>

          <div className="col-md-4 mb-4">
            <CardDashboard
              titulo="Matrículas"
              numero={resumen.matriculas}
              color="#0d3b2e"
              icon={<FaClipboardList />}
            />
          </div>

          <div className="col-md-4 mb-4">
            <CardDashboard
              titulo="Padres"
              numero={resumen.padres}
              color="#14532d"
              icon={<FaUserFriends />}
            />
          </div>

          <div className="col-md-4 mb-4">
            <CardDashboard
              titulo="Usuarios"
              numero={resumen.usuarios}
              color="#7f1d1d"
              icon={<FaUserCog />}
            />
          </div>
        </div>

        {/* GRAFICO + CALENDARIO */}

        <div className="row mt-2">
          <div className="col-lg-8 mb-4">
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                height: "100%",
                boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h5
                style={{
                  color: "#0d3b2e",
                  fontWeight: "700",
                }}
              >
                Matrículas Registradas
              </h5>

              <canvas id="graficoMatriculas"></canvas>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <CalendarioDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardDashboard({ titulo, numero, color, icon }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: "20px",
        padding: "25px",
        color: "white",
        boxShadow: "0 5px 20px rgba(0,0,0,0.10)",
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1
            style={{
              fontWeight: "700",
              marginBottom: "5px",
            }}
          >
            {numero}
          </h1>

          <h5>{titulo}</h5>
        </div>

        <div
          style={{
            fontSize: "55px",
            opacity: "0.25",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
