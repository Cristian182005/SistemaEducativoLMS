package backend.service;

import backend.dto.TareaCalificacionDTO;
import backend.dto.ResultadoTareaDTO;
import backend.repository.TareaCalificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Servicio de negocio para el registro de tareas con calificaciones asociadas.
 */
@Service
public class TareaCalificacionService {

    @Autowired
    private TareaCalificacionRepository repository;

    /**
     * Registra una tarea junto con las calificaciones de los alumnos de un curso.
     *
     * @param dto DTO con los datos de la tarea y las calificaciones asociadas
     * @return DTO con el resultado del registro incluyendo el identificador de la tarea creada
     */
    public ResultadoTareaDTO registrarTarea(TareaCalificacionDTO dto) {
        return repository.registrarTareaConCalificaciones(dto);
    }
}
