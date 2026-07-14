package backend.repository;

import backend.model.Estudiante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Repositorio de acceso a datos para la entidad Estudiante, con consultas de busqueda por nombre, apellido, codigo y DNI.
 */
public interface EstudianteRepository extends JpaRepository<Estudiante, Integer> {

    /**
     * Busca un estudiante por su ID de usuario.
     *
     * @param idUsuario el ID del usuario asociado al estudiante
     * @return el estudiante encontrado, o null si no existe
     */
    Estudiante findByidUsuario(Integer idUsuario);

    /**
     * Busca estudiantes por nombre, apellido paterno o codigo de estudiante, con paginacion.
     *
     * @param nombre    el nombre del estudiante a buscar
     * @param apellido  el apellido paterno del estudiante a buscar
     * @param codigo    el codigo del estudiante a buscar
     * @param pageable  la informacion de paginacion
     * @return una pagina con los estudiantes que coinciden con los criterios de busqueda
     */
    Page<Estudiante> findByNombresContainingIgnoreCaseOrApellidoPaternoContainingIgnoreCaseOrCodigoEstudianteContainingIgnoreCase(
            String nombre, String apellido, String codigo, Pageable pageable);

    /**
     * Busca estudiantes por nombre, apellido paterno, apellido materno, codigo o DNI, con paginacion.
     *
     * @param buscar    el termino de busqueda
     * @param pageable  la informacion de paginacion
     * @return una pagina con los estudiantes que coinciden con el termino de busqueda
     */
    @Query("SELECT e FROM Estudiante e WHERE " +
           "LOWER(e.nombres) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoPaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoMaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.codigoEstudiante) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.dni) LIKE LOWER(CONCAT('%', :buscar, '%'))")
    Page<Estudiante> buscarEstudiantes(@Param("buscar") String buscar, Pageable pageable);

    /**
     * Busca estudiantes por nombre, apellido paterno, apellido materno, codigo o DNI, como lista.
     *
     * @param buscar el termino de busqueda
     * @return una lista con los estudiantes que coinciden con el termino de busqueda
     */
    @Query("SELECT e FROM Estudiante e WHERE " +
           "LOWER(e.nombres) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoPaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.apellidoMaterno) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.codigoEstudiante) LIKE LOWER(CONCAT('%', :buscar, '%')) OR " +
           "LOWER(e.dni) LIKE LOWER(CONCAT('%', :buscar, '%'))")
    List<Estudiante> buscarEstudiantesLista(@Param("buscar") String buscar);
}