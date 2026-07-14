package backend.repository;

import backend.model.Matricula;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Matricula, con consultas para obtener matriculas agrupadas por fecha.
 */
public interface MatriculaRepository
        extends JpaRepository<Matricula, Integer> {

    /**
     * Obtiene la cantidad de matrículas agrupadas por fecha, ordenadas de forma ascendente.
     *
     * @return Lista de arreglos de objetos donde el primer elemento es la fecha de matrícula
     *         y el segundo es la cantidad de matrículas en esa fecha.
     */
    @Query("""
        SELECT m.fechaMatricula,
               COUNT(m)
        FROM Matricula m
        GROUP BY m.fechaMatricula
        ORDER BY m.fechaMatricula
    """)
    List<Object[]> obtenerMatriculasPorFecha();
}