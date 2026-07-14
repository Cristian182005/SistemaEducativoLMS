package backend.repository;

import backend.model.SolicitudMatricula;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio de acceso a datos para la entidad SolicitudMatricula.
 */
public interface SolicitudMatriculaRepository
        extends JpaRepository<SolicitudMatricula, Integer> {
}