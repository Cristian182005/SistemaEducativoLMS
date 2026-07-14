package backend.repository;

import backend.model.Curso;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio de acceso a datos para la entidad Curso.
 */
public interface CursoRepository extends JpaRepository<Curso, Integer> {
    
}