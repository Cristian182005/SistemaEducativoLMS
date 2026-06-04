import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaUserFriends,
  FaFilePdf,
  FaLink,
  FaCalendarAlt,
  FaTasks,
  FaBullhorn,
  FaComments,
  FaFileExcel,
  FaUserCog,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

import "./Sidebar.css";
import logoColegio from "../assets/IconColegio.ico";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* BOTÓN HAMBURGUESA */}

      <div className="toggle-sidebar">
        <FaBars
          onClick={() => setCollapsed(!collapsed)}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* LOGO */}

      <div className="sidebar-header">
        <img src={logoColegio} alt="Logo Colegio" className="sidebar-logo" />

        {!collapsed && (
          <div>
            <h3 className="sidebar-title">Colegio INEI 46</h3>

            <p className="sidebar-subtitle">LMS Académico</p>
          </div>
        )}
      </div>

      {/* MENÚ */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingTop: "10px",
        }}
      >
        <MenuSection title="Menú Principal" collapsed={collapsed} />

        <MenuItem
          icon={<FaUsers />}
          text="Dashboard"
          collapsed={collapsed}
          active={location.pathname === "/dashboard"}
          onClick={() => navigate("/dashboard")}
        />

        <MenuSection title="Gestión Académica" collapsed={collapsed} />

        <MenuItem
          icon={<FaBook />}
          text="Cursos"
          collapsed={collapsed}
          active={location.pathname === "/cursos"}
          onClick={() => navigate("/cursos")}
        />

        <MenuItem
          icon={<FaUserGraduate />}
          text="Estudiantes"
          collapsed={collapsed}
          active={location.pathname === "/estudiantes"}
          onClick={() => navigate("/estudiantes")}
        />

        <MenuItem
          icon={<FaChalkboardTeacher />}
          text="Docentes"
          collapsed={collapsed}
          active={location.pathname === "/docentes"}
          onClick={() => navigate("/docentes")}
        />

        <MenuItem
          icon={<FaClipboardList />}
          text="Matrículas"
          collapsed={collapsed}
          active={location.pathname === "/matriculas"}
          onClick={() => navigate("/matriculas")}
        />

        <MenuSection title="Gestión Escolar" collapsed={collapsed} />

        <MenuItem
          icon={<FaTasks />}
          text="Asignaciones"
          collapsed={collapsed}
          active={location.pathname === "/asignaciones"}
          onClick={() => navigate("/asignaciones")}
        />

        <MenuItem
          icon={<FaCalendarAlt />}
          text="Horario Maestro"
          collapsed={collapsed}
          active={location.pathname === "/horarios"}
          onClick={() => navigate("/horarios")}
        />

        <MenuItem
          icon={<FaClipboardList />}
          text="Evaluaciones"
          collapsed={collapsed}
          active={location.pathname === "/evaluaciones"}
          onClick={() => navigate("/evaluaciones")}
        />

        <MenuSection title="Usuarios" collapsed={collapsed} />

        <MenuItem
          icon={<FaUserFriends />}
          text="Padres"
          collapsed={collapsed}
          active={location.pathname === "/padres"}
          onClick={() => navigate("/padres")}
        />

        <MenuItem
          icon={<FaUserCog />}
          text="Usuarios"
          collapsed={collapsed}
          active={location.pathname === "/usuarios"}
          onClick={() => navigate("/usuarios")}
        />

        <MenuItem
          icon={<FaLink />}
          text="Vínculos Padre-Hijo"
          collapsed={collapsed}
          active={location.pathname === "/vincular-padre-hijo"}
          onClick={() => navigate("/vincular-padre-hijo")}
        />

        <MenuSection title="Procesos" collapsed={collapsed} />

        <MenuItem
          icon={<FaClipboardList />}
          text="Solicitudes"
          collapsed={collapsed}
          active={location.pathname === "/solicitudes"}
          onClick={() => navigate("/solicitudes")}
        />

        <MenuItem
          icon={<FaBullhorn />}
          text="Comunicados"
          collapsed={collapsed}
          active={location.pathname === "/comunicados"}
          onClick={() => navigate("/comunicados")}
        />

        <MenuItem
          icon={<FaComments />}
          text="Observaciones"
          collapsed={collapsed}
          active={location.pathname === "/observaciones"}
          onClick={() => navigate("/observaciones")}
        />

        <MenuSection title="Reportes" collapsed={collapsed} />

        <MenuItem
          icon={<FaFilePdf />}
          text="Reportes PDF"
          collapsed={collapsed}
          active={location.pathname === "/reportes-pdf"}
          onClick={() => navigate("/reportes-pdf")}
        />

        <MenuItem
          icon={<FaFileExcel />}
          text="Reportes Excel"
          collapsed={collapsed}
          active={location.pathname === "/reportes-excel"}
          onClick={() => navigate("/reportes-excel")}
        />

        <MenuItem
          icon={<FaFilePdf />}
          text="Generar Matrícula"
          collapsed={collapsed}
          active={location.pathname === "/generar-matricula"}
          onClick={() => navigate("/generar-matricula")}
        />
      </div>

      {/* FOOTER */}

      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <button
          className="btn w-100"
          style={{
            borderRadius: "12px",
            background: "#7f1d1d",
            color: "white",
            border: "none",
            fontWeight: "600",
          }}
          onClick={() => {
            localStorage.removeItem("usuario");
            navigate("/");
          }}
        >
          <FaUserCircle className="me-2" />

          {!collapsed && "Cerrar Sesión"}
        </button>
      </div>
    </div>
  );
}

function MenuSection({ title, collapsed }) {
  if (collapsed) return null;

  return <div className="menu-section">{title}</div>;
}

function MenuItem({ icon, text, onClick, active, collapsed }) {
  return (
    <div
      onClick={onClick}
      className={`menu-item ${active ? "active" : ""}`}
      title={collapsed ? text : ""}
    >
      {icon}

      {!collapsed && <span>{text}</span>}
    </div>
  );
}

export default Sidebar;
