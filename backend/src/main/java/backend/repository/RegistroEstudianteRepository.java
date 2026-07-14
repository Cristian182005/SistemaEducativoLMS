package backend.repository;

import backend.dto.ResultadoRegistroDTO;
import backend.dto.RegistroEstudianteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.object.StoredProcedure;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Types;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.*;

/**
 * Repositorio que accede a la funcion de base de datos para registrar un estudiante
 * completo con todos sus datos (matricula, estudiante, padre y solicitud).
 */
@Repository
public class RegistroEstudianteRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Registra un estudiante completo ejecutando el procedimiento almacenado
     * fn_registrar_estudiante_completo en la base de datos.
     *
     * @param dto Objeto de transferencia de datos que contiene toda la informacion
     *            del estudiante, su padre y la solicitud de matricula.
     * @return ResultadoRegistroDTO con los IDs generados y el estado de la operacion.
     */
    public ResultadoRegistroDTO registrarEstudianteCompleto(RegistroEstudianteDTO dto) {

        String sql = "{call fn_registrar_estudiante_completo(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        return jdbcTemplate.execute((Connection conn) -> {
            CallableStatement cs = conn.prepareCall(sql);

            cs.setString(1, dto.getNivel());
            cs.setString(2, dto.getGrado());
            cs.setString(3, dto.getSeccion());
            cs.setString(4, dto.getApellidoPaterno());
            cs.setString(5, dto.getApellidoMaterno());
            cs.setString(6, dto.getNombres());
            cs.setString(7, dto.getFechaNacimiento().toString());
            cs.setString(8, dto.getProvincia());
            cs.setString(9, dto.getDepartamento());
            cs.setString(10, dto.getDistrito());
            cs.setString(11, dto.getSexo());
            cs.setString(12, dto.getDni());
            cs.setString(13, dto.getDireccion());
            cs.setString(14, dto.getPadreNombres());
            cs.setString(15, dto.getPadreApellidos());
            cs.setString(16, dto.getPadreDni());
            cs.setString(17, dto.getPadreTelefono());
            cs.setString(18, dto.getPadreDireccion());
            cs.setString(19, dto.getPadreTipo() != null ? dto.getPadreTipo() : "PADRE");

            ResultSet rs = cs.executeQuery();

            if (rs.next()) {
                return new ResultadoRegistroDTO(
                        rs.getInt(1),
                        rs.getInt(2),
                        rs.getInt(3),
                        rs.getInt(4),
                        rs.getString(5),
                        rs.getString(6)
                );
            }
            throw new RuntimeException("No se obtuvo resultado del procedimiento");
        });
    }
}
