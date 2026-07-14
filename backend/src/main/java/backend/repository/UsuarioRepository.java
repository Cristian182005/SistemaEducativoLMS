package backend.repository;

import backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositorio de acceso a datos para la entidad Usuario, con consultas para buscar usuario por correo electronico.
 */
public interface UsuarioRepository
        extends JpaRepository<Usuario, Integer> {

    /**
     * Busca un usuario por su correo electronico.
     *
     * @param correo el correo electronico del usuario a buscar
     * @return un Optional con el usuario encontrado, o vacio si no existe
     */
    Optional<Usuario> findByCorreo(String correo);
}