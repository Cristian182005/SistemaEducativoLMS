package backend.controller;

import backend.service.PdfService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/pdf")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    // =========================
    // 1. FICHA DE MATRICULA
    // =========================
    @GetMapping("/matricula/{idEstudiante}")
    public ResponseEntity<byte[]> generarFichaMatricula(
            @PathVariable Integer idEstudiante) {

        byte[] pdf = pdfService.generarFichaMatricula(idEstudiante);

        if (pdf == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=ficha_matricula.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // =========================
    // 2. BOLETA DE CALIFICACIONES
    // =========================
    @GetMapping("/boleta/{idEstudiante}")
    public ResponseEntity<byte[]> generarBoletaCalificaciones(
            @PathVariable Integer idEstudiante) {

        byte[] pdf = pdfService.generarBoletaCalificaciones(idEstudiante);

        if (pdf == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=boleta_calificaciones.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // =========================
    // 3. REPORTE GENERAL DE NOTAS POR CURSO
    // =========================
    @GetMapping("/reporte-notas/{idCurso}")
    public ResponseEntity<byte[]> generarReporteGeneralNotas(
            @PathVariable Integer idCurso) {

        byte[] pdf = pdfService.generarReporteGeneralNotas(idCurso);

        if (pdf == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=reporte_general_notas.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // =========================
    // 4. CONSTANCIA DE MATRICULA
    // =========================
    @GetMapping("/constancia-matricula/{idEstudiante}")
    public ResponseEntity<byte[]> generarConstanciaMatricula(
            @PathVariable Integer idEstudiante) {

        byte[] pdf = pdfService.generarConstanciaMatricula(idEstudiante);

        if (pdf == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=constancia_matricula.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    // =========================
    // 5. LISTADO DE ESTUDIANTES
    // =========================
    @GetMapping("/listado-estudiantes")
    public ResponseEntity<byte[]> generarListadoEstudiantes(
            @RequestParam(required = false) String grado,
            @RequestParam(required = false) String seccion) {

        byte[] pdf = pdfService.generarListadoEstudiantes(grado, seccion);

        if (pdf == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=listado_estudiantes.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
