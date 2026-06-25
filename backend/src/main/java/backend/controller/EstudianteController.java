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
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PadreEstudianteRepository padreEstudianteRepository;

    @GetMapping
    public Page<Estudiante> listarEstudiantes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("idEstudiante").descending());
        return estudianteRepository.findAll(pageable);
    }

    @GetMapping("/buscar")
    public Page<Estudiante> buscarEstudiantes(
            @RequestParam String buscar,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("idEstudiante").descending());
        return estudianteRepository.buscarEstudiantes(buscar, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> obtenerEstudiante(@PathVariable Integer id) {
        Estudiante estudiante = estudianteRepository.findById(id).orElse(null);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante);
    }

    @GetMapping("/{id}/padres")
    public ResponseEntity<?> obtenerPadres(@PathVariable Integer id) {
        return ResponseEntity.ok(padreEstudianteRepository.findByEstudiante_IdEstudiante(id));
    }

    @PostMapping
    public Estudiante guardarEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

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