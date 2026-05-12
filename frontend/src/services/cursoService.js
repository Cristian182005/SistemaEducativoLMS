import axios from "axios";

const API = "http://localhost:8081/api/cursos";

// LISTAR

export const listarCursos = () => {
    return axios.get(API);
};

// BUSCAR

export const buscarCurso = (id) => {
    return axios.get(`${API}/${id}`);
};

// GUARDAR

export const guardarCurso = (curso) => {
    return axios.post(API, curso);
};

// ACTUALIZAR

export const actualizarCurso = (id, curso) => {
    return axios.put(`${API}/${id}`, curso);
};

// ELIMINAR

export const eliminarCurso = (id) => {
    return axios.delete(`${API}/${id}`);
};