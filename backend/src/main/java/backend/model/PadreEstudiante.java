package backend.model;

import jakarta.persistence.*;

/**
 * Entidad que representa la relacion entre un padre/apoderado y un estudiante.
 */
@Entity
@Table(name = "padre_estudiante")
public class PadreEstudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_padre_estudiante")
    private Integer idPadreEstudiante;

    @ManyToOne
    @JoinColumn(name = "id_padre")
    private Padre padre;

    @ManyToOne
    @JoinColumn(name = "id_estudiante")
    private Estudiante estudiante;

    /**
     * Obtiene el identificador de la relacion padre-estudiante.
     *
     * @return el identificador unico de la relacion
     */
    public Integer getIdPadreEstudiante() {
        return idPadreEstudiante;
    }

    /**
     * Establece el identificador de la relacion padre-estudiante.
     *
     * @param idPadreEstudiante el identificador unico de la relacion
     */
    public void setIdPadreEstudiante(Integer idPadreEstudiante) {
        this.idPadreEstudiante = idPadreEstudiante;
    }

    /**
     * Obtiene el padre o apoderado asociado al estudiante.
     *
     * @return el objeto Padre asociado
     */
    public Padre getPadre() {
        return padre;
    }

    /**
     * Establece el padre o apoderado asociado al estudiante.
     *
     * @param padre el objeto Padre a asociar
     */
    public void setPadre(Padre padre) {
        this.padre = padre;
    }

    /**
     * Obtiene el estudiante asociado al padre o apoderado.
     *
     * @return el objeto Estudiante asociado
     */
    public Estudiante getEstudiante() {
        return estudiante;
    }

    /**
     * Establece el estudiante asociado al padre o apoderado.
     *
     * @param estudiante el objeto Estudiante a asociar
     */
    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }
}
