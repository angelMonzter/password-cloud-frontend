import axios from 'axios';

// Configuración básica de Axios
const axiosInstance = axios.create({
    //Servidor
    baseURL: 'https://angelvelazquez.online:4000', 
    //localhost
    //baseURL: import.meta.env.VITE_API_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // Tiempo máximo de espera para las peticiones
});

export default axiosInstance;
