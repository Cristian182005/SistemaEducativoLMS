package backend.repository;

import backend.model.Padre;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio de acceso a datos para la entidad Padre, con consultas para buscar padre por usuario asociado.
 */
public interface PadreRepository
        extends JpaRepository<Padre, Integer> {

    /**
     * Busca un Padre por el ID del usuario asociado.
     *
     * @param idUsuario el ID del usuario asociado al padre.
     * @return el Padre encontrado, o null si no existe.
     */
    Padre findByUsuario_IdUsuario(Integer idUsuario);

}