package backend.dto;

/**
 * Objeto de transferencia de datos que representa una tarea junto con su informacion de calificacion y el grado/seccion al que pertenece.
 */
public class TareaCalificacionDTO {

    private String idCurso;
    private String titulo;
    private String descripcion;
    private String fechaEntrega;
    private String puntajeMaximo;
    private String estado;
    private String grado;
    private String seccion;

    public TareaCalificacionDTO() {}

    /**
     * Obtiene el identificador del curso al que pertenece la tarea.
     *
     * @return el identificador del curso
     */
    public String getIdCurso() {
        return idCurso;
    }

    /**
     * Establece el identificador del curso al que pertenece la tarea.
     *
     * @param idCurso el identificador del curso a asignar
     */
    public void setIdCurso(String idCurso) {
        this.idCurso = idCurso;
    }

    /**
     * Obtiene el titulo de la tarea.
     *
     * @return el titulo de la tarea
     */
    public String getTitulo() {
        return titulo;
    }

    /**
     * Establece el titulo de la tarea.
     *
     * @param titulo el titulo a asignar a la tarea
     */
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    /**
     * Obtiene la descripcion de la tarea.
     *
     * @return la descripcion de la tarea
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Establece la descripcion de la tarea.
     *
     * @param descripcion la descripcion a asignar a la tarea
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Obtiene la fecha de entrega de la tarea.
     *
     * @return la fecha de entrega de la tarea
     */
    public String getFechaEntrega() {
        return fechaEntrega;
    }

    /**
     * Establece la fecha de entrega de la tarea.
     *
     * @param fechaEntrega la fecha de entrega a asignar a la tarea
     */
    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    /**
     * Obtiene el puntaje maximo de la tarea.
     *
     * @return el puntaje maximo de la tarea
     */
    public String getPuntajeMaximo() {
        return puntajeMaximo;
    }

    /**
     * Establece el puntaje maximo de la tarea.
     *
     * @param puntajeMaximo el puntaje maximo a asignar a la tarea
     */
    public void setPuntajeMaximo(String puntajeMaximo) {
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
     * @param estado el estado a asignar a la tarea
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * Obtiene el grado al que pertenece la tarea.
     *
     * @return el grado de la tarea
     */
    public String getGrado() {
        return grado;
    }

    /**
     * Establece el grado al que pertenece la tarea.
     *
     * @param grado el grado a asignar a la tarea
     */
    public void setGrado(String grado) {
        this.grado = grado;
    }

    /**
     * Obtiene la seccion a la que pertenece la tarea.
     *
     * @return la seccion de la tarea
     */
    public String getSeccion() {
        return seccion;
    }

    /**
     * Establece la seccion a la que pertenece la tarea.
     *
     * @param seccion la seccion a asignar a la tarea
     */
    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }
}
