import Sidebar from "../components/Sidebar";

function Evaluaciones() {
  return (
    <div style={{ display: "flex", background: "#f8f9fa", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <Sidebar />

      <div style={{ flex: 1, marginLeft: "270px", padding: "40px", minWidth: "0" }}>
        
        {/* CABECERA */}
        <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "16px", background: "linear-gradient(135deg, #115133 0%, #1a6b45 100%)", color: "#fff" }}>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">
            <div className="flex-grow-1">
              <h2 className="fw-bold m-0" style={{ fontSize: "26px" }}>Módulo de Evaluaciones</h2>
              <p className="text-white-50 small m-0 mt-1">Gestión de evaluaciones académicas.</p>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="card border-0 shadow-sm p-5" style={{ borderRadius: "20px", backgroundColor: "#fff" }}>
          <div className="text-center py-5">
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#eef7f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span style={{ fontSize: "32px" }}>📝</span>
            </div>
            <h4 className="fw-bold mb-2" style={{ color: "#115133" }}>Módulo en Construcción</h4>
            <p className="text-muted">Este módulo está siendo desarrollado. Pronto estará disponible.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evaluaciones;