import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaUserGraduate } from "react-icons/fa";

import logoColegio from "../assets/IconColegio.ico";

import "./Login.css";

import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [error, setError] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await login({
        correo,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

        await Swal.fire({
          title: "¡Bienvenido!",

          html: `
      <div style="font-size:16px;">
        Bienvenido a <b>C.E.P. LA SAGRADA FAMILIA</b><br><br>
        Señor(a): <b>${response.data.usuario.nombre}</b>
      </div>
    `,

          icon: "success",

          confirmButtonText: "Ingresar",

          confirmButtonColor: "#7f1d1d",

          background: "#ffffff",

          color: "#333",

          customClass: {
            popup: "rounded-modal",
          },
        });

        const rol = (response.data.usuario.rol || "").toUpperCase();

        if (rol === "PADRE") {
          navigate("/dashboard-padre");
        } else if (rol === "DOCENTE") {
          navigate("/dashboard-docente");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Correo o contraseña incorrectos");

        setCorreo("");
        setPassword("");
      }
    } catch (error) {
      setError("Error del servidor");

      setCorreo("");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      {/* PANEL IZQUIERDO */}

      <div className="login-left">
        <div className="overlay"></div>

        <div className="contenido-left">
          <img src={logoColegio} alt="Logo Colegio" className="logo-colegio" />

          <h1 className="titulo-colegio">C.E.P.</h1>

          <h2 className="nombre-colegio">LA SAGRADA FAMILIA</h2>

          <div className="linea"></div>

          <p className="descripcion">
            Sistema Educativo LMS para la gestión académica institucional.
          </p>
        </div>
      </div>

      {/* PANEL DERECHO */}

      <div className="login-right">
        <div className="login-box">
          <div className="icono-login">
            <FaUserGraduate />
          </div>

          <h1 className="bienvenido">Bienvenido</h1>

          <p className="subtitulo">Inicia sesión para continuar</p>

          <form onSubmit={iniciarSesion}>
            {/* CORREO */}

            <div className="input-group-custom">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}

            <div className="input-group-custom password-container">
              <input
                type={mostrarPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* ERROR */}

            {error && <div className="error-message">{error}</div>}

            {/* OPCIONES */}

            <div className="options">
              <div className="mostrar-password">👁 Mostrar contraseña</div>

              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            {/* BOTON */}

            <button type="submit" className="btn-login">
              Iniciar Sesión
            </button>
          </form>

          {/* REGISTRO */}

          <div
            style={{
              marginTop: "25px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "gray" }}>¿No tienes cuenta? </span>

            <span
              onClick={() => navigate("/register-padre")}
              style={{
                color: "#7f1d1d",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Regístrate aquí
            </span>
          </div>

          {/* FOOTER */}

          <div className="footer-login">© 2026 C.E.P. LA SAGRADA FAMILIA</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
