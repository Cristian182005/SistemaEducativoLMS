package backend.model;

import jakarta.persistence.*;

/**
 * Entidad que representa un curso del sistema educativo.
 * Un curso tiene un nombre, una descripcion y un docente asignado.
 *
 * @author SistemaEducativoLMS
 * @version 1.0
 */
@Entity
@Table(name = "cursos")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso")
    private Integer idCurso;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_docente")
    private Docente docente;

    private String nombre;

    private String descripcion;

    /**
     * Obtiene el identificador unico del curso.
     *
     * @return el identificador del curso
     */
    public Integer getIdCurso() {
        return idCurso;
    }

    /**
     * Establece el identificador del curso.
     *
     * @param idCurso el identificador a asignar
     */
    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    /**
     * Obtiene el docente asignado al curso.
     *
     * @return el docente del curso
     */
    public Docente getDocente() {
        return docente;
    }

    /**
     * Establece el docente del curso.
     *
     * @param docente el docente a asignar
     */
    public void setDocente(Docente docente) {
        this.docente = docente;
    }

    /**
     * Obtiene el nombre del curso.
     *
     * @return el nombre del curso
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece el nombre del curso.
     *
     * @param nombre el nombre a asignar
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene la descripcion del curso.
     *
     * @return la descripcion del curso
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Establece la descripcion del curso.
     *
     * @param descripcion la descripcion a asignar
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}