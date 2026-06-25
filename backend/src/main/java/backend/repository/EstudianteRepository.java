package backend.repository;

import backend.model.Estudiante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EstudianteRepository extends JpaRepository<Estudiante, Integer> {

    Page<Estudiante> findByNombresContainingIgnoreCaseOrApellidoPaternoContainingIgnoreCaseOrCodigoEstudianteContainingIgnoreCase(
            String nombre, String apellido, String codigo, Pageable pageable);

    @Query("SELECT e FROM Estudiante e WHERE " +
           "LOWER(e.nombres) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoPaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoMaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.codigoEstudiante) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.dni) LIKE LOWER(CONCAT('%', :buscar, '%'))")
    Page<Estudiante> buscarEstudiantes(@Param("buscar") String buscar, Pageable pageable);

    @Query("SELECT e FROM Estudiante e WHERE " +
           "LOWER(e.nombres) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoPaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoMaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.codigoEstudiante) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.dni) LIKE LOWER(CONCAT('%', :buscar, '%'))")
    List<Estudiante> buscarEstudiantesLista(@Param("buscar") String buscar);
}