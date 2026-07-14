package backend.controller;

import backend.dto.TareaCalificacionDTO;
import backend.dto.ResultadoTareaDTO;
import backend.service.TareaCalificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST para el registro de tareas con calificaciones asociadas.
 */
@RestController
@RequestMapping("/api/tarea-calificacion")
@CrossOrigin(origins = "*")
public class TareaCalificacionController {

    @Autowired
    private TareaCalificacionService service;

    /**
     * Registra una nueva tarea con las calificaciones de los estudiantes asociados.
     *
     * @param dto objeto de transferencia de datos con la informacion de la tarea y las calificaciones
     * @return ResponseEntity con el resultado del registro, incluyendo el ID de la tarea y el total de calificaciones
     */
    @PostMapping
    public ResponseEntity<?> registrarTarea(@RequestBody TareaCalificacionDTO dto) {
        try {
            System.out.println("DTO recibido: " + dto.getTitulo() + " - Curso: " + dto.getIdCurso());
            ResultadoTareaDTO resultado = service.registrarTarea(dto);
            System.out.println("Resultado: ID Tarea=" + resultado.getIdTarea() + ", Calificaciones=" + resultado.getTotalCalificaciones());

            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("success", true);
            respuesta.put("mensaje", resultado.getMensaje());
            respuesta.put("data", resultado);

            return ResponseEntity.ok(respuesta);

        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("mensaje", "Error al registrar tarea: " + e.getMessage());

            return ResponseEntity.badRequest().body(error);
        }
    }
}
