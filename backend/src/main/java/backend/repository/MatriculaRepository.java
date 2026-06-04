package backend.repository;

import backend.model.Matricula;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatriculaRepository
        extends JpaRepository<Matricula, Integer> {

    @Query("""
        SELECT m.fechaMatricula,
               COUNT(m)
        FROM Matricula m
        GROUP BY m.fechaMatricula
        ORDER BY m.fechaMatricula
    """)
    List<Object[]> obtenerMatriculasPorFecha();
}