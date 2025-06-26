import { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import useAcount from "../hooks/useAcount";
import 'react-toastify/dist/ReactToastify.css';
import { showAlert } from "./Alerta";
import AddAccountModal from "./Modal";
import { faCopy, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CardAcount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const { cuentas, eliminarCuenta, obtenerPasssword } = useAcount();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular las cuentas para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCuentas = cuentas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cuentas.length / itemsPerPage);

  const copiarAlPortapapeles = async (data) => {
    const textoDesencriptado = await obtenerPasssword(data);
    if (textoDesencriptado) {
      navigator.clipboard.writeText(textoDesencriptado).then(() => {
        showAlert('success', 'Datos copiados');
      }).catch((err) => console.error("Error al copiar:", err));
      return;
    }

    navigator.clipboard.writeText(data).then(() => {
      showAlert('success', 'Datos copiados');
    }).catch((err) => console.error("Error al copiar:", err));
  };

  const borrarCuenta = (cuenta_id, usuario_sid) => {
    showAlert("confirm", `¿Eliminar Cuenta?`, async () => {
      eliminarCuenta(cuenta_id, usuario_sid);
    });
  };

  const editarCuenta = (cuenta) => {
    setCuentaSeleccionada(cuenta);
    setIsModalOpen(true);
  };

  return (
    <>
      {currentCuentas.length > 0 ? (
        currentCuentas.map((cuenta) => (
          <div key={cuenta.datos_cuenta_id} className="bg-white shadow-lg w-full mt-3 border rounded-lg overflow-hidden mb-3">
            <div className="bg-gray-200 p-4 flex justify-between items-center">
              <Typography variant="h6" color="blue-gray" className="font-medium">
                <span className="font-normal">{cuenta.nombre_cuenta}</span>
              </Typography>
              <div className="flex gap-2">
                <button onClick={() => editarCuenta(cuenta)} className="p-2 text-green-700 border rounded hover:bg-green-100">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={() => borrarCuenta(cuenta.datos_cuenta_id, cuenta.usuario_sid)} className="p-2 text-red-500 border rounded hover:bg-red-100">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
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
                
                {/* 🔽 CATEGORÍAS */}
                {cuenta.categorias && cuenta.categorias.length > 0 && (
                  <div className="pb-4">
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      <Typography variant="small" color="blue-gray" className="font-medium">
                        Categorías:
                      </Typography>
                      {cuenta.categorias.map((categoria) => (
                        <span
                          key={categoria.categoria_id}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {categoria.nombre_categoria}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button className="p-2 text-blue-500 border rounded hover:bg-blue-100" onClick={() => copiarAlPortapapeles(cuenta.usuario)}>
                  <FontAwesomeIcon icon={faCopy} />
                </button>
                <button className="p-2 text-blue-500 border rounded hover:bg-blue-100" onClick={() => copiarAlPortapapeles(cuenta.datos_cuenta_id)}>
                  <FontAwesomeIcon icon={faCopy} />
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

      {/* Controles de paginación */}
      {cuentas.length > itemsPerPage && (
        <div className="w-full flex justify-between items-center mt-4 px-4">
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1} 
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Anterior
          </Button>

          <Typography variant="h6" color="blue-gray">
            Página {currentPage} de {totalPages}
          </Typography>

          <Button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages} 
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Siguiente
          </Button>
        </div>
      )}


      <AddAccountModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} cuenta={cuentaSeleccionada} />
    </>
  );
}

export default CardAcount;
