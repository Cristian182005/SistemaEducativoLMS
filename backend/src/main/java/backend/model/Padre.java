package backend.model;

import jakarta.persistence.*;

/**
 * Entidad que representa a un padre o apoderado de un estudiante.
 */
@Entity
@Table(name = "padres")
public class Padre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_padre")
    private Integer idPadre;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    private String nombres;
    private String apellidos;
    private String dni;
    private String telefono;
    private String direccion;
    private String tipo;

    /**
     * Obtiene el identificador del padre.
     *
     * @return el identificador del padre
     */
    public Integer getIdPadre() {
        return idPadre;
    }

    /**
     * Establece el identificador del padre.
     *
     * @param idPadre el identificador del padre
     */
    public void setIdPadre(Integer idPadre) {
        this.idPadre = idPadre;
    }

    /**
     * Obtiene el usuario asociado al padre.
     *
     * @return el usuario asociado
     */
    public Usuario getUsuario() {
        return usuario;
    }

    /**
     * Establece el usuario asociado al padre.
     *
     * @param usuario el usuario a asociar
     */
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    /**
     * Obtiene los nombres del padre.
     *
     * @return los nombres del padre
     */
    public String getNombres() {
        return nombres;
    }

    /**
     * Establece los nombres del padre.
     *
     * @param nombres los nombres del padre
     */
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    /**
     * Obtiene los apellidos del padre.
     *
     * @return los apellidos del padre
     */
    public String getApellidos() {
        return apellidos;
    }

    /**
     * Establece los apellidos del padre.
     *
     * @param apellidos los apellidos del padre
     */
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    /**
     * Obtiene el DNI del padre.
     *
     * @return el DNI del padre
     */
    public String getDni() {
        return dni;
    }

    /**
     * Establece el DNI del padre.
     *
     * @param dni el DNI del padre
     */
    public void setDni(String dni) {
        this.dni = dni;
    }

    /**
     * Obtiene el teléfono del padre.
     *
     * @return el teléfono del padre
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     * Establece el teléfono del padre.
     *
     * @param telefono el teléfono del padre
     */
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    /**
     * Obtiene la dirección del padre.
     *
     * @return la dirección del padre
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * Establece la dirección del padre.
     *
     * @param direccion la dirección del padre
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * Obtiene el tipo de padre.
     *
     * @return el tipo de padre
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * Establece el tipo de padre.
     *
     * @param tipo el tipo de padre
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
