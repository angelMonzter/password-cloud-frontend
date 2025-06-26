import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DialogHeader, DialogBody, DialogFooter, Input, Typography, Button, step } from "@material-tailwind/react";
import axiosInstance from '../config/axios';
import useAcount from "../hooks/useAcount";
import useCategories from "../hooks/useCategories";
import useAuth from "../hooks/useAuth";
import {  showAlert } from "../components/Alerta"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddAccountModal({ isOpen, closeModal, cuenta }) {

    const { registrarCuenta, obtenerPasssword } = useAcount();
    const { categories } = useCategories();
    const { auth } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [campoObligatorio, setCampoObligatorio] = useState(true);
    const [nombre_cuenta, setNombreCuenta] = useState('')
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('') 
    const [datos_extra, setDatosExtra] = useState('')
    const [cuenta_id, setId] = useState('')

    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

    const animatedComponents = makeAnimated();

    const opciones = categories.map(categoria => ({
      value: categoria.categoria_id,
      label: categoria.nombre_categoria
    }));

    const handleCategoriasChange = (selectedOptions) => {
      setCategoriasSeleccionadas(selectedOptions || []);
    };


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

          // 🔽 Convertir categorías a formato para Select
          const categoriasFormateadas = cuenta.categorias.map(cat => ({
            value: cat.categoria_id,
            label: cat.nombre_categoria
          }));
          setCategoriasSeleccionadas(categoriasFormateadas);
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

      const valoresCategorias = categoriasSeleccionadas.map(cat => cat.value);
      console.log("Valores de categorías:", valoresCategorias);

      registrarCuenta( nombre_cuenta, usuario, password, datos_extra, usuario_id, cuenta_id, valoresCategorias );

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
                    <b>Agregar cuenta nueva</b>
                  </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                          <div className="mt-4">
                              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                                Nombre de la cuenta
                              </Typography>
                              <Input 
                                  placeholder="Nombre de la cuenta" 
                                  size="lg"
                                  value={nombre_cuenta}
                                  onChange={e => setNombreCuenta(e.target.value)}
                              />
                              { !campoObligatorio ? <p className="text-xs text-red-700 p-2">Campo obligatorio</p> : <br/>}
                              
                              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                                Correo
                              </Typography>
                              <Input 
                                  placeholder="Correo" 
                                  size="lg" 
                                  type="email"
                                  value={usuario}
                                  onChange={e => setUsuario(e.target.value)}
                              />
                              { !campoObligatorio ? <p className="text-xs text-red-700 p-2">Campo obligatorio</p> : <br/>}
                          
                              {/* Campo de contraseña con botón de mostrar/ocultar */}
                              <div className="mb-1 flex flex-col gap-1">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-medium"
                                >
                                  Contraseña
                                </Typography>

                                <div  className="flex items-center gap-2">
                                  <Input
                                    placeholder="Contraseña"
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
                                      <FontAwesomeIcon icon={faEyeSlash} />
                                  ) : (
                                      <FontAwesomeIcon icon={faEye} />
                                  )}
                                  </Button>
                                </div>
                              </div>
                              { !campoObligatorio ? <p className="text-xs text-red-700 p-2">Campo obligatorio</p> : <br/>}
                              
                              <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                                Datos extra
                              </Typography>
                              <Input 
                                  placeholder="Datos extra"
                                  size="lg" 
                                  value={datos_extra}
                                  onChange={e => setDatosExtra(e.target.value)} 
                              />

                              <Typography variant="small" color="blue-gray" className="font-medium mt-5 mb-1">
                                Categorías
                              </Typography>
                              <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                isMulti
                                options={opciones} // Lista total de opciones posibles
                                value={categoriasSeleccionadas} // ✅ Selección actual
                                onChange={(selected) => setCategoriasSeleccionadas(selected)} // 🔄 Actualiza el estado
                                menuPortalTarget={document.body} // Mueve el menú fuera del modal
                                menuPosition="absolute" // Asegura que se posicione de manera absoluta
                                placeholder="Categorías" // Aquí cambias el texto del placeholder
                                styles={{
                                  menuPortal: (base) => ({ ...base, zIndex: 9999 }) // Ajusta el z-index para que quede sobre el modal
                                }}
                                className="mt-0"
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
