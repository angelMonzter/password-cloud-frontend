import { useState, useEffect, createContext } from "react";
import axiosInstance from '../config/axios';

const AcountContext = createContext();

export const AcountProvider = ({ children }) => {

    const [ cuentas, setCuentas ] = useState([]);
    const [ total_cuentas, setTotalcuentas ] = useState([]);

    const obtenerCuentas = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `/api/acount/${id}`;
            const { data } = await axiosInstance(url, config);
            console.log('data acount', data);

            // Obtener categorías para cada cuenta en paralelo
            const cuentasConCategorias = await Promise.all(
                data.map(async (cuenta) => {
                    const categorias = await obtenerCategoriasCuenta(cuenta.datos_cuenta_id, config);
                    return {
                        ...cuenta,
                        categorias, // Añadir las categorías a cada cuenta
                    };
                })
            );

            console.log('cuentas con categorías', cuentasConCategorias);
            setCuentas(cuentasConCategorias);
            obtenerCuentasTotal(id);

        } catch (error) {
            console.log(error);
        }
    };

    const obtenerCategoriasCuenta = async (id, config) => {
        try {
            const url = `/api/acount-categories/${id}`;
            const { data } = await axiosInstance(url, config);
            console.log('data categories', data);
            return data;
        } catch (error) {
            console.log(error);
            return []; // Retornar array vacío si hay error
        }
    };

    const obtenerCuentasTotal = async (id) => {

        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/acount-total/${id}`;
            const { data } = await axiosInstance(url, config)
            console.log(data)
            setTotalcuentas(data);
            
        } catch (error) {
            console.log(error)
        }
    }

    const registrarCuenta = async ( nombre_cuenta, usuario, password, datos_extra, usuario_id, cuenta_id, valoresCategorias ) => {

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
                // 1. Actualizar cuenta
                const { data } = await axiosInstance.put(`/api/acount/${cuenta_id}`, { nombre_cuenta, usuario, password, datos_extra, usuario_id }, config)

                //2. Eliminar categorías anteriores
                await axiosInstance.delete(`/api/acount-categories-delete/${cuenta_id}`, config);

                //3. Agregar nuevas categorías seleccionadas
                await Promise.all(
                    valoresCategorias.map(categoria_id =>
                    axiosInstance.post('/api/acount-category', { categoria_id, cuenta_sid: cuenta_id }, config)
                    )
                );
                
                //4. Actualizar UI
                obtenerCuentas(usuario_id);
                obtenerCuentasTotal(usuario_id);
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
                
                const cuenta_sid = data.cuenta_id;
                const respuestas = await Promise.all(
                    valoresCategorias.map(categoria_id =>
                        axiosInstance.post('/api/acount-category', { categoria_id, cuenta_sid }, config)
                    )
                );

                obtenerCuentas(usuario_id);
                obtenerCuentasTotal(usuario_id);
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
            obtenerCuentasTotal(usuario_sid);
            console.log(data);
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.log(error);
            //const errorMessage = error.response.data.message;  // Capturar el mensaje enviado por tu API
            //showAlert('error', errorMessage);
        }
    }

    const obtenerPasssword = async ( id ) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const url = `/api/show-password/${id}`;
            const { data } = await axiosInstance(url, config);

            // Retornar el texto desencriptado obtenido del servidor
            return data.textoDesencriptado; 
        } catch (error) {
            // El servidor respondió con un código de estado diferente a 2xx
            console.log(error);
        }
    }

    const buscarCuenta = async ( texto, usuario_id ) => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            console.log(usuario_id);

            const { data } = await axiosInstance.post('/api/search-acount', { texto, usuario_id }, config);
            console.log(data);
            setCuentas(data);

        } catch (error) {
            console.log(error);
            setCuentas([]);
        }
    }

    return (
        <AcountContext.Provider
            value={{
                cuentas,
                total_cuentas,
                obtenerCuentas,
                registrarCuenta,
                eliminarCuenta,
                obtenerPasssword,
                buscarCuenta,
                obtenerCuentasTotal,
                obtenerCategoriasCuenta
            }}
        >
            {children}
        </AcountContext.Provider>
    );
}

export default AcountContext;