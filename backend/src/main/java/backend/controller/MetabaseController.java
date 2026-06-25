package backend.controller;

import backend.service.MetabaseService;
import backend.service.PdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/metabase")
public class MetabaseController {

    @Autowired
    private MetabaseService metabaseService;

    @Autowired
    private PdfService pdfService;

    // =========================
    // LISTAR VISTAS DISPONIBLES
    // =========================
    @GetMapping("/vistas")
    public List<Map<String, String>> listarVistas() {
        List<Map<String, String>> vistas = new ArrayList<>();
        Map<String, String> nombres = new HashMap<>();
        nombres.put("vw_resumen_sistema", "Resumen General del Sistema");
        nombres.put("vw_estudiantes_matricula", "Estudiantes con Matricula");
        nombres.put("vw_calificaciones_detalle", "Calificaciones Detalladas");
        nombres.put("vw_promedio_estudiantes", "Promedio por Estudiante");
        nombres.put("vw_rendimiento_cursos", "Rendimiento por Curso");
        nombres.put("vw_matriculas_por_fecha", "Matriculas por Fecha");
        nombres.put("vw_distribucion_estudiantes", "Distribucion por Grado/Seccion");
        nombres.put("vw_tareas_por_curso", "Tareas por Curso");
        nombres.put("vw_solicitudes_matricula", "Solicitudes de Matricula");
        nombres.put("vw_docentes_cursos", "Docentes");
        nombres.put("vw_ranking_estudiantes", "Ranking de Estudiantes");
        nombres.put("vw_materiales_cursos", "Materiales por Curso");

        for (Map.Entry<String, String> entry : nombres.entrySet()) {
            Map<String, String> vista = new HashMap<>();
            vista.put("id", entry.getKey());
            vista.put("nombre", entry.getValue());
            vistas.add(vista);
        }
        return vistas;
    }

    // =========================
    // OBTENER DATOS DE UNA VISTA
    // =========================
    @GetMapping("/datos/{nombreVista}")
    public ResponseEntity<Map<String, Object>> obtenerDatos(@PathVariable String nombreVista) {
        Map<String, Object> datos = metabaseService.obtenerDatosVista(nombreVista);

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("columnas", datos.get("columnas"));
        resultado.put("datos", datos.get("filas"));
        resultado.put("totalFilas", ((List<?>) datos.get("filas")).size());

        return ResponseEntity.ok(resultado);
    }

    // =========================
    // GENERAR PDF DESDE VISTA
    // =========================
    @GetMapping("/pdf/{nombreVista}")
    public ResponseEntity<byte[]> generarPdfDesdeVista(
            @PathVariable String nombreVista,
            @RequestParam(defaultValue = "Reporte") String titulo) {

        byte[] pdf = metabaseService.generarPdfDesdeVista(nombreVista, titulo);

        if (pdf == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=" + nombreVista + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // =========================
    // VERIFICAR CONEXION CON METABASE
    // =========================
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> verificarConexion() {
        Map<String, Object> status = new HashMap<>();
        try {
            String token = metabaseService.autenticar();
            status.put("conectado", token != null);
            status.put("url", "http://localhost:3000");
        } catch (Exception e) {
            status.put("conectado", false);
            status.put("error", e.getMessage());
        }
        return ResponseEntity.ok(status);
    }
}
