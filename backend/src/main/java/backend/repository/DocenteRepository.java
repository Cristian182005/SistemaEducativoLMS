package backend.repository;

import backend.model.Docente;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio de acceso a datos para la entidad Docente.
 */
public interface DocenteRepository extends JpaRepository<Docente, Long> {

}