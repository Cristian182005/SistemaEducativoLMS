package backend.controller;

import backend.dto.AlumnoCursoDTO;
import backend.service.AlumnoCursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controlador REST para listar los alumnos asignados a un curso especifico.
 */
@RestController
@RequestMapping("/api/alumnos-curso")
@CrossOrigin(origins = "*")
public class AlumnoCursoController {

    @Autowired
    private AlumnoCursoService service;

    /**
     * Lista los alumnos asignados a un curso y docente especificos.
     *
     * @param idCurso identificador del curso
     * @param idDocente identificador del docente
     * @return respuesta con la lista de alumnos, total y estado de exito
     */
    @GetMapping
    public ResponseEntity<?> listarAlumnos(
            @RequestParam String idCurso,
            @RequestParam String idDocente) {
        try {
            List<AlumnoCursoDTO> lista = service.listarAlumnos(idCurso, idDocente);

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("success", true);
            respuesta.put("data", lista);
            respuesta.put("total", lista.size());

            return ResponseEntity.ok(respuesta);

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("mensaje", "Error: " + e.getMessage());

            return ResponseEntity.badRequest().body(error);
        }
    }
}
