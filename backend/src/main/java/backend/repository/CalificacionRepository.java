package backend.repository;

import backend.model.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CalificacionRepository extends JpaRepository<Calificacion, Long> {

    @Query("""
        SELECT c FROM Calificacion c
        WHERE c.idEstudiante = :idEstudiante
        ORDER BY c.fechaRegistro DESC
    """)
    List<Calificacion> findByEstudiante(@Param("idEstudiante") Integer idEstudiante);

    @Query("""
        SELECT c.idEstudiante, AVG(c.nota)
        FROM Calificacion c
        GROUP BY c.idEstudiante
    """)
    List<Object[]> promedioPorEstudiante();

    @Query("""
        SELECT c FROM Calificacion c
        ORDER BY c.fechaRegistro DESC
    """)
    List<Calificacion> findAllOrdered();
}
