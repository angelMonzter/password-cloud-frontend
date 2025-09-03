//profile
import { useState, useEffect } from "react";
import { Avatar, Typography, Button, Input } from "@material-tailwind/react";

import gala3 from "../assets/gala3.jpg";
import perfil from "../assets/perfil.png";

import { Footer } from "../layouts/Footer";
import useAuth from "../hooks/useAuth";
import useAcount from "../hooks/useAcount";
import useCategories from "../hooks/useCategories";
import AddAccountModal from "../components/Modal"; // Importa el modal que creamos
import AddCategoryModal from "../components/ModalCategories"; // Importa el modal que creamos
import CardAcount from "../components/CardAcount";
import Categories from "../components/Categories";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showAlert } from "../components/Alerta";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Profile() {

  const { cerrarSesion, auth } = useAuth();
  const { 
    cuentas,
    obtenerCuentas, 
    buscarCuenta, 
    obtenerCuentasTotal, 
    total_cuentas
  } = useAcount();
  const { nombre, correo, usuario_id } = auth.perfil;
  const { categories, total_categorias, getCategories } = useCategories();

  useEffect(() => {
    getCategories(usuario_id); 
    obtenerCuentas(usuario_id); 
    obtenerCuentasTotal(usuario_id);
    
  }, [])
  
  const buscador = async (e) => {
    e.preventDefault();
    const valor = e.target.value.trim();
    if(!e.target.value || valor == ""){
      obtenerCuentas(usuario_id); 
    }else{
      buscarCuenta(e.target.value, usuario_id);
    }
  };

  const editPerfil = async (e) => {
    e.preventDefault();
    console.log(token)
    //const url = '/recobery-password?token=' + token;

    //window.location.href = url;
  };

  // Estado para controlar el popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const openModalCategory = () => setIsModalOpenCategory(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalCategory = () => setIsModalOpenCategory(false);

  return (
  <>
    <ToastContainer /> 
    <section className="relative block h-[30vh]">
      <div className="bg-profile-background absolute top-0 h-40 sm:h-full w-full bg-cover bg-center " style={{ backgroundImage: `url(${gala3})` }} />
      <div className="absolute top-0 h-40 sm:h-full w-full bg-black/60 bg-cover bg-center" />
    </section>
    <section className="relative bg-white py-16">
      <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between">

            <div className="relative flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="-mt-20 w-full sm:w-64 text-center">
                <Avatar
                  src={perfil}
                  alt="Profile picture"
                  style={{ borderRadius: "250px" }}
                  className="h-auto w-1/3 sm:h-full sm:w-full bg-white"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start mt-4 sm:mt-2 w-full">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="text-center sm:text-left w-full"
                >
                  {nombre}
                </Typography>
                <Typography
                  variant="paragraph"
                  color="gray"
                  className="!mt-0 font-normal text-center sm:text-left w-full"
                >
                  {correo}
                </Typography>
              </div>
            </div>


            <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
              <div className="flex gap-4">
                <Button 
                  className="bg-blue-900 w-fit" 
                  onClick={cerrarSesion}
                >
                  Cerrar Sesión
                </Button>
                {/*<Button 
                  className="bg-red-900 w-fit" 
                  onClick={editPerfil}
                >
                  Restablecer Contraseña
                </Button> */}
              </div>
              {/* 
                
              */}
              <div className="flex justify-start py-4 pt-8 lg:pt-4">
                <div className="mr-4 p-3 text-center">
                 
                </div>
                <div className="mr-4 p-3 text-center">
                  {/**/} <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-bold uppercase"
                  >
                    {total_categorias}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    Categorias
                  </Typography>
                </div>
                <div className="p-3 text-center lg:mr-4">
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-bold uppercase"
                  >
                     {total_cuentas.length > 0 ? total_cuentas[0].total_cuentas : 'Cargando...'}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    Cuentas
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Modal para agregar cuenta */}
          <AddAccountModal isOpen={isModalOpen} closeModal={closeModal} cuenta={''} />
          {/* Modal para agregar categorias */}
          <AddCategoryModal isOpen={isModalOpenCategory} closeModal={closeModalCategory} categoria={''} />

          <div className="mb-10 py-6">
            <div className="flex w-full flex-col-reverse lg:flex-row gap-6">
              {/* Sección del almacén de cuentas (3/4 de la pantalla en pantallas grandes) */}
              <div className="lg:w-3/4 w-full">
                <h3 className="text-md lg:text-xl">Almacén de Cuentas</h3>
                <CardAcount />
              </div>

              {/* Sección de búsqueda y botón (1/4 de la pantalla en pantallas grandes) */}
              <div className="lg:w-1/4 w-full">
                <div className="flex w-full flex-col items-start">
                  <Typography variant="small" color="blue-gray" className="-mb-0 font-medium">
                    Buscar cuenta
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Agregue un dato de la cuenta"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    onChange={buscador}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <div className="flex w-full justify-between items-center mt-10 mb-1">
                    <Typography variant="small" color="blue-gray" className="-mb-0 font-medium mt-0">
                      Categorias
                    </Typography>
                    <Button
                      className="bg-green-600 text-white text-xs p-2"
                      onClick={openModalCategory}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </div>
                  
                  <Categories />

                </div>

                {/* Botón Agregar cuenta con posición fija */}
                <div className="sticky top-4 mt-6">
                  <Button
                    className="bg-blue-600 text-white w-full"
                    onClick={openModal}
                  >
                    Agregar cuenta
                  </Button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="bg-white">
      <Footer /> 
    </div>
  </>
  );
}

export default Profile;
