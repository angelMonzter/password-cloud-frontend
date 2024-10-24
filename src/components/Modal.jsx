import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DialogHeader, DialogBody, DialogFooter, Input, Typography, Button, step } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axiosInstance from '../config/axios';
import useAcount from "../hooks/useAcount";
import useAuth from "../hooks/useAuth";
import {  showAlert } from "../components/Alerta"

function AddAccountModal({ isOpen, closeModal, cuenta }) {

    const { registrarCuenta, obtenerPasssword } = useAcount();
    const { auth } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [campoObligatorio, setCampoObligatorio] = useState(true);
    const [nombre_cuenta, setNombreCuenta] = useState('')
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('') 
    const [datos_extra, setDatosExtra] = useState('')
    const [cuenta_id, setId] = useState('')

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const desencriptarPassword = async (id) => {
      //mandar a backend a desencriptar contraseña 
      const textoDesencriptado = await obtenerPasssword(id);
  
      setPassword(textoDesencriptado);
    };

    useEffect(() => {
      if(cuenta?.nombre_cuenta) {
          setNombreCuenta(cuenta.nombre_cuenta)
          setUsuario(cuenta.usuario)
          setDatosExtra(cuenta.datos_extra)
          setId(cuenta.datos_cuenta_id)
          desencriptarPassword(cuenta.datos_cuenta_id);
      }
      console.log(cuenta)
    }, [cuenta])

    const handleSubmit = async (e) => {
      e.preventDefault();

      if([usuario, password, nombre_cuenta].includes('')) {
          showAlert('error', 'Datos de cuenta obligatorios');
          setCampoObligatorio(false);
          return 
      }

      const { usuario_id } = auth.perfil;

      registrarCuenta( nombre_cuenta, usuario, password, datos_extra, usuario_id, cuenta_id );
      showAlert('success', 'Cuenta agregada');
      setNombreCuenta('');
      setUsuario('');
      setPassword('');
      setDatosExtra('');
      setCampoObligatorio(true);

    };

    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Agregar nueva cuenta
                  </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                          <div className="mt-4">
                              <Input 
                                  label="Nombre de la cuenta" 
                                  size="lg"
                                  value={nombre_cuenta}
                                  onChange={e => setNombreCuenta(e.target.value)}
                              />
                              { !campoObligatorio ? <p className="text-xs text-red-700 p-2">Campo obligatorio</p> : <br/>}
                              
                              <Input 
                                  label="Correo" 
                                  size="lg" 
                                  type="email"
                                  value={usuario}
                                  onChange={e => setUsuario(e.target.value)}
                              />
                              { !campoObligatorio ? <p className="text-xs text-red-700 p-2">Campo obligatorio</p> : <br/>}
                          
                              {/* Campo de contraseña con botón de mostrar/ocultar */}
                              <div className="flex items-center gap-4">
                                  <Input
                                      label="Contraseña"
                                      size="lg"
                                      type={showPassword ? "text" : "password"}
                                      className="flex-1"
                                      value={password}
                                      onChange={e => setPassword(e.target.value)}
                                  />
                                  {/* Botón para mostrar/ocultar contraseña */}
                                  <Button
                                      variant="text"
                                      onClick={togglePasswordVisibility}
                                  >
                                  {showPassword ? (
                                      <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                                  ) : (
                                      <EyeIcon className="h-5 w-5 text-gray-600" />
                                  )}
                                  </Button>
                              </div>
                              { !campoObligatorio ? <p className="text-xs text-red-700 p-2">Campo obligatorio</p> : <br/>}

                              <Input 
                                  label="Datos extra"
                                  size="lg" 
                                  value={datos_extra}
                                  onChange={e => setDatosExtra(e.target.value)} 
                              />
                          </div>

                          <div className="mt-6 flex justify-end gap-4">
                              <Button variant="outlined" color="red" onClick={closeModal}>
                                  Cancelar
                              </Button>
                              <input 
                                  type="submit"
                                  value="Agregar"
                                  class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                              />
                          </div>
                      </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
}
export default AddAccountModal;
