package backend.controller;

import backend.model.Curso;
import backend.repository.CursoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de cursos del sistema educativo.
 * Proporciona operaciones CRUD basicas.
 */
@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "http://localhost:5173")
public class CursoController {

    @Autowired
    private CursoRepository cursoRepository;

    /** Lista todos los cursos registrados en el sistema. @return lista de cursos */
    @GetMapping
    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    /** Guarda un nuevo curso en el sistema. @param curso datos del curso a guardar @return curso creado */
    @PostMapping
    public Curso guardarCurso(@RequestBody Curso curso) {
        return cursoRepository.save(curso);
    }

    /** Obtiene un curso por su identificador. @param id identificador del curso @return curso encontrado o null */
    @GetMapping("/{id}")
    public Curso obtenerCurso(@PathVariable Integer id) {
        return cursoRepository.findById(id).orElse(null);
    }

    /** Actualiza los datos de un curso existente. @param id identificador del curso @param datos nuevos datos del curso @return curso actualizado o null si no se encuentra */
    @PutMapping("/{id}")
    public Curso actualizarCurso(
            @PathVariable Integer id,
            @RequestBody Curso datos) {

        Curso curso = cursoRepository.findById(id).orElse(null);

        if (curso != null) {

            curso.setNombre(datos.getNombre());

            curso.setDescripcion(datos.getDescripcion());

            curso.setDocente(datos.getDocente());

            return cursoRepository.save(curso);
        }

        return null;
    }

    /** Elimina un curso por su identificador. @param id identificador del curso @return mensaje de confirmacion */
    @DeleteMapping("/{id}")
    public String eliminarCurso(@PathVariable Integer id) {

        cursoRepository.deleteById(id);

        return "Curso eliminado correctamente";
    }
}