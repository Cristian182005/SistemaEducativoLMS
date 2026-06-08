import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import DashboardDocente from "../pages/DashboardDocente";
import DashboardPadre from "../pages/DashboardPadre";
import Login from "../pages/Login";

import Cursos from "../pages/Cursos";
import Docentes from "../pages/Docentes";
import Estudiantes from "../pages/Estudiantes";
import Matriculas from "../pages/Matriculas";
import Padres from "../pages/Padres";

import GenerarMatricula from "../pages/GenerarMatricula";
import RegisterPadre from "../pages/RegisterPadre";

import Asignaciones from "../pages/Asignaciones";
import Evaluaciones from "../pages/Evaluaciones";
import Horarios from "../pages/Horarios";

import Usuarios from "../pages/Usuarios";
import VincularPadreHijo from "../pages/VincularPadreHijo";

import Comunicados from "../pages/Comunicados";
import Observaciones from "../pages/Observaciones";
import Solicitudes from "../pages/SolicitudesMatricula";

import ReportesExcel from "../pages/ReporteExcel";
import ReportesPDF from "../pages/ReportePdf";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-padre" element={<DashboardPadre />} />
        <Route path="/dashboard-docente" element={<DashboardDocente />} />

        <Route path="/register-padre" element={<RegisterPadre />} />

        {/* Gestión Académica */}

        <Route path="/cursos" element={<Cursos />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/docentes" element={<Docentes />} />
        <Route path="/matriculas" element={<Matriculas />} />

        {/* Gestión Escolar */}

        <Route path="/asignaciones" element={<Asignaciones />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/evaluaciones" element={<Evaluaciones />} />

        {/* Usuarios */}

        <Route path="/padres" element={<Padres />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/vincular-padre-hijo" element={<VincularPadreHijo />} />

        {/* Procesos */}

        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/comunicados" element={<Comunicados />} />
        <Route path="/observaciones" element={<Observaciones />} />

        {/* Reportes */}

        <Route path="/reportes-pdf" element={<ReportesPDF />} />
        <Route path="/reportes-excel" element={<ReportesExcel />} />

        <Route path="/generar-matricula" element={<GenerarMatricula />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
