import { useState, useEffect, createContext } from "react";
import axiosInstance from '../config/axios';

const AcountContext = createContext();

export const AcountProvider = ({ children }) => {

    const [ cuentas, setCuentas ] = useState([]);

    const obtenerCuentas = async (id) => {

        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/acount/${id}`;
            const { data } = await axiosInstance(url, config)
            setCuentas(data);
            
        } catch (error) {
            console.log(error)
        }
    }

    const registrarCuenta = async ( nombre_cuenta, usuario, password, datos_extra, usuario_id, cuenta_id ) => {

        if(cuenta_id){
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosInstance.put(`/api/acount/${cuenta_id}`, { nombre_cuenta, usuario, password, datos_extra, usuario_id }, config)
                const cuentActualizada = cuentas.map( cuentaState => cuentaState.datos_cuenta_id === data.dataActualizada.id ? data.dataActualizada : cuentaState )
                setCuentas(cuentActualizada)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const token = localStorage.getItem('token')
                if(!token) return
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
    
                const { data } = await axiosInstance.post('/api/acount', { nombre_cuenta, usuario, password, datos_extra, usuario_id }, config);
                obtenerCuentas(usuario_id);
                console.log(data);
            } catch (error) {
                // El servidor respondió con un código de estado diferente a 2xx
                //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
                console.log(error);
                //showAlert('error', errorMessage);
            }
        }
        
    }

    const eliminarCuenta = async ( id, usuario_sid ) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/acount/${id}`;
            const { data } = await axiosInstance.delete(url, config);
            obtenerCuentas(usuario_sid);
            console.log(data);
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.log(error);
            //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            //showAlert('error', errorMessage);
        }
    }

    return (
        <AcountContext.Provider
            value={{
                cuentas,
                obtenerCuentas,
                registrarCuenta,
                eliminarCuenta
            }}
        >
            {children}
        </AcountContext.Provider>
    );
}

export default AcountContext;