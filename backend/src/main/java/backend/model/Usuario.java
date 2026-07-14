package backend.model;

import jakarta.persistence.*;

/**
 * Entidad JPA que representa un usuario del sistema educativo.
 * Mapea a la tabla "usuarios" en la base de datos.
 * Cada usuario tiene un nombre, correo, contraseña, rol y estado.
 */
@Entity
@Table(name = "usuarios")
public class Usuario {

    /** Identificador único del usuario. Se genera automáticamente con estrategia IDENTITY. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    /** Nombre completo del usuario. */
    private String nombre;

    /** Correo electrónico del usuario. */
    private String correo;

    /** Contraseña del usuario en texto plano. */
    private String password;

    /** Rol del usuario dentro del sistema (ADMIN, DOCENTE, PADRE). */
    private String rol;

    /** Estado del usuario (ACTIVO, INACTIVO). */
    private String estado;

    /**
     * Obtiene el identificador único del usuario.
     *
     * @return el identificador del usuario
     */
    public Integer getIdUsuario() {
        return idUsuario;
    }

    /**
     * Establece el identificador único del usuario.
     *
     * @param idUsuario el identificador del usuario
     */
    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    /**
     * Obtiene el nombre completo del usuario.
     *
     * @return el nombre del usuario
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece el nombre completo del usuario.
     *
     * @param nombre el nombre del usuario
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     *
     * @return el correo del usuario
     */
    public String getCorreo() {
        return correo;
    }

    /**
     * Establece el correo electrónico del usuario.
     *
     * @param correo el correo del usuario
     */
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    /**
     * Obtiene la contraseña del usuario.
     *
     * @return la contraseña del usuario
     */
    public String getPassword() {
        return password;
    }

    /**
     * Establece la contraseña del usuario.
     *
     * @param password la contraseña del usuario
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Obtiene el rol del usuario dentro del sistema.
     *
     * @return el rol del usuario
     */
    public String getRol() {
        return rol;
    }

    /**
     * Establece el rol del usuario dentro del sistema.
     *
     * @param rol el rol del usuario
     */
    public void setRol(String rol) {
        this.rol = rol;
    }

    /**
     * Obtiene el estado del usuario.
     *
     * @return el estado del usuario
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Establece el estado del usuario.
     *
     * @param estado el estado del usuario
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }
}
