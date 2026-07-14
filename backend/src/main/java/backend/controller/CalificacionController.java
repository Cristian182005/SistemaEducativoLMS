package backend.controller;

import backend.model.Calificacion;
import backend.repository.CalificacionRepository;
import backend.dto.CalificacionEstudianteDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de calificaciones de estudiantes.
 */
@RestController
@RequestMapping("/api/calificaciones")
@CrossOrigin(origins = "http://localhost:5173")
public class CalificacionController {

    @Autowired
    private CalificacionRepository calificacionRepository;  

    /** Lista las calificaciones de un estudiante con informacion de tarea y curso. @param idEstudiante identificador del estudiante @return lista de calificaciones del estudiante */
    @GetMapping("/por-estudiante/{idEstudiante}")
    public List<CalificacionEstudianteDTO> listarCalificacionesPorEstudiante(
            @PathVariable Integer idEstudiante) {
        return calificacionRepository.findCalificacionesEstudiante(idEstudiante);
    }

    /** Lista todas las calificaciones registradas en el sistema. @return lista de calificaciones */
    @GetMapping
    public List<Calificacion> listarCalificaciones() {
        return calificacionRepository.findAll();
    }

    /** Guarda una nueva calificacion en el sistema. @param calificacion datos de la calificacion a guardar @return calificacion creada */
    @PostMapping
    public Calificacion guardarCalificacion(@RequestBody Calificacion calificacion) {
        return calificacionRepository.save(calificacion);
    }

    /** Obtiene una calificacion por su identificador. @param id identificador de la calificacion @return calificacion encontrada o null */
    @GetMapping("/{id}")
    public Calificacion obtenerCalificacion(@PathVariable Long id) {
        return calificacionRepository.findById(id).orElse(null);
    }

    /** Actualiza los datos de una calificacion existente. @param id identificador de la calificacion @param datos nuevos datos de la calificacion @return calificacion actualizada o null si no se encuentra */
    @PutMapping("/{id}")
    public Calificacion actualizarCalificacion(@PathVariable Long id,
                                               @RequestBody Calificacion datos) {

        Calificacion calificacion = calificacionRepository.findById(id).orElse(null);

        if (calificacion != null) {

            calificacion.setNota(datos.getNota());
            calificacion.setObservacion(datos.getObservacion());

            return calificacionRepository.save(calificacion);
        }

        return null;
    }

    /** Elimina una calificacion por su identificador. @param id identificador de la calificacion @return mensaje de confirmacion */
    @DeleteMapping("/{id}")
    public String eliminarCalificacion(@PathVariable Long id) {

        calificacionRepository.deleteById(id);

        return "Calificación eliminada correctamente";
    }
}