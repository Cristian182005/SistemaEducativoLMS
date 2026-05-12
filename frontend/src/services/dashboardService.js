import axios from "axios";

const API = "http://localhost:8081/api/dashboard";

export const obtenerResumen = () => {
    return axios.get(`${API}/resumen`);
};