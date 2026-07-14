package backend.repository;

import backend.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Material, con consultas para buscar materiales por curso.
 */
public interface MaterialRepository extends JpaRepository<Material, Long> {

    /**
     * Busca todos los materiales asociados a un curso, ordenados por fecha de publicación descendente.
     *
     * @param idCurso el identificador del curso
     * @return lista de materiales del curso ordenados de más reciente a más antiguo
     */
    @Query("SELECT m FROM Material m WHERE m.idCurso = :idCurso ORDER BY m.fechaPublicacion DESC")
    List<Material> findByCurso(@Param("idCurso") Integer idCurso);

}