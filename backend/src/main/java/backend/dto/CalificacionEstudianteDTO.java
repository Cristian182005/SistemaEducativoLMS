package backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Objeto de transferencia de datos que representa la calificacion de un estudiante en una tarea, incluyendo informacion del curso y fechas.
 */
public class CalificacionEstudianteDTO {

    private Integer idCalificacion;
    private String tituloTarea;
    private String nombreCurso;
    private BigDecimal nota;
    private BigDecimal puntajeMaximo;
    private String observacion;
    private LocalDate fechaEntrega;
    private LocalDate fechaRegistro;
    private String estadoTarea;

    public CalificacionEstudianteDTO() {}

    /**
     * Constructor con todos los campos del DTO.
     *
     * @param idCalificacion identificador de la calificacion
     * @param tituloTarea titulo de la tarea
     * @param nombreCurso nombre del curso
     * @param nota nota obtenida por el estudiante
     * @param puntajeMaximo puntaje maximo posible de la tarea
     * @param observacion observacion o comentario sobre la calificacion
     * @param fechaEntrega fecha de entrega de la tarea
     * @param fechaRegistro fecha de registro de la calificacion
     * @param estadoTarea estado actual de la tarea
     */
    public CalificacionEstudianteDTO(Integer idCalificacion, String tituloTarea, String nombreCurso,
                                     BigDecimal nota, BigDecimal puntajeMaximo, String observacion,
                                     LocalDate fechaEntrega, LocalDate fechaRegistro, String estadoTarea) {
        this.idCalificacion = idCalificacion;
        this.tituloTarea = tituloTarea;
        this.nombreCurso = nombreCurso;
        this.nota = nota;
        this.puntajeMaximo = puntajeMaximo;
        this.observacion = observacion;
        this.fechaEntrega = fechaEntrega;
        this.fechaRegistro = fechaRegistro;
        this.estadoTarea = estadoTarea;
    }

    /**
     * Obtiene el identificador de la calificacion.
     *
     * @return identificador de la calificacion
     */
    public Integer getIdCalificacion() {
        return idCalificacion;
    }

    /**
     * Establece el identificador de la calificacion.
     *
     * @param idCalificacion identificador de la calificacion
     */
    public void setIdCalificacion(Integer idCalificacion) {
        this.idCalificacion = idCalificacion;
    }

    /**
     * Obtiene el titulo de la tarea.
     *
     * @return titulo de la tarea
     */
    public String getTituloTarea() {
        return tituloTarea;
    }

    /**
     * Establece el titulo de la tarea.
     *
     * @param tituloTarea titulo de la tarea
     */
    public void setTituloTarea(String tituloTarea) {
        this.tituloTarea = tituloTarea;
    }

    /**
     * Obtiene el nombre del curso.
     *
     * @return nombre del curso
     */
    public String getNombreCurso() {
        return nombreCurso;
    }

    /**
     * Establece el nombre del curso.
     *
     * @param nombreCurso nombre del curso
     */
    public void setNombreCurso(String nombreCurso) {
        this.nombreCurso = nombreCurso;
    }

    /**
     * Obtiene la nota obtenida por el estudiante.
     *
     * @return nota obtenida por el estudiante
     */
    public BigDecimal getNota() {
        return nota;
    }

    /**
     * Establece la nota obtenida por el estudiante.
     *
     * @param nota nota obtenida por el estudiante
     */
    public void setNota(BigDecimal nota) {
        this.nota = nota;
    }

    /**
     * Obtiene el puntaje maximo posible de la tarea.
     *
     * @return puntaje maximo posible de la tarea
     */
    public BigDecimal getPuntajeMaximo() {
        return puntajeMaximo;
    }

    /**
     * Establece el puntaje maximo posible de la tarea.
     *
     * @param puntajeMaximo puntaje maximo posible de la tarea
     */
    public void setPuntajeMaximo(BigDecimal puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
    }

    /**
     * Obtiene la observacion o comentario sobre la calificacion.
     *
     * @return observacion o comentario sobre la calificacion
     */
    public String getObservacion() {
        return observacion;
    }

    /**
     * Establece la observacion o comentario sobre la calificacion.
     *
     * @param observacion observacion o comentario sobre la calificacion
     */
    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    /**
     * Obtiene la fecha de entrega de la tarea.
     *
     * @return fecha de entrega de la tarea
     */
    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    /**
     * Establece la fecha de entrega de la tarea.
     *
     * @param fechaEntrega fecha de entrega de la tarea
     */
    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    /**
     * Obtiene la fecha de registro de la calificacion.
     *
     * @return fecha de registro de la calificacion
     */
    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    /**
     * Establece la fecha de registro de la calificacion.
     *
     * @param fechaRegistro fecha de registro de la calificacion
     */
    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    /**
     * Obtiene el estado actual de la tarea.
     *
     * @return estado actual de la tarea
     */
    public String getEstadoTarea() {
        return estadoTarea;
    }

    /**
     * Establece el estado actual de la tarea.
     *
     * @param estadoTarea estado actual de la tarea
     */
    public void setEstadoTarea(String estadoTarea) {
        this.estadoTarea = estadoTarea;
    }
}
