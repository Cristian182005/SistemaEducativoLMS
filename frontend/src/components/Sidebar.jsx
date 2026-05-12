import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "270px",
        background: "#1f2937",
        color: "white",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* LOGO */}

      <div
        style={{
          padding: "25px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="logo"
          width="80"
        />

        <h3
          style={{
            marginTop: "15px",
            fontWeight: "bold",
          }}
        >
          LMS SYSTEM
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "14px",
          }}
        >
          Panel Administrador
        </p>
      </div>

      {/* MENU */}

      <div
        style={{
          flex: 1,
          paddingTop: "20px",
        }}
      >
        <MenuItem
          icon={<FaUsers />}
          text="Dashboard"
          onClick={() => navigate("/dashboard")}
        />

        <MenuItem
          icon={<FaUserGraduate />}
          text="Estudiantes"
          onClick={() => navigate("/estudiantes")}
        />

        <MenuItem
          icon={<FaChalkboardTeacher />}
          text="Docentes"
          onClick={() => navigate("/docentes")}
        />

        <MenuItem
          icon={<FaBook />}
          text="Cursos"
          onClick={() => navigate("/cursos")}
        />

        <MenuItem
          icon={<FaClipboardList />}
          text="Matrículas"
          onClick={() => navigate("/matriculas")}
        />
      </div>

      {/* FOOTER */}

      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          className="btn btn-danger w-100"
          style={{
            borderRadius: "10px",
          }}
          onClick={() => {
            localStorage.removeItem("usuario");

            navigate("/");
          }}
        >
          <FaSignOutAlt className="me-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

/* MENU ITEM */

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

export default Sidebar;