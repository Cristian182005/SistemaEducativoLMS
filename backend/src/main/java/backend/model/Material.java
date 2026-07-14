package backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

/**
 * Entidad que representa un material de apoyo didactico publicado en un curso.
 */
@Entity
@Table(name = "materiales")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material")
    private Integer idMaterial;

    @Column(name = "id_curso")
    private Integer idCurso;

    private String titulo;
    private String tipo;
    private String archivo;

    @Column(name = "fecha_publicacion")
    private LocalDate fechaPublicacion;

    private String descripcion;

    /**
     * @return el identificador unico del material
     */
    public Integer getIdMaterial() {
        return idMaterial;
    }

    /**
     * @param idMaterial el identificador unico del material
     */
    public void setIdMaterial(Integer idMaterial) {
        this.idMaterial = idMaterial;
    }

    /**
     * @return el identificador del curso al que pertenece el material
     */
    public Integer getIdCurso() {
        return idCurso;
    }

    /**
     * @param idCurso el identificador del curso al que pertenece el material
     */
    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    /**
     * @return el titulo del material
     */
    public String getTitulo() {
        return titulo;
    }

    /**
     * @param titulo el titulo del material
     */
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    /**
     * @return el tipo de material (por ejemplo: documento, video, enlace)
     */
    public String getTipo() {
        return tipo;
    }

    /**
     * @param tipo el tipo de material
     */
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /**
     * @return la ruta o nombre del archivo asociado al material
     */
    public String getArchivo() {
        return archivo;
    }

    /**
     * @param archivo la ruta o nombre del archivo asociado al material
     */
    public void setArchivo(String archivo) {
        this.archivo = archivo;
    }

    /**
     * @return la fecha de publicacion del material
     */
    public LocalDate  getFechaPublicacion() {
        return fechaPublicacion;
    }

    /**
     * @param fechaPublicacion la fecha de publicacion del material
     */
    public void setFechaPublicacion(LocalDate  fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    /**
     * @return la descripcion del contenido del material
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * @param descripcion la descripcion del contenido del material
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
