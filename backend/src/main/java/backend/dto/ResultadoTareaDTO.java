package backend.dto;

import java.math.BigDecimal;

/**
 * Objeto de transferencia de datos que contiene el resultado de una operacion sobre una tarea, incluyendo estadisticas de calificaciones.
 */
public class ResultadoTareaDTO {

    private Integer idTarea;
    private Integer idCurso;
    private String cursoNombre;
    private Long totalEstudiantes;
    private Long totalCalificaciones;
    private String mensaje;

    public ResultadoTareaDTO() {}

    /**
     * Constructor con todos los campos del resultado de tarea.
     *
     * @param idTarea el identificador de la tarea
     * @param idCurso el identificador del curso al que pertenece la tarea
     * @param cursoNombre el nombre del curso
     * @param totalEstudiantes el numero total de estudiantes del curso
     * @param totalCalificaciones el numero total de calificaciones registradas para la tarea
     * @param mensaje el mensaje descriptivo del resultado de la operacion
     */
    public ResultadoTareaDTO(Integer idTarea, Integer idCurso, String cursoNombre,
                              Long totalEstudiantes, Long totalCalificaciones, String mensaje) {
        this.idTarea = idTarea;
        this.idCurso = idCurso;
        this.cursoNombre = cursoNombre;
        this.totalEstudiantes = totalEstudiantes;
        this.totalCalificaciones = totalCalificaciones;
        this.mensaje = mensaje;
    }

    /**
     * Obtiene el identificador de la tarea.
     *
     * @return el identificador de la tarea
     */
    public Integer getIdTarea() {
        return idTarea;
    }

    /**
     * Establece el identificador de la tarea.
     *
     * @param idTarea el identificador de la tarea a establecer
     */
    public void setIdTarea(Integer idTarea) {
        this.idTarea = idTarea;
    }

    /**
     * Obtiene el identificador del curso.
     *
     * @return el identificador del curso
     */
    public Integer getIdCurso() {
        return idCurso;
    }

    /**
     * Establece el identificador del curso.
     *
     * @param idCurso el identificador del curso a establecer
     */
    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    /**
     * Obtiene el nombre del curso.
     *
     * @return el nombre del curso
     */
    public String getCursoNombre() {
        return cursoNombre;
    }

    /**
     * Establece el nombre del curso.
     *
     * @param cursoNombre el nombre del curso a establecer
     */
    public void setCursoNombre(String cursoNombre) {
        this.cursoNombre = cursoNombre;
    }

    /**
     * Obtiene el numero total de estudiantes del curso.
     *
     * @return el total de estudiantes
     */
    public Long getTotalEstudiantes() {
        return totalEstudiantes;
    }

    /**
     * Establece el numero total de estudiantes del curso.
     *
     * @param totalEstudiantes el total de estudiantes a establecer
     */
    public void setTotalEstudiantes(Long totalEstudiantes) {
        this.totalEstudiantes = totalEstudiantes;
    }

    /**
     * Obtiene el numero total de calificaciones registradas para la tarea.
     *
     * @return el total de calificaciones
     */
    public Long getTotalCalificaciones() {
        return totalCalificaciones;
    }

    /**
     * Establece el numero total de calificaciones registradas para la tarea.
     *
     * @param totalCalificaciones el total de calificaciones a establecer
     */
    public void setTotalCalificaciones(Long totalCalificaciones) {
        this.totalCalificaciones = totalCalificaciones;
    }

    /**
     * Obtiene el mensaje descriptivo del resultado de la operacion.
     *
     * @return el mensaje del resultado
     */
    public String getMensaje() {
        return mensaje;
    }

    /**
     * Establece el mensaje descriptivo del resultado de la operacion.
     *
     * @param mensaje el mensaje a establecer
     */
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
