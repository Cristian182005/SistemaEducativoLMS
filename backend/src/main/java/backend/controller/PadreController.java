package backend.controller;

import backend.model.Padre;
import backend.model.Estudiante;
import backend.model.PadreEstudiante;

import backend.repository.PadreRepository;
import backend.repository.PadreEstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de padres y apoderados, incluyendo consulta de hijos.
 */
@RestController
@RequestMapping("/api/padres")
@CrossOrigin("*")
public class PadreController {

    @Autowired
    private PadreRepository padreRepository;

    @Autowired
    private PadreEstudianteRepository padreEstudianteRepository;

    /**
     * Lista todos los padres registrados.
     *
     * @return lista de padres
     */
    @GetMapping
    public List<Padre> listarPadres() {

        return padreRepository.findAll();
    }

    /**
     * Obtiene los hijos de un padre segun el ID del usuario logueado.
     *
     * @param idUsuario identificador del usuario padre
     * @return lista de estudiantes hijos del padre
     */
    @GetMapping("/usuario/{idUsuario}/hijos")
    public List<Estudiante> obtenerHijos(
            @PathVariable Integer idUsuario) {

        Padre padre =
                padreRepository.findByUsuario_IdUsuario(
                        idUsuario);

        if (padre == null) {
            return List.of();
        }

        return padreEstudianteRepository
                .findByPadre_IdPadre(
                        padre.getIdPadre())
                .stream()
                .map(PadreEstudiante::getEstudiante)
                .toList();
    }

    /**
     * Guarda un nuevo padre en el sistema.
     *
     * @param padre datos del padre a registrar
     * @return padre creado
     */
    @PostMapping
    public Padre guardarPadre(
            @RequestBody Padre padre) {

        return padreRepository.save(padre);
    }

    /**
     * Actualiza los datos de un padre existente.
     *
     * @param id identificador del padre a actualizar
     * @param padreActualizado datos actualizados del padre
     * @return padre actualizado o null si no existe
     */
    @PutMapping("/{id}")
    public Padre actualizarPadre(
            @PathVariable Integer id,
            @RequestBody Padre padreActualizado) {

        Padre padre =
                padreRepository
                        .findById(id)
                        .orElse(null);

        if (padre == null) {
            return null;
        }

        padre.setNombres(
                padreActualizado.getNombres());

        padre.setApellidos(
                padreActualizado.getApellidos());

        padre.setDni(
                padreActualizado.getDni());

        padre.setTelefono(
                padreActualizado.getTelefono());

        padre.setDireccion(
                padreActualizado.getDireccion());

        padre.setTipo(
                padreActualizado.getTipo());

        return padreRepository.save(padre);
    }

    /**
     * Elimina un padre por su ID.
     *
     * @param id identificador del padre a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminarPadre(
            @PathVariable Integer id) {

        padreRepository.deleteById(id);
    }
}