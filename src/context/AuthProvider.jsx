import { useState, useEffect, createContext } from 'react';
import axiosInstance from '../config/axios';

// Crea el contexto de autenticación
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando ] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authenticateUser = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosInstance('/api/perfil', config);
                setAuth(data);
            } catch (error) {
                // El servidor respondió con un código de estado diferente a 2xx
                const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
                console.log('error', errorMessage);
                setAuth({})
            }

            setCargando(false);
        }

        authenticateUser();
    }, []);

    const cerrarSesion = async () =>{
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                setCargando,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
