package backend.service;

import backend.model.PadreEstudiante;
import backend.repository.PadreEstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio de negocio para la gestion de relaciones padre-estudiante.
 */
@Service
public class PadreEstudianteService {

    @Autowired
    private PadreEstudianteRepository repository;

    /**
     * Lista todas las relaciones padre-estudiante registradas.
     *
     * @return lista de relaciones padre-estudiante
     */
    public List<PadreEstudiante> listar() {
        return repository.findAll();
    }

    /**
     * Guarda o actualiza una relacion padre-estudiante.
     *
     * @param relacion entidad padre-estudiante a persistir
     * @return la entidad guardada con el identificador asignado o actualizado
     */
    public PadreEstudiante guardar(PadreEstudiante relacion) {
        return repository.save(relacion);
    }

    /**
     * Elimina una relacion padre-estudiante por su identificador.
     *
     * @param id identificador de la relacion a eliminar
     */
    public void eliminar(Integer id) {
        repository.deleteById(id);
    }

    /**
     * Obtiene una relacion padre-estudiante por su identificador.
     *
     * @param id identificador de la relacion
     * @return la entidad encontrada, o null si no existe
     */
    public PadreEstudiante obtenerPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }
}