package backend.dto;

/**
 * Objeto de transferencia de datos que contiene el resultado de una operacion de registro de estudiante,
 * incluyendo los IDs generados y un mensaje descriptivo.
 */
public class ResultadoRegistroDTO {

    private Integer idMatricula;
    private Integer idEstudiante;
    private Integer idPadre;
    private Integer idSolicitud;
    private String codigoEstudiante;
    private String mensaje;

    public ResultadoRegistroDTO() {}

    /**
     * Constructor con todos los campos del resultado de registro.
     *
     * @param idMatricula      el ID de la matricula generada
     * @param idEstudiante     el ID del estudiante registrado
     * @param idPadre          el ID del padre o apoderado registrado
     * @param idSolicitud      el ID de la solicitud de registro
     * @param codigoEstudiante el codigo unico generado para el estudiante
     * @param mensaje          el mensaje descriptivo del resultado de la operacion
     */
    public ResultadoRegistroDTO(Integer idMatricula, Integer idEstudiante, Integer idPadre,
                                 Integer idSolicitud, String codigoEstudiante, String mensaje) {
        this.idMatricula = idMatricula;
        this.idEstudiante = idEstudiante;
        this.idPadre = idPadre;
        this.idSolicitud = idSolicitud;
        this.codigoEstudiante = codigoEstudiante;
        this.mensaje = mensaje;
    }

    /**
     * Obtiene el ID de la matricula.
     *
     * @return el ID de la matricula
     */
    public Integer getIdMatricula() {
        return idMatricula;
    }

    /**
     * Establece el ID de la matricula.
     *
     * @param idMatricula el ID de la matricula a establecer
     */
    public void setIdMatricula(Integer idMatricula) {
        this.idMatricula = idMatricula;
    }

    /**
     * Obtiene el ID del estudiante.
     *
     * @return el ID del estudiante
     */
    public Integer getIdEstudiante() {
        return idEstudiante;
    }

    /**
     * Establece el ID del estudiante.
     *
     * @param idEstudiante el ID del estudiante a establecer
     */
    public void setIdEstudiante(Integer idEstudiante) {
        this.idEstudiante = idEstudiante;
    }

    /**
     * Obtiene el ID del padre o apoderado.
     *
     * @return el ID del padre
     */
    public Integer getIdPadre() {
        return idPadre;
    }

    /**
     * Establece el ID del padre o apoderado.
     *
     * @param idPadre el ID del padre a establecer
     */
    public void setIdPadre(Integer idPadre) {
        this.idPadre = idPadre;
    }

    /**
     * Obtiene el ID de la solicitud.
     *
     * @return el ID de la solicitud
     */
    public Integer getIdSolicitud() {
        return idSolicitud;
    }

    /**
     * Establece el ID de la solicitud.
     *
     * @param idSolicitud el ID de la solicitud a establecer
     */
    public void setIdSolicitud(Integer idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    /**
     * Obtiene el codigo unico del estudiante.
     *
     * @return el codigo del estudiante
     */
    public String getCodigoEstudiante() {
        return codigoEstudiante;
    }

    /**
     * Establece el codigo unico del estudiante.
     *
     * @param codigoEstudiante el codigo del estudiante a establecer
     */
    public void setCodigoEstudiante(String codigoEstudiante) {
        this.codigoEstudiante = codigoEstudiante;
    }

    /**
     * Obtiene el mensaje descriptivo del resultado.
     *
     * @return el mensaje del resultado
     */
    public String getMensaje() {
        return mensaje;
    }

    /**
     * Establece el mensaje descriptivo del resultado.
     *
     * @param mensaje el mensaje a establecer
     */
    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
