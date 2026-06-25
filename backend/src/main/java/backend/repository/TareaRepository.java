package backend.repository;

import backend.model.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {

    @Query("""
        SELECT t FROM Tarea t
        WHERE t.idCurso = :idCurso
        ORDER BY t.fechaEntrega DESC
    """)
    List<Tarea> findByCurso(@Param("idCurso") Integer idCurso);

    @Query("""
        SELECT t FROM Tarea t
        ORDER BY t.fechaEntrega DESC
    """)
    List<Tarea> findAllOrdered();
}
