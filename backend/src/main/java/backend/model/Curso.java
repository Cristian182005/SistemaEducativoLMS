package backend.model;

import jakarta.persistence.*;

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

    // GETTERS Y SETTERS

    public Integer getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(Integer idCurso) {
        this.idCurso = idCurso;
    }

    public Docente getDocente() {
        return docente;
    }

    public void setDocente(Docente docente) {
        this.docente = docente;
    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}