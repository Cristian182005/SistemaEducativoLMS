import axios from "axios";

const API = "http://localhost:8081/api/docentes";

// LISTAR

export const listarDocentes = () => {
    return axios.get(API);
};

// BUSCAR

export const buscarDocente = (id) => {
    return axios.get(`${API}/${id}`);
};

// GUARDAR

export const guardarDocente = (docente) => {
    return axios.post(API, docente);
};

// ACTUALIZAR

export const actualizarDocente = (id, docente) => {
    return axios.put(`${API}/${id}`, docente);
};

// ELIMINAR

export const eliminarDocente = (id) => {
    return axios.delete(`${API}/${id}`);
};