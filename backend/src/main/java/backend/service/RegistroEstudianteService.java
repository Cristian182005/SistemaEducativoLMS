package backend.service;

import backend.dto.RegistroEstudianteDTO;
import backend.dto.ResultadoRegistroDTO;
import backend.repository.RegistroEstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Servicio de negocio para el registro completo de estudiantes en el sistema.
 */
@Service
public class RegistroEstudianteService {

    @Autowired
    private RegistroEstudianteRepository registroRepository;

    /**
     * Registra un estudiante completo en el sistema mediante un proceso transaccional.
     *
     * @param dto DTO con los datos del estudiante, matricula, padre y relaciones
     * @return DTO con el resultado del registro incluyendo identificadores generados
     */
    public ResultadoRegistroDTO registrarEstudiante(RegistroEstudianteDTO dto) {
        return registroRepository.registrarEstudianteCompleto(dto);
    }
}
