import axios from "axios";

const API = "http://localhost:8081/api/materiales";

export const listarMateriales = () => axios.get(API);

export const guardarMaterial = (material) => axios.post(API, material);

export const actualizarMaterial = (id, material) => axios.put(`${API}/${id}`, material);

export const eliminarMaterial = (id) => axios.delete(`${API}/${id}`);