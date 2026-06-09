import axios from "axios";

const API = "http://localhost:8081/api/tareas";

export const listarTareas = () => axios.get(API);

export const guardarTarea = (tarea) => axios.post(API, tarea);

export const actualizarTarea = (id, tarea) => axios.put(`${API}/${id}`, tarea);

export const eliminarTarea = (id) => axios.delete(`${API}/${id}`);