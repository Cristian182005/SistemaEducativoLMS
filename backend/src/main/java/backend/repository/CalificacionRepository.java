package backend.repository;

import backend.model.Calificacion;
import backend.dto.CalificacionEstudianteDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Calificacion, con consultas personalizadas
 * para buscar calificaciones por estudiante y calcular promedios.
 */
public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    /**
     * Busca todas las calificaciones de un estudiante ordenadas por fecha de registro descendente.
     *
     * @param idEstudiante el identificador del estudiante
     * @return lista de calificaciones del estudiante
     */
    @Query("""
        SELECT c FROM Calificacion c
        WHERE c.idEstudiante = :idEstudiante
        ORDER BY c.fechaRegistro DESC
    """)
    List<Calificacion> findByEstudiante(@Param("idEstudiante") Integer idEstudiante);

    /**
     * Busca las calificaciones de un estudiante como DTOs, incluyendo información de la tarea y el curso asociado.
     *
     * @param idEstudiante el identificador del estudiante
     * @return lista de DTOs con calificaciones, tareas y cursos del estudiante
     */
    @Query("""
        SELECT new backend.dto.CalificacionEstudianteDTO(
            c.idCalificacion,
            t.titulo,
            cu.nombre,
            c.nota,
            t.puntajeMaximo,
            c.observacion,
            t.fechaEntrega,
            c.fechaRegistro,
            t.estado
        )
        FROM Calificacion c
        JOIN Tarea t ON c.idTarea = t.idTarea
        JOIN Curso cu ON t.idCurso = cu.idCurso
        WHERE c.idEstudiante = :idEstudiante
        ORDER BY c.fechaRegistro DESC
    """)
    List<CalificacionEstudianteDTO> findCalificacionesEstudiante(@Param("idEstudiante") Integer idEstudiante);

    /**
     * Calcula el promedio de calificaciones agrupado por estudiante.
     *
     * @return lista de arreglos donde cada posición 0 es el id del estudiante y posición 1 es el promedio
     */
    @Query("""
        SELECT c.idEstudiante, AVG(c.nota)
        FROM Calificacion c
        GROUP BY c.idEstudiante
    """)
    List<Object[]> promedioPorEstudiante();

    /**
     * Devuelve todas las calificaciones ordenadas por fecha de registro descendente.
     *
     * @return lista completa de calificaciones ordenadas
     */
    @Query("""
        SELECT c FROM Calificacion c
        ORDER BY c.fechaRegistro DESC
    """)
    List<Calificacion> findAllOrdered();
}
