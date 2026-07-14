package backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Entidad que representa una calificacion otorgada a un estudiante por una tarea o examen.
 */
@Entity
@Table(name = "calificaciones")
public class Calificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_calificacion")
    private Integer idCalificacion;

    @Column(name = "id_estudiante")
    private Integer idEstudiante;

    @Column(name = "id_tarea")
    private Integer idTarea;

    private BigDecimal nota;
    private String observacion;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    /**
     * Obtiene el identificador unico de la calificacion.
     *
     * @return el identificador de la calificacion
     */
    public Integer getIdCalificacion() {
        return idCalificacion;
    }

    /**
     * Establece el identificador unico de la calificacion.
     *
     * @param idCalificacion el identificador de la calificacion
     */
    public void setIdCalificacion(Integer idCalificacion) {
        this.idCalificacion = idCalificacion;
    }

    /**
     * Obtiene el identificador del estudiante asociado a la calificacion.
     *
     * @return el identificador del estudiante
     */
    public Integer getIdEstudiante() {
        return idEstudiante;
    }

    /**
     * Establece el identificador del estudiante asociado a la calificacion.
     *
     * @param idEstudiante el identificador del estudiante
     */
    public void setIdEstudiante(Integer idEstudiante) {
        this.idEstudiante = idEstudiante;
    }

    /**
     * Obtiene el identificador de la tarea asociada a la calificacion.
     *
     * @return el identificador de la tarea
     */
    public Integer getIdTarea() {
        return idTarea;
    }

    /**
     * Establece el identificador de la tarea asociada a la calificacion.
     *
     * @param idTarea el identificador de la tarea
     */
    public void setIdTarea(Integer idTarea) {
        this.idTarea = idTarea;
    }

    /**
     * Obtiene la nota otorgada al estudiante.
     *
     * @return la nota de la calificacion
     */
    public BigDecimal  getNota() {
        return nota;
    }

    /**
     * Establece la nota otorgada al estudiante.
     *
     * @param nota la nota de la calificacion
     */
    public void setNota(BigDecimal  nota) {
        this.nota = nota;
    }

    /**
     * Obtiene la observacion adicional sobre la calificacion.
     *
     * @return la observacion de la calificacion
     */
    public String getObservacion() {
        return observacion;
    }

    /**
     * Establece la observacion adicional sobre la calificacion.
     *
     * @param observacion la observacion de la calificacion
     */
    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    /**
     * Obtiene la fecha en que se registro la calificacion.
     *
     * @return la fecha de registro de la calificacion
     */
    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    /**
     * Establece la fecha en que se registro la calificacion.
     *
     * @param fechaRegistro la fecha de registro de la calificacion
     */
    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
