package backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Entidad que representa una solicitud de matricula realizada por un padre para un estudiante.
 */
@Entity
@Table(name = "solicitudes_matricula")
public class SolicitudMatricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud")

    private Integer idSolicitud;

    @Column(name = "fecha_solicitud")
    private LocalDate fechaSolicitud;

    private String estado;

    private String observacion;

    @ManyToOne
    @JoinColumn(name = "id_padre")
    private Padre padre;

    @ManyToOne
    @JoinColumn(name = "id_estudiante")
    private Estudiante estudiante;

    /**
     * @return el identificador unico de la solicitud de matricula.
     */
    public Integer getIdSolicitud() {
        return idSolicitud;
    }

    /**
     * @param idSolicitud el identificador unico de la solicitud de matricula.
     */
    public void setIdSolicitud(Integer idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    /**
     * @return la fecha en que se realizo la solicitud.
     */
    public LocalDate getFechaSolicitud() {
        return fechaSolicitud;
    }

    /**
     * @param fechaSolicitud la fecha en que se realizo la solicitud.
     */
    public void setFechaSolicitud(LocalDate fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    /**
     * @return el estado actual de la solicitud de matricula.
     */
    public String getEstado() {
        return estado;
    }

    /**
     * @param estado el estado actual de la solicitud de matricula.
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }

    /**
     * @return la observacion o comentario asociado a la solicitud.
     */
    public String getObservacion() {
        return observacion;
    }

    /**
     * @param observacion la observacion o comentario asociado a la solicitud.
     */
    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    /**
     * @return el padre que realizo la solicitud de matricula.
     */
    public Padre getPadre() {
        return padre;
    }

    /**
     * @param padre el padre que realizo la solicitud de matricula.
     */
    public void setPadre(Padre padre) {
        this.padre = padre;
    }

    /**
     * @return el estudiante para quien se realiza la solicitud de matricula.
     */
    public Estudiante getEstudiante() {
        return estudiante;
    }

    /**
     * @param estudiante el estudiante para quien se realiza la solicitud de matricula.
     */
    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }
}
