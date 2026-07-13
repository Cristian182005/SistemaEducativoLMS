import {
  FaBars,
  FaBook,
  FaBullhorn,
  FaCalendarAlt,
  FaChartLine,
  FaComments,
  FaFilePdf,
  FaLayerGroup,
  FaSignOutAlt,
  FaTasks,
  FaTachometerAlt,
  FaUserCheck,
  FaUserCircle,
} from "react-icons/fa";

import { useState, useEffect, useRef, useCallback } from "react";

import logoColegio from "../assets/IconColegio.ico";
import "./SidebarDocente.css";

const getInitialCollapsed = () => {
  return localStorage.getItem("sidebarDocenteCollapsed") === "true";
};

function SidebarDocente({ onNavigate, onLogout }) {
  const footerRef = useRef(null);
  const menuScrollRef = useRef(null);

  const [collapsed, setCollapsed] = useState(getInitialCollapsed);
  const [activeSection, setActiveSection] = useState("cursos");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebarDocenteCollapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const savedScroll = parseInt(localStorage.getItem("sidebarDocenteScrollTop") || "0", 10);
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollTop = savedScroll;
    }
  }, []);

  const saveScrollPosition = useCallback(() => {
    if (menuScrollRef.current) {
      localStorage.setItem("sidebarDocenteScrollTop", String(menuScrollRef.current.scrollTop));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && footerRef.current && !footerRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const getUsuario = () => {
    try {
      return JSON.parse(localStorage.getItem("usuario")) || { nombre: "Docente" };
    } catch {
      return { nombre: "Docente" };
    }
  };

  const usuario = getUsuario();
  const nombreCorto = usuario.nombre ? usuario.nombre.trim().split(" ")[0] : "Docente";

  const esMujer = (nombre) => {
    if (!nombre) return false;
    const primerNombre = nombre.trim().split(" ")[0].toLowerCase();
    const excepcionesFemeninas = ["isabel", "beatriz", "carmen", "raquel", "ines", "rosario", "pilar", "luz", "mercedes", "rocio", "miriam", "ruth"];
    const excepcionesMasculinas = ["luca", "lucas", "marias", "josue", "misael"];
    if (excepcionesFemeninas.includes(primerNombre)) return true;
    if (excepcionesMasculinas.includes(primerNombre)) return false;
    return primerNombre.endsWith("a");
  };

  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setCollapsed((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((e, seccion) => {
    e.preventDefault();
    e.stopPropagation();
    saveScrollPosition();
    setActiveSection(seccion);
    onNavigate(seccion);
  }, [saveScrollPosition, onNavigate]);

  const handleLogout = () => {
    setUserMenuOpen(false);
    onLogout();
  };

  const handleVerPerfil = () => {
    setUserMenuOpen(false);
    onNavigate("perfil");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* BOTON HAMBURGUESA */}
      <div className="toggle-sidebar">
        <FaBars
          onClick={handleToggle}
          style={{ cursor: "pointer", fontSize: "22px", color: "#115133", padding: "6px", borderRadius: "8px", display: "block" }}
        />
      </div>

      {/* LOGO */}
      <div className="sidebar-header">
        <img src={logoColegio} alt="Logo Colegio" className="sidebar-logo" />
        {!collapsed && (
          <div>
            <h3 className="sidebar-title">Portal Docente</h3>
            <p className="sidebar-subtitle">C.E.P. La Sagrada Familia</p>
          </div>
        )}
      </div>

      {/* MENU */}
      <div ref={menuScrollRef} style={{ flex: 1, overflowY: "auto", paddingTop: "10px" }}>
        <MenuSection title="Menú Principal" collapsed={collapsed} />
        <MenuItem
          icon={<FaTachometerAlt />}
          text="Dashboard"
          collapsed={collapsed}
          active={activeSection === "cursos"}
          onClick={(e) => handleNavigate(e, "cursos")}
        />

        <MenuSection title="Gestión Académica" collapsed={collapsed} />
        <MenuItem
          icon={<FaLayerGroup />}
          text="Mis cursos"
          collapsed={collapsed}
          active={activeSection === "mis-cursos"}
          onClick={(e) => handleNavigate(e, "mis-cursos")}
        />
        <MenuItem
          icon={<FaBook />}
          text="Contenido"
          collapsed={collapsed}
          active={activeSection === "contenido"}
          onClick={(e) => handleNavigate(e, "contenido")}
        />
        <MenuItem
          icon={<FaTasks />}
          text="Tareas y evaluaciones"
          collapsed={collapsed}
          active={activeSection === "tareas-evaluaciones"}
          onClick={(e) => handleNavigate(e, "tareas-evaluaciones")}
        />
        <MenuItem
          icon={<FaChartLine />}
          text="Calificaciones"
          collapsed={collapsed}
          active={activeSection === "calificaciones"}
          onClick={(e) => handleNavigate(e, "calificaciones")}
        />

        <MenuSection title="Gestión del Aula" collapsed={collapsed} />
        <MenuItem
          icon={<FaUserCheck />}
          text="Asistencia"
          collapsed={collapsed}
          active={activeSection === "asistencia"}
          onClick={(e) => handleNavigate(e, "asistencia")}
        />
        <MenuItem
          icon={<FaComments />}
          text="Foro del curso"
          collapsed={collapsed}
          active={activeSection === "foro"}
          onClick={(e) => handleNavigate(e, "foro")}
        />

        <MenuSection title="Comunicación" collapsed={collapsed} />
        <MenuItem
          icon={<FaBullhorn />}
          text="Comunicados"
          collapsed={collapsed}
          active={activeSection === "comunicados"}
          onClick={(e) => handleNavigate(e, "comunicados")}
        />

        <MenuSection title="Reportes" collapsed={collapsed} />
        <MenuItem
          icon={<FaCalendarAlt />}
          text="Horario"
          collapsed={collapsed}
          active={activeSection === "horario"}
          onClick={(e) => handleNavigate(e, "horario")}
        />
        <MenuItem
          icon={<FaFilePdf />}
          text="Reportes de curso"
          collapsed={collapsed}
          active={activeSection === "reportes"}
          onClick={(e) => handleNavigate(e, "reportes")}
        />
      </div>

      {/* FOOTER */}
      <div className="sidebar-footer" ref={footerRef}>
        <div
          className={`user-profile-button ${userMenuOpen ? "open" : ""}`}
          onClick={() => setUserMenuOpen((prev) => !prev)}
          title={collapsed ? "Usuario" : "Abrir menú de usuario"}
        >
          <div className="avatar-circle">
            {esMujer(usuario.nombre) ? (
              <svg viewBox="0 0 100 100" className="avatar-svg">
                <path d="M30,35 C20,30 25,65 32,75 C35,65 30,45 35,35 Z" fill="#2b1a0a" />
                <path d="M70,35 C80,30 75,65 68,75 C65,65 70,45 65,35 Z" fill="#2b1a0a" />
                <circle cx="36" cy="46" r="4" fill="#f5c0a0" />
                <circle cx="64" cy="46" r="4" fill="#f5c0a0" />
                <path d="M37,36 Q37,26 50,26 Q63,26 63,36 L63,48 Q63,58 50,58 Q37,58 37,48 Z" fill="#fcd0b4" />
                <ellipse cx="44" cy="41" rx="1.5" ry="2.5" fill="#333" />
                <ellipse cx="56" cy="41" rx="1.5" ry="2.5" fill="#333" />
                <path d="M41,39 Q44,37 46,39" fill="none" stroke="#333" strokeWidth="1" />
                <path d="M54,39 Q56,37 59,39" fill="none" stroke="#333" strokeWidth="1" />
                <path d="M49,44 Q51,46 49,47" fill="none" stroke="#e59d7a" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M46,51 Q50,55 54,51" fill="none" stroke="#b04040" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M36,36 Q50,20 64,36 Q64,26 50,22 Q36,26 36,36 Z" fill="#3d2512" />
                <path d="M36,34 Q33,42 37,46 Q39,38 38,34 Z" fill="#3d2512" />
                <path d="M64,34 Q67,42 63,46 Q61,38 62,34 Z" fill="#3d2512" />
                <path d="M46,56 L54,56 L54,64 L46,64 Z" fill="#fcd0b4" />
                <path d="M26,85 Q26,64 50,64 Q74,64 74,85 Z" fill="#a62649" />
                <path d="M42,64 L50,74 L58,64 Z" fill="#fff" />
                <path d="M45,64 L50,70 L55,64 Z" fill="#a62649" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 100" className="avatar-svg">
                <path d="M36,36 C30,25 45,10 65,13 C75,15 72,30 68,36 Z" fill="#4a3728" />
                <circle cx="37" cy="45" r="4" fill="#e0a080" />
                <circle cx="37" cy="45" r="2" fill="#c88868" />
                <circle cx="67" cy="44" r="4" fill="#e0a080" />
                <path d="M67,42 A2,2 0 0,1 69,44 A2,2 0 0,1 67,46" fill="none" stroke="#c88868" strokeWidth="0.8" />
                <path d="M38,36 Q38,26 52,26 Q66,26 66,36 L66,48 Q66,58 52,58 Q38,58 38,48 Z" fill="#f3be9f" />
                <ellipse cx="44" cy="40" rx="1.5" ry="3" fill="#333" />
                <ellipse cx="58" cy="40" rx="1.5" ry="3" fill="#333" />
                <path d="M51,43 Q53,46 51,47" fill="none" stroke="#d59273" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M47,50 Q52,54 56,50" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M37,35 Q44,18 56,20 Q66,16 67,28 Q67,34 66,36 Q60,30 52,32 Q42,32 37,35 Z" fill="#4a3728" />
                <path d="M37,35 Q35,42 38,44 Q40,38 39,35 Z" fill="#4a3728" />
                <path d="M47,56 L57,56 L57,64 L47,64 Z" fill="#e0a080" />
                <path d="M47,56 Q52,60 57,56" fill="none" stroke="#c88868" strokeWidth="1" />
                <path d="M26,85 Q26,64 52,64 Q78,64 78,85 Z" fill="#2d8a4e" />
                <path d="M44,64 Q52,72 60,64 Q52,67 44,64 Z" fill="#fff" />
              </svg>
            )}
          </div>
          {!collapsed && (
            <div className="user-greeting">
              <div className="user-hello">Hola,</div>
              <div className="user-name">{nombreCorto}</div>
            </div>
          )}
        </div>

        {userMenuOpen && (
          <div className={`user-menu ${collapsed ? "collapsed" : ""}`}>
            <div
              className={`user-menu-item ${collapsed ? "icon-only" : ""}`}
              title={collapsed ? "Ver perfil" : undefined}
              onClick={handleVerPerfil}
            >
              <FaUserCircle />
              {!collapsed && <span>Ver perfil</span>}
            </div>
            <div
              className={`user-menu-item logout ${collapsed ? "icon-only" : ""}`}
              title={collapsed ? "Cerrar sesión" : undefined}
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              {!collapsed && <span>Cerrar sesión</span>}
            </div>
          </div>
        )}
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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(e)}
    >
      {icon}
      {!collapsed && <span>{text}</span>}
    </div>
  );
}

export default SidebarDocente;
