import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import useCategories from "../hooks/useCategories";
import 'react-toastify/dist/ReactToastify.css';
import { showAlert } from "./Alerta";
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Categories = () => {
    const { categories, deleteCategory } = useCategories();

    const borrarCategoria = (categoria_id, usuario_sid) => {
        showAlert("confirm", `¿Eliminar categoria?`, async () => {
            deleteCategory(categoria_id, usuario_sid);
        });
    };
    
    return (
        <>
            <div className="flex flex-wrap w-full">
                {categories.length > 0 ? (
                    categories.map((categoria) => (
                        <Button
                            className="bg-gray-300 text-gray-700 p-2 text-xs m-2 rounded-lg flex shadow-transparent"
                            onClick={() => borrarCategoria(categoria.categoria_id, categoria.usuario_sid)}
                        >
                            {categoria.nombre_categoria} 
                            <FontAwesomeIcon 
                                icon={faX} 
                                className="px-1"
                                style={{ top: '2px', left: '2px', position: 'relative'}}
                            />
                        </Button>
                    ))
                ) : (
                    <Typography variant="h6" color="blue-gray" className="mt-4">
                    No hay categorias disponibles.
                    </Typography>
                )}
            </div>
        </>
    );
}

export default Categories;
