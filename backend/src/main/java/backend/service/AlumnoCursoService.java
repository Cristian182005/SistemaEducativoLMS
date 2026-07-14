package backend.service;

import backend.dto.AlumnoCursoDTO;
import backend.repository.AlumnoCursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio de negocio para la gestion de alumnos asignados a cursos.
 */
@Service
public class AlumnoCursoService {

    @Autowired
    private AlumnoCursoRepository repository;

    /**
     * Lista los alumnos asignados a un curso especifico de un docente.
     *
     * @param idCurso  identificador del curso
     * @param idDocente identificador del docente
     * @return lista de DTOs con la informacion de los alumnos del curso
     */
    public List<AlumnoCursoDTO> listarAlumnos(String idCurso, String idDocente) {
        return repository.listarAlumnosCurso(idCurso, idDocente);
    }
}
