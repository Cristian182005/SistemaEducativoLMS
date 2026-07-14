package backend.repository;

import backend.model.PadreEstudiante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad PadreEstudiante, con consultas para gestionar las relaciones padre-estudiante.
 */
public interface PadreEstudianteRepository
                extends JpaRepository<PadreEstudiante, Integer> {

        /**
         * Busca todas las relaciones padre-estudiante por el ID del estudiante.
         *
         * @param idEstudiante el ID del estudiante
         * @return una lista de relaciones padre-estudiante que coincidan con el ID del estudiante
         */
        List<PadreEstudiante> findByEstudiante_IdEstudiante(Integer idEstudiante);

        /**
         * Verifica si existe una relación entre el padre y el estudiante especificados.
         *
         * @param idPadre     el ID del padre
         * @param idEstudiante el ID del estudiante
         * @return {@code true} si la relación existe, {@code false} en caso contrario
         */
        boolean existsByPadre_IdPadreAndEstudiante_IdEstudiante(
                        Integer idPadre,
                        Integer idEstudiante);

        /**
         * Busca todas las relaciones padre-estudiante por el ID del padre.
         *
         * @param idPadre el ID del padre
         * @return una lista de relaciones padre-estudiante que coincidan con el ID del padre
         */
        List<PadreEstudiante> findByPadre_IdPadre(Integer idPadre);
}
