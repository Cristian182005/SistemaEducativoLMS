import {
  FaBars,
  FaBook,
  FaBullhorn,
  FaChartLine,
  FaLayerGroup,
  FaSignOutAlt,
  FaTasks,
  FaUserCheck,
} from "react-icons/fa";

import { useState } from "react";

import logoColegio from "../assets/IconColegio.ico";

function SidebarDocente({ onNavigate, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar-docente ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-docente-topbar">
        <button
          type="button"
          className="sidebar-docente-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Contraer menú"
        >
          <FaBars />
        </button>
      </div>

      <div className="sidebar-docente-brand">
        <img src={logoColegio} alt="Logo colegio" />

        {!collapsed && (
          <div>
            <p className="sidebar-docente-kicker">Portal Docente</p>
            <h2>C.E.P. La Sagrada Familia</h2>
          </div>
        )}
      </div>

      <nav className="sidebar-docente-menu">
        <SidebarLink
          collapsed={collapsed}
          icon={<FaLayerGroup />}
          label="Mis cursos"
          onClick={() => onNavigate("cursos")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaBook />}
          label="Contenido"
          onClick={() => onNavigate("contenido")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaTasks />}
          label="Tareas y evaluaciones"
          onClick={() => onNavigate("tareas-evaluaciones")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaChartLine />}
          label="Calificaciones"
          onClick={() => onNavigate("calificaciones")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaUserCheck />}
          label="Asistencia"
          onClick={() => onNavigate("asistencia")}
        />
        <SidebarLink
          collapsed={collapsed}
          icon={<FaBullhorn />}
          label="Comunicados"
          onClick={() => onNavigate("comunicados")}
        />
      </nav>

      <div className="sidebar-docente-footer">
        <button
          type="button"
          className="sidebar-docente-logout"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, onClick, collapsed }) {
  return (
    <button
      type="button"
      className="sidebar-docente-link"
      onClick={onClick}
      title={collapsed ? label : ""}
    >
      <span className="sidebar-docente-icon">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

export default SidebarDocente;
