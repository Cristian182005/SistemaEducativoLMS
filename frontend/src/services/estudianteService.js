import axios from "axios";

const API = "http://localhost:8081/api/estudiantes";

export const listarEstudiantes = (page = 0, size = 10) =>
    axios.get(`${API}?page=${page}&size=${size}`);

export const buscarEstudiantes = (buscar, page = 0, size = 10) =>
    axios.get(`${API}/buscar?buscar=${encodeURIComponent(buscar)}&page=${page}&size=${size}`);

export const guardarEstudiante = (data) =>
    axios.post(API, data);

export const obtenerEstudiante = (id) =>
    axios.get(`${API}/${id}`);

export const obtenerPadresEstudiante = (id) =>
    axios.get(`${API}/${id}/padres`);

export const actualizarEstudiante = (id, data) =>
    axios.put(`${API}/${id}`, data);

export const eliminarEstudiante = (id) =>
    axios.delete(`${API}/${id}`);