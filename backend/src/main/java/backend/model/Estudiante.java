package backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Entidad que representa a un estudiante matriculado en el sistema educativo.
 */
@Entity
@Table(name = "estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEstudiante;

    private String codigoEstudiante;

    private String apellidoPaterno;
    private String apellidoMaterno;
    private String nombres;

    private LocalDate fechaNacimiento;

    private String provincia;
    private String departamento;
    private String distrito;

    private String dni;
    private String sexo;
    private Integer edad;
    private String direccion;

    @ManyToOne
    @JoinColumn(name = "id_matricula")
    private Matricula matricula;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    public Estudiante() {
    }

    /**
     * Obtiene el identificador único del estudiante.
     *
     * @return el identificador del estudiante
     */
    public Integer getIdEstudiante() {
        return idEstudiante;
    }

    /**
     * Establece el identificador único del estudiante.
     *
     * @param idEstudiante el identificador del estudiante
     */
    public void setIdEstudiante(Integer idEstudiante) {
        this.idEstudiante = idEstudiante;
    }

    /**
     * Obtiene el código único del estudiante.
     *
     * @return el código del estudiante
     */
    public String getCodigoEstudiante() {
        return codigoEstudiante;
    }

    /**
     * Establece el código único del estudiante.
     *
     * @param codigoEstudiante el código del estudiante
     */
    public void setCodigoEstudiante(String codigoEstudiante) {
        this.codigoEstudiante = codigoEstudiante;
    }

    /**
     * Obtiene el apellido paterno del estudiante.
     *
     * @return el apellido paterno
     */
    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    /**
     * Establece el apellido paterno del estudiante.
     *
     * @param apellidoPaterno el apellido paterno
     */
    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    /**
     * Obtiene el apellido materno del estudiante.
     *
     * @return el apellido materno
     */
    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    /**
     * Establece el apellido materno del estudiante.
     *
     * @param apellidoMaterno el apellido materno
     */
    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    /**
     * Obtiene los nombres del estudiante.
     *
     * @return los nombres del estudiante
     */
    public String getNombres() {
        return nombres;
    }

    /**
     * Establece los nombres del estudiante.
     *
     * @param nombres los nombres del estudiante
     */
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    /**
     * Obtiene la fecha de nacimiento del estudiante.
     *
     * @return la fecha de nacimiento
     */
    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    /**
     * Establece la fecha de nacimiento del estudiante.
     *
     * @param fechaNacimiento la fecha de nacimiento
     */
    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    /**
     * Obtiene la provincia del estudiante.
     *
     * @return la provincia
     */
    public String getProvincia() {
        return provincia;
    }

    /**
     * Establece la provincia del estudiante.
     *
     * @param provincia la provincia
     */
    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    /**
     * Obtiene el departamento del estudiante.
     *
     * @return el departamento
     */
    public String getDepartamento() {
        return departamento;
    }

    /**
     * Establece el departamento del estudiante.
     *
     * @param departamento el departamento
     */
    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    /**
     * Obtiene el distrito del estudiante.
     *
     * @return el distrito
     */
    public String getDistrito() {
        return distrito;
    }

    /**
     * Establece el distrito del estudiante.
     *
     * @param distrito el distrito
     */
    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    /**
     * Obtiene el sexo del estudiante.
     *
     * @return el sexo del estudiante
     */
    public String getSexo() {
        return sexo;
    }

    /**
     * Establece el sexo del estudiante.
     *
     * @param sexo el sexo del estudiante
     */
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    /**
     * Obtiene la edad del estudiante.
     *
     * @return la edad del estudiante
     */
    public Integer getEdad() {
        return edad;
    }

    /**
     * Establece la edad del estudiante.
     *
     * @param edad la edad del estudiante
     */
    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    /**
     * Obtiene la dirección del estudiante.
     *
     * @return la dirección del estudiante
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * Establece la dirección del estudiante.
     *
     * @param direccion la dirección del estudiante
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * Obtiene el número de DNI del estudiante.
     *
     * @return el número de DNI
     */
    public String getDni() {
        return dni;
    }

    /**
     * Establece el número de DNI del estudiante.
     *
     * @param dni el número de DNI
     */
    public void setDni(String dni) {
        this.dni = dni;
    }

    /**
     * Obtiene la matrícula asociada al estudiante.
     *
     * @return la matrícula del estudiante
     */
    public Matricula getMatricula() {
        return matricula;
    }

    /**
     * Establece la matrícula asociada al estudiante.
     *
     * @param matricula la matrícula del estudiante
     */
    public void setMatricula(Matricula matricula) {
        this.matricula = matricula;
    }

    /**
     * Obtiene el identificador del usuario asociado al estudiante.
     *
     * @return el identificador del usuario
     */
    public Integer getIdUsuario() {
        return idUsuario;
    }

    /**
     * Establece el identificador del usuario asociado al estudiante.
     *
     * @param idUsuario el identificador del usuario
     */
    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }
}
