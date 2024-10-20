import { useState, useEffect } from "react";
import { Avatar, Typography, Button, Input } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import useAuth from "../hooks/useAuth";
import useAcount from "../hooks/useAcount";
import AddAccountModal from "../components/Modal"; // Importa el modal que creamos
import CardAcount from "../components/CardAcount";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  showAlert } from "../components/Alerta"

export function Profile() {

  const { cerrarSesion, auth } = useAuth();
  const { cuentas, obtenerCuentas, buscarCuenta } = useAcount();
  const { nombre, correo, usuario_id } = auth.perfil;

  useEffect(() => {
    obtenerCuentas(usuario_id); 
  }, [])

  const buscador = async (e) => {
    e.preventDefault();
    const valor = e.target.value.trim();
    if(!e.target.value || valor == ""){
      obtenerCuentas(usuario_id); 
    }else{
      buscarCuenta(e.target.value);
    }
  };

  // Estado para controlar el popup
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
  <>
    <ToastContainer />
    <section className="relative block h-[50vh]">
      <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/gala4.jpg')] bg-cover bg-center " />
      <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
    </section>
    <section className="relative bg-white py-16">
      <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="relative flex gap-6 items-start">
              <div className="-mt-20 w-40">
                <Avatar
                  src="/img/team-5.png"
                  alt="Profile picture"
                  variant="circular"
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col mt-2">
                <Typography variant="h4" color="blue-gray">
                  {nombre}
                </Typography>
                <Typography variant="paragraph" color="gray" className="!mt-0 font-normal">{correo}</Typography>
              </div>
            </div>

            <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
              <Button className="bg-gray-900 w-fit lg:ml-auto" onClick={cerrarSesion}>Cerrar Sesion</Button>
              <div className="flex justify-start py-4 pt-8 lg:pt-4">
                <div className="mr-4 p-3 text-center">
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-bold uppercase"
                  >
                    22
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    Friends
                  </Typography>
                </div>
                <div className="mr-4 p-3 text-center">
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-bold uppercase"
                  >
                    10
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    Photos
                  </Typography>
                </div>
                <div className="p-3 text-center lg:mr-4">
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-bold uppercase"
                  >
                    89
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                  >
                    Comments
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Modal para agregar cuenta */}
          <AddAccountModal isOpen={isModalOpen} closeModal={closeModal} cuenta={''} />

          <div className="mb-10 py-6">
            <div className="flex w-full flex-col items-start">
              <Typography variant="small" color="blue-gray" className="-mb-0 font-medium">
                Buscar cuenta
              </Typography>
              <Input
                size="lg"
                placeholder="Agregue un dato de la cuenta"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={buscador}
                labelProps={{
                className: "before:content-none after:content-none",
              }}
              />
            </div>

            <div className="flex w-full flex-col items-start">
              {/* Contenedor flex para el título y el botón en la misma línea */}
              <div className="flex w-full justify-between items-center mt-7">
                <h3 className="text-xl">Almacen de Cuentas</h3>
                <Button
                  className="bg-blue-600 text-white w-fit lg:ml-auto"
                  onClick={openModal}
                >
                  Agregar cuenta
                </Button>
              </div>

              {/* Tarjeta de cuenta 
              <div className="bg-white shadow-lg w-full mt-3 border rounded-lg overflow-hidden mb-3">
                <div className="bg-gray-200 p-4 flex justify-between items-center">
                  <Typography variant="h6" color="blue-gray" className="font-medium">
                    Nombre de la cuenta: <span className="font-normal">perro 233</span>
                  </Typography>

                  <div className="flex gap-2">
                    <button className="p-2  text-green-700 border rounded hover:bg-green-100">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="p-2  text-red-500 border rounded hover:bg-red-100">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                 Cuerpo con datos y acciones
                <div className="p-4 flex justify-between">
                  <div className="flex flex-col gap-2">
                    <Typography variant="small" color="blue-gray" className="font-medium mt-2">
                      Usuario / Correo: <span className="font-normal">perro@pero.com</span>
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-medium mt-2">
                      Contraseña: <span className="font-normal">*********</span>
                    </Typography>
                    <Typography variant="small" color="blue-gray" className="font-medium mt-4">
                      Datos extra: <span className="font-normal">aa perrooo2</span>
                    </Typography>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <button className="p-1 text-blue-500 border rounded hover:bg-blue-100">
                      <i className="fas fa-copy"></i>
                    </button>
                    <button className="p-1 text-blue-500 border rounded hover:bg-blue-100">
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                </div> 
              </div>*/}

              <CardAcount />
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
