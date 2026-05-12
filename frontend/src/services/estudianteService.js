import axios from "axios";

const API =
    "http://localhost:8081/api/estudiantes";

export const listarEstudiantes = () =>
    axios.get(API);

export const guardarEstudiante = (data) =>
    axios.post(API, data);

export const obtenerEstudiante = (id) =>
    axios.get(`${API}/${id}`);

export const actualizarEstudiante = (id, data) =>
    axios.put(`${API}/${id}`, data);

export const eliminarEstudiante = (id) =>
    axios.delete(`${API}/${id}`);