package backend.controller;

import backend.model.Usuario;
import backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import backend.model.Padre;
import backend.repository.PadreRepository;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PadreRepository padreRepository;

    // =========================================
    // MENSAJE SI ENTRAN DESDE EL NAVEGADOR
    // =========================================

    @GetMapping("/login")
    public String mensajeLogin() {

        return "API LOGIN LMS FUNCIONANDO CORRECTAMENTE";
    }

    // =========================================
    // LOGIN REAL
    // =========================================

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Usuario datos) {

        Map<String, Object> respuesta = new HashMap<>();

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByCorreo(datos.getCorreo());

        // VALIDAR SI EXISTE
        if (usuarioEncontrado.isEmpty()) {

            respuesta.put("success", false);
            respuesta.put("message", "Usuario no encontrado");

            return respuesta;
        }

        Usuario usuario = usuarioEncontrado.get();

        // VALIDAR PASSWORD
        if (!usuario.getPassword().equals(datos.getPassword())) {

            respuesta.put("success", false);
            respuesta.put("message", "Contraseña incorrecta");

            return respuesta;
        }

        // LOGIN CORRECTO
        respuesta.put("success", true);
        respuesta.put("message", "Login correcto");
        respuesta.put("usuario", usuario);

        return respuesta;
    }

    @PostMapping("/register-padre")
    public Map<String, Object> registerPadre(
            @RequestBody Map<String, String> datos) {

        Map<String, Object> respuesta = new HashMap<>();

        Optional<Usuario> existe = usuarioRepository.findByCorreo(
                datos.get("correo"));

        if (existe.isPresent()) {

            respuesta.put("success", false);
            respuesta.put("message", "El correo ya existe");

            return respuesta;
        }

        // =====================================
        // CREAR USUARIO
        // =====================================

        Usuario usuario = new Usuario();

        usuario.setNombre(
                datos.get("nombres") + " " +
                        datos.get("apellidos"));

        usuario.setCorreo(
                datos.get("correo"));

        usuario.setPassword(
                datos.get("password"));

        usuario.setRol("PADRE");

        usuario.setEstado("ACTIVO");

        Usuario nuevoUsuario = usuarioRepository.save(usuario);

        // =====================================
        // CREAR PADRE
        // =====================================

        Padre padre = new Padre();

        padre.setUsuario(nuevoUsuario);

        padre.setNombres(
                datos.get("nombres"));

        padre.setApellidos(
                datos.get("apellidos"));

        padre.setDni(
                datos.get("dni"));

        padre.setTelefono(
                datos.get("telefono"));

        padre.setDireccion(
                datos.get("direccion"));

        padre.setTipo(
                datos.get("tipo"));

        padreRepository.save(padre);

        respuesta.put("success", true);
        respuesta.put("usuario", nuevoUsuario);

        return respuesta;
    }
}