package backend.controller;

import backend.model.Tarea;
import backend.repository.TareaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de tareas asignadas a cursos.
 */
@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "http://localhost:5173")
public class TareaController {

    @Autowired
    private TareaRepository tareaRepository;

    /** Lista las tareas asociadas a un curso especifico. @param idCurso identificador del curso @return lista de tareas del curso */
    @GetMapping("/por-curso/{idCurso}")
    public List<Tarea> listarTareasPorCurso(@PathVariable Integer idCurso) {
        return tareaRepository.findByCurso(idCurso);
    }

    /** Lista todas las tareas registradas en el sistema. @return lista de tareas */
    @GetMapping
    public List<Tarea> listarTareas() {
        return tareaRepository.findAll();
    }

    /** Guarda una nueva tarea en el sistema. @param tarea datos de la tarea a guardar @return tarea creada */
    @PostMapping
    public Tarea guardarTarea(@RequestBody Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    /** Obtiene una tarea por su identificador. @param id identificador de la tarea @return tarea encontrada o null */
    @GetMapping("/{id}")
    public Tarea obtenerTarea(@PathVariable Long id) {
        return tareaRepository.findById(id).orElse(null);
    }

    /** Actualiza los datos de una tarea existente. @param id identificador de la tarea @param datos nuevos datos de la tarea @return tarea actualizada o null si no se encuentra */
    @PutMapping("/{id}")
    public Tarea actualizarTarea(@PathVariable Long id,
                                 @RequestBody Tarea datos) {

        Tarea tarea = tareaRepository.findById(id).orElse(null);

        if (tarea != null) {

            tarea.setTitulo(datos.getTitulo());
            tarea.setDescripcion(datos.getDescripcion());
            tarea.setFechaEntrega(datos.getFechaEntrega());

            return tareaRepository.save(tarea);
        }

        return null;
    }

    /** Elimina una tarea por su identificador. @param id identificador de la tarea @return mensaje de confirmacion */
    @DeleteMapping("/{id}")
    public String eliminarTarea(@PathVariable Long id) {

        tareaRepository.deleteById(id);

        return "Tarea eliminada correctamente";
    }
}