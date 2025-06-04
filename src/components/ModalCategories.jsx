import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DialogHeader, DialogBody, DialogFooter, Input, Typography, Button, step } from "@material-tailwind/react";
import useCategories from "../hooks/useCategories";
import useAuth from "../hooks/useAuth";
import {  showAlert } from "../components/Alerta"

function AddCategoryModal({ isOpen, closeModal }) {

    const { addCategory } = useCategories();
    const { auth } = useAuth();

    const [campoObligatorio, setCampoObligatorio] = useState(true);
    const [nombre_categoria, setNombreCategoria] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre_categoria].includes('')) {
            showAlert('error', 'Nombre de la categoria obligatorio');
            setCampoObligatorio(false);
            return 
        }
      const { usuario_id } = auth.perfil;

      addCategory( nombre_categoria, usuario_id );
      showAlert('success', 'Categoria agregada');
      setNombreCategoria('');
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
                    Agregar nueva categoria
                  </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                          <div className="mt-4">
                              <Input 
                                  label="Nombre de la categoria" 
                                  size="lg"
                                  value={nombre_categoria}
                                  onChange={e => setNombreCategoria(e.target.value)}
                              />
                              { !campoObligatorio ? <p className="text-xs text-red-700 p-2">Campo obligatorio</p> : <br/>}
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
export default AddCategoryModal;
