package backend.controller;

import backend.model.Material;
import backend.repository.MaterialRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de materiales de apoyo didactico.
 */
@RestController
@RequestMapping("/api/materiales")
@CrossOrigin(origins = "http://localhost:5173")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    /** Lista los materiales asociados a un curso especifico. @param idCurso identificador del curso @return lista de materiales del curso */
    @GetMapping("/por-curso/{idCurso}")
    public List<Material> listarMaterialesPorCurso(@PathVariable Integer idCurso) {
        return materialRepository.findByCurso(idCurso);
    }

    /** Lista todos los materiales registrados en el sistema. @return lista de materiales */
    @GetMapping
    public List<Material> listarMateriales() {
        return materialRepository.findAll();
    }

    /** Guarda un nuevo material en el sistema. @param material datos del material a guardar @return material creado */
    @PostMapping
    public Material guardarMaterial(@RequestBody Material material) {
        return materialRepository.save(material);
    }

    /** Obtiene un material por su identificador. @param id identificador del material @return material encontrado o null */
    @GetMapping("/{id}")
    public Material obtenerMaterial(@PathVariable Long id) {
        return materialRepository.findById(id).orElse(null);
    }

    /** Actualiza los datos de un material existente. @param id identificador del material @param datos nuevos datos del material @return material actualizado o null si no se encuentra */
    @PutMapping("/{id}")
    public Material actualizarMaterial(@PathVariable Long id,
                                       @RequestBody Material datos) {

        Material material = materialRepository.findById(id).orElse(null);

        if (material != null) {

            material.setTitulo(datos.getTitulo());
            material.setDescripcion(datos.getDescripcion());
            material.setArchivo(datos.getArchivo());

            return materialRepository.save(material);
        }

        return null;
    }

    /** Elimina un material por su identificador. @param id identificador del material @return mensaje de confirmacion */
    @DeleteMapping("/{id}")
    public String eliminarMaterial(@PathVariable Long id) {

        materialRepository.deleteById(id);

        return "Material eliminado correctamente";
    }
}