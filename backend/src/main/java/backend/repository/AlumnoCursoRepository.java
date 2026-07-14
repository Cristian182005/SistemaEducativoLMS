package backend.repository;

import backend.dto.AlumnoCursoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * Repositorio que accede a la funcion de base de datos para listar alumnos asignados a un curso especifico.
 */
@Repository
public class AlumnoCursoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Obtiene la lista de alumnos asignados a un curso determinado, filtrando por el docente propietario.
     *
     * @param idCurso  identificador del curso
     * @param idDocente identificador del docente que imparte el curso
     * @return lista de alumnos inscritos en el curso, representados como {@link AlumnoCursoDTO}
     */
    public List<AlumnoCursoDTO> listarAlumnosCurso(String idCurso, String idDocente) {

        String sql = "{call fn_listar_alumnos_curso(?, ?)}";

        return jdbcTemplate.execute((Connection conn) -> {
            CallableStatement cs = conn.prepareCall(sql);
            cs.setString(1, idCurso);
            cs.setString(2, idDocente);

            ResultSet rs = cs.executeQuery();
            List<AlumnoCursoDTO> lista = new ArrayList<>();

            while (rs.next()) {
                AlumnoCursoDTO dto = new AlumnoCursoDTO();
                dto.setCodigo(rs.getString(1));
                dto.setNombreCompleto(rs.getString(2));
                dto.setGrado(rs.getString(3));
                dto.setSeccion(rs.getString(4));
                dto.setPromedio(rs.getBigDecimal(5));
                dto.setEstado(rs.getString(6));
                dto.setObservaciones(rs.getString(7));
                dto.setTotalTareas(rs.getLong(8));
                lista.add(dto);
            }

            return lista;
        });
    }
}
