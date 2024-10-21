import axios from 'axios';

// Configuración básica de Axios
const axiosInstance = axios.create({
    baseURL: 'https://app.softwareincorp.com.mx:4000', // Cambia esto por la URL de tu API
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // Tiempo máximo de espera para las peticiones
});

export default axiosInstance;
