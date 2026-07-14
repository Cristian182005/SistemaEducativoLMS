package backend.controller;

import backend.model.Usuario;
import backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestion de usuarios del sistema.
 */
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /** Lista todos los usuarios registrados en el sistema. @return lista de usuarios */
    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    /** Guarda un nuevo usuario en el sistema. @param usuario datos del usuario a guardar @return usuario creado */
    @PostMapping
    public Usuario guardar(
            @RequestBody Usuario usuario) {

        return usuarioRepository.save(usuario);
        
    }

    /** Obtiene un usuario por su identificador. @param id identificador del usuario @return usuario encontrado o null */
    @GetMapping("/{id}")
    public Usuario obtener(
            @PathVariable Integer id) {

        return usuarioRepository
                .findById(Integer.valueOf(id))
                .orElse(null);
    }

    /** Actualiza los datos de un usuario existente. @param id identificador del usuario @param datos nuevos datos del usuario @return usuario actualizado o null si no se encuentra */
    @PutMapping("/{id}")
    public Usuario actualizar(
            @PathVariable Integer id,
            @RequestBody Usuario datos) {

        Usuario usuario =
                usuarioRepository
                        .findById(Integer.valueOf(id))
                        .orElse(null);

        if (usuario == null) {
            return null;
        }

        usuario.setNombre(datos.getNombre());
        usuario.setCorreo(datos.getCorreo());
        usuario.setPassword(datos.getPassword());
        usuario.setRol(datos.getRol());
        usuario.setEstado(datos.getEstado());

        return usuarioRepository.save(usuario);
    }

    /** Elimina un usuario por su identificador. @param id identificador del usuario */
    @DeleteMapping("/{id}")
    public void eliminar(
            @PathVariable Integer id) {

        usuarioRepository.deleteById(
                Integer.valueOf(id));
    }
}