import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth();

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };
      
    const objetoVacio = isEmptyObject(auth);

    if(cargando) return 'Cargando...';

    // Validar autenticación y redireccionar si no está autenticado
    return (
        <>
            {
                !auth || objetoVacio 
                ? <Navigate to="/sign-in" />  // Si no está autenticado, redirigir
                : (
                    // Si está autenticado, mostrar el contenido protegido
                    <div>
                        <Outlet /> 
                    </div>
                )
            }
        </>
    );
}

export default RutaProtegida;
