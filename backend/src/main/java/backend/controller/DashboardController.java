package backend.controller;

import backend.repository.CursoRepository;
import backend.repository.DocenteRepository;
import backend.repository.EstudianteRepository;
import backend.repository.MatriculaRepository;
import backend.repository.PadreRepository;
import backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controlador REST para el dashboard administrativo, que provee resumen de datos y estadisticas.
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

        @Autowired
        private EstudianteRepository estudianteRepository;

        @Autowired
        private DocenteRepository docenteRepository;

        @Autowired
        private CursoRepository cursoRepository;

        @Autowired
        private MatriculaRepository matriculaRepository;

        /**
         * Obtiene la cantidad de matriculas agrupadas por fecha.
         *
         * @return lista de mapas con las claves "fecha" y "cantidad"
         */
        @GetMapping("/matriculas-fecha")
        public List<Map<String, Object>> obtenerMatriculasPorFecha() {

                List<Object[]> datos = matriculaRepository.obtenerMatriculasPorFecha();

                List<Map<String, Object>> resultado = new java.util.ArrayList<>();

                for (Object[] fila : datos) {

                        Map<String, Object> item = new HashMap<>();

                        item.put("fecha", fila[0]);

                        item.put("cantidad", fila[1]);

                        resultado.add(item);
                }

                return resultado;
        }

        @Autowired
        private PadreRepository padreRepository;

        @Autowired
        private UsuarioRepository usuarioRepository;

        /**
         * Obtiene un resumen con el total de registros de cada entidad del sistema.
         *
         * @return mapa de clave-valor con la entidad y su cantidad total
         */
        @GetMapping("/resumen")
        public Map<String, Long> obtenerResumen() {

                Map<String, Long> resumen = new HashMap<>();

                resumen.put("estudiantes", estudianteRepository.count());

                resumen.put("docentes", docenteRepository.count());

                resumen.put("cursos", cursoRepository.count());

                resumen.put("matriculas", matriculaRepository.count());

                resumen.put("padres", padreRepository.count());

                resumen.put("usuarios", usuarioRepository.count());

                return resumen;
        }
}