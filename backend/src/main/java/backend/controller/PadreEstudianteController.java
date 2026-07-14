package backend.controller;

import backend.model.PadreEstudiante;
import backend.repository.PadreEstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de relaciones padre-estudiante.
 */
@RestController
@RequestMapping("/api/padre-estudiante")
@CrossOrigin(origins = "*")
public class PadreEstudianteController {

    @Autowired
    private PadreEstudianteRepository repository;

    /**
     * Lista todas las relaciones padre-estudiante registradas.
     *
     * @return lista de relaciones padre-estudiante
     */
    @GetMapping
    public List<PadreEstudiante> listar() {
        return repository.findAll();
    }

    /**
     * Guarda una nueva relacion padre-estudiante, validando que no exista previamente.
     *
     * @param padreEstudiante datos de la relacion a crear
     * @return relacion padre-estudiante creada
     * @throws RuntimeException si la relacion ya existe
     */
    @PostMapping
    public PadreEstudiante guardar(
            @RequestBody PadreEstudiante padreEstudiante) {

        boolean existe = repository.existsByPadre_IdPadreAndEstudiante_IdEstudiante(
                padreEstudiante.getPadre().getIdPadre(),
                padreEstudiante.getEstudiante().getIdEstudiante());

        if (existe) {
            throw new RuntimeException(
                    "Este vínculo ya existe");
        }

        return repository.save(padreEstudiante);
    }

    /**
     * Elimina una relacion padre-estudiante por su ID.
     *
     * @param id identificador de la relacion a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}