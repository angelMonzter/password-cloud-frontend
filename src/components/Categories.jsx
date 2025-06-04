import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import useCategories from "../hooks/useCategories";
import 'react-toastify/dist/ReactToastify.css';
import { showAlert } from "./Alerta";
import {
    XMarkIcon
  } from "@heroicons/react/24/solid";

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
                            <XMarkIcon class="h-4 w-4 text-gray-600" />
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
