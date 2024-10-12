import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import useAcount from "../hooks/useAcount";
import 'react-toastify/dist/ReactToastify.css';
import { showAlert } from "./Alerta"
import AddAccountModal from "./Modal"; // Importa el modal que creamos

export const CardAcount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado del modal
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);  // Datos de la cuenta seleccionada
  const { cuentas, eliminarCuenta } = useAcount();

  // Función para copiar texto al portapapeles
  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto).then(() => {
      showAlert('success', 'Datos copiados');
    }).catch((err) => {
      console.error("Error al copiar el texto:", err);
    });
  };

  //Funcion para borrar una cuenta
  const borrarCuenta = (cuenta_id, usuario_sid) => {
    
    eliminarCuenta(cuenta_id, usuario_sid);
    showAlert('success', 'Cuenta eliminada');
  };

  //Funcion para editar una cuenta
  const editarCuenta = (cuenta) => {
    console.log(cuenta);
    setCuentaSeleccionada(cuenta)
    setIsModalOpen(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {cuentas.length > 0 ? (
        cuentas.map((cuenta) => (
          <div key={cuenta.datos_cuenta_id} className="bg-white shadow-lg w-full mt-3 border rounded-lg overflow-hidden mb-3">
            {/* Encabezado gris */}
            <div className="bg-gray-200 p-4 flex justify-between items-center">
              <Typography variant="h6" color="blue-gray" className="font-medium">
                <span className="font-normal">{cuenta.nombre_cuenta}</span>
              </Typography>

              {/* Botones de editar y eliminar alineados a la derecha */}
              <div className="flex gap-2">
                <button 
                  onClick={() => editarCuenta(cuenta)} 
                  className="p-2 text-green-700 border rounded hover:bg-green-100"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => borrarCuenta(cuenta.datos_cuenta_id, cuenta.usuario_sid)} 
                  className="p-2 text-red-500 border rounded hover:bg-red-100"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            
            {/* Cuerpo con datos y acciones */}
            <div className="p-4 flex justify-between">
              <div className="flex flex-col gap-2">
                <Typography variant="small" color="blue-gray" className="font-medium mt-2">
                  Usuario / Correo: <span className="font-normal">{cuenta.usuario}</span>
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-medium mt-2">
                  Contraseña: <span className="font-normal">********</span>
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-medium mt-2">
                  Datos extra: <span className="font-normal">{cuenta.datos_extra}</span>
                </Typography>
              </div>

              {/* Iconos de acciones */}
              <div className="flex flex-col gap-2 items-end">
                <button
                  className="p-2 text-blue-500 border rounded hover:bg-blue-100"
                  onClick={() => copiarAlPortapapeles(cuenta.usuario)}
                >
                  <i className="fas fa-copy"></i> {/* Icono de copiar */}
                </button>
                <button 
                    className="p-1 text-blue-500 border rounded hover:bg-blue-100"
                    onClick={() => copiarAlPortapapeles(cuenta.password)}
                >
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Typography variant="h6" color="blue-gray" className="mt-4">
          No hay cuentas disponibles.
        </Typography>
      )}

      <AddAccountModal isOpen={isModalOpen} closeModal={closeModal} cuenta={cuentaSeleccionada} />
    </>
  );
}

export default CardAcount;
