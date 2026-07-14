package backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Entidad que representa una tarea o examen asignado a un curso.
 */
@Entity
@Table(name = "tareas")
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarea")
    private Integer idTarea;

    @Column(name = "id_curso")
    private Integer idCurso;

    private String titulo;
    private String descripcion;

    @Column(name = "fecha_entrega")
    private LocalDate fechaEntrega;

    @Column(name = "puntaje_maximo")
    private BigDecimal puntajeMaximo;

    private String estado;

    /**
     * Obtiene el identificador único de la tarea.
     *
     * @return el identificador de la tarea
     */
    public Integer getIdTarea() {
        return idTarea;
    }

    /**
     * Establece el identificador único de la tarea.
     *
     * @param idTarea el identificador de la tarea
     */
    public void setIdTarea(Integer idTarea) {
        this.idTarea = idTarea;
    }

    /**
     * Obtiene el identificador del curso al que pertenece la tarea.
     *
     * @return el identificador del curso
     */
    public Integer getIdCurso() {
        return idCurso;
    }

    /**
     * Establece el identificador del curso al que pertenece la tarea.
     *
     * @param idCurso el identificador del curso
     */
    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    /**
     * Obtiene el título de la tarea.
     *
     * @return el título de la tarea
     */
    public String getTitulo() {
        return titulo;
    }

    /**
     * Establece el título de la tarea.
     *
     * @param titulo el título de la tarea
     */
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    /**
     * Obtiene la descripción de la tarea.
     *
     * @return la descripción de la tarea
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Establece la descripción de la tarea.
     *
     * @param descripcion la descripción de la tarea
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Obtiene la fecha de entrega de la tarea.
     *
     * @return la fecha de entrega
     */
    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    /**
     * Establece la fecha de entrega de la tarea.
     *
     * @param fechaEntrega la fecha de entrega
     */
    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    /**
     * Obtiene el puntaje máximo de la tarea.
     *
     * @return el puntaje máximo
     */
    public BigDecimal getPuntajeMaximo() {
        return puntajeMaximo;
    }

    /**
     * Establece el puntaje máximo de la tarea.
     *
     * @param puntajeMaximo el puntaje máximo
     */
    public void setPuntajeMaximo(BigDecimal puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
    }

    /**
     * Obtiene el estado de la tarea.
     *
     * @return el estado de la tarea
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Establece el estado de la tarea.
     *
     * @param estado el estado de la tarea
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }
}
