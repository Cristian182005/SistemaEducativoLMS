package backend.model;

import jakarta.persistence.*;

/**
 * Entidad que representa a un docente del sistema educativo.
 */
@Entity
@Table(name = "docentes")
public class Docente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_docente")
    private Integer idDocente;

    private String nombres;
    private String apellidos;
    private String dni;
    private String correo;
    private String especialidad;
    private String telefono;

    /**
     * Obtiene el identificador único del docente.
     *
     * @return el identificador del docente
     */
    public Integer getIdDocente() {
        return idDocente;
    }

    /**
     * Establece el identificador único del docente.
     *
     * @param idDocente el identificador del docente
     */
    public void setIdDocente(Integer idDocente) {
        this.idDocente = idDocente;
    }

    /**
     * Obtiene los nombres del docente.
     *
     * @return los nombres del docente
     */
    public String getNombres() {
        return nombres;
    }

    /**
     * Establece los nombres del docente.
     *
     * @param nombres los nombres del docente
     */
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    /**
     * Obtiene los apellidos del docente.
     *
     * @return los apellidos del docente
     */
    public String getApellidos() {
        return apellidos;
    }

    /**
     * Establece los apellidos del docente.
     *
     * @param apellidos los apellidos del docente
     */
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    /**
     * Obtiene el número de identificación (DNI) del docente.
     *
     * @return el DNI del docente
     */
    public String getDni() {
        return dni;
    }

    /**
     * Establece el número de identificación (DNI) del docente.
     *
     * @param dni el DNI del docente
     */
    public void setDni(String dni) {
        this.dni = dni;
    }

    /**
     * Obtiene el correo electrónico del docente.
     *
     * @return el correo electrónico del docente
     */
    public String getCorreo() {
        return correo;
    }

    /**
     * Establece el correo electrónico del docente.
     *
     * @param correo el correo electrónico del docente
     */
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    /**
     * Obtiene la especialidad del docente.
     *
     * @return la especialidad del docente
     */
    public String getEspecialidad() {
        return especialidad;
    }

    /**
     * Establece la especialidad del docente.
     *
     * @param especialidad la especialidad del docente
     */
    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    /**
     * Obtiene el número de teléfono del docente.
     *
     * @return el teléfono del docente
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     * Establece el número de teléfono del docente.
     *
     * @param telefono el teléfono del docente
     */
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}
