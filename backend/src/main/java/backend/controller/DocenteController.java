package backend.controller;

import backend.model.Docente;
import backend.repository.DocenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de docentes del sistema educativo.
 */
@RestController
@RequestMapping("/api/docentes")
@CrossOrigin(origins = "http://localhost:5173")
public class DocenteController {

    @Autowired
    private DocenteRepository docenteRepository;

    /** Lista todos los docentes registrados en el sistema. @return lista de docentes */
    @GetMapping
    public List<Docente> listarDocentes() {
        return docenteRepository.findAll();
    }

    /** Guarda un nuevo docente en el sistema. @param docente datos del docente a guardar @return docente creado */
    @PostMapping
    public Docente guardarDocente(@RequestBody Docente docente) {
        return docenteRepository.save(docente);
    }

    /** Obtiene un docente por su identificador. @param id identificador del docente @return docente encontrado o null */
    @GetMapping("/{id}")
    public Docente obtenerDocente(@PathVariable Long id) {
        return docenteRepository.findById(id).orElse(null);
    }

    /** Actualiza los datos de un docente existente. @param id identificador del docente @param datos nuevos datos del docente @return docente actualizado o null si no se encuentra */
    @PutMapping("/{id}")
    public Docente actualizarDocente(
            @PathVariable Long id,
            @RequestBody Docente datos) {

        Docente docente = docenteRepository.findById(id).orElse(null);

        if (docente != null) {

            docente.setNombres(datos.getNombres());
            docente.setApellidos(datos.getApellidos());
            docente.setDni(datos.getDni());
            docente.setCorreo(datos.getCorreo());
            docente.setEspecialidad(datos.getEspecialidad());
            docente.setTelefono(datos.getTelefono());

            return docenteRepository.save(docente);
        }

        return null;
    }

    /** Elimina un docente por su identificador. @param id identificador del docente @return mensaje de confirmacion */
    @DeleteMapping("/{id}")
    public String eliminarDocente(@PathVariable Long id) {

        docenteRepository.deleteById(id);

        return "Docente eliminado correctamente";
    }
}