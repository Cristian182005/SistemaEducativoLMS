import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function CalendarioDashboard() {
  const [fechaActual, setFechaActual] = useState(new Date());

  const hoy = new Date();

  const mes = fechaActual.getMonth();
  const anio = fechaActual.getFullYear();

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diasSemana = [
    "Lu",
    "Ma",
    "Mi",
    "Ju",
    "Vi",
    "Sa",
    "Do",
  ];

  const primerDiaMes = new Date(anio, mes, 1);

  let inicioSemana = primerDiaMes.getDay();

  inicioSemana = inicioSemana === 0 ? 6 : inicioSemana - 1;

  const diasMes = new Date(
    anio,
    mes + 1,
    0
  ).getDate();

  const cambiarMes = (direccion) => {
    setFechaActual(
      new Date(anio, mes + direccion, 1)
    );
  };

  const celdas = [];

  for (let i = 0; i < inicioSemana; i++) {
    celdas.push(<div key={`vacio-${i}`}></div>);
  }

  for (let dia = 1; dia <= diasMes; dia++) {
    const esHoy =
      dia === hoy.getDate() &&
      mes === hoy.getMonth() &&
      anio === hoy.getFullYear();

    celdas.push(
      <div
        key={dia}
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "600",
          background: esHoy
            ? "#7f1d1d"
            : "transparent",
          color: esHoy ? "white" : "#1e293b",
        }}
      >
        {dia}
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow:
          "0 3px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h5
        style={{
          color: "#0d3b2e",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        Calendario
      </h5>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          className="btn btn-sm"
          style={{
            background: "#14532d",
            color: "white",
          }}
          onClick={() => cambiarMes(-1)}
        >
          <FaChevronLeft />
        </button>

        <h5
          style={{
            margin: 0,
            fontWeight: "700",
            color: "#0d3b2e",
          }}
        >
          {nombresMeses[mes]} {anio}
        </h5>

        <button
          className="btn btn-sm"
          style={{
            background: "#14532d",
            color: "white",
          }}
          onClick={() => cambiarMes(1)}
        >
          <FaChevronRight />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(7, 1fr)",
          gap: "8px",
          textAlign: "center",
        }}
      >
        {diasSemana.map((dia) => (
          <div
            key={dia}
            style={{
              fontWeight: "700",
              color: "#0d3b2e",
            }}
          >
            {dia}
          </div>
        ))}

        {celdas}
      </div>
    </div>
  );
}

export default CalendarioDashboard;