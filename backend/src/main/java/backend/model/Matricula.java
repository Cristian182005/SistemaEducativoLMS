package backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Entidad que representa la matricula de un estudiante en el sistema educativo.
 */
@Entity
@Table(name = "matriculas")
public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idMatricula;

    private String nivel;
    private String grado;
    private String seccion;
    private String dni;
    private String celular;

    private LocalDate fechaMatricula;

    public Matricula() {
        this.fechaMatricula = LocalDate.now();
    }

    /**
     * Obtiene el identificador de la matricula.
     *
     * @return el identificador de la matricula
     */
    public Integer getIdMatricula() {
        return idMatricula;
    }

    /**
     * Establece el identificador de la matricula.
     *
     * @param idMatricula el identificador de la matricula
     */
    public void setIdMatricula(Integer idMatricula) {
        this.idMatricula = idMatricula;
    }

    /**
     * Obtiene el nivel educativo del estudiante.
     *
     * @return el nivel educativo
     */
    public String getNivel() {
        return nivel;
    }

    /**
     * Establece el nivel educativo del estudiante.
     *
     * @param nivel el nivel educativo
     */
    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    /**
     * Obtiene el grado del estudiante.
     *
     * @return el grado del estudiante
     */
    public String getGrado() {
        return grado;
    }

    /**
     * Establece el grado del estudiante.
     *
     * @param grado el grado del estudiante
     */
    public void setGrado(String grado) {
        this.grado = grado;
    }

    /**
     * Obtiene la seccion del estudiante.
     *
     * @return la seccion del estudiante
     */
    public String getSeccion() {
        return seccion;
    }

    /**
     * Establece la seccion del estudiante.
     *
     * @param seccion la seccion del estudiante
     */
    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }

    /**
     * Obtiene el numero de identificacion del estudiante.
     *
     * @return el DNI del estudiante
     */
    public String getDni() {
        return dni;
    }

    /**
     * Establece el numero de identificacion del estudiante.
     *
     * @param dni el DNI del estudiante
     */
    public void setDni(String dni) {
        this.dni = dni;
    }

    /**
     * Obtiene el numero de celular del estudiante.
     *
     * @return el numero de celular
     */
    public String getCelular() {
        return celular;
    }

    /**
     * Establece el numero de celular del estudiante.
     *
     * @param celular el numero de celular
     */
    public void setCelular(String celular) {
        this.celular = celular;
    }

    /**
     * Obtiene la fecha de matricula del estudiante.
     *
     * @return la fecha de matricula
     */
    public LocalDate getFechaMatricula() {
        return fechaMatricula;
    }

    /**
     * Establece la fecha de matricula del estudiante.
     *
     * @param fechaMatricula la fecha de matricula
     */
    public void setFechaMatricula(LocalDate fechaMatricula) {
        this.fechaMatricula = fechaMatricula;
    }
}
