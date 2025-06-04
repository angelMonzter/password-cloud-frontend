import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from '../config/axios';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('token');
    
    // Obtener categorías del backend
    const getCategories = async (id) => {
        try {
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const url = `/api/category/${id}`;
            const { data } = await axiosInstance(url, config);
            setCategories(data);

    } catch (error) {
            console.error("Error al obtener categorías", error);
        }
    };

    // Agregar una nueva categoría
    const addCategory = async (categoryName, usuario_id) => {
        try {
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            console.log(categoryName)
            const { data } = await axiosInstance.post("/api/category", { nombre_categoria: categoryName }, config);
            getCategories(usuario_id);
        } catch (error) {
            console.error("Error al agregar categoría", error);
        }
    };

    // Eliminar categoría
    const deleteCategory = async (categoryId, usuario_id) => {
        try {

            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            await axiosInstance.delete(`/api/category/${categoryId}`, config);
            getCategories(usuario_id);
        } catch (error) {
            console.error("Error al eliminar categoría", error);
        }
    };

    return (
        <CategoryContext.Provider 
            value={{ 
                getCategories,
                categories, 
                addCategory, 
                deleteCategory 
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;

