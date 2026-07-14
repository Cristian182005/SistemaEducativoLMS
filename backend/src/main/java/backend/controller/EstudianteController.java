package backend.controller;

import backend.model.Estudiante;
import backend.repository.EstudianteRepository;
import backend.repository.PadreEstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin("*")
/**
 * Controlador REST para la gestion de estudiantes del sistema educativo, con paginacion y busqueda.
 */
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PadreEstudianteRepository padreEstudianteRepository;

    /**
     * Lista todos los estudiantes con paginacion, ordenados por ID descendente.
     *
     * @param page numero de pagina (por defecto 0)
     * @param size cantidad de elementos por pagina (por defecto 10)
     * @return pagina de estudiantes
     */
    @GetMapping
    public Page<Estudiante> listarEstudiantes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("idEstudiante").descending());
        return estudianteRepository.findAll(pageable);
    }

    /**
     * Busca estudiantes por texto con paginacion.
     *
     * @param buscar texto de busqueda
     * @param page numero de pagina (por defecto 0)
     * @param size cantidad de elementos por pagina (por defecto 10)
     * @return pagina de estudiantes encontrados
     */
    @GetMapping("/buscar")
    public Page<Estudiante> buscarEstudiantes(
            @RequestParam String buscar,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("idEstudiante").descending());
        return estudianteRepository.buscarEstudiantes(buscar, pageable);
    }

    /**
     * Obtiene un estudiante a partir del ID del usuario asociado.
     *
     * @param idUsuario identificador del usuario
     * @return estudiante encontrado o 404 si no existe
     */
    @GetMapping("/por-usuario/{idUsuario}")
    public ResponseEntity<Estudiante> obtenerEstudiantePorUsuario(@PathVariable Integer idUsuario) {
        Estudiante estudiante = estudianteRepository.findByidUsuario(idUsuario);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante);
    }

    /**
     * Obtiene un estudiante por su ID.
     *
     * @param id identificador del estudiante
     * @return estudiante encontrado o 404 si no existe
     */
    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtenerEstudiante(@PathVariable Integer id) {
        Estudiante estudiante = estudianteRepository.findById(id).orElse(null);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante);
    }

    /**
     * Obtiene los padres asociados a un estudiante.
     *
     * @param id identificador del estudiante
     * @return lista de relaciones padre-estudiante
     */
    @GetMapping("/{id}/padres")
    public ResponseEntity<?> obtenerPadres(@PathVariable Integer id) {
        return ResponseEntity.ok(padreEstudianteRepository.findByEstudiante_IdEstudiante(id));
    }

    /**
     * Guarda un nuevo estudiante en el sistema.
     *
     * @param estudiante datos del estudiante a registrar
     * @return estudiante creado
     */
    @PostMapping
    public Estudiante guardarEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    /**
     * Actualiza los datos de un estudiante existente.
     *
     * @param id identificador del estudiante a actualizar
     * @param estudianteActualizado datos actualizados del estudiante
     * @return estudiante actualizado o 404 si no existe
     */
    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> actualizarEstudiante(@PathVariable Integer id,
                                                           @RequestBody Estudiante estudianteActualizado) {
        Estudiante estudiante = estudianteRepository.findById(id).orElse(null);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }

        estudiante.setCodigoEstudiante(estudianteActualizado.getCodigoEstudiante());
        estudiante.setApellidoPaterno(estudianteActualizado.getApellidoPaterno());
        estudiante.setApellidoMaterno(estudianteActualizado.getApellidoMaterno());
        estudiante.setNombres(estudianteActualizado.getNombres());
        estudiante.setFechaNacimiento(estudianteActualizado.getFechaNacimiento());
        estudiante.setDni(estudianteActualizado.getDni());
        estudiante.setProvincia(estudianteActualizado.getProvincia());
        estudiante.setDepartamento(estudianteActualizado.getDepartamento());
        estudiante.setDistrito(estudianteActualizado.getDistrito());
        estudiante.setSexo(estudianteActualizado.getSexo());
        estudiante.setEdad(estudianteActualizado.getEdad());
        estudiante.setDireccion(estudianteActualizado.getDireccion());
        estudiante.setMatricula(estudianteActualizado.getMatricula());

        return ResponseEntity.ok(estudianteRepository.save(estudiante));
    }

    /**
     * Elimina un estudiante por su ID.
     *
     * @param id identificador del estudiante a eliminar
     * @return confirmacion de eliminacion o 404 si no existe
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEstudiante(@PathVariable Integer id) {
        if (!estudianteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        estudianteRepository.deleteById(id);
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", true);
        return ResponseEntity.ok(respuesta);
    }
}