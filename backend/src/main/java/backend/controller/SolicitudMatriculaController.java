package backend.controller;

import backend.model.Padre;
import backend.model.Estudiante;
import backend.model.SolicitudMatricula;

import backend.repository.PadreRepository;
import backend.repository.EstudianteRepository;
import backend.repository.SolicitudMatriculaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de solicitudes de matricula, incluyendo aprobacion y rechazo.
 */
@RestController
@RequestMapping("/api/solicitudes")
@CrossOrigin("*")
public class SolicitudMatriculaController {

    @Autowired
    private SolicitudMatriculaRepository repository;

    @Autowired
    private PadreRepository padreRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    /**
     * Lista todas las solicitudes de matricula registradas.
     *
     * @return lista de solicitudes
     */
    @GetMapping
    public List<SolicitudMatricula> listar() {

        return repository.findAll();
    }

    /**
     * Lista todos los padres disponibles para el selector de solicitudes.
     *
     * @return lista de padres
     */
    @GetMapping("/padres")
    public List<Padre> listarPadres() {

        return padreRepository.findAll();
    }

    /**
     * Lista todos los estudiantes disponibles para el selector de solicitudes.
     *
     * @return lista de estudiantes
     */
    @GetMapping("/estudiantes")
    public List<Estudiante> listarEstudiantes() {

        return estudianteRepository.findAll();
    }

    /**
     * Registra una nueva solicitud de matricula desde un padre logueado, con estado PENDIENTE.
     *
     * @param idUsuario identificador del usuario padre
     * @param idEstudiante identificador del estudiante
     * @return solicitud creada o null si el padre o estudiante no existen
     */
    @PostMapping("/registrar")
    public SolicitudMatricula registrarSolicitud(
            @RequestParam Integer idUsuario,
            @RequestParam Integer idEstudiante) {

        Padre padre = padreRepository.findByUsuario_IdUsuario(
                idUsuario);

        if (padre == null) {
            return null;
        }

        Estudiante estudiante = estudianteRepository.findById(
                idEstudiante)
                .orElse(null);

        if (estudiante == null) {
            return null;
        }

        SolicitudMatricula solicitud = new SolicitudMatricula();

        solicitud.setPadre(padre);

        solicitud.setEstudiante(estudiante);

        solicitud.setEstado("PENDIENTE");

        solicitud.setFechaSolicitud(
                java.time.LocalDate.now());

        return repository.save(solicitud);
    }

    /**
     * Aprueba una solicitud de matricula, cambiando su estado a APROBADA.
     *
     * @param id identificador de la solicitud a aprobar
     * @return solicitud actualizada o null si no existe
     */
    @PutMapping("/{id}/aprobar")
    public SolicitudMatricula aprobar(
            @PathVariable Integer id) {

        SolicitudMatricula solicitud = repository.findById(id).orElse(null);

        if (solicitud == null)
            return null;

        solicitud.setEstado("APROBADA");

        return repository.save(solicitud);
    }

    /**
     * Rechaza una solicitud de matricula, cambiando su estado a RECHAZADA.
     *
     * @param id identificador de la solicitud a rechazar
     * @return solicitud actualizada o null si no existe
     */
    @PutMapping("/{id}/rechazar")
    public SolicitudMatricula rechazar(
            @PathVariable Integer id) {

        SolicitudMatricula solicitud = repository.findById(id).orElse(null);

        if (solicitud == null)
            return null;

        solicitud.setEstado("RECHAZADA");

        return repository.save(solicitud);
    }

    /**
     * Elimina una solicitud de matricula por su ID.
     *
     * @param id identificador de la solicitud a eliminar
     */
    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Integer id) {

        repository.deleteById(id);
    }
}