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
  FaChartLine,
} from "react-icons/fa";

import "./Sidebar.css";
import logoColegio from "../assets/IconColegio.ico";

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Lee el valor de localStorage UNA sola vez, fuera del componente
const getInitialCollapsed = () => {
  return localStorage.getItem("sidebarCollapsed") === "true";
};

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const footerRef = useRef(null);
  const menuScrollRef = useRef(null); // referencia al div scrolleable del menú

  // Se inicializa correctamente con la función lazy del useState
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Persiste el estado en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(collapsed));
  }, [collapsed]);

  // Restaura la posición de scroll al montar el componente
  useEffect(() => {
    const savedScroll = parseInt(localStorage.getItem("sidebarScrollTop") || "0", 10);
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollTop = savedScroll;
    }
  }, []);

  // Guarda la posición de scroll al navegar (antes de que el componente se re-renderice)
  const saveScrollPosition = useCallback(() => {
    if (menuScrollRef.current) {
      localStorage.setItem("sidebarScrollTop", String(menuScrollRef.current.scrollTop));
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
      return JSON.parse(localStorage.getItem("usuario")) || { nombre: "Usuario" };
    } catch {
      return { nombre: "Usuario" };
    }
  };

  const usuario = getUsuario();
  const nombreCorto = usuario.nombre ? usuario.nombre.trim().split(" ")[0] : "Usuario";

  const esMujer = (nombre) => {
    if (!nombre) return false;
    const primerNombre = nombre.trim().split(" ")[0].toLowerCase();

    const excepcionesFemeninas = ["isabel", "beatriz", "carmen", "raquel", "ines", "rosario", "pilar", "luz", "mercedes", "rocio", "miriam", "ruth"];
    const excepcionesMasculinas = ["luca", "lucas", "marias", "josue", "misael"];

    if (excepcionesFemeninas.includes(primerNombre)) return true;
    if (excepcionesMasculinas.includes(primerNombre)) return false;

    return primerNombre.endsWith("a");
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleVerPerfil = () => {
    setUserMenuOpen(false);
    navigate("/usuarios");
  };

  // Navega sin recargar la página, guardando el scroll antes de cambiar de ruta
  const handleNavigate = useCallback((e, path) => {
    e.preventDefault();
    e.stopPropagation();
    saveScrollPosition();
    navigate(path);
  }, [navigate, saveScrollPosition]);

  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* BOTÓN HAMBURGUESA */}
      <div className="toggle-sidebar">
        <FaBars
          onClick={handleToggle}
          style={{ cursor: "pointer", fontSize: "22px", color: "#0d3b2e", padding: "6px", borderRadius: "8px", display: "block" }}
        />
      </div>

      {/* LOGO */}
      <div className="sidebar-header">
        <img src={logoColegio} alt="Logo Colegio" className="sidebar-logo" />

        {!collapsed && (
          <div>
            <h3 className="sidebar-title">Colegio C.E.P La Sagrada Familia</h3>
            <p className="sidebar-subtitle">LMS Académico</p>
          </div>
        )}
      </div>

      {/* MENÚ */}
      <div ref={menuScrollRef} style={{ flex: 1, overflowY: "auto", paddingTop: "10px" }}>
        <MenuSection title="Menú Principal" collapsed={collapsed} />

        <MenuItem
          icon={<FaUsers />}
          text="Dashboard"
          collapsed={collapsed}
          active={location.pathname === "/dashboard"}
          onClick={(e) => handleNavigate(e, "/dashboard")}
        />

        <MenuSection title="Gestión Académica" collapsed={collapsed} />

        <MenuItem
          icon={<FaBook />}
          text="Cursos"
          collapsed={collapsed}
          active={location.pathname === "/cursos"}
          onClick={(e) => handleNavigate(e, "/cursos")}
        />

        <MenuItem
          icon={<FaUserGraduate />}
          text="Estudiantes"
          collapsed={collapsed}
          active={location.pathname === "/estudiantes"}
          onClick={(e) => handleNavigate(e, "/estudiantes")}
        />

        <MenuItem
          icon={<FaChalkboardTeacher />}
          text="Docentes"
          collapsed={collapsed}
          active={location.pathname === "/docentes"}
          onClick={(e) => handleNavigate(e, "/docentes")}
        />

        <MenuItem
          icon={<FaClipboardList />}
          text="Matrículas"
          collapsed={collapsed}
          active={location.pathname === "/matriculas"}
          onClick={(e) => handleNavigate(e, "/matriculas")}
        />

        <MenuSection title="Gestión Escolar" collapsed={collapsed} />

        <MenuItem
          icon={<FaTasks />}
          text="Asignaciones"
          collapsed={collapsed}
          active={location.pathname === "/asignaciones"}
          onClick={(e) => handleNavigate(e, "/asignaciones")}
        />

        <MenuItem
          icon={<FaCalendarAlt />}
          text="Horario Maestro"
          collapsed={collapsed}
          active={location.pathname === "/horarios"}
          onClick={(e) => handleNavigate(e, "/horarios")}
        />

        <MenuItem
          icon={<FaClipboardList />}
          text="Evaluaciones"
          collapsed={collapsed}
          active={location.pathname === "/evaluaciones"}
          onClick={(e) => handleNavigate(e, "/evaluaciones")}
        />

        <MenuSection title="Usuarios" collapsed={collapsed} />

        <MenuItem
          icon={<FaUserFriends />}
          text="Padres"
          collapsed={collapsed}
          active={location.pathname === "/padres"}
          onClick={(e) => handleNavigate(e, "/padres")}
        />

        <MenuItem
          icon={<FaUserCog />}
          text="Usuarios"
          collapsed={collapsed}
          active={location.pathname === "/usuarios"}
          onClick={(e) => handleNavigate(e, "/usuarios")}
        />

        <MenuItem
          icon={<FaLink />}
          text="Vínculos Padre-Hijo"
          collapsed={collapsed}
          active={location.pathname === "/vincular-padre-hijo"}
          onClick={(e) => handleNavigate(e, "/vincular-padre-hijo")}
        />

        <MenuSection title="Procesos" collapsed={collapsed} />

        <MenuItem
          icon={<FaClipboardList />}
          text="Solicitudes"
          collapsed={collapsed}
          active={location.pathname === "/solicitudes"}
          onClick={(e) => handleNavigate(e, "/solicitudes")}
        />

        <MenuItem
          icon={<FaBullhorn />}
          text="Comunicados"
          collapsed={collapsed}
          active={location.pathname === "/comunicados"}
          onClick={(e) => handleNavigate(e, "/comunicados")}
        />

        <MenuItem
          icon={<FaComments />}
          text="Observaciones"
          collapsed={collapsed}
          active={location.pathname === "/observaciones"}
          onClick={(e) => handleNavigate(e, "/observaciones")}
        />

        <MenuSection title="Reportes" collapsed={collapsed} />

        <MenuItem
          icon={<FaFilePdf />}
          text="Reportes PDF"
          collapsed={collapsed}
          active={location.pathname === "/reportes-pdf"}
          onClick={(e) => handleNavigate(e, "/reportes-pdf")}
        />

        <MenuItem
          icon={<FaFileExcel />}
          text="Reportes Excel"
          collapsed={collapsed}
          active={location.pathname === "/reportes-excel"}
          onClick={(e) => handleNavigate(e, "/reportes-excel")}
        />

        <MenuItem
          icon={<FaFilePdf />}
          text="Generar Matrícula"
          collapsed={collapsed}
          active={location.pathname === "/generar-matricula"}
          onClick={(e) => handleNavigate(e, "/generar-matricula")}
        />

        <MenuItem
          icon={<FaChartLine />}
          text="Reportes Metabase"
          collapsed={collapsed}
          active={location.pathname === "/reportes-metabase"}
          onClick={(e) => handleNavigate(e, "/reportes-metabase")}
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

export default Sidebar;