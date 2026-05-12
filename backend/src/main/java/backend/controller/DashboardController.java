package backend.controller;

import backend.repository.CursoRepository;
import backend.repository.DocenteRepository;
import backend.repository.EstudianteRepository;
import backend.repository.MatriculaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/resumen")
    public Map<String, Long> obtenerResumen() {

        Map<String, Long> resumen = new HashMap<>();

        resumen.put(
            "estudiantes",
            estudianteRepository.count()
        );

        resumen.put(
            "docentes",
            docenteRepository.count()
        );

        resumen.put(
            "cursos",
            cursoRepository.count()
        );

        resumen.put(
            "matriculas",
            matriculaRepository.count()
        );

        return resumen;
    }
}