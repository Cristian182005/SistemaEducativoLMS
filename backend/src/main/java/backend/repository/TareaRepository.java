package backend.repository;

import backend.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Tarea, con consultas para buscar tareas por curso.
 */
public interface TareaRepository extends JpaRepository<Tarea, Long> {

    /**
     * Busca todas las tareas asociadas a un curso determinado, ordenadas por fecha de entrega descendente.
     *
     * @param idCurso el identificador del curso
     * @return lista de tareas del curso indicado
     */
    @Query("""
        SELECT t FROM Tarea t
        WHERE t.idCurso = :idCurso
        ORDER BY t.fechaEntrega DESC
    """)
    List<Tarea> findByCurso(@Param("idCurso") Integer idCurso);

    /**
     * Retorna todas las tareas del sistema ordenadas por fecha de entrega descendente.
     *
     * @return lista de todas las tareas ordenadas
     */
    @Query("""
        SELECT t FROM Tarea t
        ORDER BY t.fechaEntrega DESC
    """)
    List<Tarea> findAllOrdered();
}
