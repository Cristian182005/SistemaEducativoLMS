import {
  FaBars,
  FaChartBar,
  FaClipboardList,
  FaBook,
  FaClipboardCheck,
  FaBullhorn,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoColegio from "../assets/IconColegio.ico";
import "./SidebarPadre.css";

function SidebarPadre() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const menuItems = [
    { icon: <FaChartBar />, label: "Resumen", path: "/dashboard-padre" },
    { icon: <FaClipboardList />, label: "Solicitudes de matrícula", path: "/solicitudes" },
    { icon: <FaBook />, label: "Notas", path: "/evaluaciones" },
    { icon: <FaClipboardCheck />, label: "Asistencia", path: "/horarios" },
    { icon: <FaBullhorn />, label: "Observaciones", path: "/observaciones" },
    { icon: <FaBullhorn />, label: "Comunicados", path: "/comunicados" },
    { icon: <FaMoneyBill />, label: "Pagos", path: "/reportes-pdf" },
  ];

  return (
    <aside className={`sidebar-padre ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-padre-topbar">
        <button
          type="button"
          className="sidebar-padre-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Contraer menú"
        >
          <FaBars />
        </button>
      </div>

      <div className="sidebar-padre-brand">
        <img src={logoColegio} alt="Logo colegio" />
        {!collapsed && (
          <div>
            <p className="sidebar-padre-kicker">Portal Padre</p>
            <h2>C.E.P. La Sagrada Familia</h2>
          </div>
        )}
      </div>

      <nav className="sidebar-padre-menu">
        {menuItems.map((item) => (
          <SidebarLink
            key={item.path}
            collapsed={collapsed}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      <div className="sidebar-padre-footer">
        <button
          type="button"
          className="sidebar-padre-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, onClick, active, collapsed }) {
  return (
    <button
      type="button"
      className={`sidebar-padre-link ${active ? "active" : ""}`}
      onClick={onClick}
      title={collapsed ? label : ""}
    >
      <span className="sidebar-padre-icon">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

export default SidebarPadre;
