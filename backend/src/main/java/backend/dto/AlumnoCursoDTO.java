package backend.dto;

import java.math.BigDecimal;

/**
 * Objeto de transferencia de datos que representa el resumen de un alumno dentro de un curso, incluyendo su promedio y estado academico.
 */
public class AlumnoCursoDTO {

    private String codigo;
    private String nombreCompleto;
    private String grado;
    private String seccion;
    private BigDecimal promedio;
    private String estado;
    private String observaciones;
    private Long totalTareas;

    public AlumnoCursoDTO() {}

    /**
     * Obtiene el codigo del alumno.
     *
     * @return el codigo del alumno
     */
    public String getCodigo() {
        return codigo;
    }

    /**
     * Establece el codigo del alumno.
     *
     * @param codigo el codigo del alumno
     */
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    /**
     * Obtiene el nombre completo del alumno.
     *
     * @return el nombre completo del alumno
     */
    public String getNombreCompleto() {
        return nombreCompleto;
    }

    /**
     * Establece el nombre completo del alumno.
     *
     * @param nombreCompleto el nombre completo del alumno
     */
    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    /**
     * Obtiene el grado del alumno.
     *
     * @return el grado del alumno
     */
    public String getGrado() {
        return grado;
    }

    /**
     * Establece el grado del alumno.
     *
     * @param grado el grado del alumno
     */
    public void setGrado(String grado) {
        this.grado = grado;
    }

    /**
     * Obtiene la seccion del alumno.
     *
     * @return la seccion del alumno
     */
    public String getSeccion() {
        return seccion;
    }

    /**
     * Establece la seccion del alumno.
     *
     * @param seccion la seccion del alumno
     */
    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }

    /**
     * Obtiene el promedio del alumno en el curso.
     *
     * @return el promedio del alumno
     */
    public BigDecimal getPromedio() {
        return promedio;
    }

    /**
     * Establece el promedio del alumno en el curso.
     *
     * @param promedio el promedio del alumno
     */
    public void setPromedio(BigDecimal promedio) {
        this.promedio = promedio;
    }

    /**
     * Obtiene el estado academico del alumno.
     *
     * @return el estado academico del alumno
     */
    public String getEstado() {
        return estado;
    }

    /**
     * Establece el estado academico del alumno.
     *
     * @param estado el estado academico del alumno
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * Obtiene las observaciones del alumno en el curso.
     *
     * @return las observaciones del alumno
     */
    public String getObservaciones() {
        return observaciones;
    }

    /**
     * Establece las observaciones del alumno en el curso.
     *
     * @param observaciones las observaciones del alumno
     */
    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    /**
     * Obtiene el total de tareas asignadas al alumno en el curso.
     *
     * @return el total de tareas
     */
    public Long getTotalTareas() {
        return totalTareas;
    }

    /**
     * Establece el total de tareas asignadas al alumno en el curso.
     *
     * @param totalTareas el total de tareas
     */
    public void setTotalTareas(Long totalTareas) {
        this.totalTareas = totalTareas;
    }
}
