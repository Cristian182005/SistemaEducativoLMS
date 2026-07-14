package backend.controller;

import backend.model.Matricula;
import backend.repository.MatriculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de matriculas de estudiantes.
 */
@RestController
@RequestMapping("/api/matriculas")
@CrossOrigin("*")
public class MatriculaController {

    @Autowired
    private MatriculaRepository matriculaRepository;

    /**
     * Lista todas las matriculas registradas.
     *
     * @return lista de matriculas
     */
    @GetMapping
    public List<Matricula> listarMatriculas() {
        return matriculaRepository.findAll();
    }

    /**
     * Guarda una nueva matricula.
     *
     * @param matricula datos de la matricula a registrar
     * @return matricula creada
     */
    @PostMapping
    public Matricula guardarMatricula(@RequestBody Matricula matricula) {
        return matriculaRepository.save(matricula);
    }

    /**
     * Actualiza una matricula existente.
     *
     * @param id identificador de la matricula a actualizar
     * @param matriculaActualizada datos actualizados de la matricula
     * @return matricula actualizada o null si no existe
     */
    @PutMapping("/{id}")
    public Matricula actualizarMatricula(@PathVariable Integer id,
                                         @RequestBody Matricula matriculaActualizada) {

        Matricula matricula = matriculaRepository.findById(id).orElse(null);

        if (matricula == null) {
            return null;
        }

        matricula.setNivel(matriculaActualizada.getNivel());
        matricula.setGrado(matriculaActualizada.getGrado());
        matricula.setSeccion(matriculaActualizada.getSeccion());
        matricula.setDni(matriculaActualizada.getDni());
        matricula.setCelular(matriculaActualizada.getCelular());

        return matriculaRepository.save(matricula);
    }

    /**
     * Elimina una matricula por su ID.
     *
     * @param id identificador de la matricula a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminarMatricula(@PathVariable Integer id) {
        matriculaRepository.deleteById(id);
    }
}