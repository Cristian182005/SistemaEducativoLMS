import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaUsers } from "react-icons/fa";

import logoColegio from "../assets/IconColegio.ico";

import "./Login.css";

import Swal from "sweetalert2";

function RegisterPadre() {
  const navigate = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    telefono: "",
    direccion: "",
    tipo: "Padre",

    correo: "",
    password: "",
    confirmarPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registrar = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/register-padre",
        {
          nombres: form.nombres,
          apellidos: form.apellidos,
          dni: form.dni,
          telefono: form.telefono,
          direccion: form.direccion,
          tipo: form.tipo,

          correo: form.correo,
          password: form.password,
        },
      );

      if (response.data.success) {
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

        await Swal.fire({
          title: "¡Cuenta creada!",

          html: `
        <div style="font-size:16px;">
            Cuenta creada correctamente.<br><br>
            Ahora inicia sesión.
        </div>
    `,

          icon: "success",

          confirmButtonText: "Ir al Login",

          confirmButtonColor: "#7f1d1d",

          background: "#ffffff",

          color: "#333",
        });

        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Error del servidor");
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
          {/* ICONO */}

          <div className="icono-login">
            <FaUsers />
          </div>

          {/* TITULO */}

          <h1 className="bienvenido">Crear Cuenta</h1>

          <p className="subtitulo">Registro de Padre o Madre de Familia</p>

          <form onSubmit={registrar}>
            <div className="input-group-custom">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <input
                type="text"
                name="nombres"
                placeholder="Nombres"
                value={form.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={form.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={form.dni}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={form.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <select name="tipo" value={form.tipo} onChange={handleChange} required>
                <option value="Padre">Padre</option>
                <option value="Madre">Madre</option>
                <option value="Apoderado">Apoderado</option>
              </select>
            </div>
            {/* PASSWORD */}

            <div className="input-group-custom password-container">
              <input
                type={mostrarPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* CONFIRMAR PASSWORD */}

            <div className="input-group-custom password-container">
              <input
                type={mostrarConfirmar ? "text" : "password"}
                name="confirmarPassword"
                placeholder="Confirmar contraseña"
                value={form.confirmarPassword}
                onChange={handleChange}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
              >
                {mostrarConfirmar ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* ERROR */}

            {error && <div className="error-message">{error}</div>}

            {/* OPCIONES */}

            <div className="options">
              <div className="mostrar-password">
                👨‍👩‍👦 Registro seguro para padres
              </div>
            </div>

            {/* BOTON */}

            <button type="submit" className="btn-login">
              Crear Cuenta
            </button>
          </form>

          {/* LOGIN */}

          <div
            style={{
              marginTop: "25px",
              textAlign: "center",
            }}
          >
            <span style={{ color: "gray" }}>¿Ya tienes cuenta? </span>

            <span
              onClick={() => navigate("/")}
              style={{
                color: "#7f1d1d",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Inicia sesión
            </span>
          </div>

          {/* FOOTER */}

          <div className="footer-login">© 2026 C.E.P. LA SAGRADA FAMILIA</div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPadre;
