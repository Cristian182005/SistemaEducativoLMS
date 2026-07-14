package backend.dto;

import java.time.LocalDate;

/**
 * Objeto de transferencia de datos que agrupa toda la informacion necesaria para registrar un nuevo estudiante,
 * incluyendo datos de matricula, del estudiante y del padre/apoderado.
 */
public class RegistroEstudianteDTO {

    private String nivel;
    private String grado;
    private String seccion;

    private String apellidoPaterno;
    private String apellidoMaterno;
    private String nombres;
    private LocalDate fechaNacimiento;
    private String provincia;
    private String departamento;
    private String distrito;
    private String sexo;
    private String dni;
    private String direccion;

    private String padreNombres;
    private String padreApellidos;
    private String padreDni;
    private String padreTelefono;
    private String padreDireccion;
    private String padreTipo;

    public RegistroEstudianteDTO() {}

    /**
     * Obtiene el nivel del estudiante.
     *
     * @return el nivel del estudiante
     */
    public String getNivel() {
        return nivel;
    }

    /**
     * Establece el nivel del estudiante.
     *
     * @param nivel el nivel del estudiante a establecer
     */
    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    /**
     * Obtiene el grado del estudiante.
     *
     * @return el grado del estudiante
     */
    public String getGrado() {
        return grado;
    }

    /**
     * Establece el grado del estudiante.
     *
     * @param grado el grado del estudiante a establecer
     */
    public void setGrado(String grado) {
        this.grado = grado;
    }

    /**
     * Obtiene la seccion del estudiante.
     *
     * @return la seccion del estudiante
     */
    public String getSeccion() {
        return seccion;
    }

    /**
     * Establece la seccion del estudiante.
     *
     * @param seccion la seccion del estudiante a establecer
     */
    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }

    /**
     * Obtiene el apellido paterno del estudiante.
     *
     * @return el apellido paterno del estudiante
     */
    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    /**
     * Establece el apellido paterno del estudiante.
     *
     * @param apellidoPaterno el apellido paterno del estudiante a establecer
     */
    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    /**
     * Obtiene el apellido materno del estudiante.
     *
     * @return el apellido materno del estudiante
     */
    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    /**
     * Establece el apellido materno del estudiante.
     *
     * @param apellidoMaterno el apellido materno del estudiante a establecer
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
     * @param nombres los nombres del estudiante a establecer
     */
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    /**
     * Obtiene la fecha de nacimiento del estudiante.
     *
     * @return la fecha de nacimiento del estudiante
     */
    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    /**
     * Establece la fecha de nacimiento del estudiante.
     *
     * @param fechaNacimiento la fecha de nacimiento del estudiante a establecer
     */
    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    /**
     * Obtiene la provincia del estudiante.
     *
     * @return la provincia del estudiante
     */
    public String getProvincia() {
        return provincia;
    }

    /**
     * Establece la provincia del estudiante.
     *
     * @param provincia la provincia del estudiante a establecer
     */
    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    /**
     * Obtiene el departamento del estudiante.
     *
     * @return el departamento del estudiante
     */
    public String getDepartamento() {
        return departamento;
    }

    /**
     * Establece el departamento del estudiante.
     *
     * @param departamento el departamento del estudiante a establecer
     */
    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    /**
     * Obtiene el distrito del estudiante.
     *
     * @return el distrito del estudiante
     */
    public String getDistrito() {
        return distrito;
    }

    /**
     * Establece el distrito del estudiante.
     *
     * @param distrito el distrito del estudiante a establecer
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
     * @param sexo el sexo del estudiante a establecer
     */
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    /**
     * Obtiene el DNI del estudiante.
     *
     * @return el DNI del estudiante
     */
    public String getDni() {
        return dni;
    }

    /**
     * Establece el DNI del estudiante.
     *
     * @param dni el DNI del estudiante a establecer
     */
    public void setDni(String dni) {
        this.dni = dni;
    }

    /**
     * Obtiene la direccion del estudiante.
     *
     * @return la direccion del estudiante
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * Establece la direccion del estudiante.
     *
     * @param direccion la direccion del estudiante a establecer
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * Obtiene los nombres del padre o apoderado.
     *
     * @return los nombres del padre o apoderado
     */
    public String getPadreNombres() {
        return padreNombres;
    }

    /**
     * Establece los nombres del padre o apoderado.
     *
     * @param padreNombres los nombres del padre o apoderado a establecer
     */
    public void setPadreNombres(String padreNombres) {
        this.padreNombres = padreNombres;
    }

    /**
     * Obtiene los apellidos del padre o apoderado.
     *
     * @return los apellidos del padre o apoderado
     */
    public String getPadreApellidos() {
        return padreApellidos;
    }

    /**
     * Establece los apellidos del padre o apoderado.
     *
     * @param padreApellidos los apellidos del padre o apoderado a establecer
     */
    public void setPadreApellidos(String padreApellidos) {
        this.padreApellidos = padreApellidos;
    }

    /**
     * Obtiene el DNI del padre o apoderado.
     *
     * @return el DNI del padre o apoderado
     */
    public String getPadreDni() {
        return padreDni;
    }

    /**
     * Establece el DNI del padre o apoderado.
     *
     * @param padreDni el DNI del padre o apoderado a establecer
     */
    public void setPadreDni(String padreDni) {
        this.padreDni = padreDni;
    }

    /**
     * Obtiene el telefono del padre o apoderado.
     *
     * @return el telefono del padre o apoderado
     */
    public String getPadreTelefono() {
        return padreTelefono;
    }

    /**
     * Establece el telefono del padre o apoderado.
     *
     * @param padreTelefono el telefono del padre o apoderado a establecer
     */
    public void setPadreTelefono(String padreTelefono) {
        this.padreTelefono = padreTelefono;
    }

    /**
     * Obtiene la direccion del padre o apoderado.
     *
     * @return la direccion del padre o apoderado
     */
    public String getPadreDireccion() {
        return padreDireccion;
    }

    /**
     * Establece la direccion del padre o apoderado.
     *
     * @param padreDireccion la direccion del padre o apoderado a establecer
     */
    public void setPadreDireccion(String padreDireccion) {
        this.padreDireccion = padreDireccion;
    }

    /**
     * Obtiene el tipo de padre o apoderado.
     *
     * @return el tipo de padre o apoderado
     */
    public String getPadreTipo() {
        return padreTipo;
    }

    /**
     * Establece el tipo de padre o apoderado.
     *
     * @param padreTipo el tipo de padre o apoderado a establecer
     */
    public void setPadreTipo(String padreTipo) {
        this.padreTipo = padreTipo;
    }
}
